import React, { useEffect, useState } from 'react';
import DevBio from 'components/cards/DevBio'
import RepoCard from 'components/cards/RepoCard'
import ToolCard from 'components/cards/ToolCard'
import Spinner from 'components/ui/Spinner'
import styles from 'views/About/About.module.css'
import { toolsInfo, teamInfo, apiInfo, repoAndAPI } from "./AboutInfo"

const getGitlabInfo = async () => {
    let totalCommitCount = 0, totalIssueCount = 0, totalTestCount = 0;

    // Need to wipe member issues before calling again and calculate total tests
    teamInfo.forEach(member => {
        totalTestCount += member.tests;
        member.issues = 0;
    });

    // Can't use a map cause Gitlab's API returns are weird :/
    let commitList = await fetch("https://gitlab.com/api/v4/projects/21177395/repository/contributors")
    commitList = await commitList.json()
    commitList.forEach(element => {
        const { name, commits } = element;
        teamInfo.forEach(member => {
            if(member.name === name || member.username === name) {
                member.commits = commits;
            }
        })
        totalCommitCount += commits;
    });

    // Todo: When over 100 issues, implement pagination support to get all issues
    let issueList = await fetch("https://gitlab.com/api/v4/projects/21177395/issues?per_page=100")
    issueList = await issueList.json()
    
    issueList.forEach(element => {
        const { assignees } = element;
        // Todo: Check out what to do for multiple assignees
        assignees.forEach(a => {
            const { name } = a;
            teamInfo.forEach(member => {
                if(member.name === name || member.username === name) {
                    member.issues += 1;
                }
            })

            // if(teamInfo.has(name)) {
            //     teamInfo.get(name).issues += 1;
            // }
        });
        totalIssueCount += 1;
    })

    return {
        totalCommits: totalCommitCount,
        totalIssues: totalIssueCount,
        totalTests: totalTestCount,
        teamInfo: teamInfo
    }
}

const About = () => {
    const [teamList, setTeamList] = useState([]);
    const [totalCommits, setTotalCommits] = useState(0);
    const [totalIssues, setTotalIssues] = useState(0);
    const [totalTests, setTotalTests] = useState(0);
    const [ loaded, setLoaded ] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            if(teamList === undefined || teamList.length === 0) {
                const gitlabInfo = await getGitlabInfo();
                setTotalCommits(gitlabInfo.totalCommits);
                setTotalIssues(gitlabInfo.totalIssues);
                setTotalTests(gitlabInfo.totalTests);
                setTeamList(gitlabInfo.teamInfo);
                setLoaded(true);
            }
        }
        fetchData();
    }, [teamList])

    return(
        <div className={styles.wrapper}>
            <h1 className={styles.title} >About Us</h1>
                <p style={{fontSize: 20}}>
                TexasVotes is a website that allows users to quickly look up their representatives, the districts they live in, and state/federal elections they're slated to participate in within the state of Texas. We hope to increase governmental transparency and decrease the difficulty for the voting process in order to promote a more democratic society.
                </p>
            <h1 className={styles.title}>Our Team</h1>
            {
                loaded ?

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

                : 
                <Spinner />
            }
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