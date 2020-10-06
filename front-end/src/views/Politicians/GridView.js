import React, { useState, Fragment } from "react"
import { Typography, Divider, Card } from "antd"
import { Link } from "react-router-dom"
import styles from "./Politicians.module.css"
import politicians from "./DefaultPoliticians"
import { description } from "./Lib"

const { Title, Paragraph, Text } = Typography
const { Meta } = Card

export default function GridView () {
    // const [items, setItems] = useState(politicians)
    const [items] = useState(politicians)
    return (
        <Fragment>
            <section className={styles.content}>
                <Title level={3}>View All</Title>
                <Paragraph>Have you ever wondered what all Texas officials and candidates look like in a grid view? Probably not, but we've got you covered here. The grid can also be filtered and sorted by different properties to make your viewing experience more customizable (soon™).</Paragraph>
            </section>
            <Divider />
            <section className={styles.grid}>
                { items.map((item, i) => (
                    <Link to={`/politicians/view/${item.id}`}>
                        <Card
                            className={styles.card}
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
        </Fragment>
    )
}