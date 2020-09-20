import React from 'react';
import PropTypes from "prop-types"
import { Menu } from 'antd';
import {Link} from "react-router-dom";

const NavContent = ({ orientation }) => {
    return (
        <Menu theme={ orientation === "horizontal" ? "dark" : "light"} mode={orientation}>
            <Menu.Item key="home">
                <Link to="/">
                    Home
                </Link>
            </Menu.Item>
            <Menu.Item key="about">
                <Link to="/about">
                    About
                </Link>
            </Menu.Item>
        </Menu>
    )
}

NavContent.propTypes = { orientation: PropTypes.oneOf(["vertical", "horizontal"]) }
NavContent.defaultProps = { orientation: "horizontal" }

export default NavContent;