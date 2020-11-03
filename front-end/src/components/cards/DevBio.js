import React from "react"
import { Card, Typography } from "antd"
import styles from "./Card.module.css"
import {
	BranchesOutlined,
	ProfileOutlined,
	CheckCircleOutlined,
} from "@ant-design/icons"
const { Meta } = Card

const statIcons = {
	commits: BranchesOutlined,
	issues: ProfileOutlined,
	tests: CheckCircleOutlined,
}
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

const DevBio = (props) => {
	const { name, bio, role, picture_path, commits, issues, tests } = props

	return (
		<Card
			bordered={true}
			cover={
				<img
					className={styles.circle_headshot}
					alt={name}
					src={picture_path}
				/>
			}
			className={styles.card}
			bodyStyle={{
				alignItems: "stretch",
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Typography.Title level={3}>{name}</Typography.Title>
			<Meta title={role} description={bio} className={styles.meta} />
			<div className={styles.gitStats}>
				<GitStat type="commits" n={commits} />
				<GitStat type="issues" n={issues} />
				<GitStat type="tests" n={tests} />
			</div>
		</Card>
	)
}

export default DevBio
