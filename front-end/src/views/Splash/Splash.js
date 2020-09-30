import React from 'react';
import { Card, Typography } from 'antd'

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
            <div className={styles.splash}>
                <div className={styles.splashContent}>
                    <div className={styles.headerText}>
                        <Typography.Title level={1} className={styles.title}>
                            Texas Votes
                        </Typography.Title>
                        <Typography.Paragraph className={styles.about}>
                            Search for your representatives, your district, and your state and federal elections within the state of Texas!
                        </Typography.Paragraph>
                    </div>
                    <img className={styles.headerImage} alt={"Politicians"} src={politicians}></img>
                </div>
            </div>
            <div className={styles.cardFlexContainer}>
                <Card
                    bordered={true}
                    className={styles.card}
                    cover={<img className={styles.cardImage} alt={"Politician"} src={politician}></img>}   
                    hoverable={true}
                >
                    <Typography.Title style={{ textAlign: "center" }}>Politicians</Typography.Title>
                    <p>
                        Want to learn more about your politicians?
                    </p>
                </Card>
                <Card
                    bordered={true}
                    className={styles.card}
                    cover={<img className={styles.cardImage} alt={"Texas"} src={texas}></img>}     
                    hoverable={true}
                >
                    <Typography.Title style={{ textAlign: "center" }}>Districts</Typography.Title>
                    <p>
                        Which district are you in? Learn about the different districts across Texas!
                    </p>
                </Card>
                <Card
                    bordered={true}
                    className={styles.card}
                    cover={<img className={styles.cardImage} alt={"Vote"} src={vote}></img>}    
                    hoverable={true}
                >
                    <Typography.Title style={{ textAlign: "center" }}>Elections</Typography.Title>
                    <p>
                        What are some of the upcoming elections? Keep track of the elections and mark your calendars to vote!
                    </p>

                </Card>
            </div>

        </div>
    );
}

export default Splash