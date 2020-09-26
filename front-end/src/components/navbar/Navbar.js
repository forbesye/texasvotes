import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import Icon, { MenuOutlined } from '@ant-design/icons';
import NavContent from './NavContent';

import styles from "./Navbar.module.css"
console.log(styles)

const Navbar = () => {
	const [open, setOpen] = useState(false);
	return (
		<nav className={styles.nav}>
			<div className={styles.leftNav}>
				<NavContent />
			</div>
			<div className={styles.rightNav}>
				<Button className={styles.hamburger} type="primary" onClick={() => setOpen(true)} >
					<Icon component={MenuOutlined} />
				</Button>
			</div>
			<Drawer 
				placement="right"
				closable={false}
				onClose={() => setOpen(false)}
				onClick={() => setOpen(false)}
                visible={open}
                headerStyle={{ padding: 12, height: 12, width: 12, background: "pink" }}
                bodyStyle={{ padding: 0 }}
			>
				<NavContent orientation="vertical"/>
			</Drawer>
		</nav>
	)
}

export default Navbar;
	