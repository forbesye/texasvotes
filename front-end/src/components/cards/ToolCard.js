import React from 'react';
import { Card, Typography } from 'antd';
import styles from "./Card.module.css"

const ToolCard = (props) => {
    const { title, description, img, link } = props;

    return (
        <a href={link}>
            <Card 
                className={styles.card}
                hoverable={true}
            >
                <img alt={title} src={img} width="85%" margin="16px"/>
                <Typography.Title style={{ marginTop: 24}} level={3}>{title}</Typography.Title>
                <p>{description}</p>
            </Card>
        </a>
    )
}

export default ToolCard;