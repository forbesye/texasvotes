import React, { useEffect, useState } from "react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    XAxis,
    YAxis,
    Tooltip,
    Radar, 
    RadarChart, 
    PolarGrid,
    PolarAngleAxis, 
    PolarRadiusAxis,
    Label
} from "recharts"
import { Typography } from "antd"
import { useHistory } from "react-router-dom"
import BubbleChart from '@weknow/react-bubble-chart-d3'
import { colorHexMap } from "library/Mappings"
import { getAPI } from "library/APIClient"
import Spinner from "components/ui/Spinner"
import { VisFilter } from "components/filters/Filters"
import { formatAsMoney } from "library/Functions"
import styles from "./Visualizations.module.css"

const { Title } = Typography

const PoliticiansChart = () => {
    const [data, setData] = useState([])
    const history = useHistory()
    const [polID] = useState(new Map())
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const parseData = (data) => {
            const output = data.map((pol) => {
                const { name, fundraising: { raised } , party } = pol
                return { label: name, value: raised, color: colorHexMap[party]}
            })
            return output
        }
        const getData = async () => {
            setLoading(true)
            const params = new URLSearchParams({ page: -1 })
            params.append("office", "us_senate")
            params.append("office", "us_house")
            const politicianData = await getAPI({
                model: "politician",
                params: params
            })
            let { page } = politicianData
            page = page.filter(pol => pol.fundraising)
            page.forEach((pol) => {polID.set(pol.name, pol.id)})
            setData(parseData(page))
            setLoading(false)
        }
        getData()
    }, [polID])

    if(loading) {
        return (
            <Spinner />
        )
    }

    return (
        <>
            <Title level={3}>
                Politician Fundraising
            </Title>
            <div className={styles.chart}>
                <BubbleChart 
                    graph= {{
                        zoom: 0.7,
                        offsetX: 0.10,
                        offsetY: 0.0,
                    }}
                    showLegend={false}
                    width={1000}
                    height={800}
                    valueFont={{
                        family: 'Arial',
                        size: 12,
                        color: '#fff',
                        weight: 'bold',
                    }}
                    labelFont={{
                        family: 'Arial',
                        size: 16,
                        color: '#fff',
                        weight: 'bold',
                    }}
                    data={data}
                    bubbleClickFun={(val) => {history.push(`/politicians/view/${polID.get(val)}`)}}
                />
            </div>
        </>
        
    )
}

