import React from 'react'
import { Link } from "react-router-dom"
import { Typography, Card } from "antd"
import { colorHexMap } from "library/Mappings"
import { description } from "views/Politicians/Lib"
import styles from "views/Politicians/Politicians.module.css"

const { Text } = Typography
const { Meta } = Card

/**
 * Functional component card for politician info
 * @param {Politician} data politician data
 */
const PoliticianCard = ({ data }) => {
	const { id, name, image, party, district, current, incumbent, running_for } = data
	const { number } = district
    return (
        <Link key={id} to={`/politicians/view/${id}`}>
			<Card
				hoverable
				style={{
					height: "100%"
				}}
				cover={
					<img
						className={styles.croppedImage}
						alt={name}
						src={image}
					/>
				}
			>
				<div
					className={styles.circle}
					style={{
						background: colorHexMap[party],
					}}
				>
					{party}
				</div>
				<Meta
					title={
						<Text style={{ fontSize: 20 }}>
							{name}
						</Text>
					}
					description={
						<Text style={{ fontSize: 18 }}>
							{description(number, current, running_for, incumbent)}{" "}
						</Text>
					}
				/>
			</Card>
		</Link>
	)
}

export default PoliticianCard