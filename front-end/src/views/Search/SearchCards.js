import React from "react"
import { Card, Typography } from "antd"
import { Link } from "react-router-dom"
import Highlighter from "react-highlight-words"
import styles from "./Search.module.css"
import { description as districtDescription } from "../Politicians/Lib"
import { districtName } from "../Districts/Lib"
import { election_type_mappings, elected_office_mappings, party_mappings } from "../../library/Mappings"

const { Paragraph } = Typography
const { Meta } = Card

export function PoliticianCard (props) {
    let { 
        district: { counties }, 
        image, 
        id, 
        name,
        party, 
        searchQuery  
    } = props
    counties = counties.slice(0, 3)
    return (
        <Link to={`/politicians/view/${id}`}>
            <Card
                className={styles.generalCard}
                hoverable
                cover={
                    <img 
                        src={image}
                        alt={name}
                        className={styles.cardCover}
                    />
                }
            >
                <Meta 
                    title={(
                        <Highlighter 
                            highlightClassName={styles.highlight} 
                            searchWords={[ searchQuery ]} 
                            textToHighlight={`${name} (${party})`}
                        />
                    )}
                    description={(
                        <Highlighter 
                            highlightClassName={styles.highlight} 
                            searchWords={[ searchQuery ]}
                            textToHighlight={districtDescription(props)}
                        />
                    )}
                />
            </Card>
        </Link>
    )
}

export function DistrictCard (props) {
    const { number, id, party, counties, searchQuery } = props
    let mapped = counties.slice(0, 3).reduce((prev, curr) => `${prev}, ${curr}`)
    mapped += counties.length > 3 ? "..." : ""
    const displayName = number === -1 ? "Texas" : `TX-${number}`
    return (
        <Link to={`/districts/view/${id}`}>
            <Card>
                <Meta 
                    title={(
                        <Highlighter 
                            highlightClassName={styles.highlight} 
                            searchWords={[ searchQuery ]} 
                            textToHighlight={`${displayName} (${party})`}
                        />
                    )}
                    description={(
                        <Highlighter 
                            highlightClassName={styles.highlight}
                            searchWords={[ searchQuery ]}
                            textToHighlight={`Type: ${districtName(props)} | Counties: ${mapped}`}
                        />
                    )}
                />
            </Card>
        </Link>
    )
}

export function ElectionCard (props) {
    const {
        district: { number, counties },
        id,
        office,
        party,
        type,
        searchQuery
    } = props
    let electionName = `${type.class} Election for ${elected_office_mappings[office]}`
    if (party) electionName = `${party_mappings[party]} ${electionName}` 
    if (number !== -1) electionName = `${electionName} ${number}`
    let mapped = counties.slice(0, 3).reduce((prev, curr) => `${prev}, ${curr}`)
    mapped += counties.length > 3 ? "..." : ""
    return (
        <Link to={`/elections/view/${id}`}>
            <Card>
                <Meta 
                    title={(
                        <Highlighter 
                            highlightClassName={styles.highlight} 
                            searchWords={[ searchQuery ]} 
                            textToHighlight={electionName}
                        />
                    )}
                    description={(
                        <Highlighter 
                            highlightClassName={styles.highlight}
                            searchWords={[ searchQuery ]}
                            textToHighlight={`Counties: ${mapped}`}
                        />
                    )}
                />
            </Card>
        </Link>
    )
}