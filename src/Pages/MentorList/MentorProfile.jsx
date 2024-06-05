import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import "./mentorprofile.css";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import MentorIntro from "./MentorIntro";
import Authenticity from "./Authenticity";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../action/userAction";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import {
  clearError,
  getSuccessMentorConnection,
} from "../../action/metorListAction";
import toast from "react-hot-toast";
import RatingMentor from "./RatingMentor";
import ConfirmMentorShipPayment from "../ConfirmMentorShipPayment/ConfirmMentorShipPayment";

const MentorProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { error, loading, user } = useSelector((state) => state.mentorDeatil);
  const { user: stuUser, isAuthenticated } = useSelector(
    (state) => state.student
  );
  const {
    error: cError,
    loading: cLoading,
    connection,
  } = useSelector((state) => state.connectionCount);

  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getSuccessMentorConnection(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (cError) {
      toast.error(cError.message);
      dispatch(clearError());
    }
  });

  const [showPage, setShowPage] = useState(false);
  const [subscription, setSubscription] = useState({});
  const blue = {
    50: "#F0F7FF",
    100: "#C2E0FF",
    200: "#80BFFF",
    300: "#66B2FF",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    700: "#0059B2",
    800: "#004C99",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };
  const Tab = styled(BaseTab)`
    font-family: "IBM Plex Sans", sans-serif;
    color: #fff;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 600;
    background-color: transparent;
    width: 100%;
    padding: 10px 12px;
    margin: 6px;
    border: none;
    border-radius: 7px;
    display: flex;
    justify-content: center;

    &:hover {
      background-color: ${blue[400]};
    }

    &:focus {
      color: #fff;
      outline: 3px solid ${blue[200]};
    }

    &.${tabClasses.selected} {
      background-color: #fff;
      color: ${blue[600]};
    }

    &.${buttonClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  const TabPanel = styled(BaseTabPanel)(
    ({ theme }) => `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  border-radius: 12px;
  opacity: 0.9;
  `
  );

  const TabsList = styled(BaseTabsList)(
    ({ theme }) => `
  min-width: 400px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${
    theme.palette.mode === "dark" ? grey[900] : grey[200]
  };
  `
  );
  const navigate = useNavigate();
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {showPage ? (
            <ConfirmMentorShipPayment
              item={user}
              sub={subscription}
              stu={stuUser?.user}
            />
          ) : (
            <Box>
              <Box height="45vh" maxWidth="100vw">
                <Box
                  component="img"
                  src="https://i.ibb.co/FzMZGND/348231807-249642317657529-6749770682651908866-n.jpg"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                ></Box>
              </Box>
              <Box
                sx={{ minHeight: { xs: "125vh", md: "178vh", lg: "188vh" } }}
                position="relative"
                maxWidth="100vw"
              >
                <Box
                  position="absolute"
                  width="98%"
                  sx={{
                    top: "-40px",
                    borderRadius: "1vmax",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      top: 0,
                      left: 0,
                      zIndex: 1,
                      backdropFilter: "blur(20px)",
                      bgcolor: "#ffffffc4",
                      borderRadius: "0.8vmax",
                      minHeight: "100vh",
                    }}
                  ></Box>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      zIndex: 2,
                      borderRadius: "1vmax",
                      boxShadow:
                        "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/mentor1.png"
                      sx={{
                        width: 130,
                        aspectRatio: "1/1",
                        borderRadius: "50%",
                        objectFit: "cover",
                        objectPosition: "center",
                        position: "absolute",
                        top: -70,
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    ></Box>
                    <Box
                      sx={{
                        width: "100%",
                        mt: "60px",
                        p: { xs: "1vmax 10vmax", md: "5vmax 25vmax" },
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "center" },
                      }}
                    >
                      <Typography component="h1" variant="p">
                        {user?.name}
                      </Typography>
                      {!stuUser?.user?.activeAssignedMentors ? (
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <Button
                            variant="outlined"
                            sx={{ width: { xs: "18vmax", md: "12vmax" } }}
                            onClick={() => {
                              if (isAuthenticated) {
                                setShowPage(true);
                                setSubscription({
                                  type: "weekly",
                                  api: "xyz",
                                  price: user?.ppd,
                                });
                              } else {
                                toast(" Login To Buy Your Mentorship");
                                navigate("/login");
                              }
                            }}
                          >
                            &#8377;
                            {Intl.NumberFormat("en-IN").format(user?.ppd)}/week
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              width: { xs: "18vmax", md: "12vmax" },
                              ml: "1vmax",
                              mt: 0,
                            }}
                            onClick={() => {
                              if (isAuthenticated) {
                                setShowPage(true);
                                setSubscription({
                                  type: "monthly",
                                  api: "xyz",
                                  price: user?.ppm,
                                });
                              } else {
                                toast(" Login To Buy Your Mentorship");
                                navigate("/login");
                              }
                            }}
                          >
                            &#8377;
                            {Intl.NumberFormat("en-IN").format(user?.ppm)}/month
                          </Button>
                        </Box>
                      ) : (
                        <Typography
                          variant="p"
                          textAlign={"center"}
                          color={"green"}
                        >
                          You already have an active mentorship{" "}
                        </Typography>
                      )}
                    </Box>
                    <Box
                      width="100%"
                      sx={{ p: { xs: "1vmax", md: "0 25vmax" } }}
                    >
                      <Box
                        display="flex"
                        sx={{
                          justifyContent: { xs: "center", md: "flex-start" },
                        }}
                      >
                        <Typography
                          textAlign={"center"}
                          component="span"
                          variant="p"
                          mr="1vmax"
                        >
                          <strong>
                            {cLoading === false && connection?.count}{" "}
                          </strong>
                          Mentee
                        </Typography>
                        <Typography
                          textAlign={"center"}
                          component="span"
                          variant="p"
                          mr="1vmax"
                        >
                          <strong>{user?.ratings} </strong>
                          Ratings
                        </Typography>
                        <Typography
                          textAlign={"center"}
                          component="span"
                          variant="p"
                          mr="1vmax"
                        >
                          <strong>{user?.yearOfStudy} </strong>
                          Present Year
                        </Typography>
                      </Box>
                      <Box mt={"2vmax"}>
                        <Typography
                          component="p"
                          variant="p"
                          sx={{
                            lineHeight: 1.8,
                            letterSpacing: 0.5,
                            fontSize: { xs: "2vmax", md: "1.5vmax" },
                            fontWeight: 300,
                          }}
                        >
                          {user?.about}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        maxWidth: { xs: "100vw" },
                        p: { xs: "1vmax", md: "2vmax 10vmax" },
                        mt: { xs: "3vmax", md: "5vmax" },
                      }}
                    >
                      <Tabs defaultValue={0}>
                        <TabsList
                          sx={{ minWidth: "10px", width: { xs: "100%" } }}
                        >
                          <Tab value={0}>Mentor Video</Tab>
                          <Tab value={1}>Authenticity</Tab>
                          <Tab value={2}>Ratings</Tab>
                        </TabsList>
                        <TabPanel value={0}>
                          <MentorIntro />
                        </TabPanel>
                        <TabPanel value={1}>
                          <Authenticity
                            mentorName={user?.name}
                            idcard={user?.idCard}
                          />
                        </TabPanel>
                        <TabPanel value={2}>
                          <RatingMentor
                            mentorId={user?.id}
                            student={stuUser?.user}
                          />
                        </TabPanel>
                      </Tabs>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default MentorProfile;
