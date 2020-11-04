/*
    This file defines a card that displays our Git
    repository statistics on the About page.
*/

import React from "react"
import { Card, Typography } from "antd"
import {
	BranchesOutlined,
	ProfileOutlined,
	CheckCircleOutlined,
	QuestionOutlined,
} from "@ant-design/icons"
import styles from "./Card.module.css"

/*
    Card to display for Git statistics

    Props:
        type (string) - commits, issues, or tests
        number (int) - number of the type
*/
const RepoCard = (props) => {
	const { type, number } = props
	const iconStyle = {
		fontSize: "3em",
		margin: 16,
	}

    // Assign icon to the specified Git statistic
	let icon
	switch (type) {
		case "commits":
			icon = <BranchesOutlined style={iconStyle} />
			break
		case "issues":
			icon = <ProfileOutlined style={iconStyle} />
			break
		case "tests":
			icon = <CheckCircleOutlined style={iconStyle} />
			break
		default:
			icon = <QuestionOutlined style={iconStyle} />
	}

    // Card to display Git statistic with icon
	return (
		<Card className={styles.card}>
			{icon}
			<br />
			<Typography.Title level={3}>
				{`Total ${type}: ${number}`}
			</Typography.Title>
		</Card>
	)
}

export default RepoCard
