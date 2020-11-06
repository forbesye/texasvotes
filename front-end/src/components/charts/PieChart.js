/*
    This file defines a Pie chart for use in the District
    Details page. This chart is adapted from chart.js
*/

import React, { Component } from "react"
import Chart from "chart.js"
import { numberStringWithCommas } from "library/Functions"

export default class PieChart extends Component {
	chartRef = React.createRef()

	componentDidMount() {
		const myChartRef = this.chartRef.current.getContext("2d")

		new Chart(myChartRef, {
			type: "pie",
			data: {
				// Labels for each data point
				labels: this.props.labels,
				// Data and their corresponding colors
				datasets: [
					{
						label: "Pie Chart",
						data: this.props.data,
						// Current maximum number of colors to display is 13
						backgroundColor: [
							"#0B3C49",
							"#EB5E55",
							"#BCD8C1",
							"#E3D985",
							"#E57A44",
							"#422040",
							"#D6DBB2",
							"#504136",
							"#22577A",
							"#C9B1BD",
							"#B49594",
							"#567568",
							"#9D75CB",
						],
					},
				],
			},
			options: {
				tooltips: {
					callbacks: {
						// When hovering, display number and percentage
						label: function (tooltipItem, data) {
							// Numbers from dataset
							var dataset =
								data.datasets[tooltipItem.datasetIndex]
							// Total count in data
							var total = dataset.data.reduce(function (
								previousValue,
								currentValue
							) {
								return previousValue + currentValue
							})
							var currentValue = dataset.data[tooltipItem.index]
							// Calculate percentage - add 0.5 for accurate rounding
							var percentage = Math.floor(
								(currentValue / total) * 100 + 0.5
							)
							// Display when hovering : number (percent%)
							return (
								numberStringWithCommas(currentValue) +
								" (" +
								percentage +
								"%)"
							)
						},
					},
				},
			},
		})
	}

	// Component under which Chart is displayed. Linked through ref.
	render() {
		return (
			<div>
				<canvas
					id="myChart"
					ref={this.chartRef}
					style={this.props.style}
				/>
			</div>
		)
	}
}
