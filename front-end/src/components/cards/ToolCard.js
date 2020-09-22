import React from 'react';
import { Card } from 'antd';

const ToolCard = (props) => {
    const { title, description, img, link } = props;

    return (
        <a href={link}>
            <Card 
                style={{ width: "300px", margin: 16, textAlign: "center", boxShadow: "5px 5px 15px rgba(0,0,0,.2)" }}
                hoverable={true}
            >
                <img alt={title} src={img} width="85%" margin="16px"/>
                <br/>
                <b><font size="+2">{title}</font></b>
                <br/>
                <p>{description}</p>
            </Card>
        </a>
    )
}

export default ToolCard;