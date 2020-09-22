import React, { useEffect, useState } from 'react';
import DevBio from 'components/cards/DevBio.js'
import RepoCard from 'components/cards/RepoCard.js'
import ToolCard from 'components/cards/ToolCard.js'
import styles from 'views/About/About.module.css'
import JeffersonYeImg from 'views/About/images/JeffersonYeImg.png'
import JenniferSuriadinataImg from 'views/About/images/JenniferSuriadinataImg.jpg'
import LarryWinImg from 'views/About/images/LarryWinImg.jpg'
import SydneyOwenImg from 'views/About/images/SydneyOwenImg.jpg'
import KevinLiImg from 'views/About/images/KevinLiImg.png'
import IvanRomeroImg from 'views/About/images/IvanRomeroImg.jpg'
import ReactLogo from 'views/About/images/ReactLogo.png'
import AntDesignLogo from 'views/About/images/AntDesignLogo.png'
import AWSLogo from 'views/About/images/AWSLogo.png'
import DockerLogo from 'views/About/images/DockerLogo.png'
import PostmanLogo from 'views/About/images/PostmanLogo.png'
import GitLabLogo from 'views/About/images/GitLabLogo.png'


const getGitlabInfo = async () => {
    const teamInfo = new Map(
        [[
            "Larry Win",
            {
                name: "Larry Win",
                picture_path: LarryWinImg,
                role: "Front-end",
                bio: "I’m a third year CS major at UT Austin. I grew up and am currently living in Belton, Texas. In my free time, I cook and maintain a food Instagram, play video games, keep up with the 2020 election season, and obsess over the Avatar universe.",
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
                role: "Front-end",
                bio: "I’m a third year CS major at UT Austin. I’m from Dallas, Texas and spend my free time playing video games and practicing piano. I definitely spend too much time working on projects and school :(",
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
                role: "Front-end",
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
                role: "Back-end",
                bio: "I’m a fourth year CS major at UT Austin. I grew up in a small town called Llano, Texas. I spend my free time reading sci-fi/fantasy novels, playing video games, and spoiling my cat.",
                commits: 0,
                issues: 0,
                tests: 0
            }
        ],
        [
            "Ivan Romero",
            {
                name: "Ivan Romero",
                picture_path: IvanRomeroImg,
                role: "Back-end",
                bio: "I'm a fourth year CS major at UT Austin. I'm from Houston, TX and I spend most of my time cooking or watching and participating in combat sports like boxing or Brazilian-Jiu-Jitsu.",
                commits: 0,
                issues: 0,
                tests: 0
            }
        ],
        [
            "Kevin Li",
            {
                name: "Kevin Li",
                picture_path: KevinLiImg,
                role: "Back-end",
                bio: "I’m a third year CS major at UT Austin. I’m from Austin, Texas and spend my free time playing chess and camping. I definitely have spent too much time playing Among Us lately.",
                commits: 0,
                issues: 0,
                tests: 0
            }
        ]]
    );

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

const toolsInfo = [
    {
        title: "React",
        img: ReactLogo,
        description: "JavaScript library for front-end development",
        link: "https://reactjs.org/"
    },
    {
        title: "Ant Design",
        img: AntDesignLogo,
        description: "React UI design library",
        link: "https://ant.design/"
    },
    {
        title: "AWS",
        img: AWSLogo,
        description: "Cloud hosting platform",
        link: "https://aws.amazon.com/"
    },
    {
        title: "Docker",
        img: DockerLogo,
        description: "Containerization tool for consistent runtime environments",
        link: "https://docker.com/"
    },
    {
        title: "Postman",
        img: PostmanLogo,
        description: "Tool for designing and testing APIs",
        link: "https://postman.com/"
    },
    {
        title: "GitLab",
        img: GitLabLogo,
        description: "Git repository and CI/CD platform",
        link: "https://gitlab.com/"
    }
]

export default About