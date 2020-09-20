import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
// import { Box, Typography, Button, IconButton , Hidden} from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";
import NavContent from './NavContent';


const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="menuCon">
        <div className="leftMenu">
          <NavContent />
        </div>
        <Button className="barsMenu" type="primary" onClick={() => setOpen(true)} >
          <span className="barsBtn" />
        </Button>
        <Drawer 
          placement="right"
          closable={false}
          onClose={() => setOpen(false)}
          visible={open}
        >
          <NavContent />
        </Drawer>
      </div>
    </nav>
  )
}

  export default Navbar;
  