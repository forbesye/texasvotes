import React, { useState, useEffect, Fragment } from "react"
import { Typography, Input, Divider } from "antd"
import styles from "./Politicians.module.css"

const { Search } = Input

export default function SearchView (props) {
    const handleSearch = (value, event) => {
        console.log(value, event)
    }
    return (
        <Fragment>
            <section className={styles.content}>
                <Typography.Title level={3}>Search</Typography.Title>
                <Typography.Paragraph>Search our database for a Texas elected official or political challenger. </Typography.Paragraph>
                <Search size="large" loading={false} onSearch={handleSearch}></Search>
            </section>
            <Divider />
        </Fragment>
    )
}