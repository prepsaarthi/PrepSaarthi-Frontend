import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Grid, Icon } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PeopleIcon from "@mui/icons-material/People";
import "./homemiddle.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper/modules";

const HomeMiddle = () => {
  const isSmallScreen = useMediaQuery("(max-width:850px)");

  const mentors = [
    {
      name: "Parthav Verma",
      rank: 8213,
      exam: "JEE ADV",
      college: "IIT MANDI",
      branch: "IT",
      images: "/images/mentor2.png",
    },
    {
      name: "Dinesh Raj",
      rank: 5003,
      exam: "JEE ADV",
      college: "IIT BHU",
      branch: "CSE",
      images: "/images/mentor1.png",
    },
    {
      name: "Praveera Singh",
      rank: 2003,
      exam: "BITSAT",
      college: "IIT Roorke",
      branch: "CSE",
      images: "/images/mentor1.png",
    },
    {
      name: "Dinesh Raj",
      rank: 5003,
      exam: "JEE MAIN",
      college: "NSUT",
      branch: "CSE",
      images: "/images/mentor2.png",
    },
  ];

  const services = [
    {
      img: "https://www.exprto.com/images/1on1meetings.png",
      serviceName: "1:1 Discussions With The Mentors",
    },
    {
      img: "https://www.exprto.com/images/Guidance.jpeg",
      serviceName: "Steps to organize your daily activities",
    },
    {
      img: "https://www.exprto.com/images/pic-6.jpg",
      serviceName:
        "Continuous tracking of progress and making strategies of it",
    },
    {
      img: "https://www.exprto.com/images/grp-1.webp",
      serviceName: "Interactive Group/Team Sessions",
    },
    {
      img: "https://www.exprto.com/images/Individual.jpeg",
      serviceName: "Individual Guidance to Students",
    },
    {
      img: "https://www.exprto.com/images/timemanagement1.png",
      serviceName: "Secret Tips and Tricks by your selected Saarthi",
    },
    // {
    //   img: "https://www.exprto.com/images/Evaluationin.jpg",
    //   serviceName: "Continuous Evaluation of Progress",
    // },
    //
    //   img: "https://www.exprto.com/images/retention.png",
    //   serviceName: "Building Retention Skills for You",
    // },
  ];
  const steps = [
    {
      img: (
        <>
          <BadgeIcon sx={{ fontSize: "6vmax" }} />
        </>
      ),
      steps: "Register/Login",
      description: "1:1 Discussions With The Mentors",
    },
    {
      img: (
        <>
          <PersonSearchIcon sx={{ fontSize: "6vmax" }} />
        </>
      ),
      steps: "Select your mentor",
      description:
        'We provide you "Freedom Of Choice" to select mentor as per your wish',
    },
    {
      img: (
        <>
          <CurrencyRupeeIcon sx={{ fontSize: "6vmax" }} />
        </>
      ),
      steps: "Make a payment",
      description: "Choose a payment method and click Pay Now",
    },
    {
      img: (
        <>
          <PeopleIcon sx={{ fontSize: "6vmax" }} />
        </>
      ),
      steps: "Connect to your mentor",
      description: "Selected mentor will reach out to you",
    },
  ];
  return (
    <>
      <div className="_home-middle">
        <h2 className="_home-middle-heading">Mentors</h2>
        <div className="_mentor-swiper">
          <Swiper
            slidesPerView={window.innerWidth <= 850 ? 1 : 2}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            autoplay={true}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            {mentors.map((item, index) => (
              <SwiperSlide>
                <div className="_mentor-card" key={index}>
                  <div className="_home-miidle-mentor-info">
                    <h2>{item.name}</h2>
                    <p>
                      AIR - {item.rank} ({item.exam})
                    </p>
                    <p>
                      {item.college} {item.branch}
                    </p>
                    <Link to="mentor/mentorId">See more...</Link>
                  </div>
                  <div className="_home-miidle-mentor-img">
                    <img src={item.images} alt={item.name} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <h2 className="_home-middle-heading">How do we work?</h2>
        <div className="_how-work">
          {services.map((item, i) => (
            <Card
              key={i}
              raised={true}
              sx={{
                height: isSmallScreen ? 200 : 330,
                width: "95%",
                borderRadius: "1.5vmax",
              }}
            >
              <CardActionArea
                sx={{
                  padding: "1.2vmax",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.img}
                  alt="green iguana"
                  sx={{
                    height: isSmallScreen ? 130 : 200,
                    borderRadius: "1vmax",
                    objectFit: "cover",
                  }}
                />
                <CardContent sx={{ padding: 0, mt: "1vmax" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    textAlign="start"
                    sx={{
                      fontSize: isSmallScreen ? "1.4vmax" : "1.2vmax",
                      textAlign: isSmallScreen ? "center" : "start",
                      fontWeight: "600",
                    }}
                  >
                    {item.serviceName}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
        <Box
          sx={{
            display: { xs: "block", md: "flex" },
            width: "90%",
            m: { xs: "0 auto", md: "6vmax auto" },
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="p"
              sx={{
                fontSize: "2.6vmax",
                fontWeight: 900,
                color: "#333333",
                textAlign: { xs: "center", md: "start" },
                display: { xs: "none", md: "block" },
              }}
            >
              How To Get Started?
            </Typography>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <h2 className="_home-middle-heading">How do get started?</h2>
            </Box>
            <Typography
              variant="p"
              sx={{
                fontSize: "1.5vmax",
                fontWeight: 500,
                textAlign: { xs: "center", md: "start" },
              }}
            >
              By following this 4 steps you can be a member of PrepSaarthi
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Grid container>
              {steps.map((item, i) => (
                <Grid item xs={6}>
                  <Card
                    key={i}
                    raised={true}
                    sx={{
                      height: isSmallScreen ? 200 : 330,
                      m: "1vmax",
                      width: "95%",
                      borderRadius: "1.5vmax",
                    }}
                  >
                    <CardActionArea
                      sx={{
                        padding: "1.2vmax",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                      }}
                    >
                      {/* <CardMedia
                component="img"
                image={item.img}
                alt="green iguana"
                sx={{
                  height: isSmallScreen ? 130 : 200,
                  borderRadius: "1vmax",
                  objectFit: "cover",
                }}
              /> */}
                      <Icon
                        sx={{
                          fontSize: "9vmax",
                          border: "0.3px solid grey",
                          alignSelf: { xs: "center", md: "start" },
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {item.img}
                      </Icon>
                      <CardContent sx={{ padding: 0, mt: "1vmax" }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          textAlign="start"
                          sx={{
                            fontSize: isSmallScreen ? "1.4vmax" : "1.2vmax",
                            textAlign: isSmallScreen ? "center" : "start",
                            fontWeight: "600",
                          }}
                        >
                          {item.steps}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          textAlign="start"
                          sx={{
                            fontSize: isSmallScreen ? "1.4vmax" : "1.2vmax",
                            textAlign: isSmallScreen ? "center" : "start",
                            fontWeight: "600",
                          }}
                        >
                          {item.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default HomeMiddle;
