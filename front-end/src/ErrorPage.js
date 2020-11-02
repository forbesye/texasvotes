import React from "react"
import { Typography } from "antd"
import { Link } from "react-router-dom"

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
import confusion from "components/images/confusion.svg"

const { Title, Paragraph } = Typography

export default function ErrorPage() {
	return (
		<main
			style={{
				margin: "32px auto",
				width: "90%",
				maxWidth: 1600,
				padding: "32px 16px",
				background: "#ffffff",
				borderRadius: 4,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Title level={1}>Oops.</Title> <br />
			<p style={{ fontSize: 28 }}>
				The page you're trying to reach does not exit.
			</p>{" "}
			<br />
			<p style={{ fontSize: 28 }}>
				Go back to <Link to="/">texasvotes.me</Link>
			</p>{" "}
			<br />
			<img
				style={{ height: "30%", width: "30%" }}
				alt={"Confused"}
				src={confusion}
			/>
		</main>
	)
}
