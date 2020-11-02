import React, { Fragment } from "react"
import { Typography, Input, Divider } from "antd"
import styles from "./Districts.module.css"

const { Search } = Input

export default function SearchView(props) {
	const handleSearch = (value, event) => {
		console.log(value, event)
	}

	return (
		<Fragment>
			<section className={styles.content}>
				<Typography.Title level={3}>Search</Typography.Title>
				<Typography.Paragraph>
					Search our database for a Texas district.{" "}
				</Typography.Paragraph>
				<Search
					size="large"
					loading={false}
					onSearch={handleSearch}
				></Search>
			</section>
			<Divider />
		</Fragment>
	)
}
