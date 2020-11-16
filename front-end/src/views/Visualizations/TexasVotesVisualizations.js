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
                let output = {}
                vote_counts.forEach((curr) => {
                    const { party, vote_total } = curr
                    if(output[party]) {
                        output[party] = output[party] + vote_total
                    }
                    else {
                        output[party] = vote_total
                    }
                })
                return output
            }).filter(r => r)
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
        <div>test</div>
    )
}

export {
    PoliticiansChart,
    DistrictsChart,
    ElectionsChart
}