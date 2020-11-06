/*
    This file defines a the footer displayed on all pages
*/

import React from "react"
import styles from "./BottomBar.module.css"
import { Link } from "react-router-dom"

const BottomBar = () => {
	return (
		<div className={styles.footer}>
			{/* Conatiner with 3 columns */}
			<div className={styles.container}>
				{/* Long column with site name and description */}
				<div className={styles.footerDataLong}>
					<h1 className={styles.siteName}>Texas Votes</h1>
					<div className={styles.siteText}>
						Search for your representatives, your district, and your
						state and federal elections within the state of Texas!
					</div>
				</div>
				{/* Short column with models */}
				<div className={styles.footerDataShort}>
					<h1 className={styles.modelHeader}>Models</h1>
					<div className={styles.footerLinkContainer}>
						<Link to="/politicians">Politicians</Link>
					</div>
					<div className={styles.footerLinkContainer}>
						<Link to="/districts">Districts</Link>
					</div>
					<div className={styles.footerLinkContainer}>
						<Link to="/elections">Elections</Link>
					</div>
				</div>
				{/* Short column with other links */}
				<div className={styles.footerDataShort}>
					<h1 className={styles.otherLinksHeader}>Other Links</h1>
					<div className={styles.footerLinkContainer}>
						<Link to="/">Home</Link>
					</div>
					<div className={styles.footerLinkContainer}>
						<Link to="/about">About</Link>
					</div>
					<div className={styles.footerLinkContainer}>
						<Link to="/voting">Voting FAQ</Link>
					</div>
				</div>
			</div>
			{/* Bottom of footer is copyright of our site */}
			<h3 className={styles.copyrightText}>
				{" "}
				Copyright © 2020 Texas Votes
			</h3>
		</div>
	)
}

export default BottomBar
