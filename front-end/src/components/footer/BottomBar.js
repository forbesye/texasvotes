import React from "react"
import styles from "./BottomBar.module.css"
import { Row, Col } from "antd"
import { Link } from "react-router-dom"

const BottomBar = () => {
	return (
		<div className={styles.footer}>
			<Row className={styles.container}>
				<Col span={11} className={styles.footerData}>
					<h1 className={styles.siteName}>Texas Votes</h1> <br />
					<div className={styles.siteText}>
						Search for your representatives, your district, and your
						state and federal elections within the state of Texas!
					</div>
				</Col>
				<Col span={5} className={styles.footerData}>
					<h1 className={styles.modelHeader}>Models</h1>
					<Link to="/politicians">Politicians</Link> <br />
					<Link to="/districts">Districts</Link> <br />
					<Link to="/elections">Elections</Link> <br />
				</Col>
				<Col span={5} className={styles.footerData}>
					<h1 className={styles.otherLinksHeader}>Other Links</h1>
					<Link to="/">Home</Link> <br />
					<Link to="/about">About</Link> <br />
					<Link to="/voting">Voting FAQ</Link> <br />
				</Col>
			</Row>
			<h3 className={styles.copyrightText}>
				{" "}
				Copyright © 2020 Texas Votes
			</h3>
		</div>
	)
}

export default BottomBar
