import React, { useState, useEffect } from "react"
import { Typography, Tabs } from "antd"
import { Route, useLocation, useHistory, Switch } from "react-router-dom"
import styles from "./Elections.module.css"
import ListView from "./ListView"
import SearchView from "./SearchView" // Do we need seperate ones?
import Details from "./Details"
const { TabPane } = Tabs

const Elections = () => {
    const [currKey, setCurrKey] = useState("search")
    const history = useHistory()
    const location = useLocation()
    const handleChange = (key) => {
        history.push(`/elections/${key}`)
        setCurrKey(key)
    }
    useEffect(() => {
        const path = location.pathname
        const splitted = path.split("/").filter(el => el !== "")
        splitted.shift()
        const initialKey = splitted.shift()
        setCurrKey(initialKey)
    }, [location.pathname])

    return (
        <main className={styles.wrapper}>
            <header className={styles.header}>
                <Typography.Title level={1}>Texas Elections</Typography.Title>
            </header>
            <div>
                <Tabs activeKey={currKey} onChange={handleChange}>
                    <TabPane tab="Search" key="search">
                        <Route path="/elections/search">
                            <SearchView />
                        </Route>
                    </TabPane>
                    <TabPane tab="View All" key="view">
                        <Switch>
                            <Route exact path="/elections/view">
                                <ListView />
                            </Route>
                            <Route path="/elections/view/:id">
                                <Details />
                            </Route>
                        </Switch>
                    </TabPane>
                </Tabs>
            </div>
        </main>
    )
}

export default Elections