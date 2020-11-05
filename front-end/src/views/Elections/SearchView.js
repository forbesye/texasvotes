import React, { Fragment, useState, useEffect } from "react"
import { Typography, Input, Divider, Pagination } from "antd"
import { Link, useLocation, useHistory } from "react-router-dom"
import Highlighter from "react-highlight-words"
import styles from "./Elections.module.css"

import { getAPI } from "../../library/APIClient"
import Spinner from "../../components/ui/Spinner"
import { districtName } from "library/Functions"
import { party_mappings } from "library/Mappings"

const { Search } = Input
const { Title, Text, Paragraph } = Typography

const electionTitle = (election) => {
	const { dates, office, district, type, party } = election
	const { number } = district
	const { election_day } = dates
	const electionYear = new Date(election_day).getFullYear()
	if (type.class === "general") {
		return `${electionYear} General Election for ${districtName(office, number)}`
	} else if (type.class === "runoff") {
        return `${electionYear} ${party_mappings[party]} Runoff for ${districtName(office, number)}`
	} else {
		return `${electionYear} ${party_mappings[party]} Primary for ${districtName(office, number)}`
	}
}

export default function SearchView(props) {

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
        history.push(`/elections/search?q=${encodeURIComponent(value)}&page=${p}`)
        setLoading(true)
        const data = await getAPI({ 
            model: "election",
            params: {
                q: value,
                page: p
            }
        })
        const results = data.page
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
        <Fragment>
			<section className={styles.content}>
                <section className={styles.description}>
                    <Typography.Title level={3}>Search</Typography.Title>
                    <Typography.Paragraph>Search our database for elections. </Typography.Paragraph>
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
                        { results.map(result => <ElectionResult {...result} searchQuery={searchVal} />)}
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
			<Divider />
		</Fragment>
	)
}

function ElectionResult(props) {
    let { district: { counties }, candidates, searchQuery} = props

    let candidateNames = []
    candidates.forEach(candidate => {
        candidateNames.push(candidate.name)
    })

    let displayedCounties = counties.length >= 10 ? counties.slice(0, 10) : counties
    displayedCounties = displayedCounties.reduce((prev, next) => `${prev}, ${next}`)
    displayedCounties += counties.length >= 10 ? "..." : ""

    let displayedCandidates = candidateNames.length >= 10 ? candidateNames.slice(0, 10) : candidateNames
    displayedCandidates = displayedCandidates.reduce((prev, next) => `${prev}, ${next}`)
    displayedCandidates += candidateNames.length >= 10 ? "..." : ""

    return (
        <Link to={`/elections/view/${props.id}`}>
            <div className={styles.electionSearchCard}>
                <div className={styles.electionSearchDesc}>
                    <Title level={4}>{
                        <Highlighter 
                            highlightClassName={styles.searchHighlight}
                            searchWords={searchQuery.split(' ')}
                            textToHighlight={electionTitle(props)}
                        />
                    }
                    </Title>
                    <Paragraph>
                        <Text strong>Candidates: </Text> 
                        <Highlighter 
                            highlightClassName={styles.searchHighlight} 
                            searchWords={searchQuery.split(' ')}
                            textToHighlight={displayedCandidates}
                        />
                    </Paragraph>
                    <Paragraph>
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