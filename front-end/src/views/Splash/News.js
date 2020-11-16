import React, { useState, useEffect } from "react"
import axios from "axios"
import { Card, Typography, Carousel } from "antd"
import Spinner from "../../components/ui/Spinner"
import styles from "./Splash.module.css"

const { Title, Paragraph } = Typography
const { Meta } = Card

const KEY = process.env.REACT_APP_NEWS_KEY
const ENDPOINT = "https://newsapi.org/v2/everything"

export default function News ({ articles, loading }) {
    if (loading) return <Spinner />

    return (
        <div className={styles.news}>
            { articles.length > 0 ? articles.map((article, i) => {
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
                                hoverable
                                className={styles.newsCard}
                                cover={
                                    <img 
                                        className={styles.newsCardImage}
                                        src={article.urlToImage} 
                                        alt={article.title} 
                                    />
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
            : <Paragraph>No news articles found.</Paragraph> }
        </div>
    )
}