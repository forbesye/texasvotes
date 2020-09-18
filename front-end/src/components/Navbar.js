import React from 'react';
import { Box, Typography, Button, IconButton , Hidden} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
      <Box display="flex" bgcolor="grey.200" p={2} alignItems="center">
        <Hidden lgUp>
            <IconButton>
            <MenuIcon />
            </IconButton>
        </Hidden>
        <Typography>Fitsbits</Typography>
        <Hidden mdDown>
          <Box>
            <Link to="/">
              <Button color="primary">Home</Button>
            </Link>
            <Link to="/About">
              <Button color="primary">About</Button>
            </Link>
          </Box>
        </Hidden>
      </Box>
    );
  }
  
  export default Navbar;
  