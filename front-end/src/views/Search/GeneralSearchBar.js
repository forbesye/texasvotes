import React from "react"
import { Typography, Input } from "antd"
import styles from "./Search.module.css"

const { Title, Paragraph } = Typography
const { Search } = Input

// This component is used on both the splash and search pages.
export default function GeneralSearchBar({
	showTitle = true,
	showText = true,
	clear,
	value,
	onSearch,
	onChange,
}) {
	let className = styles.searchContainer
	let props = {
		size: "large",
		enterButton: "Search",
		placeholder: "Enter sitewide search here.",
		onChange: onChange,
		onSearch: onSearch,
		value: value,
	}
	if (clear) {
		className += " " + styles.clearSearchContainer
		props.bordered = false
	}
		
	return (
		<div className={className}>
			{showTitle && <Title level={1}>Sitewide Search</Title> }
			{ showText && (
				<Paragraph>
					Search for a politician, an district, or an election here.
				</Paragraph>
			) }
			<Search {...props} />
		</div>
	)
}
