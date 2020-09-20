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
    const { name, bio, picture_path } = props;

    return (
        <Card
            bordered={true}
            cover={<img className={styles.circle_headshot} alt={name} src={picture_path} />}
            style={{ width: 300, margin: 16 }}
            actions={[
                Commits(200),
                Issues(200),
                Tests(200)
            ]}
            hoverable={true}
        >
            <Meta title={name} description={bio} style={{ textAlign: "center" }}/>
        </Card>
    )
}

export default DevBio;