import JeffersonYeImg from "views/About/images/JeffersonYeImg.png"
import JenniferSuriadinataImg from "views/About/images/JenniferSuriadinataImg.jpg"
import LarryWinImg from "views/About/images/LarryWinImg.jpg"
import SydneyOwenImg from "views/About/images/SydneyOwenImg.jpg"
import KevinLiImg from "views/About/images/KevinLiImg.png"
import IvanRomeroImg from "views/About/images/IvanRomeroImg.jpg"
import ReactLogo from "views/About/images/ReactLogo.png"
import AntDesignLogo from "views/About/images/AntDesignLogo.png"
import AWSLogo from "views/About/images/AWSLogo.png"
import DockerLogo from "views/About/images/DockerLogo.png"
import PostmanLogo from "views/About/images/PostmanLogo.png"
import GitLabLogo from "views/About/images/GitLabLogo.png"
import SeleniumLogo from "views/About/images/SeleniumLogo.png"
import JestLogo from "views/About/images/JestLogo.png"
import FlaskLogo from "views/About/images/FlaskLogo.jpg"
import SlackLogo from "views/About/images/SlackLogo.png"
import GCPLogo from "views/About/images/GCPLogo.png"
import MarshmallowLogo from "views/About/images/MarshmallowLogo.png"
import SQLAlchemyLogo from "views/About/images/SQLAlchemyLogo.png"
import PostgresLogo from "views/About/images/PostgresLogo.png"
import NamecheapLogo from "views/About/images/NamecheapLogo.png"
import BlackLogo from "views/About/images/BlackLogo.png"
import PrettierLogo from "views/About/images/PrettierLogo.png"
import D3Logo from "views/About/images/D3Logo.png"
import ChartsLogo from "views/About/images/ChartsLogo.svg"
import GoogleDevLogo from "views/About/images/GoogleDevLogo.png"
import OpenSecretsLogo from "views/About/images/OpenSecretsLogo.png"
import NewsAPILogo from "views/About/images/NewsAPILogo.png"
import MapboxLogo from "views/About/images/MapboxLogo.png"
import BallotpediaLogo from "views/About/images/BallotpediaLogo.png"
import YouTubeLogo from "views/About/images/YouTubeLogo.png"
import HereLogo from "views/About/images/HereLogo.png"

/**
 * Static data for About page
 */

const toolsInfo = [
	{
		title: "React",
		img: ReactLogo,
		description: "JavaScript library for front-end development",
		link: "https://reactjs.org/",
	},
	{
		title: "Ant Design",
		img: AntDesignLogo,
		description: "React UI design library",
		link: "https://ant.design/",
	},
	{
		title: "D3",
		img: D3Logo,
		description: "JavaScript visualization library",
		link: "https://d3js.org/",
	},
	{
		title: "Chart.js",
		img: ChartsLogo,
		description: "JavaScript charting library",
		link: "https://www.chartjs.org/",
	},
	{
		title: "Flask",
		img: FlaskLogo,
		description: "Simple framework for API development",
		link: "https://flask.palletsprojects.com/en/1.1.x/",
	},
	{
		title: "SQLAlchemy",
		img: SQLAlchemyLogo,
		description: "SQL toolkit and object-relational mapper",
		link: "https://www.sqlalchemy.org/",
	},
	{
		title: "Marshmallow",
		img: MarshmallowLogo,
		description: "Library for complex datatype conversion",
		link: "https://marshmallow.readthedocs.io/en/stable/",
	},
	{
		title: "PostgreSQL",
		img: PostgresLogo,
		description: "Relational database management system",
		link: "https://www.postgresql.org/",
	},
	{
		title: "Prettier",
		img: PrettierLogo,
		description: "JavaScript code formatter",
		link: "https://prettier.io/",
	},
	{
		title: "Black",
		img: BlackLogo,
		description: "Python code formatter",
		link: "https://github.com/psf/black",
	},
	{
		title: "Jest",
		img: JestLogo,
		description: "JavaScript testing framework",
		link: "https://jestjs.io/",
	},
	{
		title: "Selenium",
		img: SeleniumLogo,
		description: "End-to-end UI testing framework",
		link: "https://www.selenium.dev/",
	},
	{
		title: "Postman",
		img: PostmanLogo,
		description: "Tool for designing and testing APIs",
		link: "https://postman.com/",
	},
	{
		title: "AWS",
		img: AWSLogo,
		description: "Cloud hosting platform",
		link: "https://aws.amazon.com/",
	},
	{
		title: "GCP",
		img: GCPLogo,
		description: "Cloud hosting platform",
		link: "https://cloud.google.com/",
	},
	{
		title: "Docker",
		img: DockerLogo,
		description:
			"Containerization tool for consistent runtime environments",
		link: "https://docker.com/",
	},
	{
		title: "GitLab",
		img: GitLabLogo,
		description: "Git repository and CI/CD platform",
		link: "https://gitlab.com/",
	},
	{
		title: "Slack",
		img: SlackLogo,
		description: "Team communication platform",
		link: "https://slack.com/",
	},
	{
		title: "Namecheap",
		img: NamecheapLogo,
		description: "Domain name registrar",
		link: "https://namecheap.com/",
	},
]

