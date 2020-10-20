import React, { useState, useEffect, useRef } from "react"
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
    const listRef = useRef(null)

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
                    district: `TX-${election.district.number}`,
                    type: election_type_mappings[election.type.class],
                    office: elected_office_mappings[election.office],
                    winner: election.results ? election.results.winner.name : "TBD",
                    totalVoters: election.results ? election.results.total_voters : "TBD",
                    election_date: monthDayYearParse(election.dates.election_day),
                    early_date: monthDayYearParse(election.dates.early_start)
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
        window.scrollTo({top: listRef.current.offsetTop - 30, behavior: 'smooth'})  
    }

    return (
        <div>
            <section className={styles.content}>
                <Title level={2}>View All</Title>
                <Paragraph style={{fontSize: 18}}>Have you ever wondered what all Texas elections look like in a list view? Probably not, but we've got you covered here. The list can also be filtered and sorted by different properties to make your viewing experience more customizable (soon™).</Paragraph>
            </section>
            <Divider />
            <section ref = {listRef} >
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
            </section>

        </div>
    )
}

export default ListView;