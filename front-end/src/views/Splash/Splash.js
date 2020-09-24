import React from 'react';
import { Button, Row, Col, Card, Typography } from 'antd'

import election_icons from 'views/Splash/images/election_icons.jpg';
import politician from 'views/Splash/images/politician.svg'

import styles from './Splash.module.css';

const Splash = () => {
    return(
        <div>
            <div className={styles.flexContainer}>
                <div style={{marginLeft: "20vw", marginTop: "20vh"}}>
                    <h1 >
                        Texas Votes
                    </h1>
                    <p>
                        Stay connected and vote!
                    </p>

                </div>
                <img style= {{marginRight: "20vw", height: "30vh"}}src={election_icons}></img>
            </div>
            <div className={styles.cardFlexContainer}>
                <Card
                    style={{margin: 15}}
                    cover={<img style={{width: 300, margin: 10}} src={politician}></img>}    
                >
                    {/* <Typography.Title level={3}>Card 1</Typography.Title>
                    hello 1
                    asdfasdfasdfasdfasdfadsfasdfadsfadsf */}
                    <Button type="primary">Politicians</Button>
                </Card>
                <Card
                    style={{margin: 15}}
                    cover={<img style={{width: 300}}src={election_icons}></img>}    
                >
                    {/* <Typography.Title level={3}>Card 2</Typography.Title>
                    hello 2
                    asdfasdfasdfasdfasdfadsfasdfadsfadsf */}
                    <Button type="primary">Districts</Button>
                </Card>
                <Card
                    style={{margin: 15}}
                    cover={<img style={{width: 300}}src={election_icons}></img>}    
                >
                    {/* <Typography.Title level={3}>Card 3</Typography.Title>
                    hello 3
                    asdfasdfasdfasdfasdfadsfasdfadsfadsf */}
                    <Button type="primary">Elections</Button>
                </Card>
            </div>
            Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

        </div>
    );
}

export default Splash