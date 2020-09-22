import React, { useEffect, useState } from 'react';
import DevBio from 'components/cards/DevBio.js'
import RepoCard from 'components/cards/RepoCard.js'
import ToolCard from 'components/cards/ToolCard.js'
import styles from 'views/About/About.module.css'
import { toolsInfo, teamInfo } from "./AboutInfo.js"

const getGitlabInfo = async () => {
    let totalCommits = 0, totalIssues = 0, totalTests = 0;

    const commitList = await fetch("https://gitlab.com/api/v4/projects/21177395/repository/contributors")
        .then(res => res.json())
    commitList.forEach(element => {
        const { name, commits } = element;
        if(teamInfo.has(name)) {
            teamInfo.get(name).commits = commits;
        }
        totalCommits += commits;
    });

    const issueList = await fetch("https://gitlab.com/api/v4/projects/21177395/issues")
        .then(res => res.json());
    issueList.forEach(element => {
        const { assignees } = element;
        // Todo: Check out what to do for multiple assignees
        assignees.forEach(a => {
            const { name } = a;
            if(teamInfo.has(name)) {
                teamInfo.get(name).issues += 1;
            }
        });
    totalIssues += 1;
    })
    
    return {
        totalCommits: totalCommits,
        totalIssues: totalIssues,
        totalTests: totalTests,
        teamInfo: teamInfo
    }
}

const About = () => {
    const [teamList, setTeamList] = useState([]);
    const [totalCommits, setTotalCommits] = useState(0);
    const [totalIssues, setTotalIssues] = useState(0);
    const [totalTests, setTotalTests] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const gitlabInfo = await getGitlabInfo();
            if(teamList === undefined || teamList.length === 0) {
                setTotalCommits(gitlabInfo.totalCommits);
                setTotalIssues(gitlabInfo.totalIssues);
                setTotalTests(gitlabInfo.totalTests);
    
                
                let tempList = []
                // Need to turn map to array for map function in jsx
                gitlabInfo.teamInfo.forEach(member => {
                    tempList.push(member);
                })
                setTeamList(tempList);
            }
        }
        fetchData();
    })

    return(
        <div className={styles.wrapper}>
            <h1 className={styles.title} >About Us</h1>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            <h1 className={styles.title}>Our Team</h1>
            <div className={styles.flexbox}>
                {teamList.map(member => {
                    const { name, bio, role, picture_path, commits, issues, tests} = member;
                    return (
                        <DevBio 
                            key={name}
                            name={name}
                            role={role}
                            bio={bio}
                            picture_path={picture_path}
                            commits={commits}
                            issues={issues}
                            tests={tests}
                        />
                    )
                })}
            </div>
            <h1 className={styles.title}>Repository Statistics</h1>
            <div className={styles.flexbox}>
                <RepoCard type="commits" number={totalCommits}/>
                <RepoCard type="issues" number={totalIssues}/>
                <RepoCard type="tests" number={totalTests}/>
            </div>
            <h1 className={styles.title}>Development tools</h1>
            <div className={styles.flexbox}>
                {toolsInfo.map(tool => {
                    const { title, img, description, link} = tool;

                    return (
                        <ToolCard 
                            title={title}
                            img={img}
                            description={description}
                            link={link}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default About