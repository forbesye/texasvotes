/*
    This file defines a card that displays each developer
    on the About page. Cards have a circular image, name, 
    and description.
*/

import React from "react"
import { Card, Typography } from "antd"
import styles from "./Card.module.css"
import {
	BranchesOutlined,
	ProfileOutlined,
	CheckCircleOutlined,
} from "@ant-design/icons"
const { Meta } = Card

// Icons from Ant Design for Git
const statIcons = {
	commits: BranchesOutlined,
	issues: ProfileOutlined,
	tests: CheckCircleOutlined,
}

// Git icon and number from Git
const GitStat = ({ type, n }) => {
	const Icon = statIcons[type]
	return (
		<div className={styles.gitStat}>
			<div>{type}</div>
			<Icon />
			<div>{n}</div>
		</div>
	)
}

/*
    Card to display for developer description

    Props:
        name (string) - developer's name
        bio (string) - developer's bio
        role (string) - front-end/back-ned
        picture_path (string) - path to developer's image
        commits (int) - number of Git commits
        issues (int) - number of Git issues
        tests (int) - number of Git tests
*/
const DevBio = (props) => {
    
    // Unpack the props
	const { name, bio, role, picture_path, commits, issues, tests } = props

	return (
		<Card
            bordered={true} 
            // Top of card; image of developer
			cover={
				<img
					className={styles.circle_headshot}
					alt={name}
					src={picture_path}
				/>
			}
            className={styles.card}
            // Match height of other components
			bodyStyle={{
				alignItems: "stretch",
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}
		>
            {/* Developer's name */}
			<Typography.Title level={3}>{name}</Typography.Title>
            {/* Developer's role and bio*/}
			<Meta title={role} description={bio} className={styles.meta} />
            {/* Git statistics at bottom of card */}
			<div className={styles.gitStats}>
				<GitStat type="commits" n={commits} />
				<GitStat type="issues" n={issues} />
				<GitStat type="tests" n={tests} />
			</div>
		</Card>
	)
}

export default DevBio
