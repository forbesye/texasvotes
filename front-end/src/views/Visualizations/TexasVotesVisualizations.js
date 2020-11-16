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
} from "recharts"
import { colorHexMap } from "library/Mappings"
import { getAPI } from "library/APIClient"

const PoliticiansChart = () => {
    // const [data, setData] = useState([])

    // useEffect(() => {
    //     const getPartyData = (data) => {
    //         let partyFreq = new Map()
    //         data.forEach((pol) => {
    //             const { party, district } = pol
    //             if(partyFreq.has(party)) {
    //                 partyFreq.set(party, partyFreq.get(party) + 1)
    //             } 
    //             else {
    //                 partyFreq.set(party, 1)
    //             }

    //         })
    //     }

    //     const getOfficeData = () => {

    //     }

    //     const getData = async () => {
    //         let politicianData = await fetch("https://api.undangered.ml/api/organizationSearch/")
    //         politicianData = await politicianData.json()
    //         const { page } = politicianData
    //         setData(parseData(page))
    //     }
    //     getData()
    // }, [])
}

const DistrictsChart = () => {

}

const ElectionsChart = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const parseData = (data) => {
            
            const electionPartyResults = data.map((e) => {
                const { results } = e
                if(!results) return
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
            console.log(electionPartyResults)
            return electionPartyResults
        }

        const getData = async () => {
            let electionData = await getAPI({
                model: "election",
                params: new URLSearchParams({
                    office: "us_house",
                    type: "general",
                })
            })
            console.log(electionData)

            const { page } = electionData
            setData(parseData(page))
        }
        getData()
    }, [])

    return (
        <BarChart
          width={500}
          height={300}
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