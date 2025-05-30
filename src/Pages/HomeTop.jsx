import React from "react";
import "./homeTop.css";
import { Box, Button, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CastleIcon from "@mui/icons-material/Castle";
import CloseIcon from '@mui/icons-material/Close';
import {Modal } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import FlipBook from "./FlipBook";
import Roles from "./Roles.jsx";
import { useSelector } from "react-redux";
const HomeTop = () => {
  const HomeTopSecond = [
    {
      icon: <ImportContactsIcon />,
      heading: "Preparing For JEE ",
      para: "Boost the chances of selection with the help of veterans themselves",
      link: "somelink",
    },
    {
      icon: <CastleIcon />,
      heading: "Searching For College",
      para: "Seize top college opportunities with expert guidance! Don't settle for less", 
      link: "somelink",
    },
    {
      icon: <SchoolIcon />,
      heading: "College Students",
      para: "Earn by guiding your juniors and help them thrive from your experience",
      link: "somelink",
    },
  ];
  const {
    loading: menLoading,
    isAuthenticated: menAuth,
  } = useSelector((state) => state.mentor);
  const {
    loading: stuLoading,
    isAuthenticated,
  } = useSelector((state) => state.student);
  // const [, setSrc] = useState(window.innerWidth)
  // const [src, setSrc] = useState(window.innerWidth)
  // useEffect(() => {
  //   if(window.innerWidth <= 850){
  //     setSrc("/images/path.jpg")
  //   }
  //   else{
  //     setSrc("/images/home.png")
  //   }
  // }, [window.innerWidth])
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100vh",
    bgcolor: "background.paper",
    borderRadius: "10px",
    outline: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 1,
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur( 13px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
  };
  const [open, setOpen] = React.useState(false);
  const [openJoin, setOpenJoin] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate()
  const handleCloseJoin = () => {
    setOpenJoin(false);
  };
  const handleOpenJoin = () => {
    setOpenJoin(true);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <div className="_home-top-first">
        <div className="_home-top-left">
          <h2>
            A platform that empowers you with the{" "}
            <Typography
              component="p"
              variant="p"
              sx={{
                color: "var(--button2)",
                fontSize: { xs: "3.5vmax", md: "2vmax" },
                display: { xs: "block", md: "inline" },
                fontWeight: { xs: 900 },
              }}
            >
              "FREEDOM OF CHOICE"
            </Typography>{" "}
            to select your mentor
          </h2>
          {/* <h2> That Empowers You</h2> */}
          <p>
            {/* Top mentors from IIT and Tier 1 colleges ready to make you thrive!!! */}
            Connect with IIT-JEE Toppers through PrepSaarthi and take your
            preparation to next level
          </p>
          <Box component={Link} to="/lists/mentors">
            <Button
              size="large"
              sx={{
                bgcolor: "#3A5AFF",
                m: { xs: "2vmax", sm: 0 },
                mr: { sm: "2vmax" },
                mb:{sm:'1vmax', md:0},
                width: { xs: "25vmax" ,sm:'16vmax', md:'15vmax', lg:'15vmax'},
                height: { xs: "8vmax", sm:'5vmax',md:'4vmax', lg:'4vmax' },
                fontWeight: 700,
                fontSize:{xs:'1.8vmax', sm:'1.2vmax',md:'1vmax'}
              }}
              variant="contained"
            >
              Explore Your Mentor
            </Button>
          </Box>
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
      <Button
        size="large"
        sx={{
          bgcolor: "#ffc43b",
          m: { xs: "2vmax", sm: 0 },
          mr: { sm: "2vmax" },
          mb: { sm: '1vmax', md: 0 },
          width: { xs: "25vmax", sm: '16vmax', md: '15vmax', lg: '15vmax' },
          height: { xs: "8vmax", sm: '5vmax', md: '4vmax', lg: '4vmax' },
          fontWeight: 700,
          fontSize: { xs: '1.8vmax', sm: '1.2vmax', md: '1vmax' },
          "&:hover": { bgcolor: "#ffce5d" },
        }}
        variant="contained"
        onClick={handleOpen}
      >
        Products
      </Button>

      <Box
        sx={{
          position: 'absolute',
          top: {xs:'35px',md:'25px'}, 
          right: {xs:'5px',md:'20px'}, 
          bgcolor: '#ff4081', 
          color: '#fff', 
          borderRadius: '4px',
          px: 1, 
          fontSize: { xs: '0.75rem', sm: '0.85rem' },
          transform: 'rotate(45deg)', 
          transformOrigin: 'top right', 
        }}
      >
        Free
      </Box>
    </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
            
              <Box
                sx={{
                  bgcolor: "white",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <CloseIcon 
                onClick={handleClose}
                sx={{position:'absolute',
                  top:'10px',
                  right:'10px',
                  cursor:'pointer',
                  zIndex:1111
                }}/>
                {menLoading === false && stuLoading === false && !isAuthenticated && !menAuth && (
            <Box sx={{ bgcolor: '#ffc43b', borderRadius: 2, p: 3, boxShadow: 2, textAlign: 'center',width: { xs: "100%", md: "100%" },display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <Typography variant="h5" component="div" sx={{ mb: 2, color: '#1976d2' }}>
                Login to Avail Free Products
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#555' }}>
                Unlock exclusive access to our collection of free products by logging in now!
              </Typography>
              <Button variant="contained" color="primary" onClick={() => {navigate('/login')}}>
                Login
              </Button>
            </Box>
          )}
          
          {menLoading === false && stuLoading === false && menAuth && (
            <Box sx={{ bgcolor: '#ff766c', borderRadius: 2, p: 3, boxShadow: 2, textAlign: 'center',width:'100%',display:'flex', flexDirection:'column', justifyContent:'center'}}>
              <Typography variant="h5" component="div" sx={{ mb: 2, color: '#fff' }}>
    Hey Mentors! 🌟
  </Typography>
              <Typography variant="body2" sx={{ color: '#fff' }}>
    Our products are currently on a little vacation with the students! 🏖️ 
    <br/>
    But don’t worry, new products will be available for you soon. <br/>
    <strong >Thanks for your patience!</strong>
  </Typography>
            </Box>
          )}
                 {menLoading === false && stuLoading === false && isAuthenticated  && (
                 
             <FlipBook />
          )}
                

              </Box>
            </Box>
          </Modal>
        </div>
        <div className="_home-top-right">
          <img className="_mob" src="/images/boy.png" alt="homepage" />
          {/* <img src="/images/path.jpg" alt="homepage" /> */}
        </div>
      </div>
      <div className="_home-top-second">
        <h2 className="_home-middle-heading">Who is PrepSaarthi for?</h2>
        <div>
          {HomeTopSecond.map((item, index) => (
            <div className="_suitable-for-whom" key={index}>
              {item.icon}
              <h3>{item.heading}</h3>
              <p>{item.para}</p>
            </div>
          ))}
        </div>
        {/* <Box
          display={"flex"}
          alignSelf={"center"}
          component={Link}
          to="/signup"
        > */}
          <Button
            size="large"
            sx={{
              width: { xs: "18vmax", sm: "12vmax" },
              height: { xs: "6vmax", sm: "4vmax" },
              mt: { xs: "1vmax", md: "4vmax" },
              mb: "3vmax",
              alignSelf: "center",
              bgcolor: "#ffc43b",
              fontWeight: 700,
              fontSize: { xs: "2vmax",sm:'1.2vmax', md: "1vmax" },
              "&:hover": { bgcolor: "#ffce5d" },
            }}
            className="_home-top-button"
            variant="contained"
            onClick={handleOpenJoin}
          >
            Join Us
          </Button>
          <Modal
            open={openJoin}
            onClose={handleCloseJoin}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
            
              <Box
                sx={{
                  width: { xs: "90%", md: "40%" },
                  height: { xs: "80%", md: "60%" },
                  bgcolor: "white",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <CloseIcon 
                onClick={handleCloseJoin}
                sx={{position:'absolute',
                  top:'10px',
                  right:'10px',
                  cursor:'pointer'
                }}/>
             <Roles />
              </Box>
            </Box>
          </Modal>
        {/* </Box> */}
      </div>
    </>
  );
};

export default HomeTop;
