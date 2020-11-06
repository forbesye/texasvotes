/*
    This file defines a card that displays the different
    tools used throughout the project
*/

import React from "react"
import { Card, Typography } from "antd"
import styles from "./Card.module.css"

/*
    Card to display logo and name

    Props:
        title (string) - name of tool
        description (string) - description of tool
        img (image) - image component of tool logo
        link (string) - link to tool's site
*/
const ToolCard = (props) => {
	const { title, description, img, link } = props

	return (
		<a href={link}>
			{" "}
			{/* Link to site */}
			<Card
				className={styles.card}
				hoverable={true} // pointer when hovering
				// top of card, image of tool logo
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
				// match heights across the page
				bodyStyle={{
					alignItems: "stretch",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					paddingTop: 0,
				}}
			>
				{/* Tool name */}
				<Typography.Title level={3}>{title}</Typography.Title>
				{/* Tool description */}
				<p>{description}</p>
			</Card>
		</a>
	)
}

export default ToolCard
