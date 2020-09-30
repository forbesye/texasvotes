import React from "react"
import { Typography } from "antd"

const { Title, Paragraph, Link } = Typography

export default function VoterFAQ () {
    return (
        <main style={{
            margin: "32px auto",
            width: "90%",
            maxWidth: 800,
            padding: "32px 16px",
            background: "#ffffff",
            borderRadius: 4
        }}>
            <Title level={1}>Voting FAQ</Title>
            <Paragraph>This election is one of the most important in modern American history, and we want to ensure that you have the information necessary to exercise your constitutional right.</Paragraph>
            <Title level={4}>Registering to Vote</Title>
            <Paragraph>The deadline to register in Texas is October 5. Your application must be received or postmarked 30 days before the election. You must be at least 17 years and 10 months old to vote, and you at least one of the following forms of identification to register:</Paragraph>
            <ul>
                <li>Drivers License number</li>
                <li>Personal Identification number issued by the Texas Department of Public Safety (DPS)</li>
                <li>Last four digits of your social security number</li>
                <li>Texas driver license issued by the Texas DPS</li>
                <li>Texas Election Identification Certificate issued by DPS</li>
                <li>Texas personal identification card issued by DPS</li>
                <li>Texas concealed handgun license issued by DPS</li>
                <li>United States military identification card containing the person’s photograph</li>
                <li>United States citizenship certificate containing the person’s photograph</li>
                <li>United States passport</li>
            </ul>
            <Paragraph>If you have registered to vote before and have moved to a different address, you must register to vote again.</Paragraph>
            <Paragraph>You can find out if you're registered <Link href="https://teamrv-mvp.sos.texas.gov/MVP/mvp.do">here</Link> and fill out this <Link href="https://vrapp.sos.state.tx.us/index.asp">form</Link> if you are not registered for your district.</Paragraph>
            <Title level={4}>Early Voting and Absentee Voting</Title>
            <Paragraph>Early voting starts on October 13 and ends on October 30. </Paragraph>
            <Paragraph>Absentee voting is restricted to those 65 or older, those sick or disabled, those in jail, or those out of their county on election day and the early voting period. If you qualify for absentee voting, either print this <Link href="https://webservices.sos.state.tx.us/forms/5-15f.pdf">application</Link> or fill out this <Link href="https://bbm.sos.state.tx.us/bbm.asp">online order form</Link> for an absentee ballot form to be mailed to you. Once you've filled the application, it must be received by October 23.</Paragraph>
            <Paragraph>If the application is received on time, an absentee ballot will be mailed to you, and it must be postmarked by election day and received a day after.</Paragraph>
            <Title level={4}>Where to Vote</Title>
            <Paragraph>Voting locations can be found either on your county website, or they will be listed on your Texas Secretary of State voter profile <Link href="https://teamrv-mvp.sos.texas.gov/MVP/mvp.do">here</Link> (requires a log in)</Paragraph>
        </main>
    )
}