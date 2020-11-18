import React, { useEffect, useState } from "react"
import {
    Bar,
    BarChart,
    LineChart,
    Line,
    ScatterChart,
    Scatter,
    Legend,
    XAxis,
    YAxis,
    ZAxis,
    Tooltip,
} from "recharts"
import Spinner from "components/ui/Spinner"
import { CustomTooltip } from "./Lib"

const OrganizationYears = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

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
            setLoading(true)
            let organizationData = await fetch("https://api.undangered.ml/api/organizationSearch/")
            organizationData = await organizationData.json()
            setData(parseData(organizationData))
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
    const [loading, setLoading] = useState(false)

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
            setLoading(true)
            let animalData = await fetch("https://api.undangered.ml/api/animalSearch")
            let nationData = await fetch("https://api.undangered.ml/api/nationSearch/")
            animalData = await animalData.json()
            nationData = await nationData.json()
            setData(parseData(animalData, nationData))
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
    const [loading, setLoading] = useState(false)

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
                nationCoor.set(name, {longitude: parseFloat(longitude), latitude: parseFloat(latitude)})
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
                return { name, ...value}
            })
            const COLORS = ["#E8B64F", "#FFC857", "#E9724C", "#C5283D", "#754461", "#4D5273", "#255F85"]
            let colorIndex = 0
            const regionMap = {}
            nameValueList.forEach((curr) => {
                const { region } = curr
                if(regionMap[region]) {
                    regionMap[region] = { ...regionMap[region], countries: [...regionMap[region].countries, curr] }
                }
                else {
                    regionMap[region] = { color: COLORS[colorIndex++], countries: [curr] }
                }
            })
            return regionMap
        }
        const getData = async () => {
            setLoading(true)
            let organizationData = await fetch("https://api.undangered.ml/api/organizationSearch/")
            let nationData = await fetch("https://api.undangered.ml/api/nationSearch/")
            organizationData = await organizationData.json()
            nationData = await nationData.json()
            setData(parseData(organizationData, nationData))
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
        <ScatterChart
            width={1000}
            height={500}
        >
            <XAxis type="number" dataKey={"longitude"} name="Longitude" domain={[-180, 180]} />
            <YAxis type="number" dataKey={"latitude"} name="Latitude" domain={[-90, 90]}/>
            <ZAxis dataKey={"count"} name="Count" range={[50, 500]}/>
            {
                Object.entries(data).map(([key, value]) => {
                    return (
                        <Scatter name={key} key={key} data={value.countries} fill={value.color} />
                    )
                })
            }
            <Tooltip content={<CustomTooltip />}/>
            <Legend />
        </ScatterChart>
    )
}

export {
    OrganizationYears,
    ConservationStatus,
    CountryOrganization
}