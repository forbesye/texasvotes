import React, { useState, useEffect, Fragment } from "react"
import { Typography, Divider, Card } from "antd"
import styles from "./Politicians.module.css"
import politicians from "./DefaultPoliticians"
import { description } from "./Lib"

const { Title, Paragraph, Text } = Typography
const { Meta } = Card

export default function GridView () {
    const [items, setItems] = useState(politicians)
    return (
        <Fragment>
            <section className={styles.content}>
                <Title level={3}>View All</Title>
                <Paragraph>Have you ever wondered what all Texas officials and candidates look like in a grid view? Probably not, but we've got you covered here. The grid can also be filtered and sorted by different properties to make viewing experience more customizable.</Paragraph>
            </section>
            <Divider />
            <section className={styles.grid}>
                { items.map(item => (
                    <Card
                        hoverable
                        cover={<img className={styles.croppedImage} alt={item.name} src={item.image} />}
                    >
                        <Meta 
                            title={item.name}
                            description={<Text>{description(item)}</Text>}
                        />
                    </Card>
                ))}
            </section>
        </Fragment>
    )
}