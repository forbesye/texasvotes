import React, { useState, useEffect } from "react"
import { Table, Divider, Typography } from "antd"
import { useHistory } from 'react-router-dom'
import columns from "./Lib"
import { getAPI } from "library/APIClient"
import styles from "./Elections.module.css"
import { election_type_mappings, elected_office_mappings } from "library/Mappings"
import { monthDayYearParse } from "library/Functions"
const { Title, Paragraph } = Typography

const ListView = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [listData, setListData] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [total, setTotal] = useState(20);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { page, total } = await getAPI({
                    model: "election",
                    params: {
                        page: currPage
                    }
            });
            const data = page.map(election => {
                return {
                    ...election,
                    key: election.id,
                    district: election.district.name,
                    type: election_type_mappings[election.type],
                    office: elected_office_mappings[election.office],
                    winner: election.results ? election.results.winner.name : "TBD",
                    totalVoters: election.results ? election.results.total_voters : "TBD",
                    election_date: monthDayYearParse(election.dates.election_day)
                }
            });
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
                <Paragraph>Have you ever wondered what all Texas elections look like in a list view? Probably not, but we've got you covered here. The list can also be filtered and sorted by different properties to make your viewing experience more customizable (soon™).</Paragraph>
            </section>
            <Divider />
            <Table 
                dataSource={listData}
                columns={columns} 
                onRow={record => {
                    return {
                        onClick: event => {
                            const { id } = record;
                            history.push(`/elections/view/${id}`);
                        }
                    }
                }}
                loading={loading}
                rowClassName={styles.cursor}
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