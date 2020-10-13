import React, { Component } from 'react'
import Chart from "chart.js";
import { numberStringWithCommas } from "library/Functions"

export default class PieChart extends Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
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
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                    }
                ]
            },
            options: {
                tooltips: {
                    callbacks: {
                      label: function(tooltipItem, data) {
                          var dataset = data.datasets[tooltipItem.datasetIndex];
                        var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                          return previousValue + currentValue;
                        });
                        var currentValue = dataset.data[tooltipItem.index];
                        var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
                        return numberStringWithCommas(currentValue) + " (" + percentage + "%)";
                      }
                    }
                  }
            }
        });
    }

    render() {
        return (
            <div>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}