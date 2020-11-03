import React from "react"
import Navbar from "components/navbar/Navbar.js"
import BottomBar from "components/footer/BottomBar.js"
import { Switch, Route } from "react-router-dom"
import routes from "./Routes"
import { Layout } from "antd"
import "./App.css"
import ErrorPage from "./ErrorPage"

const { Header, Footer, Content } = Layout

const App = () => {
	return (
		<React.Fragment>
			<Layout className="layout">
				<Header className="nav">
					<Navbar />
				</Header>
				<Content>
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
						<Route
							title={"Error"}
							path={"/error"}
							key={"Error"}
							component={ErrorPage}
						/>
						<Route title={"Not found"} component={ErrorPage} />
					</Switch>
				</Content>
				<Footer className="footer" style={{ padding: "0px" }}>
					<BottomBar />
				</Footer>
			</Layout>
		</React.Fragment>
	)
}

export default App
