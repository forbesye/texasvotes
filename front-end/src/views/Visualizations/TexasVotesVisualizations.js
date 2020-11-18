import React, { useEffect, useState } from "react"
import {
    Bar,
    BarChart,
    PieChart,
    Pie,
    Cell,
    ScatterChart,
    Scatter,
    CartesianGrid,
    Legend,
    XAxis,
    YAxis,
    Tooltip,
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis,
} from "recharts"
import * as d3 from "d3"
import { colorHexMap } from "library/Mappings"
import { getAPI } from "library/APIClient"
import { convertToPercent } from "library/Functions"

const PoliticiansChart = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const parseData = (data) => {
            const output =  data.map((pol) => {
                const { name, fundraising: { raised } , party } = pol
                return { name, raised, party }
            })
            console.log(output)
            return output
        }

        const getData = async () => {
            const params = new URLSearchParams({ page: -1 })
            params.append("office", "us_senate")
            params.append("office", "us_house")
            const politicianData = await getAPI({
                model: "politician",
                params: params
            })
            let { page } = politicianData
            page = page.filter(pol => pol.fundraising)
            setData(parseData(page))
        }
        getData()
    }, [])

    return (
        <div></div>
    )
}

const DistrictsChart = () => {
    const [data, setData] = useState(null)
    const [txData, setTxData] = useState([])
    const [filter, setFilter] = useState("age")

    useEffect(() => {
        const parseData = (data) => {
            const districtDemographics = data.map((e) => {
                const { demographics } = e
                if(!demographics) return
                let output = {}
                
                Object.entries(demographics).forEach(([key, value]) => {
                    const { items, out_of } = value
                    if(key === "age") {
                        let ageDem = items.map((item) => {
                            const {end, start, proportion} = item
                            const dem = {}
                            dem.name = end ? `${start} - ${end}` : `${start}+`
                            dem.value = 
                                convertToPercent(
                                    proportion,
                                    out_of
                                )
                            return dem
                        })
                        output.age = ageDem
                    }
                })
                return output
            })
            return districtDemographics
        }

        const getData = async () => {
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
            setData(parseData(page))
        }
        getData()
    }, [])

    if (!data) 
        return null

    return (
        
        <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={data[0][filter]}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name"/>
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar name="Congressional District 1" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            {/* <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} /> */}
            <Legend />
        </RadarChart>
    )
}

const ElectionsChart = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const parseData = (data) => {
            
            const electionPartyResults = data.filter(e => e.results).map((e) => {
                const { results } = e
                const { vote_counts } = results
                let output = { total: 0 }
                vote_counts.forEach((curr) => {
                    const { party, vote_total } = curr
                    if(output[party]) {
                        output[party] = output[party] + vote_total
                    }
                    else {
                        output[party] = vote_total
                    }
                    output.total += vote_total
                })
                const year = new Date(e.dates.election_day)
                output.name = `${year.getFullYear()} US House ${e.district.number}`
                return output
            }).filter(r => r).sort((a, b) => b.R / b.total - a.R / a.total)
            return electionPartyResults
        }

        const getData = async () => {
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
        }
        getData()
    }, [])

    return (
        <BarChart
          width={1000}
          height={500}
          data={data}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" hide={true}/>
          <YAxis />
          <Tooltip payload={data}/>
          <Legend />
          <Bar dataKey="R" stackId="a" fill={colorHexMap.R} />
          <Bar dataKey="D" stackId="a" fill={colorHexMap.D} />
          <Bar dataKey="L" stackId="a" fill={colorHexMap.L} />
          {/* <Bar dataKey="I" stackId="a" fill={colorHexMap.I} /> */}
        </BarChart>
    )
}

export {
    PoliticiansChart,
    DistrictsChart,
    ElectionsChart
}