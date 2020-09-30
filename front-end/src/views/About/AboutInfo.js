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
import GoogleDevLogo from 'views/About/images/GoogleDevLogo.png'
import OpenSecretsLogo from 'views/About/images/OpenSecretsLogo.png'
import OpenStatesLogo from 'views/About/images/OpenStatesLogo.png'

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
        title: "GitLab",
        img: GitLabLogo,
        description: "Git repository and CI/CD platform",
        link: "https://gitlab.com/"
    },
    {
        title: "Postman",
        img: PostmanLogo,
        description: "Tool for designing and testing APIs",
        link: "https://postman.com/"
    },
]

const apiInfo = [
    {
        title: "Google Civic API",
        img: GoogleDevLogo,
        description: "Used to find representatives and their relevant information",
        link: "https://developers.google.com/civic-information"
    },
    {
        title: "OpenSecrets API",
        img: OpenSecretsLogo,
        description: "Used to find information about funding and lobbying",
        link: "https://www.opensecrets.org/open-data/api"
    },
    {
        title: "OpenStates API",
        img: OpenStatesLogo,
        description: "Used to find information about legislators and voting within state legislatures",
        link: "https://docs.openstates.org/en/latest/api/v3/"
    }
]

const repoAndAPI = [
    {
        img: GitLabLogo,
        link: "https://gitlab.com/forbesye/fitsbits/"
    },
    {
        img: PostmanLogo,
        link: "https://documenter.getpostman.com/view/6920111/TVKJxZu3"
    }
]

const teamInfo =
    [
        {
            name: "Larry Win",
            username: "lawrencewin",
            picture_path: LarryWinImg,
            role: "Front-end",
            bio: "I’m a third year CS major at UT Austin. I grew up and am currently living in Belton, Texas. In my free time, I cook and maintain a food Instagram, keep up with the 2020 election season, and obsess over the Avatar universe.",
            commits: 0,
            issues: 0,
            tests: 0
        },
        {
            name: "Jennifer Suriadinata",
            username: "jsuriadinata",
            picture_path: JenniferSuriadinataImg,
            role: "Front-end",
            bio: "I’m a third year CS major at UT Austin. I’m from Dallas, Texas and spend my free time playing video games and practicing piano. I definitely spend too much time working on projects and school :(",
            commits: 0,
            issues: 0,
            tests: 0
        },
        {
            name: "Jefferson Ye",
            username: "forbesye",
            picture_path: JeffersonYeImg,
            role: "Front-end",
            bio: "I’m a third year CS major at UT Austin. I’m from Dallas, Texas and in my free time I enjoy exercising, cooking, reading, playing video games, and listening to podcasts!",
            commits: 0,
            issues: 0,
            tests: 0
        },
        {
            name: "Sydney Owen",
            username: "seowen99",
            picture_path: SydneyOwenImg,
            role: "Back-end",
            bio: "I’m a fourth year CS major at UT Austin. I grew up in a small town called Llano, Texas. I spend my free time reading sci-fi/fantasy novels, playing video games, and spoiling my cat.",
            commits: 0,
            issues: 0,
            tests: 0
        },
        {
            name: "Ivan Romero",
            username: "ivanromero1000",
            picture_path: IvanRomeroImg,
            role: "Back-end",
            bio: "I'm a fourth year CS major at UT Austin. I'm from Houston, Texas and I spend most of my time cooking or watching and participating in combat sports like boxing or Brazilian-Jiu-Jitsu.",
            commits: 0,
            issues: 0,
            tests: 0
        },
        {
            name: "Kevin Li",
            username: "Catalystic",
            picture_path: KevinLiImg,
            role: "Back-end",
            bio: "I’m a third year CS major at UT Austin. I’m from Austin, Texas and spend my free time playing chess and camping. I definitely have spent too much time playing Among Us lately.",
            commits: 0,
            issues: 0,
            tests: 0
        }
    ];

export {
    toolsInfo, 
    teamInfo,
    apiInfo,
    repoAndAPI
}