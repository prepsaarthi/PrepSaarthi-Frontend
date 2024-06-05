import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

import { useSelector, useDispatch } from "react-redux";
import { clearError, clearMessage, logoutUser } from "../../action/userAction";
import {
  clearError as stuErrorClear,
  clearMessage as stuClrMssg,
  logoutUser as stuLogout,
} from "../../action/studentAction";
import toast from "react-hot-toast";

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, user, isAuthenticated, error } = useSelector(
    (state) => state.mentor
  );
  const {
    message: stuMessage,
    user: stuUser,
    isAuthenticated: stuAuth,
    error: stuError,
  } = useSelector((state) => state.student);
  const [loggedIn, setLogin] = React.useState(true);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  React.useEffect(() => {
    if (isAuthenticated || stuAuth) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [isAuthenticated, stuAuth]);

  React.useEffect(() => {
    if (error) {
      // toast.error(error)
      dispatch(clearError());
    }
    if (stuError) {
      // toast.error(error)
      dispatch(stuErrorClear());
    }
    if (message) {
      dispatch(clearMessage());
      toast.success(message);
      navigate("/login");
    }
    if (stuMessage) {
      dispatch(stuClrMssg());
      toast.success(stuMessage);
      navigate("/login");
    }
  }, [message, error, dispatch, navigate, stuMessage, stuError]);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
  };
  const handleNavigation = (e) => {
    setAnchorElUser(null);
    navigate("/role/mentor/final");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Box component="img" src="/images/logo.png" height={50}></Box>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "flex", md: "none", flexDirection: "column" },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/lists/mentors");
                }}
              >
                <Typography textAlign="center">Mentorship</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Box component="img" src="/images/logo.png" height={45}></Box>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              flexDirection: "row-reverse",
            }}
          >
            <Box display="flex">
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/lists/mentors");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Mentorship
              </Button>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {Boolean(loggedIn) || Boolean() ? (
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbarr"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      user?.user?.signedUpFor === "mentor" &&
                        navigate(`/user/${user?.user._id}`);
                      stuUser?.user?.signedUpFor === "student" &&
                        navigate(`/user/${stuUser?.user._id}`);
                    }}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  {user?.user.signedUpFor === "mentor" && (
                    <MenuItem onClick={handleNavigation}>
                      <Typography textAlign="center">
                        Mentor Application
                      </Typography>
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/update/profile/mentor");
                    }}
                  >
                    <Typography textAlign="center">Edit Profile</Typography>
                  </MenuItem>
                  {user?.user.role === "admin" && (
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        navigate("/admin/dashboard");
                      }}
                    >
                      <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      width={"100%"}
                      textAlign="center"
                      component="span"
                      onClick={() => {
                        if (user?.user?.signedUpFor === "mentor") {
                          dispatch(logoutUser());
                        } else if (stuUser?.user?.signedUpFor === "student") {
                          dispatch(stuLogout());
                        }
                      }}
                    >
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Box to="/login" component={Link}>
                  <IconButton components={Link} to="/login" sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Box>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
