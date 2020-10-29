import React, { useState, useEffect, useRef } from "react"
import { Table, Divider, Typography, Select } from "antd"
import { useHistory } from 'react-router-dom'
import styles from "./Districts.module.css"
import columns, { districtName } from "./Lib"
import { party_mappings, elected_office_mappings } from "library/Mappings"
import { getAPI } from "library/APIClient"
import { CountiesFilter, PartiesFilter, OfficeFilter, PopulationRange, DistrictNumberFilter } from "library/FilterValues"
import { changeFilter } from "library/Functions"
const { Title, Paragraph } = Typography
const { Option } = Select

const ListView = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [listData, setListData] = useState([])
    const [currPage, setCurrPage] = useState(1);
    const [total, setTotal] = useState(20);
    const [countiesFilter, setCountiesFilter] = useState("");
    const [partyFilter, setPartyFilter] = useState("");
    const [officeFilter, setOfficeFilter] = useState("");
    const [districtFilter, setDistrictFilter] = useState(0);
    const [populationFilter, setPopulationFilter] = useState("");
    const [sortVal, setSortVal] = useState("number");
    const listRef = useRef(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let params = { page: currPage }
            if(districtFilter) {
                params.number = districtFilter
            }
            if(countiesFilter) {
                params.counties = countiesFilter
            }
            if(partyFilter) {
                params.party = partyFilter
            }
            if(officeFilter) {
                params.office = officeFilter
            }
            if(populationFilter) {
                params.popRange = populationFilter
            }
            params.sort = sortVal
            const { page, count } = await getAPI({
                    model: "district",
                    params: params
            });
            const data = page.map(district => {
                var elected_official = district.elected_officials ? district.elected_officials[0].name : "N/A"
                return {
                    ...district,
                    key: district.id,
                    type: elected_office_mappings[district.type],
                    party: district.party ? party_mappings[district.party] : "N/A",
                    official_name: elected_official,
                    population: district.demographics.total_population,
                    name: districtName(district),
                }
            })
            setTotal(count);
            setListData(data);
            setLoading(false);
        }
        fetchData()
    }, [currPage, countiesFilter, partyFilter, officeFilter, districtFilter, populationFilter, sortVal]);

    // Todo: Add filtering and sorting
    const handleTableChange = ({current, total}) => {
        setCurrPage(current);
        setTotal(total);
        window.scrollTo({top: listRef.current.offsetTop - 30, behavior: 'smooth'})  
    }

    return (
        <div>
            <section className={styles.content}>
                <Title level={2}>View All</Title>
                <Paragraph style={{fontSize: 18}}>Have you ever wondered what all Texas districts look like in a list view? Probably not, but we've got you covered here. The list can also be filtered and sorted by different properties to make your viewing experience more customizable (soon™).</Paragraph>
            </section>
            <Divider />

            <section className={styles.filterSection}>
                <Title level={3}>Sort</Title>
                <div style={{marginBottom: 20, textAlign: "center"}}>
                    <Title level={5}>Order</Title>
                    <Select
                        size="large" 
                        defaultValue="number" 
                        style={{width: 150}}
                        onChange={setSortVal}
                    >
                        <Option key={"number"} value={"number"}>District (Asc.)</Option>
                        <Option key={"-number"}>District (Desc.)</Option>
                        <Option key={"pop"}>Pop. (Asc.)</Option>
                        <Option key={"-pop"}>Pop. (Desc.)</Option>
                    </Select>
                </div>
                <Title level={3}>Filter</Title>
                <CountiesFilter onChange={changeFilter(setCountiesFilter)}/>
                <PartiesFilter onChange={changeFilter(setPartyFilter)}/>
                <OfficeFilter onChange={changeFilter(setOfficeFilter)}/>
                <DistrictNumberFilter onChange={changeFilter(setDistrictFilter)}/>
                <PopulationRange 
                    onChange={changeFilter(setPopulationFilter)}
                />
            </section>

            <section ref = {listRef}>
                <Table 
                    dataSource={listData}
                    columns={columns} 
                    onRow={record => {
                        return {
                            onClick: event => {
                                const { id } = record;
                                history.push(`/districts/view/${id}`);
                            }
                        }
                    }}
                    rowClassName={styles.cursor}
                    loading={loading}
                    pagination={{
                        total: total,
                        defaultPageSize: 20,
                        defaultCurrent: 1,
                        pageSizeOptions: []
                    }}
                    onChange={handleTableChange}
                />
            </section>
        </div>
    )
}

export default ListView;