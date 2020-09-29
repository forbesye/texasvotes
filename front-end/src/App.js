import React from 'react'
import Navbar from "components/navbar/Navbar.js"
import {Switch, Route} from "react-router-dom"
import routes from "./Routes"
import { Layout } from 'antd'
import './App.css'

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
  	  	  	  	  	  	{
  	  	  	  	  	  	  	routes.map(({ exact, path, Component }) => {
  	  	  	  	  	  	  	  	return (
  	  	  	  	  	  	  	  	  	<Route 
										exact={exact}
										path={path}
										component={Component}
  	  	  	  	  	  	  	  	  	/>
  	  	  	  	  	  	  	  	)
  	  	  	  	  	  	  	})
  	  	  	  	  	  	}
  	  	  	  	  	</Switch>
  	  	  	  	</Content>
  	  	  	  	<Footer>
					Copyright 2020 - Texas Votes
  	  	  	  	</Footer>
  	  	  	</Layout>
  	  	</React.Fragment>
  	)
}

export default App
