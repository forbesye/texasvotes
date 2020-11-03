import React from "react"
import { Card, Typography } from "antd"
import styles from "./Card.module.css"

const ToolCard = (props) => {
	const { title, description, img, link } = props

	return (
		<a href={link}>
			<Card
				className={styles.card}
				hoverable={true}
				cover={
					<div className={styles.cardCover}>
						<img
							className={styles.tool_image}
							alt={title}
							src={img}
							width="85%"
							margin="16px"
						/>
					</div>
				}
				bodyStyle={{
					alignItems: "stretch",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					paddingTop: 0,
				}}
			>
				<Typography.Title level={3}>{title}</Typography.Title>
				<p>{description}</p>
			</Card>
		</a>
	)
}

export default ToolCard
