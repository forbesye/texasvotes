import React from "react"
import { Timeline, Typography } from "antd"
import { ClockCircleOutlined } from "@ant-design/icons"
import { election_date_mappings } from "library/Mappings"
import { monthDayYearParse } from "library/Functions"

const { Text } = Typography

const ElectionTimeline = ({ dates }) => {
	const electionDate = ["early_start", "early_end", "election_day"]
	const todayDate = new Date()
	var beforeToday = true

	return (
		<Timeline
			mode={"left"}
			style={{
				paddingTop: "20px",
				width: "95%",
				margin: "auto",
				fontSize: 18,
			}}
		>
			{electionDate.map((key) => {
				var curDate = new Date(dates[key])
				if (!beforeToday) {
					return (
						<Timeline.Item
							key={key}
							label={
								<Text strong>
									{election_date_mappings[key]}
								</Text>
							}
							color="green"
						>
							{monthDayYearParse(dates[key])}
						</Timeline.Item>
					)
				} else if (curDate > todayDate) {
					beforeToday = false
					return (
						<div>
							<Timeline.Item
								key={todayDate}
								label={<Text strong>Today</Text>}
							>
								<Text>{monthDayYearParse(todayDate)}</Text>
							</Timeline.Item>

							<Timeline.Item
								key={key}
								dot={
									<ClockCircleOutlined
										style={{ fontSize: "16px" }}
									/>
								}
								label={
									<Text strong>
										{election_date_mappings[key]}
									</Text>
								}
								color="red"
							>
								<Text>{monthDayYearParse(dates[key])}</Text>
							</Timeline.Item>
						</div>
					)
				} else {
					return (
						<Timeline.Item
							key={key}
							label={
								<Text strong>
									{election_date_mappings[key]}
								</Text>
							}
							color="gray"
						>
							<Text>{monthDayYearParse(dates[key])}</Text>
						</Timeline.Item>
					)
				}
			})}
			{beforeToday ? (
				<Timeline.Item>
					<Text strong>Today </Text>
					<Text>{monthDayYearParse(todayDate)}</Text>
				</Timeline.Item>
			) : null}
		</Timeline>
	)
}

export default ElectionTimeline
