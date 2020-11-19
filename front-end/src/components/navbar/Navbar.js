/*
    This file defines a the navbar displayed on all pages
*/

import React, { useState } from "react"
import { Drawer, Button } from "antd"
import Icon, { MenuOutlined } from "@ant-design/icons"
import NavContent from "./NavContent"
import TexasVotesLogo from "./TexasVotesLogo.png"
import { Link, useLocation } from "react-router-dom"
import styles from "./Navbar.module.css"

const Navbar = () => {
	const [open, setOpen] = useState(false) // for hamburger menu on mobile
	const location = useLocation()
	return (
		<nav className={styles.nav}>
			{/* Site logo that links to home page */}
			<Link to="/" className={styles.leftNav}>
				<img
					src={TexasVotesLogo}
					alt="Texas Votes Logo"
					className={styles.logo}
				/>
			</Link>
			{/* Main links to different pages  */}
			<div className={styles.centerNav}>
				<NavContent noBackground={location.pathname === "/"} />
			</div>
			{/* Hamburger menu button for mobile */}
			<div className={styles.rightNav}>
				<Button
					className={styles.hamburger}
					type="primary"
					onClick={() => setOpen(true)}
				>
					<Icon component={MenuOutlined} />
				</Button>
			</div>
			{/* Links within hamburger menu for mobile */}
			<Drawer
				placement="right"
				closable={false}
				onClose={() => setOpen(false)}
				onClick={() => setOpen(false)}
				visible={open}
				headerStyle={{
					padding: 12,
					height: 12,
					width: 12,
					background: "pink",
				}}
				bodyStyle={{ padding: 0 }}
			>
				<NavContent
					orientation="vertical"
					noBackground={location.pathname === "/"}
				/>
			</Drawer>
		</nav>
	)
}

export default Navbar
