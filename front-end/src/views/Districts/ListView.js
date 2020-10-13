import React, { useState, useEffect } from "react"
import { Table, Divider, Typography } from "antd"
import { useHistory } from 'react-router-dom'
import styles from "./Districts.module.css"
import columns from "./Lib"
// import districtData from "./DefaultDistricts"
import { party_mappings, elected_office_mappings } from "library/Mappings"
import { getAPI } from "library/APIClient"
// import { numberStringWithCommas } from "lib/Functions"
const { Title, Paragraph } = Typography

const ListView = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [listData, setListData] = useState([])
    const [currPage, setCurrPage] = useState(1);
    const [total, setTotal] = useState(20);

    useEffect(() => {
        const fetchData = async () => {
            const { page, total } = await getAPI({
                    model: "district",
                    params: {
                        page: currPage
                    }
            });
            const data = page.map(district => {
                return {
                    ...district,
                    key: district.id,
                    type: elected_office_mappings[district.type],
                    party: party_mappings[district.party],
                    official_name: district.elected_officials[0].name, // TODO: API call will be diff
                    population: district.demographics.total_population
                }
            })
            setTotal(total);
            setListData(data);
            setLoading(false);
        }
        fetchData()
    }, [currPage]);

    // Todo: Add filtering and sorting
    const handleTableChange = ({current, total}) => {
        setCurrPage(current);
        setTotal(total);
    }

    return (
        <div>
            <section className={styles.content}>
                <Title level={3}>View All</Title>
                <Paragraph>Have you ever wondered what all Texas districts look like in a list view? Probably not, but we've got you covered here. The list can also be filtered and sorted by different properties to make your viewing experience more customizable (soon™).</Paragraph>
            </section>
            <Divider />
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
                    defaultCurrent: 1
                }}
                onChange={handleTableChange}
            />
        </div>
    )
}

export default ListView;