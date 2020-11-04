import React, { useState, useEffect, Fragment, useRef } from "react"
import { Typography, Divider, Card, Pagination, Select } from "antd"
import { Link, useHistory } from "react-router-dom"
import styles from "./Politicians.module.css"
import { description } from "./Lib"
import { getAPI } from "library/APIClient"
import {
	CountiesFilter,
	PartiesFilter,
	OfficeFilter,
	DistrictNumberFilter,
} from "library/FilterValues"
import { changeFilter } from "library/Functions"
import { colorHexMap } from "library/Mappings"
import Spinner from "components/ui/Spinner"

const { Title, Paragraph, Text } = Typography
const { Meta } = Card
const { Option } = Select

export default function GridView() {
	const history = useHistory()
	const [loading, setLoading] = useState(true)
	const [gridData, setGridData] = useState([])
	const [currPage, setCurrPage] = useState(1)
	const [total, setTotal] = useState(20)
	const [countiesFilter, setCountiesFilter] = useState("")
	const [partyFilter, setPartyFilter] = useState("")
	const [officeFilter, setOfficeFilter] = useState("")
	const [districtFilter, setDistrictFilter] = useState(0)
	const [sortVal, setSortVal] = useState("name")
	const gridRef = useRef(null)

	const handlePaginationChange = (page) => {
		setCurrPage(page)
		window.scrollTo({
			top: gridRef.current.offsetTop - 30,
			behavior: "smooth",
		})
	}

	useEffect(() => {
		const fetchData = async () => {
            try {
                setLoading(true)
                let params = { page: currPage }
                if (districtFilter) {
                    params.number = districtFilter
                }
                if (countiesFilter) {
                    params.counties = countiesFilter
                }
                if (partyFilter) {
                    params.party = partyFilter
                }
                if (officeFilter) {
                    params.office = officeFilter
                }
                params.sort = sortVal
                const { page, count } = await getAPI({
                    model: "politician",
                    params: params,
                })
                setTotal(count)
                setGridData(page)
                setLoading(false)
            } catch (err) {
				history.push("/error")
            }
		}
		fetchData()
	}, [
		currPage,
		sortVal,
		countiesFilter,
		partyFilter,
		officeFilter,
		districtFilter,
	])

	return (
		<Fragment>
			<section className={styles.content}>
				<Title level={2}>View All</Title>
				<Paragraph style={{ fontSize: 18 }}>
					Have you ever wondered what all Texas officials and
					candidates look like in a grid view? Probably not, but we've
					got you covered here. The grid can also be filtered and
					sorted by different properties to make your viewing
					experience more customizable.
				</Paragraph>
			</section>
			<Divider />
			<section className={styles.filterSection}>
				<Title level={3}>Filter</Title>
				<CountiesFilter onChange={changeFilter(setCountiesFilter)} />
				<PartiesFilter onChange={changeFilter(setPartyFilter)} />
				<OfficeFilter onChange={changeFilter(setOfficeFilter)} />
				<DistrictNumberFilter
					onChange={changeFilter(setDistrictFilter)}
				/>
				<Title level={3}>Sort</Title>
				<div style={{ marginBottom: 20, textAlign: "center" }}>
					<Title level={5}>Order</Title>
					<Select
						size="large"
						defaultValue="name"
						style={{ width: 150 }}
						onChange={setSortVal}
					>
						<Option key={"name"} value="name">
							Name: A - Z
						</Option>
						<Option key={"-name"}>Name: Z - A</Option>
						<Option key={"number"}>District (Asc.)</Option>
						<Option key={"-number"}>District (Desc.)</Option>
					</Select>
				</div>
			</section>
			<section className={styles.sortSection}></section>

			{!loading ? (
				<section className={styles.grid} ref={gridRef}>
					{gridData.map((item) => (
						<Link key={item.id} to={`/politicians/view/${item.id}`}>
							<Card
                                hoverable
                                style={{
                                    height: "100%"
                                }}
								cover={
									<img
										className={styles.croppedImage}
										alt={item.name}
										src={item.image}
									/>
								}
							>
								<div
									className={styles.circle}
									style={{
										background: colorHexMap[item.party],
									}}
								>
									{item.party}
								</div>
								<Meta
									title={
										<Text style={{ fontSize: 20 }}>
											{item.name}
										</Text>
									}
									description={
										<Text style={{ fontSize: 18 }}>
											{description(item)}{" "}
										</Text>
									}
								/>
							</Card>
						</Link>
					))}
				</section>
			) : (
				<Spinner style={{ margin: "auto" }} />
			)}
			<Pagination
				total={total}
				defaultCurrent={1}
				defaultPageSize={20}
				onChange={handlePaginationChange}
				pageSizeOptions={[]}
				style={{
					margin: "16px 0",
					display: "flex",
					justifyContent: "flex-end",
				}}
			/>
		</Fragment>
	)
}
