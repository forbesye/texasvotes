import React, { Fragment, useState, useEffect } from "react"
import { Typography, Input, Divider, Pagination } from "antd"
import { Link, useLocation, useHistory } from "react-router-dom"
import Highlighter from "react-highlight-words"
import styles from "./Politicians.module.css"

import { getAPI } from "../../library/APIClient"
import Spinner from "../../components/ui/Spinner"
import { description } from "./Lib"
import { mostAlike, getMatchIndices } from "../../library/searchFunctions"

const { Search } = Input
const { Title, Text, Paragraph } = Typography

/**
 * Functional component for politician search view
 */
export default function SearchView () {
    const [searchVal, setSearchVal] = useState("")
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const history = useHistory()

	const handleTextChange = (event) => {
		setSearchVal(event.target.value)
	}

    /**
     * Modifies URL and calls API based on query
     * @param {String} query
     * @param {Number} page 
     */
    const handleSearch = async (value, p=1) => {
        history.push(`/politicians/search?q=${encodeURIComponent(value)}&page=${p}`)
        setLoading(true)
        const data = await getAPI({ 
            model: "politician",
            params: {
                q: value,
                page: p
            }
        })
        const results = data.page
        const userquery = value.toLowerCase()
        results.sort((a, b) => {
            // Sort by best match
            const aname = a.name.toLowerCase()
            const bname = b.name.toLowerCase()
            return mostAlike(bname, userquery) - mostAlike(aname, userquery)
        })
        setResults(results)
        setLoading(false)
        setTotal(data.count)
    }

    const handlePageChange = (p) => {
        setPage(p)
        handleSearch(searchVal, p)
    }

	useEffect(() => {
		const q = new URLSearchParams(location.search).get("q")
		if (q) {
			const decoded = decodeURIComponent(q)
			setSearchVal(decoded)
			handleSearch(decoded)
		}
	}, [])

    return (
        <section className={styles.content}>
            <section className={styles.description}>
                <Typography.Title level={3}>Search</Typography.Title>
                <Typography.Paragraph>Search our database for a Texas elected official or political challenger. </Typography.Paragraph>
                <Search 
                    size="large"
                    loading={loading} 
                    onSearch={(val) => handleSearch(val)} 
                    value={searchVal}
                    onChange={handleTextChange}
                />
            </section>
            <Divider />
            { loading ? <Spinner /> : (
                <section className={styles.searchResults}>
                    { results.map(result => <PoliticianResult {...result} searchQuery={searchVal} />)}
                </section>
            ) }
            <Pagination 
                current={page}
                onChange={handlePageChange}
                pageSize={20}
                showSizeChanger={false}
                total={total}
            />
        </section>
    )
}

/**
 * Politician search result card component
 * @param {Politician} props 
 */
export function PoliticianResult(props) {

    let { district: { counties }, searchQuery } = props
    const [ highlightStart, highlightEnd ] = getMatchIndices(props.name, searchQuery)

    let displayedCounties = counties.length >= 10 ? counties.slice(0, 10) : counties
    displayedCounties = displayedCounties.reduce((prev, next) => `${prev}, ${next}`)
    displayedCounties += counties.length >= 10 ? "..." : ""

    return (
        <Link to={`/politicians/view/${props.id}`}>
            <div className={styles.politicianSearchCard}>
                <img className={styles.politicianSearchImage} src={props.image} alt={props.name} />
                <div className={styles.politicianSearchDesc}>
                    {/* Name and party */}
                    <Title level={3}>{
                        <Highlighter 
                            highlightClassName={styles.searchHighlight}
                            searchWords={searchQuery.split(' ')}
                            textToHighlight={props.name}
                        />
                    } ({props.party})</Title>
                    {/* Description */}
                    <Paragraph>
                        <Highlighter 
                            highlightClassName={styles.searchHighlight}
                            searchWords={searchQuery.split(' ')}
                            textToHighlight={description(props)}
                        />
                    </Paragraph>
                    <Paragraph>
                        {/* Counties, with bias towards matched */}
                        <Text strong>Counties: </Text> 
                        <Highlighter 
                            highlightClassName={styles.searchHighlight} 
                            searchWords={searchQuery.split(' ')}
                            textToHighlight={displayedCounties}
                        />
                    </Paragraph>
                </div>
            </div>
        </Link>
    )
}
