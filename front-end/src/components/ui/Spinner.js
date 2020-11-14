import React from "react"
import { Spin } from "antd"

const messages = [
	"Rip blue wave :(",
	"Waiting for Ken Paxton to stand trial for securities fraud",
	"Listening to Dennis Bonnen lose his job as Speaker of the House",
	"The Joe-mentum came guys",
	'"Kraka-Joe-a"',
	"Waiting for Greg Abbott to terrorize liberal cities once more",
	"Waiting for Dan Patrick to say something stupid again",
	"Attempting to court the Hispanic vote",
	"Looking for Beto O'Rourke stumping on some tables",
	"Trying to stop Ted Cruz from reading 'Green Eggs and Ham' on the Senate Floor",
	"Searching for the Zodiac Killer",
	"Stalling the USPS",
	"Brushing off cheeto dust",
	"STOPPING THE COUNT",
	"Searching for widespread voter fraud",
	"Standing back and standing by",
	"Sending in the poll watchers",
	"Undermining the democratic transfer of power",
	"Looking for Ted Cruz's spine",
	"Starting frivolous lawsuits",
	"Simping for Nate Silver",
	"Dumping copious amounts of money into Georgia",
]

const styles = {
	margin: "auto",
	display: "block",
}

/**
 * Returns an Ant Design spinner component with a randomized loading message
 */
export default function Spinner() {
	const message =
		messages[Math.floor(Math.random() * messages.length)] + "..."
	return <Spin style={styles} tip={message} size="large" />
}
