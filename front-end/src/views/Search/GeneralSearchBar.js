import React from "react"
import { Typography, Input } from "antd"
import styles from "./Search.module.css"

const { Title, Paragraph } = Typography
const { Search } = Input

// This component is used on both the splash and search pages. 
export default function GeneralSearchBar ({ showTitle = true, value, onSearch, onChange }) {
    return (
        <div className={styles.searchBarContainer}>
            { showTitle ? <Title level={1}>Sitewide Search</Title> : null }
            <Paragraph>Search for a politician, an district, or an election here.</Paragraph>
            <Search 
                size="large" 
                enterButton="Search" 
                placeholder="Enter sitewide search here."
                onChange={onChange}
                onSearch={onSearch}
                value={value}
            />
        </div>
    )
}