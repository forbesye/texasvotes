import React from "react"
import { Card, Typography } from "antd"
import {
	BranchesOutlined,
	ProfileOutlined,
	CheckCircleOutlined,
	QuestionOutlined,
} from "@ant-design/icons"
import styles from "./Card.module.css"

const RepoCard = (props) => {
	const { type, number } = props
	const iconStyle = {
		fontSize: "3em",
		margin: 16,
	}

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
