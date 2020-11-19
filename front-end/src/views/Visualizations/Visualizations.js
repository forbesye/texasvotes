import React from "react"
import { Typography } from "antd"
import styles from "./Visualizations.module.css"
import {
	ConservationStatus,
	OrganizationYears,
	CountryOrganization,
} from "views/Visualizations/Provider"
import {
	ElectionsChart,
	DistrictsChart,
	PoliticiansChart,
} from "views/Visualizations/TexasVotesVisualizations"

const { Title, Paragraph, Link } = Typography

const Visualizations = () => {
	return (
		<main className={styles.wrapper}>
			<Title level={1} className={styles.header}>
				Visualizations
			</Title>
			<Title level={2}>Our Visualizations</Title>
			<PoliticiansChart />
			<ElectionsChart />
			<DistrictsChart />
			<Title level={2}>Provider Visualizations</Title>
			<OrganizationYears />
			<ConservationStatus />
			<CountryOrganization />
		</main>
	)
}

export default Visualizations
