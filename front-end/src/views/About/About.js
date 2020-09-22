import React, { useEffect, useState } from 'react';
import DevBio from 'components/cards/DevBio.js'
import RepoCard from 'components/cards/RepoCard.js'
import ToolCard from 'components/cards/ToolCard.js'
import styles from 'views/About/About.module.css'
import { toolsInfo, teamInfo, apiInfo, repoAndAPI } from "./AboutInfo.js"

const getGitlabInfo = async () => {
    let totalCommits = 0, totalIssues = 0, totalTests = 0;

    let commitList = await fetch("https://gitlab.com/api/v4/projects/21177395/repository/contributors")
    commitList = await commitList.json()
    commitList.forEach(element => {
        const { name, commits } = element;
        if(teamInfo.has(name)) {
            teamInfo.get(name).commits = commits;
        }
        totalCommits += commits;
    });

    let issueList = await fetch("https://gitlab.com/api/v4/projects/21177395/issues")
    issueList = await issueList.json()
    
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
        console.log("useEffect");
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
    }, [teamList])

    return(
        <div className={styles.wrapper}>
            <h1 className={styles.title} >About Us</h1>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            <h1 className={styles.title}>Our Team</h1>
            <div className={`${styles.gridLayout} ${styles.team}`}>
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
            <div className={`${styles.gridLayout} ${styles.repoStats}`}>
                <RepoCard type="commits" number={totalCommits}/>
                <RepoCard type="issues" number={totalIssues}/>
                <RepoCard type="tests" number={totalTests}/>
            </div>
            <h1 className={styles.title}>Development Tools</h1>
            <div className={`${styles.gridLayout} ${styles.devTools}`}>
                {toolsInfo.map(tool => {
                    const { title, img, description, link} = tool;

                    return (
                        <ToolCard
                            key={title} 
                            title={title}
                            img={img}
                            description={description}
                            link={link}
                        />
                    )
                })}
            </div>
            <h1 className={styles.title}>APIs Utilized</h1>
            <div className={`${styles.gridLayout} ${styles.devTools}`}>
                {apiInfo.map(api => {
                    const { title, img, description, link} = api;

                    return (
                        <ToolCard
                            key={title}
                            title={title}
                            img={img}
                            description={description}
                            link={link}
                        />
                    )
                })}
            </div>
            <h1 className={styles.title}>GitLab Repository and Postman API</h1>
            <div className={styles.flexbox}>
                {repoAndAPI.map(tool => {
                    const {img, link} = tool;

                    return (
                        <a href={link} key={link}>
                            <img className = {styles.logo} alt={link} src={img} />
                        </a>
                    )
                })}
            </div>
        </div>
    );
}

export default About