import React, { Fragment, useState, useEffect } from "react"
import { Typography, Input, Divider, Pagination } from "antd"
import { Link, useLocation, useHistory } from "react-router-dom"
import Highlighter from "react-highlight-words"
import styles from "./Politicians.module.css"

import { getAPI } from "../../library/APIClient"
import Spinner from "../../components/ui/Spinner"
import { districtName } from "../../library/Functions"
import { description } from "./Lib"

const { Search } = Input
const { Title, Text, Paragraph } = Typography

// Very naive algorithm that assigns a like-ness score through char counts
function mostAlike(str1, str2) {
	const m1 = new Map()
	const m2 = new Map()
	for (const c of str1) {
		m1.set(c, (m1.get(c) || 0) + 1)
	}
	for (const c of str2) {
		m2.set(c, (m2.get(c) || 0) + 1)
	}
	let inCommon = 0
	let different = 0
	// Roughly count common chars and penalize for different chars
	for (const [k, v] of m1) {
		const other = m2.get(k)
		if (other) {
			inCommon += Math.min(v, other)
			different += Math.max(v, other) - inCommon
		} else {
			different += v
		}
	}
	return inCommon - different
}

function getMatchIndices(str, toMatch) {
	str = str.toLowerCase()
	toMatch = toMatch.toLowerCase()
	let bestStart = 0,
		bestEnd = -1
	for (let i = 0; i < str.length; i++) {
		// Find matching stuff
		let start = i,
			end = i
		while (
			end < str.length &&
			end - start < toMatch.length &&
			str[end] == toMatch[end - start]
		) {
			end++
		}
		if (end - start > bestEnd - bestStart) {
			bestStart = start
			bestEnd = end
		}
	}
	return [bestStart, bestEnd]
}

export default function SearchView (props) {
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
		console.log(q)
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
                    size="large" l
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

function PoliticianResult(props) {

    let { district: { counties }, name, searchQuery } = props
    const [ highlightStart, highlightEnd ] = getMatchIndices(props.name, searchQuery)

    let displayedCounties = counties.length >= 10 ? counties.slice(0, 10) : counties
    displayedCounties = displayedCounties.reduce((prev, next) => `${prev}, ${next}`)
    displayedCounties += counties.length >= 10 ? "..." : ""

    return (
        <Link to={`/politicians/view/${props.id}`}>
            <div className={styles.politicianSearchCard}>
                <img className={styles.politicianSearchImage} src={props.image} alt={props.name} />
                <div className={styles.politicianSearchDesc}>
                    <Title level={3}>{
                        <Highlighter 
                            highlightClassName={styles.searchHighlight}
                            searchWords={[searchQuery]}
                            textToHighlight={props.name}
                        />
                    } ({props.party})</Title>
                    <Paragraph>
                        <Highlighter 
                            highlightClassName={styles.searchHighlight}
                            searchWords={[searchQuery]}
                            textToHighlight={description(props)}
                        />
                    </Paragraph>
                    <Paragraph>
                        <Text strong>Counties: </Text> 
                        <Highlighter 
                            highlightClassName={styles.searchHighlight} 
                            searchWords={[searchQuery]}
                            textToHighlight={displayedCounties}
                        />
                    </Paragraph>
                </div>
            </div>
        </Link>
    )
}
