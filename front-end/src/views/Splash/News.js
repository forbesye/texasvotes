import React, { useState, useEffect } from "react"
import axios from "axios"
import { Card, Typography, Carousel } from "antd"
import Spinner from "../../components/ui/Spinner"
import styles from "./Splash.module.css"

const { Title, Text } = Typography
const { Meta } = Card

const KEY = process.env.REACT_APP_NEWS_KEY
const ENDPOINT = "https://newsapi.org/v2/everything"

export default function News () {
    const [ articles, setArticles ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(false)

    const getNewsArticles = async () => {
        setLoading(true)
        const { data } = await axios.get(ENDPOINT, {
            params: {
                q: "texas",
                apiKey: KEY,
                from: new Date(Date.now() - 168 * 3600_000).toISOString(),
                sources: [
                    "abc-news", 
                    "al-jazeera-english",
                    "associated-press",
                    "axios",
                    "bloomberg",
                    "cnn",
                    "fox-news",
                    "msnbc",
                    "national-review",
                    "nbc-news",
                    "newsweek",
                    "politico",
                    "reuters",
                    "the-hill",
                    "the-huffington-post",
                    "the-wall-street-journal",
                    "the-washington-post",
                    "time",
                    "usa-today",
                    "vice-news"
                ],
                pageSize: 10
            }
        })
        return data.articles
    }

    useEffect(() => {
        let mounted = true
        if (mounted) {
            getNewsArticles()
            .then(articles => {
                setArticles(articles)
                setLoading(false)
            })
            .catch(error => {
                setError(true)
                setArticles([])
                setLoading(false)
            })
        }
        return () => mounted = false
    }, [])

    if (loading) return <Spinner />

    return (
        <div className={styles.news}>
            { articles.map((article, i) => {
                    const displayDate = new Date(article.publishedAt).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    })
                    return (
                        <a 
                            key={i}
                            href={article.url}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <Card 
                                style={styles.newsCard}
                                cover={
                                    <img src={article.urlToImage} />
                                }
                            >
                                <Meta 
                                    title={article.title}
                                    description={(
                                        <div>
                                            <div>By {article.author}</div>
                                            <div>Published on {displayDate}</div>
                                        </div>
                                    )}
                                />
                            </Card>
                        </a>
                    )
                })
            }
        </div>
    )
}