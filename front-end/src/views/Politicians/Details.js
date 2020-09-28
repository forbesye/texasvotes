import React, { useState, useEffect, Fragment } from "react"
import { PageHeader, Typography, Spin, Divider, Collapse } from "antd"
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined, GlobalOutlined } from "@ant-design/icons"
import { useParams, useHistory } from "react-router-dom"
import styles from "./Politicians.module.css"
import politicians from "./DefaultPoliticians"
import { subtitle, officeName } from "./Lib"

const { Title, Paragraph, Text, Link } = Typography
const { Panel } = Collapse

const parties = {
    D: "Democrat",
    R: "Republican",
    I: "Independent",
    L: "Libertarian"
}

export default function Details () {
    const { id } = useParams()
    const [ politician, setPolitician ] = useState({})
    const [ loaded, setLoaded ] = useState(false)
    const history = useHistory()

    useEffect(() => {
        const data = politicians.find(p => p.id === parseInt(id))
        setPolitician(data)
        setLoaded(true)
    }, [politician])

    const handleBack = () => {
        history.push("/politicians/view")
    }

    const { 
        name, 
        description, 
        district, 
        image, 
        party, 
        website, 
        socials,
        offices,
        terms
    } = politician
    let content = null
    if (loaded) {
        content = (
            <Fragment>
                <PageHeader 
                    title={name}
                    subTitle={subtitle(offices.current || offices.running_for, !offices.running_for)}
                    onBack={handleBack}
                />
                <Divider />
                <div className={styles.politicianDescription}>
                    <Title style={{ textAlign: "center" }} level={3}>General Information</Title>
                    <img src={image} alt={name} className={styles.politicianImage} />
                    <article className={styles.politicianDetails}>
                        <div className={styles.politicianGeneralInfo}>
                            <div>
                                <Text strong>Party: </Text><Text>{parties[party]}</Text>
                            </div>
                            <div>
                                <Text strong>District: </Text><Text>{district.name}</Text>
                            </div>
                            {
                                offices.current ? (
                                    <Fragment>
                                        <div>
                                            <Text strong>Current Office: </Text><Text>{`${officeName(offices.current)} (${terms.current} terms)`}</Text>
                                        </div>
                                        <div>
                                            <Text strong>Past Offices: </Text><Text>{offices.past.map((o, i) => (i !== 0 ? ", " : "") + officeName(o))}</Text>
                                        </div>
                                    </Fragment>
                                ) : null
                            }
                        </div>
                        <div className={styles.politicianSocials}>
                            <div>
                                <Link target="_blank" href={website}><GlobalOutlined /> Campaign Website</Link>
                            </div>
                            {
                                socials.facebook ? (
                                    <div>
                                        <Link target="_blank" href={socials.facebook}><FacebookOutlined /> Facebook</Link>
                                    </div>
                                ) : null
                            }
                            {
                                socials.twitter ? (
                                    <div>
                                        <Link target="_blank" href={socials.twitter}><TwitterOutlined /> Twitter</Link>
                                    </div>
                                ) : null
                            }
                            {
                                socials.instagram ? (
                                    <div>
                                        <Link target="_blank" href={socials.instagram}><InstagramOutlined /> Instagram</Link>
                                    </div>
                                ) : null
                            }
                            {
                                socials.youtube ? (
                                    <div>
                                        <Link target="_blank" href={socials.youtube}><YoutubeOutlined /> Youtube</Link>
                                    </div>
                                ) : null
                            }
                        </div>
                    </article>
                    { description ? (
                            <article className={styles.politicianBio}>
                                <Collapse ghost>
                                    <Panel header="Campaign Biography">
                                        {
                                            typeof description === "string" ? (
                                                <Paragraph>description</Paragraph>
                                            ) : description.map(p => <Paragraph>{p}</Paragraph>)
                                        }
                                    </Panel>
                                </Collapse>
                            </article>
                    ) : null }
                    <Divider />
                    <article>
                        <Title style={{ textAlign: "center" }} level={3}>District Information</Title>

                    </article>
                    <Divider />
                    <articel>
                        <Title style={{ textAlign: "center" }} level={3}>Election Information</Title>
                        
                    </articel>
                </div>
            </Fragment>
        )
    }

    return (
        <div className={styles.politicianPage}>
            { loaded ? content : <Spin tip="Looking for the fabled Blue wave..." /> }
        </div>
    )
}