import React, { useState, useEffect, Fragment } from "react"
import { Typography, Divider, Card, Pagination } from "antd"
import { Link } from "react-router-dom"
import styles from "./Politicians.module.css"
import { description } from "./Lib"
import { getAPI } from "library/APIClient"

const { Title, Paragraph, Text } = Typography
const { Meta } = Card

export default function GridView () {
    // const [items, setItems] = useState(politicians)
    const [loading, setLoading] = useState(true);
    const [gridData, setGridData] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [total, setTotal] = useState(20);

    const handlePaginationChange = (page) => {
        setCurrPage(page);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { page, total } = await getAPI({
                    model: "politician",
                    params: {
                        page: currPage
                    }
            });
            setTotal(total);
            setGridData(page);
            console.log(page);
            setLoading(false);
        }
        fetchData()
    }, [currPage]);

    return (
        <Fragment>
            <section className={styles.content}>
                <Title level={3}>View All</Title>
                <Paragraph>Have you ever wondered what all Texas officials and candidates look like in a grid view? Probably not, but we've got you covered here. The grid can also be filtered and sorted by different properties to make your viewing experience more customizable (soon™).</Paragraph>
            </section>
            <Divider />
            <section className={styles.grid}>
                { gridData.map((item, i) => (
                    <Link to={`/politicians/view/${item.id}`}>
                        <Card
                            className={item.party == "R" ? styles.cardRep : styles.cardDem}
                            hoverable
                            cover={<img className={styles.croppedImage} alt={item.name} src={item.image} />}
                        >
                            <Meta 
                                title={item.name}
                                description={<Text>{description(item)}</Text>}
                            />
                        </Card>
                    </Link>
                ))}
            </section>
            <Pagination
                total={total}
                defaultCurrent={1}
                defaultPageSize={20}
                onChange={handlePaginationChange}
                style={{margin: "16px 0", display: "flex", justifyContent:"flex-end"}}
            />

        </Fragment>
    )
}