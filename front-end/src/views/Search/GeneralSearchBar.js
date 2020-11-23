import React, { useState, useEffect } from "react"
import { AutoComplete, Typography, Input } from "antd"
import axios from "axios"
import styles from "./Search.module.css"

const { Search } = Input

// This component is used on both the splash and search pages.
export default function GeneralSearchBar({
	autoComplete,
	autoCompleteOptions,
	clear,
	value,
	placeholder,
	onSearch,
	onChange,
	onOptionSelect,
}) {
	const onSearchChange = (e) => {
		onChange(e.target.value)
	}

	let className = styles.searchContainer
	let props = {
		size: "large",
		enterButton: "Search",
		placeholder: placeholder || "Enter sitewide search here.",
		onChange:  onSearchChange,
		onSearch: onSearch,
		value: value,
	}
	if (clear) {
		className += " " + styles.clearSearchContainer
		props.bordered = false
	}

	if (autoComplete) {
		return (
			<div className={className}>
				<AutoComplete
					onSelect={onOptionSelect}
					options={autoCompleteOptions}
					style={{ width: "100%" }}
				>
					<Search {...props} />
				</AutoComplete>
			</div>
		)
	} else {
		return (
			<div className={className}>
				<Search {...props} />
			</div>
		)
	}
}

const ADDRESS_SEARCH_ENDPOINT = "https://autosuggest.search.hereapi.com/v1/autosuggest"

export function AddressSearchBar ({ onChange, ...props }) {
	const [ results, setResults ] = useState([])

	const onSearchChange = async (text) => {
		let searchResults = []
		if (text) {
			const results = await axios.get(ADDRESS_SEARCH_ENDPOINT, {
				params: {
					apiKey: process.env.REACT_APP_HERE_KEY,
					q: text,
					in: "bbox:-106.835951,26.297369,-93.113504,36.478712",
					limit: 10
				}
			})
			if (results.status === 200) {
				searchResults = results.data.items.map(({ title }) => {
					return { label: title, value: title }
				})
			}
		}
		setResults(searchResults)
		onChange(text)
	}

	return (
		<GeneralSearchBar 
			{...props}
			autoComplete
			onChange={onSearchChange}
			autoCompleteOptions={results}
		/>
	)
}