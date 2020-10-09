import React from "react"
import { Spin } from "antd"

const messages = [
    "Looking for the fabled blue wave",
    "Waiting for Ken Paxton to stand trial for securities fraud",
    "Listening to Dennis Bonnen lose his job as Speaker of the House",
    "Dreaming of a Biden/Harris upset",
    "Waiting for Governor Greg Abbott to terrorize liberal cities once more",
    "Waiting for Lt. Governor Dan Patrick to say something stupid again",
    "Attempting to court the Hispanic vote",
    "Looking for Beto O'Rourke stumping on some tables",
    "Trying to stop Ted Cruz from reading 'Green Eggs and Ham' on the Senate Floor"
]

const styles = {
    margin: "auto",
    display: "block"
}

export default function Spinner () {
    const message = messages[ Math.floor(Math.random() * messages.length) ] + "..."
    console.log(message)
    return <Spin style={styles} tip={message} size="large" />
}