const DistrictsChart = () => {
    const [data, setData] = useState(null)
    const [filter, setFilter] = useState("age")
    const [district, setDistrict] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const parseData = (data, texasData) => {
            const texasDemographics = {}
            
            Object.entries(texasData.demographics).forEach(([key, value]) => {
                if(key === "age"  || key === "income" || key === "race") {
                    const { items } = value
                    const dem = items.map((item) => item.proportion)
                    texasDemographics[key] = dem
                } else if (key === "education") {
                    ["attainment", "enrollment"].forEach((e) => {
                        const { items } = value[e]
                        const dem = items.map((item) => item.proportion)
                        texasDemographics[e] = dem
                    })
                }
            })

            const districtDemographics = data.map((e) => {
                const { demographics } = e
                if(!demographics) return
                let output = {}
                
                Object.entries(demographics).forEach(([key, value]) => {
                    const { items } = value
                    if (key === "education") {
                        ["attainment", "enrollment"].forEach((e) => {
                            const { items } = value[e]
                            let educationDem = items.map((item, index) => {
                                const {level, proportion} = item
                                const dem = {}
                                dem.name = level
                                dem.value = proportion
                                dem.texasVal = texasDemographics[e][index]
    
                                return dem
                            })
                            
                            if (e === "attainment") {
                                output.education_attainment = educationDem
                            }
                            else if (e === "enrollment") {
                                output.education_enrollment = educationDem
                            }
                        })
                    }
                    else if (key === "age") {
                        let ageDem = items.map((item, index) => {
                            const {end, start, proportion} = item
                            const dem = {}
                            dem.name = end ? `${start} - ${end}` : `${start}+`
                            dem.value = proportion
                            dem.texasVal = texasDemographics[key][index]

                            return dem
                        })
                        output.age = ageDem
                    }
                    else if (key === "race") {
                        let raceDem = items.map((item, index) => {
                            const {race, proportion} = item
                            const dem = {}
                            dem.name = race
                            dem.value = proportion
                            dem.texasVal = texasDemographics[key][index]

                            return dem
                        })
                        output.race = raceDem
                    }
                    else if (key === "income") {
                        let incomeDem = items.map((item, index) => {
                            const {end, start, proportion} = item
                            const dem = {}
                            dem.name = (end) ? `${formatAsMoney(start)} - ${formatAsMoney(end)}` : `${formatAsMoney(start)}+`
                            dem.value = proportion
                            dem.texasVal = texasDemographics[key][index]

                            return dem
                        })
                        output.income = incomeDem
                    }
                })
                return output
            })
            return districtDemographics
        }

        const getData = async () => {
            setLoading(true)
            let districtData = await getAPI({
                model: "district",
                params: new URLSearchParams({
                    office: "us_house",
                })
            })

            let texasData = await getAPI({
                model: "district",
                path: 218
            })
            
            const { page } = districtData
            setData(parseData(page, texasData))
            setLoading(false)
        }
        getData()
    }, [])

    if(loading || !data) {
        return (
            <Spinner />
        )
    }

    return (
        <>
            <Title level={3}>
                Demographics of Congressional Districts
            </Title>
            <div className={styles.filters}>
                <VisFilter
			    	name={"district"}
			    	value={district}
			    	hook={[district, setDistrict]}
			    />
                <VisFilter
			    	name={"demographics"}
			    	value={filter}
			    	hook={[filter, setFilter]}
			    />
            </div>
			
            <div className={styles.chart}>
                <RadarChart outerRadius={150} width={1000} height={500} data={data[district][filter]}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name"/>
                    <PolarRadiusAxis angle={30}/>
                    <Radar name="Texas" dataKey="texasVal" stroke="#8884d8" fill="#8884d8" fillOpacity={0.8} />
                    <Radar name="Congressional District" dataKey="value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                    <Legend verticalAlign="top" />
                </RadarChart>
            </div>
            
        </>
    )
}

const ElectionsChart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    useEffect(() => {
        const parseData = (data) => {
            const electionPartyResults = data.filter(e => e.results).map((e) => {
                const { results, id } = e
                const { vote_counts } = results
                let output = { total: 0, "R": 0, "D": 0, "L": 0, id }
                vote_counts.forEach((curr) => {
                    const { party, vote_total } = curr
                    if(output[party] !== undefined) {
                        output[party] = output[party] + vote_total
                    }
                    output.total += vote_total
                })
                const year = new Date(e.dates.election_day)
                output.name = `${year.getFullYear()} General US House ${e.district.number}`
                return output
            }).filter(r => r).sort((a, b) => b.R / b.total - a.R / a.total)
            return electionPartyResults
        }

        const getData = async () => {
            setLoading(true)
            let electionData = await getAPI({
                model: "election",
                params: new URLSearchParams({
                    office: "us_house",
                    page: -1,
                    type: "general",
                })
            })
            const { page } = electionData
            setData(parseData(page))
            setLoading(false)
        }
        getData()
    }, [])

    if(loading) {
        return (
            <Spinner />
        )
    }

    return (
        <>
            <Title level={3}>
                Election Results
            </Title>
            <div className={styles.chart}>
                <BarChart
                    width={1000}
                    height={500}
                    data={data}
                    margin={{
                      top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={false}>
                        <Label value='Election' position='insideBottom' style={{textAnchor: 'middle'}} />
                    </XAxis>
                    <YAxis>
                        <Label angle={-90} value='Number of Votes' position='insideLeft' style={{textAnchor: 'middle'}} />
                    </YAxis>
                    <Tooltip payload={data}/>
                    <Legend verticalAlign="top" />
                    <Bar dataKey="R" stackId="a" fill={colorHexMap.R} />
                    <Bar dataKey="D" stackId="a" fill={colorHexMap.D} />
                    <Bar dataKey="L" stackId="a" fill={colorHexMap.L} />
                </BarChart>
            </div>
        </>
    )
}

export {
    PoliticiansChart,
    DistrictsChart,
    ElectionsChart
}