/*
    This file defines the basic structure of our React app.
*/

import React from "react"
import Navbar from "components/navbar/Navbar.js"
import BottomBar from "components/footer/BottomBar.js"
import { Switch, Route } from "react-router-dom"
import routes from "./Routes"
import { Layout } from "antd"
import "./App.css"
import ErrorPage from "./views/Error/ErrorPage"

const { Header, Footer, Content } = Layout // Ant Design Layout for structure

const App = () => {
	return (
		<React.Fragment>
			<Layout className="layout">
				{/* Navbar */}
				<Header className="nav">
					<Navbar />
				</Header>
				<Content
					style={{
						minHeight: "90vh",
					}}
				>
					{/* Define routes for router, initial route is Splash */}
					<Switch>
						{routes.map(({ exact, path, Component }) => {
							return (
								<Route
									exact={exact}
									path={path}
									key={path}
									component={Component}
								/>
							)
						})}
						<Route title={"Not found"} component={ErrorPage} />
					</Switch>
				</Content>
				{/* Footer */}
				<Footer className="footer" style={{ padding: "0px" }}>
					<BottomBar />
				</Footer>
			</Layout>
		</React.Fragment>
	)
}

export default App
