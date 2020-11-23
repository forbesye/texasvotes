/*
    This file is for the error page. This page gets displayed when the user tries to access an incorrect path,
    the API returns a 500 error, etc.
*/

import React from "react"
import { Typography } from "antd"
import { Link } from "react-router-dom"

const { Title } = Typography

/**
 * Functional component for error page
 * Appears for 404s and wrong links
 */
export default function ErrorPage() {
	return (
		// Main is box where items are displayed in
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
			{/* Basic text for the error page */}
			<Title level={1}>Oops.</Title> <br />
			<p style={{ fontSize: 28 }}>
				The page you're trying to reach does not exist.
			</p>{" "}
			<br />
			<p style={{ fontSize: 28 }}>
				Go back to <Link to="/">texasvotes.me</Link>
			</p>{" "}
			<br />
			{/* Image of confused user */}
			<img
				style={{ height: "30%", width: "30%" }}
				alt={"Confused"}
				src="https://i.kym-cdn.com/photos/images/original/001/211/814/a1c.jpg"
			/>
		</main>
	)
}
