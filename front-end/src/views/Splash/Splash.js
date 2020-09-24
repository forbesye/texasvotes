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
                    style={{margin: 15}}
                    cover={<img style={{width: 300, margin: 10}} src={politician}></img>}    
                >
                    <Button type="primary">Politicians</Button>
                </Card>
                <Card
                    style={{margin: 15}}
                    cover={<img style={{width: 300}}src={texas}></img>}    
                >
                    <Button type="primary">Districts</Button>
                </Card>
                <Card
                    style={{margin: 15}}
                    cover={<img style={{width: 300}}src={vote}></img>}    
                >
                    <Button type="primary">Elections</Button>
                </Card>
            </div>

        </div>
    );
}

export default Splash