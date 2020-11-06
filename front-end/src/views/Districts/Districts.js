import React, { useState, useEffect } from "react"
import { Typography, Tabs } from "antd"
import { Route, useLocation, useHistory, Switch } from "react-router-dom"
import styles from "./Districts.module.css"
import ListView from "./ListView"
import SearchView from "./SearchView"
import Details from "./Details"
const { TabPane } = Tabs

/**
 * Functional component for District page
 */
const Districts = () => {
	const [currKey, setCurrKey] = useState("search")
	const history = useHistory()
	const location = useLocation()
	const handleChange = (key) => {
		history.push(`/districts/${key}`)
		setCurrKey(key)
	}

	/**
	 * Splits page into view and search
	 */
	useEffect(() => {
		const path = location.pathname
		const splitted = path.split("/").filter((el) => el !== "")
		splitted.shift()
		const initialKey = splitted.shift()
		setCurrKey(initialKey)
	}, [location.pathname])

	return (
		<main className={styles.wrapper}>
			<header className={styles.header}>
				<Typography.Title level={1}>Texas Districts</Typography.Title>
			</header>
			<div>
				<Tabs activeKey={currKey} onChange={handleChange}>
					{/* Routes between view and search tabs, renders different
					components for both */}
					<TabPane tab="Search" key="search">
						<Route path="/districts/search">
							<SearchView />
						</Route>
					</TabPane>
					<TabPane tab="View All" key="view">
						<Switch>
							<Route exact path="/districts/view">
								<ListView />
							</Route>
							<Route path="/districts/view/:id">
								<Details />
							</Route>
						</Switch>
					</TabPane>
				</Tabs>
			</div>
		</main>
	)
}

export default Districts
