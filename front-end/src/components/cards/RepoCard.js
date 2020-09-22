import React from 'react';
import { Card } from 'antd';
import { BranchesOutlined, ProfileOutlined, CheckCircleOutlined, QuestionOutlined } from '@ant-design/icons'

const RepoCard = (props) => {
    const { type, number } = props;
    const iconStyle = {
        fontSize: "3em",
        margin: 16
    }
    
    let icon;
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
        default:
            icon = <QuestionOutlined style={iconStyle}/>;
    }
    
    return (
        <Card
            style={{ width: "300px", margin: 16, textAlign: "center", boxShadow: "5px 5px 15px rgba(0,0,0,.2)" }}
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