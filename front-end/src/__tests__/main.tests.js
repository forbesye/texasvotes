import React from "react"
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import About from "views/About/About"
import Splash from "views/Splash/Splash"
import DevBio from "components/cards/DevBio"
import Spinner from "components/ui/Spinner"
import { PoliticianCard, DistrictCard, ElectionCard, MoreResultsCard } from "views/Search/SearchCards"
import { numberStringWithCommas } from "library/Functions"

configure({ adapter: new Adapter() })

describe("Render views", () => {
	test("About", () => {
		const aboutTest = shallow(<About />)
		expect(aboutTest).toMatchSnapshot()
	})

	test("Splash", () => {
		const splashTest = shallow(<Splash />)
		expect(splashTest).toMatchSnapshot()
	})
})

describe("Render components", () => {
	test("Dev card", () => {
		const devCard = shallow(
			<DevBio
				name="ayy lmao"
				bio="ayy lmao"
				role="ayy lmao"
				picture_path="https://i.kym-cdn.com/photos/images/newsfeed/000/092/076/1293393293093.jpg"
				commits={2020}
				issues={2020}
				tests={2020}
			/>
		)
		expect(devCard).toMatchSnapshot()
	})

	test("MoreResultsCard", () => {
		const moreResults = shallow(
			<MoreResultsCard 
				amount={10}
				model="ayy lmao"
				searchQuery="ayy lmao"
			/>
		)
		expect(moreResults).toMatchSnapshot()
	})

	test("PoliticianCard", () => {
		const politicianCard = shallow(
			<PoliticianCard 
				image="https://fivethirtyeight.com/wp-content/uploads/2015/07/natesilver2_light.jpg?w=575"
				name="Nate Silver"
				party="I"
				id={420}
				searchQuery="Nate"
				district= {{
					counties: ["FiveyFox"]
				}}
			/>
		)
		expect(politicianCard).toMatchSnapshot()
	})

	test("DistrictCard", () => {
		const districtCard = shallow(
			<DistrictCard 
				elected_officials={[
					{ name: "Nate Silver", party: "Dank"}
				]}
				counties={["Dallas"]}
				number={123}
				id={420}
				searchQuery="Nate"
			/>
		)
		expect(districtCard).toMatchSnapshot()
	})

	test("ElectionCard", () => {
		const electionCard = shallow(
			<ElectionCard 
				dates={{ election_day: "2020-03-03T06:00:00.000Z" }}
				district={{ number: 420, counties: ["AyyLmao"]}}
				type="general"
				office="us_senate"
				party="I"
				id={420}
				searchQuery="Nate"
			/>
		)
		expect(electionCard).toMatchSnapshot()
	})

	test("Spinner", () => {
		const spinner = shallow(<Spinner />)
		expect(spinner).toMatchSnapshot()
	})
})

describe("Library functions", () => {
	test("Commas", () => {
		const num = 123456789
		const commas = jest.fn((num) => numberStringWithCommas(num))
		commas(num)
		expect(commas).toHaveReturnedWith("123,456,789")
	})
})
