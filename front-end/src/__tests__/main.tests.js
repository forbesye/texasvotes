import React from "react"
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import About from "views/About/About"
import Splash from "views/Splash/Splash"
import DevBio from "components/cards/DevBio"
import Spinner from "components/ui/Spinner"
import Politicians from "views/Politicians/Politicians"
import { numberStringWithCommas, monthDayYearParse } from "library/Functions"

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

	test("Politicians", () => {
		const politicianTest = shallow(<Politicians />)
		expect(politicianTest).toMatchSnapshot()
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
