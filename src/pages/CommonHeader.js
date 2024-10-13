import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Select, MenuItem, FormControl, Box, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';
//import  {  NotificationIcon } from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsNoneOutlined from '@mui/icons-material/NotificationsNoneOutlined';

import PersonIcon from '@mui/icons-material/Person';
//import NotificationPopup from '../components/NotificationPopup'; // Import NotificationPopup
import '../css/Header.scss'; 
import Typography from "@mui/material/Typography";

import ProfileArrowIcon from '../css/profileHeaderArrowIcon.png';
import { Link } from "react-router-dom";
import Logout from '../css/logout.png';
//import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
 
const CommonHeader = () => {
    return (
        <AppBar 
          position="static"
          className="consoleHeaderContainer"
          style={{ background: "transparent", boxShadow: "none" }}>
                    <Toolbar  disableGutters>
                    <Grid container xs={12}>
                    <Grid item xs={2}>
                    <div className="academicDropdown">
                    <Select
                                defaultValue="2024-2025"
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="2024-2025">2024-2025</MenuItem>
                                <MenuItem value="2025-2026">2025-2026</MenuItem>
                            </Select>
                    </div>
                    </Grid>
                    </Grid>
                    <Grid
              item
              xs={5}
              className="headerRightBlock"
              style={{ marginRight: "0px" }}
            ></Grid>

            <Grid item xs={1} className="headerRightBlock">
              <Box sx={{ flexGrow: 0, display: "flex" }}>
  {/*               { Notification  }
 */}
                <div className="notification-block" style={{ display: "none" }}>
                  <Tooltip title="Notification">
                    <div className="notificationIconContainer">
                      <IconButton onClick={this.handleOpenNotification}>
                  {/*       <NotificationIcon /> */}
                      </IconButton>
                    </div>
                  </Tooltip>
                </div>

              {/*   { <NotificationPopup />} */}
                <Tooltip title="Profile Settings">
                  <IconButton
                    onClick={this.handleOpenUserMenu}
                    sx={{ p: 0 }}
                    className="profileSettingBlock"
                  >
                    <Avatar alt="Remy Sharp" src="" />
                    <img
                      src={ProfileArrowIcon}
                      alt=""
                      className="profileArrowIcon"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "25px" }}
                  id="menu-appbar"
                  className="headerProfilePicBlock"
                  anchorEl={this.state.anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(this.state.anchorElUser)}
                  onClose={this.handleCloseUserMenu}
                >
                  <div className="profileContainer">
                    <Grid container className="profileHeader">
                      <Grid item xs={2}>
                        <Avatar alt="Remy Sharp" src="" />
                      </Grid>
                      <Grid item xs={10}>
                        <Grid item xs={12}>
                          <h3>
                            {this.state.userDit
                              ? this.state.userDit.userName
                              : ""}
                          </h3>
                        </Grid>
                        <Grid item xs={12}>
                          <h6>
                            {this.state.userDit ? this.state.userDit.email : ""}
                          </h6>
                        </Grid>
                      </Grid>
                    </Grid>
                {/*     {data.map((menu) => (
                      <MenuItem
                        key={menu.menuId}
                        className="profileLinksBlock"
                        onClick={this.handleClick(menu.menuId)}
                        disabled={true}
                      >
                        <Typography textAlign="center" name={menu.menuName}>
                          {menu.menuName}
                        </Typography>
                      </MenuItem>
                    ))} */}
                    <Link to="/logout" className="">
                      <Grid container className="profileFooter">
                        <Grid item xs={12}>
                          <MenuItem className="profileLinksBlock">
                            <Typography textAlign="center">
                              <img src={Logout} alt="" />
                              Logout
                            </Typography>
                          </MenuItem>
                        </Grid>
                      </Grid>
                    </Link>
                  </div>
                </Menu>
              </Box>
            </Grid>
          
                    </Toolbar>
        </AppBar>
    );
};

export default CommonHeader;
