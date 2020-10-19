import React, { useState, useEffect, Fragment, useRef } from "react"
import { Typography, Divider, Card, Pagination } from "antd"
import { Link } from "react-router-dom"
import styles from "./Politicians.module.css"
import { description } from "./Lib"
import { getAPI } from "library/APIClient"

const { Title, Paragraph, Text } = Typography
const { Meta } = Card

export default function GridView () {
    const [gridData, setGridData] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [total, setTotal] = useState(20);
    const gridRef = useRef(null)

    const handlePaginationChange = (page) => {
        setCurrPage(page);
        window.scrollTo({top: gridRef.current.offsetTop - 30, behavior: 'smooth'})  
    }

    useEffect(() => {
        const fetchData = async () => {
            const { page, count } = await getAPI({
                    model: "politician",
                    params: {
                        page: currPage
                    }
            });
            setTotal(count);
            setGridData(page);
        }
        fetchData()
    }, [currPage]);

    return (
        <Fragment>
            <section className={styles.content}>
                <Title level={2}>View All</Title>
                <Paragraph style={{fontSize: 18}}>Have you ever wondered what all Texas officials and candidates look like in a grid view? Probably not, but we've got you covered here. The grid can also be filtered and sorted by different properties to make your viewing experience more customizable (soon™).</Paragraph>
            </section>
            <Divider />
            <section className={styles.grid} ref={gridRef}>
                { gridData.map((item, i) => (
                    <Link to={`/politicians/view/${item.id}`}>
                        <Card
                            className={item.party === "R" ? styles.cardRep : styles.cardDem}
                            hoverable
                            cover={<img className={styles.croppedImage} alt={item.name} src={item.image} />}
                        >
                            <Meta 
                                title={<Text style={{fontSize: 20}}>{item.name}</Text>}
                                description={<Text style={{fontSize: 18}}>{description(item)}</Text>}
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
                pageSizeOptions={[]}
                style={{margin: "16px 0", display: "flex", justifyContent:"flex-end"}}
            />
        </Fragment>
    )
}