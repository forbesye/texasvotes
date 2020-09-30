import React from 'react';
import PropTypes from "prop-types"
import { Menu } from 'antd';
import {Link} from "react-router-dom";
import routes from "../../Routes"
import styles from "./Navbar.module.css"

const NavContent = ({ orientation }) => {
    return (
        <Menu 
            className={ orientation === "horizontal" ? styles.menu : undefined }
            theme={ orientation === "horizontal" ? "dark" : "light"} 
            mode={orientation}
            selectable={false}
        >    
            { routes.map(({ linkPath, path, title }, i) => {
                return (
                    <Menu.Item key={i} className={orientation === "horizontal" ? styles.menuItem : undefined }>
                        <Link to={linkPath || path}>{title}</Link>
                    </Menu.Item>
                )
            })}
        </Menu>
    )
}

NavContent.propTypes = { orientation: PropTypes.oneOf(["vertical", "horizontal"]) }
NavContent.defaultProps = { orientation: "horizontal" }

export default NavContent;