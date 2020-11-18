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
import { useHistory } from "react-router-dom"
import BubbleChart from '@weknow/react-bubble-chart-d3'
import { colorHexMap } from "library/Mappings"
import { getAPI } from "library/APIClient"
import { convertToPercent } from "library/Functions"
import Spinner from "components/ui/Spinner"


const PoliticiansChart = () => {
    const [data, setData] = useState([])
    const history = useHistory()
    const [polID] = useState(new Map())
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const parseData = (data) => {
            const output =  data.map((pol) => {
                const { name, fundraising: { raised } , party, id } = pol
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
            console.log(polID)
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
    const [loading, setLoading] = useState(false)

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
        </BarChart>
    )
}

export {
    PoliticiansChart,
    DistrictsChart,
    ElectionsChart
}