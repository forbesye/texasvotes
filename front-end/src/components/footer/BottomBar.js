import React from "react"
import styles from "./BottomBar.module.css"
import { Typography } from "antd"
import { Link } from "react-router-dom"

const { Paragraph } = Typography

const BottomBar = () => {
	return (
		<div className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.footerDataLong}>
					<h1 className={styles.siteName}>Texas Votes</h1>
					<div className={styles.siteText}>
						Search for your representatives, your district, and your
						state and federal elections within the state of Texas!
					</div>
				</div>
				<div className={styles.footerDataShort}>
					<h1 className={styles.modelHeader}>Models</h1>
					<div className={styles.footerLinkContainer}><Link to="/politicians">Politicians</Link></div>
					<div className={styles.footerLinkContainer}><Link to="/districts">Districts</Link></div>
					<div className={styles.footerLinkContainer}><Link to="/elections">Elections</Link></div>
				</div>
				<div className={styles.footerDataShort}>
					<h1 className={styles.otherLinksHeader}>Other Links</h1>
					<div className={styles.footerLinkContainer}><Link to="/">Home</Link></div>
					<div className={styles.footerLinkContainer}><Link to="/about">About</Link></div>
					<div className={styles.footerLinkContainer}><Link to="/voting">Voting FAQ</Link></div>
				</div>
			</div>
			<h3 className={styles.copyrightText}>
				{" "}
				Copyright © 2020 Texas Votes
			</h3>
		</div>
	)
}

export default BottomBar
