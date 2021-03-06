import React, { useState, useEffect } from "react"
import { Route, Switch, useLocation, useHistory } from "react-router-dom"
import { Typography, Tabs } from "antd"
import SearchView from "./SearchView"
import GridView from "./GridView"
import Details from "./Details"
import styles from "./Politicians.module.css"

const { TabPane } = Tabs

/**
 * Functional component for Politicians page
 */
export default function Politicians() {
	const [currKey, setCurrKey] = useState("search")
	const history = useHistory()
	const location = useLocation()
	const handleChange = (key) => {
		history.push(`/politicians/${key}`)
		setCurrKey(key)
	}
	useEffect(() => {
		const path = location.pathname
		const parts = path.split("/").filter((el) => el !== "")
		parts.shift()
		setCurrKey(parts.shift())
	}, [location.pathname])

	return (
		<main className={styles.wrapper}>
			<header className={styles.header}>
				<Typography.Title level={1}>Texas Politicians</Typography.Title>
			</header>
			{/* Split view between grid and search */}
			<div>
				<Tabs activeKey={currKey} onChange={handleChange}>
					<TabPane tab="Search" key="search">
						<Route path="/politicians/search">
							<SearchView />
						</Route>
					</TabPane>
					<TabPane tab="View All" key="view">
						<Switch>
							<Route exact path="/politicians/view">
								<GridView />
							</Route>
							<Route path="/politicians/view/:id">
								<Details />
							</Route>
						</Switch>
					</TabPane>
				</Tabs>
			</div>
		</main>
	)
}
