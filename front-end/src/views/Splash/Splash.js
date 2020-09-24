import React from 'react';
import { Button, Row, Col, Card, Typography } from 'antd'

import election_icons from 'views/Splash/images/election_icons.jpg';

// Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> 
import texas from 'views/Splash/images/texas.svg'; 

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
import politician from 'views/Splash/images/politician.svg'; 
import politicians from 'views/Splash/images/politicians.svg'; 
import vote from 'views/Splash/images/vote.svg';

import styles from './Splash.module.css';

const Splash = () => {
    return(
        <div>
            <div className={styles.flexContainer}>
                <div className={styles.headerText}>
                    <h1 className={styles.title}>
                        Texas Votes
                    </h1>
                    <p className={styles.about}>
                        Search for your representatives, your district, and your state and federal elections within the state of Texas!
                    </p>

                </div>
                <img className={styles.headerImage} src={politicians}></img>
            </div>
            <div className={styles.cardFlexContainer}>
                <Card
                    bordered={true}
                    className={styles.card}
                    style={{borderRadius: 50}}
                    cover={<img style={{width: "20vw", margin: 30}} src={politician}></img>}   
                    hoverable={true}
                >
                    <Typography.Title>Politicians</Typography.Title>
                    <p style={{width: "20vw"}}>
                        Want to learn more about your politicians?
                    </p>
                </Card>
                <Card
                    bordered={true}
                    className={styles.card}
                    style={{borderRadius: 50}}
                    cover={<img style={{width: "20vw", margin: 30}} src={texas}></img>}     
                    hoverable={true}
                >
                    <Typography.Title>Districts</Typography.Title>
                    <p style={{width: "20vw"}}>
                        Which district are you in? Learn about the different districts across Texas!
                    </p>
                </Card>
                <Card
                    bordered={true}
                    className={styles.card}
                    style={{borderRadius: 50}}
                    cover={<img style={{width: "20vw", margin: 30}} src={vote}></img>}    
                    hoverable={true}
                >
                    <Typography.Title>Elections</Typography.Title>
                    <p style={{width: "20vw"}}>
                        What are some of the upcoming elections? Keep track of the elections and mark your calendars to vote!
                    </p>

                </Card>
            </div>

        </div>
    );
}

export default Splash