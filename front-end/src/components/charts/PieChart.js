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
				//Bring in data
				labels: this.props.labels,
				datasets: [
					{
						label: "Pie Chart",
						data: this.props.data,
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
						label: function (tooltipItem, data) {
							var dataset =
								data.datasets[tooltipItem.datasetIndex]
							var total = dataset.data.reduce(function (
								previousValue,
								currentValue,
								currentIndex,
								array
							) {
								return previousValue + currentValue
							})
							var currentValue = dataset.data[tooltipItem.index]
							var percentage = Math.floor(
								(currentValue / total) * 100 + 0.5
							)
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

	render() {
		return (
			<div>
				<canvas id="myChart" ref={this.chartRef} />
			</div>
		)
	}
}
