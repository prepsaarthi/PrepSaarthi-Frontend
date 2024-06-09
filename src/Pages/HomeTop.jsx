import React from "react";
import "./homeTop.css";
import { Box, Button, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CastleIcon from "@mui/icons-material/Castle";
import { Link } from "react-router-dom";
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

  return (
    <>
      <div className="_home-top-first">
        <div className="_home-top-left">
          <h2>
            A platform that empowers you with the{" "}
            <Typography
              component="span"
              variant="p"
              sx={{ color: "var(--button2)" }}
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
              width: { sm: "15vmax" },
              height: { sm: "4vmax" },
              fontWeight: 700,
            }}
            variant="contained"
          >
            Mentorship
          </Button>
          </Box>
          <Button
            size="large"
            sx={{
              bgcolor: "#ffc43b",
              width: { sm: "15vmax" },
              height: { sm: "4vmax" },
              fontWeight: 700,
              "&:hover": { bgcolor: "#ffce5d" },
            }}
            variant="contained"
          >
            Courses
          </Button>
        </div>
        <div className="_home-top-right">
          {/* <img
            className="_mob"
            src="https://unchaai.com/wp-content/uploads/2024/02/Untitled-design-1-1536x1418.png"
            alt="homepage"
          /> */}
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
        <Box display={'flex'} alignSelf={"center"} component={Link} to="/signup">
        <Button
          size="large"
          sx={{
            width: { sm: "12vmax" },
            height: { sm: "4vmax" },
            mt: "4vmax",
            mb: "3vmax",
            alignSelf: "center",
            bgcolor: "#ffc43b",
            fontWeight: 700,
            fontSize: "1vmax",
            "&:hover": { bgcolor: "#ffce5d" },
          }}
          className="_home-top-button"
          variant="contained"
        >
          Join Us
        </Button>
        </Box>
      </div>
    </>
  );
};

export default HomeTop;
