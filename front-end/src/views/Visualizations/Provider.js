import React, { useEffect, useState } from "react"
import {
    Bar,
    BarChart,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    ScatterChart,
    Scatter,
    CartesianGrid,
    Legend,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts"
// import * as d3 from "d3"

const OrganizationYears = () => {
    const [data, setData] = useState([])

    /**
    * Parses API data and returns formatted data for visualization
    * @param {List[Organization]} nationData 
    * @return {
    * name: Integer (year),
    * value: Integer (count)
    * }
    */
    useEffect(() => {
        const parseData = (data) => {
            const yearFreq = new Map()
            data.forEach((curr) => {
                let { year } = curr
                year = parseInt(year)
                if(yearFreq.has(year)) {
                    yearFreq.set(year, yearFreq.get(year) + 1)
                }
                else if (year) {
                    yearFreq.set(year, 1)
                }
            })
            const minYear = [...yearFreq.keys()].sort()[0]
            const currentYear = new Date().getFullYear()
            let orgCount = 0
            const nameValueList = [...Array(currentYear - minYear).keys()].map((n) => n + minYear).map((key) =>{
                if (yearFreq.has(key)) {
                    orgCount += yearFreq.get(key)
                }
                return { name: key, value: orgCount }
            })
            return nameValueList
        }
        const getData = async () => {
            let organizationData = await fetch("https://api.undangered.ml/api/organizationSearch/")
            organizationData = await organizationData.json()
            setData(parseData(organizationData))
        }
        getData()
    }, [])

    return (
        <LineChart
            data={data}
            width={1000}
            height={300}
        >
            <XAxis dataKey="name" />
            <YAxis dataKey="value"/>
            <Tooltip />
            <Line type="monotone" dataKey="value" dot={false}/>
        </LineChart>
    )
}

const ConservationStatus = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        /**
         * Parses API data and returns formatted data for visualization
         * @param {List[Animal]} animalData 
         * @param {List[Nation]} nationData 
         * @return {
            * name: String, 
            * ...status: Integer
            * }
            */
        const parseData = (animalData, nationData) => {
            const nationToRegion = new Map()
            const regionStatus = {}
            nationData.forEach((curr) => {
                let { name, region } = curr
                nationToRegion.set(name, region.replace('"', ""))
            })
            animalData.forEach((curr) => {
                let { status, country } = curr
                // Get first word of term
                status = status.split(" ")[0]
                const regionName = nationToRegion.get(country)
                if(!regionName) return
                const region = regionStatus[regionName]
                if(region) {
                    if(region[status]) {
                        ++region[status]
                    }
                    else {
                        region[status] = 1
                    }
                } else {
                    regionStatus[regionName] = { [status]: 1 }
                }
            })
            const nameValueList = Object.entries(regionStatus).map(([name, value]) =>{
                return { name, ...value }
            })
            return nameValueList
        }
        const getData = async () => {
            let animalData = await fetch("https://api.undangered.ml/api/animalSearch")
            let nationData = await fetch("https://api.undangered.ml/api/nationSearch/")
            animalData = await animalData.json()
            nationData = await nationData.json()
            setData(parseData(animalData, nationData))
        }
        getData()
    }, [])

    return (
        <BarChart
            data={data}
            width={1000}
            height={500}
        >
            <XAxis dataKey="name" />
            <YAxis />
            <Legend />
            <Bar dataKey="Endangered" fill="#0088FE" />
            <Bar dataKey="Threatened" fill="#00C49F" />
            <Bar dataKey="Extinct" fill="#FFBB28" />
            <Tooltip />
        </BarChart>
    )
}

const CountryOrganization = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        /**
         * Parses API data and returns formatted data for visualization
         * @param {List[Organization]} organizationData 
         * @param {List[Nation]} nationData 
         * @return {
         * name: String, 
         * count: Integer, 
         * region: String, 
         * latitude: Float, 
         * longitude: Float
         * }
         */
        const parseData = (organizationData, nationData) => {
            const nationToRegion = new Map()
            const nationCoor = new Map()
            const countryCount = {}
            nationData.forEach((curr) => {
                let { name, region, longitude, latitude } = curr
                nationToRegion.set(name, region.replace('"', ""))
                nationCoor.set(name, {longitude, latitude})
            })
            organizationData.forEach((curr) => {
                const { country } = curr
                const regionName = nationToRegion.get(country)
                const { longitude, latitude } = nationCoor.get(country)
                if(!regionName || !longitude || !latitude) return
                const countryObj = countryCount[country]
                if(countryObj) {
                    countryCount[country] = {...countryObj, count: countryObj.count+1 }
                }
                else {
                    countryCount[country] = { count: 1, region: regionName, latitude, longitude }
                }
            })
            const nameValueList = Object.entries(countryCount).map(([name, value]) =>{
                return { name, ...value }
            }).sort((a, b) => b.count - a.count)
            return nameValueList
        }
        const getData = async () => {
            let organizationData = await fetch("https://api.undangered.ml/api/organizationSearch/")
            let nationData = await fetch("https://api.undangered.ml/api/nationSearch/")
            organizationData = await organizationData.json()
            nationData = await nationData.json()
            setData(parseData(organizationData, nationData))
        }
        getData()
    }, [])

    return (
        <div>test</div>
    )
}

export {
    OrganizationYears,
    ConservationStatus,
    CountryOrganization
}