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
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useSelector, useDispatch } from "react-redux";
import { clearError, clearMessage, logoutUser } from "../../action/userAction";
import {
  clearError as stuErrorClear,
  clearMessage as stuClrMssg,
  logoutUser as stuLogout,
} from "../../action/studentAction";
import toast from "react-hot-toast";

const drawerWidth = 240;
const navItems = [
  {item:'Login/Signup',
    link:'/signup'
  },
  {item:'Home',
    link:'/'
  },
  {item:'Our Mentors',
    link:'/lists/mentors'
  },
  {item:'Become a mentor',
    link:'/signup'
  },
  {item:'FAQs',
    link:'/#_faq-end'
  },
  {item:'About us',
    link:'/signup'
  },
  {item:'Settings',
    link:'/signup'
  },
];

function ResponsiveAppBar(props) {
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

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
  };
  const handleNavigation = (e) => {
    setAnchorElUser(null);
    navigate("/role/mentor/final");
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        PrepSaarthi
      </Typography>
      <Divider />
      <List sx={{flexDirection:'column'}}>
        {navItems.map((item, i) => (
          <Link to={item.link} >
          <ListItem key={i} disablePadding>
            <ListItemButton sx={{ textAlign: 'center', color:'black' }} >
              <ListItemText primary={item.item} />
            </ListItemButton>
          </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <>
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
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
            {/* <Menu
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
            </Menu> */}
             <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item, i) => (
              <Button key={i} sx={{ color: '#fff' }}>
                {item.item}
              </Button>
            ))}
          </Box>
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
                  <Avatar alt="Remy Sharp" src={user?.user?.avatar?.public_URI || stuUser?.user?.avatar?.public_URI}/>
                </IconButton>
                <Menu
                  sx={{ mt: "45px",display:'flex', flexDirection:'column' }}
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
                      if(user?.user.role === "admin"|| user?.user.role === "mentor"){
                      navigate("/update/profile/mentor");
                    }else if(stuUser?.user.role === "student"){
                        navigate("/update/profile/student");
                      }
                      
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
                  {/* <IconButton components={Link} to="/login" sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton> */}
                  <Link to="/signup">
                    <Button
                      variant="contained"
                      disableElevation
                      sx={{
                        bgcolor: "#0054a7",
                        width: {xs:"10vmax", md:'8vmax'},
                        ml: "1vmax",
                        fontSize:{xs:'1.2vmax', md:'0.9vmax'}
                      }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </Box>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}
export default ResponsiveAppBar;
