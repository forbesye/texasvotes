import React from 'react';
import { Card } from 'antd';
import styles from "views/About/About.module.css"
import { BranchesOutlined, ProfileOutlined, CheckCircleOutlined } from '@ant-design/icons'
const { Meta } = Card;

const Commits = (n) => {
    return (
        <React.Fragment>
            <div>
                Commits
            </div>
            <BranchesOutlined />
            <div>
                {n}
            </div>
        </React.Fragment>
    )
}

const Issues = (n) => {
    return (
        <React.Fragment>
            <div>
                Issues
            </div>
            <ProfileOutlined />
            <div>
                {n}
            </div>
        </React.Fragment>
    )
}

const Tests = (n) => {
    return (
        <React.Fragment>
            <div>
                Tests
            </div>
            <CheckCircleOutlined />
            <div>
                {n}
            </div>
        </React.Fragment>
    )
}

const DevBio = (props) => {
    const { name, bio, role, picture_path, commits, issues, tests } = props;

    return (
        <Card
            bordered={true}
            cover={<img className={styles.circle_headshot} alt={name} src={picture_path} />}
            style={{ width: 300, margin: 16, textAlign: "center", boxShadow: "5px 5px 15px rgba(0,0,0,.2)"}}
            actions={[
                Commits(commits),
                Issues(issues),
                Tests(tests)
            ]}
        >
            <b><font size="+2">{name}</font></b>
            <Meta title={role} description={bio} style={{ textAlign: "center" }}/>
        </Card>
    )
}

export default DevBio;