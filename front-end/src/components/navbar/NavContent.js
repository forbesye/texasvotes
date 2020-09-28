import React from 'react';
import PropTypes from "prop-types"
import { Menu } from 'antd';
import {Link} from "react-router-dom";
import routes from "../../Routes"

const NavContent = ({ orientation }) => {
    return (
        <Menu theme={ orientation === "horizontal" ? "dark" : "light"} mode={orientation}>
            
            { routes.map(({ linkPath, path, title }, i) => {
                return (
                    <Menu.Item key={i} >
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