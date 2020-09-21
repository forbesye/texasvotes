import React, { useEffect, useState } from 'react';
import DevBio from 'components/cards/DevBio.js'
import styles from 'views/About/About.module.css'
import JeffersonYeImg from 'views/About/images/JeffersonYeImg.png'
import JenniferSuriadinataImg from 'views/About/images/JenniferSuriadinataImg.jpg'
import LarryWinImg from 'views/About/images/LarryWinImg.jpg'
import SydneyOwenImg from 'views/About/images/SydneyOwenImg.jpg'

const getGitlabInfo = async () => {
    const teamInfo = new Map(
        [[
            "Larry Win",
            {
                name: "Larry Win",
                picture_path: LarryWinImg,
                bio: "I’m a third year CS major at UT Austin. I grew up and am currently living in Belton, Texas. In my free time, I cook and maintain a food instagram, play video games, keep up with the 2020 election season, and obsess over the Avatar universe.                ",
                commits: 0,
                issues: 0,
                tests: 0
            }
        ],
        [
            "jsuriadinata",
            {
                name: "Jennifer Suriadinata",
                picture_path: JenniferSuriadinataImg,
                bio: "I’m a third year CS major here at UT Austin. I’m from Dallas, Texas and spend my free time playing video games and practice piano. I definitely spend too much time working on projects and school :(",
                commits: 0,
                issues: 0,
                tests: 0
            }
        ],
        [
            "Jefferson Ye",
            {
                name: "Jefferson Ye",
                picture_path: JeffersonYeImg,
                bio: "I’m a third year CS major at UT Austin. I’m from Dallas, Texas and in my free time I enjoy exercising, cooking, reading, playing video games, and listening to podcasts!",
                commits: 0,
                issues: 0,
                tests: 0
            }
        ],
        [
            "Sydney Owen",
            {
                name: "Sydney Owen",
                picture_path: SydneyOwenImg,
                bio: "I’m a fourth-year CS major at UT Austin. I grew up in a small town called Llano, Texas. I spend my free time reading sci-fi/fantasy novels, playing video games, and spoiling my cat",
                commits: 0,
                issues: 0,
                tests: 0
            }
        ],
        [
            "Ivan Romero",
            {
                name: "Ivan Romero",
                picture_path: "https://image.shutterstock.com/image-vector/male-default-avatar-profile-gray-260nw-362901362.jpg",
                bio: "",
                commits: 0,
                issues: 0,
                tests: 0
            }
        ],
        [
            "Kevin Li",
            {
                name: "Kevin Li",
                picture_path: "https://image.shutterstock.com/image-vector/male-default-avatar-profile-gray-260nw-362901362.jpg",
                bio: "",
                commits: 0,
                issues: 0,
                tests: 0
            }
        ]]
    )

    let totalCommits = 0, totalIssues = 0, totalTests = 0;

    await fetch("https://gitlab.com/api/v4/projects/21177395/repository/contributors")
        .then(res => res.json())
        .then(res => {
            console.log(res)
            res.forEach(element => {
                const { name, commits } = element;
                if(teamInfo.has(name)) {
                    teamInfo.get(name).commits = commits;
                }
                totalCommits += commits;
            });
        })
    
    await fetch("https://gitlab.com/api/v4/projects/21177395/issues")
        .then(res => res.json())
        .then(res => {
            console.log(res)
            res.forEach(element => {
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
            <div className={styles.flexbox}>
                {teamList.map(member => {
                    const { name, bio, picture_path, commits, issues, tests} = member;
                    return (
                        <DevBio 
                            key={name}
                            name={name}
                            bio={bio}
                            picture_path={picture_path}
                            commits={commits}
                            issues={issues}
                            tests={tests}
                        />
                    )
                })}
            </div>
            <div>
            Total commits = {totalCommits} <br />
            Total issues = {totalIssues} <br />
            Total tests = {totalTests}
            </div>
        </div>
    );
}

export default About