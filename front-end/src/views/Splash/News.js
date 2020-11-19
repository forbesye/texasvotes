import React from "react"
import { Card, Typography } from "antd"
import Spinner from "../../components/ui/Spinner"
import styles from "./Splash.module.css"

const { Paragraph } = Typography
const { Meta } = Card

export default function News({ articles, loading }) {
	if (loading) return <Spinner />

    return (
        <div className={styles.news}>
            { articles && articles.length > 0 ? articles.map((article, i) => {
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
                                cover={ article.urlToImage ?
                                    <img 
                                        className={styles.newsCardImage}
                                        src={article.urlToImage} 
                                        alt={article.title} 
                                    /> : <div className={styles.newsCardImage}></div>
                                }
                            >
                                <Meta 
                                    title={article.title}
                                    description={(
                                        <div>
                                            <div>By {article.author}</div>
                                            <div>Published by {article.source.name}</div>
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
