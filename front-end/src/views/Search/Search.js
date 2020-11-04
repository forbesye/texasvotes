import React, { useState, useEffect } from "react"
import { Typography } from "antd"
import { useLocation } from "react-router-dom"
import { getAPI } from "../../library/APIClient"
import styles from "./Search.module.css"

import { PoliticianResult } from "../Politicians/SearchView"
import { PoliticianCard, DistrictCard, ElectionCard } from "./SearchCards"

const { Title, Paragraph } = Typography

const SEARCH_PATHS = ["politician", "district", "election"]
const SEARCH_LIMIT = 10

export default function GeneralSearch (props) {
    const location = useLocation()
    const [ loaded, setLoaded ] = useState(false)
    const [ searchQ, setSearchQ ] = useState("")
    const [ results, setResults ] = useState({
        "politician": [],
        "district": [],
        "election": []
    })

    useEffect(() => {
        const q = new URLSearchParams(location.search).get("q")
        setLoaded(false)
        setSearchQ(q)
        const promises = SEARCH_PATHS.map((model) => {
            return getAPI({ model: model, params: { q } })
        })
        Promise.all(promises).then(resolved => {
            console.log(resolved)
            const all = {}
            resolved.forEach((data, i) => {
                const { page } = data
                all[SEARCH_PATHS[i]] = page.slice(0, SEARCH_LIMIT)
            })
            setResults(all)
            setLoaded(true)
        })
    }, [])

    return (
        <section className={styles.content}>
            <div className={styles.contentHeader}>
                <Title level={1}>Results for "{searchQ}"</Title>
            </div>
            <div className={styles.searchResults}>
                <Title level={3}>Politicians</Title>
                <div className={styles.searchItemsPolitician}>
                    { results.politician.map(p => <PoliticianCard {...p} searchQuery={searchQ} /> ) }
                </div>
            </div>
            <div className={styles.searchResults}>
                <Title level={3}>Districts</Title>
                <div className={styles.searchItemsDistrict}>
                    { results.district.map(p => <DistrictCard {...p} searchQuery={searchQ} /> ) }
                </div>
            </div>
            <div className={styles.searchResults}>
                <Title level={3}>Election</Title>
                <div className={styles.searchItemsElection}>
                    { results.election.map(p => <ElectionCard {...p} searchQuery={searchQ} /> ) }
                </div>
            </div>
        </section>
    )
}

