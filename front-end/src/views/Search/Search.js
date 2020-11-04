import React, { Fragment, useState, useEffect } from "react"
import { Typography } from "antd"
import { Link, useLocation, useHistory } from "react-router-dom"
import { getAPI } from "../../library/APIClient"
import Spinner from "../../components/ui/Spinner"
import styles from "./Search.module.css"

import { PoliticianCard, DistrictCard, ElectionCard, MoreResultsCard } from "./SearchCards"
import GeneralSearchBar from "./GeneralSearchBar"

const { Title, Paragraph } = Typography

const SEARCH_PATHS = ["politician", "district", "election"]
const SEARCH_LIMIT = 10

export default function GeneralSearch (props) {
    const location = useLocation()
    const history = useHistory()
    const [ loaded, setLoaded ] = useState(false)
    const [ searchQ, setSearchQ ] = useState("")
    const [ results, setResults ] = useState({
        "politician": [],
        "district": [],
        "election": []
    })

    const queries = new URLSearchParams(location.search)

    const handleSearchChange = (event) => {
        setSearchQ(event.target.value)
    }

    const handleSearch = (value) => {
        history.push(`/search?q=${value}`)
        setSearchQ(value)
        search(value)
    }

    const search = async (q) => {
        setLoaded(false)
        const promises = SEARCH_PATHS.map((model) => {
            return getAPI({ model: model, params: { q } })
        })
        const resolved = await Promise.all(promises)
        const all = {}
        resolved.forEach((data, i) => {
            const { page, count } = data
            all[SEARCH_PATHS[i]] = page.slice(0, SEARCH_LIMIT)
            if (count > SEARCH_LIMIT) {
                all[SEARCH_PATHS[i]].push({
                    eor: true,
                    model: SEARCH_PATHS[i],
                    amount: count - SEARCH_LIMIT
                })
            }
        })
        setResults(all)
        setLoaded(true)
    }

    useEffect(() => {
        const q = queries.get("q")
        setSearchQ(q)
        if (searchQ !== q) {
            search(q)   
        }
    }, [])

    return (
        <section className={styles.content}>
            <div className={styles.contentHeader}>
                <Title level={1}>Results for "{queries.get("q")}"</Title>
                <GeneralSearchBar 
                    showTitle={false}
                    onChange={handleSearchChange}
                    onSearch={handleSearch} 
                    value={searchQ}
                />
            </div>
            { loaded ? (
                <Fragment>
                    <div className={styles.searchResults}>
                        <Title level={3}>Politicians</Title>
                        <div className={styles.searchItemsPolitician}>
                            { results.politician.map(p => {
                                if (p.eor === true) 
                                    return <MoreResultsCard {...p} searchQuery={queries.get("q")} />
                                return <PoliticianCard {...p} searchQuery={queries.get("q")} />
                            } ) }
                        </div>
                        { results.politician.length === 0 ? <Paragraph>No results found.</Paragraph> : null }
                    </div>
                    <div className={styles.searchResults}>
                        <Title level={3}>Districts</Title>
                        <div className={styles.searchItemsDistrict}>
                            { results.district.map(d => {
                                if (d.eor === true) 
                                    return <MoreResultsCard {...d} searchQuery={queries.get("q")} />
                                return <DistrictCard {...d} searchQuery={queries.get("q")} />
                            } ) }
                        </div>
                        { results.district.length === 0 ? <Paragraph>No results found.</Paragraph> : null }
                    </div>
                    <div className={styles.searchResults}>
                        <Title level={3}>Elections</Title>
                        <div className={styles.searchItemsElection}>
                            { results.election.map(e => {
                                if (e.eor === true) 
                                    return <MoreResultsCard {...e} searchQuery={queries.get("q")} />
                                return <ElectionCard {...e} searchQuery={queries.get("q")} />
                            } ) }
                        </div>
                        { results.election.length === 0 ? <Paragraph>No results found.</Paragraph> : null }
                    </div>
                </Fragment>
            ) : <Spinner /> }
        </section>
    )
}