const apiInfo = [
	{
		title: "Google Civic API",
		img: GoogleDevLogo,
		description:
			"Used to find representatives and their relevant information",
		link: "https://developers.google.com/civic-information",
	},
	{
		title: "OpenSecrets API",
		img: OpenSecretsLogo,
		description: "Used to find information about funding and lobbying",
		link: "https://www.opensecrets.org/open-data/api",
	},
	{
		title: "News API",
		img: NewsAPILogo,
		description:
			"Used to find new and updating stories about Texas from a wide range of sources",
		link: "https://newsapi.org/",
	},
	{
		title: "Mapbox GL JS",
		img: MapboxLogo,
		description: "Used to visualize Texas district shapes and locations",
		link: "https://docs.mapbox.com/mapbox-gl-js/api/",
	},
	{
		title: "HERE Maps API",
		img: HereLogo,
		description:
			"Used to fetch address suggestions for Texas address queries",
		link:
			"https://developer.here.com/documentation/geocoder-autocomplete/dev_guide/topics/resource-suggest.html",
	},
	{
		title: "YouTube Data API",
		img: YouTubeLogo,
		description: "Used to fetch related videos to elections",
		link: "https://developers.google.com/youtube/v3/docs/search/list",
	},
	{
		title: "Ballotpedia",
		img: BallotpediaLogo,
		description:
			"Static pages that contain tons of scrapable data on non-elected candidates running in races",
		link: "https://ballotpedia.org/Main_Page",
	},
]

const repoAndAPI = [
	{
		img: GitLabLogo,
		link: "https://gitlab.com/forbesye/fitsbits/",
	},
	{
		img: PostmanLogo,
		link: "https://documenter.getpostman.com/view/12817007/TVYPztiN",
	},
]

const teamInfo = [
	{
		name: "Larry Win",
		username: "lawrencewin",
		email: "lawrence.j.win@gmail.com",
		picture_path: LarryWinImg,
		role: "Front-end | Phase II Leader",
		bio:
			"I’m a third year CS major at UT Austin. I grew up and am currently living in Belton, Texas. In my free time, I cook and maintain a food Instagram, keep up with the 2020 election season, and obsess over the Avatar universe.",
		linkedin: "https://www.linkedin.com/in/lawrence-win",
		commits: 0,
		issues: 0,
		tests: 0,
	},
	{
		name: "Jennifer Suriadinata",
		username: "jsuriadinata",
		email: "jsuriadinata@utexas.edu",
		picture_path: JenniferSuriadinataImg,
		role: "Front-end | Phase III Leader",
		bio:
			"I’m a third year CS major at UT Austin. I’m from Dallas, Texas and spend my free time playing video games and practicing piano. I definitely spend too much time working on projects and school :(",
		linkedin: "https://www.linkedin.com/in/jennifer-suriadinata-990373171",
		commits: 0,
		issues: 0,
		tests: 14,
	},
	{
		name: "Jefferson Ye",
		username: "forbesye",
		picture_path: JeffersonYeImg,
		email: "heroicevil7@gmail.com",
		role: "Front-end | Phase I Leader",
		bio:
			"I’m a third year CS major at UT Austin. I’m from Dallas, Texas and in my free time I enjoy exercising, cooking, reading, playing video games, and listening to podcasts!",
		linkedin: "https://www.linkedin.com/in/jefferson-ye",
		commits: 0,
		issues: 0,
		tests: 11,
	},
	{
		name: "Sydney Owen",
		username: "seowen99",
		picture_path: SydneyOwenImg,
		email: "seowen@utexas.edu",
		role: "Back-end",
		bio:
			"I’m a fourth year CS major at UT Austin. I grew up in a small town called Llano, Texas. I spend my free time reading sci-fi/fantasy novels, playing video games, and spoiling my cat.",
		linkedin: "https://www.linkedin.com/in/sydney-e-owen",
		commits: 0,
		issues: 0,
		tests: 11,
	},
	{
		name: "Ivan Romero",
		username: "ivanromero1000",
		picture_path: IvanRomeroImg,
		email: "ivanromero1000@gmail.com",
		role: "Back-end",
		bio:
			"I'm a fourth year CS major at UT Austin. I'm from Houston, Texas and I spend most of my time cooking or watching and participating in combat sports like boxing or Brazilian-Jiu-Jitsu.",
		linkedin: "https://www.linkedin.com/in/ivanrome100",
		commits: 0,
		issues: 0,
		tests: 10,
	},
	{
		name: "Kevin Li",
		username: "Catalystic",
		picture_path: KevinLiImg,
		email: "kevin.li1729@utexas.edu",
		role: "Back-end | Phase IV Leader",
		bio:
			"I’m a third year CS major at UT Austin. I’m from Austin, Texas and spend my free time playing chess and camping. I definitely have spent too much time playing Among Us lately.",
		linkedin: "https://www.linkedin.com/in/kevinli1729",
		commits: 0,
		issues: 0,
		tests: 8,
	},
]

export { toolsInfo, teamInfo, apiInfo, repoAndAPI }
