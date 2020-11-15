import React from "react"
import { Typography } from "antd"

const { Title, Paragraph, Link } = Typography

const Visualizations = () => {
    return (
        <main
			style={{
				margin: "32px auto",
				width: "90%",
				maxWidth: 800,
				padding: "32px 16px",
				background: "#ffffff",
				borderRadius: 4,
			}}
		>
            <Title level={1}>Visualizations</Title>
        </main>
    )
}

export default Visualizations
