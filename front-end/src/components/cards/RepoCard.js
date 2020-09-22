import React from 'react';
import { Card } from 'antd';
import { BranchesOutlined, ProfileOutlined, CheckCircleOutlined, QuestionOutlined } from '@ant-design/icons'

const RepoCard = (props) => {
    const { type, number } = props;
    const iconStyle = {
        fontSize: "3em",
        margin: 16
    }
    let icon = <QuestionOutlined />;
    switch(type) {
        case "commits":
            icon = <BranchesOutlined style={iconStyle} />
            break;
        case "issues":
            icon = <ProfileOutlined style={iconStyle}/>
            break;
        case "tests":
            icon = <CheckCircleOutlined style={iconStyle}/>
            break;
    }
    
    return (
        <Card
            bordered={true}
            style={{ width: "300px", margin: 16, textAlign: "center" }}
            hoverable={true}
        >
            {icon}
            <br />
            <font size="+2">
                {`Total ${type}: ${number}`}
            </font>
        </Card>
    )
}

export default RepoCard;