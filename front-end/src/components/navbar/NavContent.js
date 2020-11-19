import React from "react"
import PropTypes from "prop-types"
import { Menu } from "antd"
import { Link } from "react-router-dom"
import routes from "../../Routes"
import styles from "./Navbar.module.css"

/**
 * Menu items for navbar
 * @param {string} orientation horizontal or vertical
 */
const NavContent = ({ orientation, noBackground }) => {
	const props = {
		className: orientation === "horizontal" ? styles.menu : "",
		theme: orientation === "horizontal" ? "dark" : "light",
		mode: orientation,
		selectable: false,
		style: noBackground ? { background: "none" } : {},
	}
	return (
		<Menu {...props}>
			{routes.map(
				({ linkPath, path, title, displayOnNavbar = false }, i) => {
					if (displayOnNavbar)
						return (
							<Menu.Item
								key={i}
								className={
									orientation === "horizontal"
										? styles.menuItem
										: undefined
								}
							>
								<Link to={linkPath || path}>{title}</Link>
							</Menu.Item>
						)
					else return null
				}
			)}
		</Menu>
	)
}

NavContent.propTypes = {
	orientation: PropTypes.oneOf(["vertical", "horizontal"]),
}
NavContent.defaultProps = { orientation: "horizontal" }

export default NavContent
