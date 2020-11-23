/*
    This file defines routes for each of the pages.
*/
import React from "react"

import Splash from "./views/Splash/Splash"
import About from "./views/About/About"
import Politicians from "./views/Politicians/Politicians"
import Districts from "./views/Districts/Districts"
import Elections from "./views/Elections/Elections"
import VoterFAQ from "./views/VoterFAQ/VoterFAQ"
import Search from "./views/Search/Search"
import Visualizations from "views/Visualizations/Visualizations"
import ErrorPage from "./views/Error/ErrorPage"

/*
    Routes are defined as so:
        title (string): name of page
        path (string): path to display in URL and route to
        Component (React component): React component that will be displayed
            for this page
    
    Optional:
        exact (bool): path needs to match exactly
        displayOnNavbar (bool): display this component on the navigation bar
*/
const Routes = [
	{
		title: "Home",
		path: "/",
		exact: true,
		Component: Splash,
		displayOnNavbar: true,
	},
	{
		title: "About",
		path: "/about",
		Component: About,
		displayOnNavbar: true,
	},
	{
		title: "Politicians",
		path: "/politicians",
		linkPath: "/politicians/view",
		Component: Politicians,
		displayOnNavbar: true,
	},
	{
		title: "Districts",
		path: "/districts",
		linkPath: "/districts/view",
		Component: Districts,
		displayOnNavbar: true,
	},
	{
		title: "Elections",
		path: "/elections",
		linkPath: "/elections/view",
		Component: Elections,
		displayOnNavbar: true,
	},
	{
		title: "Visualizations",
		path: "/visualizations",
		Component: Visualizations,
		displayOnNavbar: true,
	},
	{
		title: "Voting FAQ",
		path: "/voting",
		Component: VoterFAQ,
		displayOnNavbar: true,
	},
	{
		title: "Search",
		path: "/search",
		exact: true,
		Component: Search,
		displayOnNavbar: true,
	},
	{
		title: "Search By Address",
		path: "/search/address",
		Component: () => <Search byAddress={true} />,
	},
	{
		title: "Error",
		path: "/error",
		Component: ErrorPage,
	},
]

export default Routes
