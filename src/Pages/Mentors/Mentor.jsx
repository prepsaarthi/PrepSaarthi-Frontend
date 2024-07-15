import React, { useEffect } from "react";
import Tab from "@mui/material/Tab";
import "./mentor.css";
import LockIcon from "@mui/icons-material/Lock";
import { Box, Tabs, Typography } from "@mui/material";
import MenorInfo from "../MentorInfo/MenorInfo";
import MenorInfoConnection from "../MenorInfoConnection/MenorInfoConnection";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearError,
  clearMessage,
  updateMentoringStatus,
} from "../../action/userAction";
import Loader from "../../Components/Loader/Loader";
import EditIcon from "@mui/icons-material/Edit";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MetaData from "../../utils/Metadata";
import toast from "react-hot-toast";
const Mentor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading: statusLoading,
    user: mentoringStatus,
    error: statusError,
  } = useSelector((state) => state.status);
  const { error, loading, user, isAuthenticated } = useSelector(
    (state) => state.mentor
  );
  const {
    loading: stuLoading,
    user: stuUser,
    isAuthenticated: stuAuth,
  } = useSelector((state) => state.student);

  useEffect(() => {
    if (error) {
      if (error.message === "Resource not found _id") {
        navigate("/notfound");
      }
      dispatch(clearError());
    }
  }, [error, dispatch, navigate]);
  useEffect(() => {
    if (statusError) {
      toast.error(statusError.message);
      dispatch(clearError());
    }
    if (mentoringStatus?.success) {
      toast.success("Your Status Changed Successfully");
      dispatch(clearMessage());
    }
  }, [statusError, mentoringStatus, dispatch]);
  useEffect(() => {
    if (
      loading === false &&
      stuLoading === false &&
      isAuthenticated === false &&
      stuAuth === false
    ) {
      navigate("/login");
      return;
    }
    if (user?.user?.verified === false || stuUser?.user?.verified === false) {
      navigate("/verify/account");
      return;
    }
  }, [
    isAuthenticated,
    stuAuth,
    navigate,
    user?.user?.verified,
    stuUser?.user?.verified,
    loading,
    stuLoading,
  ]);

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        className="_mentor-inf0-section"
        style={{ height: "100%" }}
      >
        {value === index && <Box sx={{ height: "100%" }}>{children}</Box>}
      </div>
    );
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const mentorInfo = {
    name: "Dinesh Raj",
    college: "IIT BHU",
    exam: {
      name: "JEE ADV",
      rank: 5003,
    },
    branch: "CSE",
    rating: 4.5,
    mentee: 113,
    gradYr: 3,
    about:
      "Hey guy!! I Know it been  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla.",
    reviews: [
      {
        userCreated: "123456",
        userName: "Tarun Vishwkarma",
        rating: 4,
        review:
          "LoLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl l",
      },
      {
        userCreated: "123456",
        userName: "Tarun Vishwkarma",
        rating: 4,
        review:
          "LoLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl l",
      },
      {
        userCreated: "123456",
        userName: "Tarun Vishwkarma",
        rating: 1,
        review:
          "LoLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl l",
      },
      {
        userCreated: "123456",
        userName: "Tarun Vishwkarma",
        rating: 3,
        review:
          "LoLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl l",
      },
    ],
  };

  return (
    <>
      {loading || stuLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Your Profile" />
          <div className="header__wrapper">
            <div className="cols__container">
              <div className="left__col">
                <div className="_college-background">
                  <img
                    src="https://i.ibb.co/FzMZGND/348231807-249642317657529-6749770682651908866-n.jpg"
                    alt={mentorInfo.college}
                  />
                  <div className="img__container">
                    <img
                      src={
                        user?.user?.avatar?.public_URI ||
                        stuUser?.user?.avatar?.public_URI
                      }
                      alt={user?.user?.name || stuUser?.user?.name}
                    />
                    <Link
                      to={
                        user?.user?.role === "mentor" ||
                        user?.user?.role === "user" ||
                        user?.user?.role === "admin"
                          ? "/update/profile/mentor"
                          : stuUser?.user?.role === "student" &&
                            "/update/profile/student"
                      }
                    >
                      {" "}
                      <EditIcon
                        sx={{
                          position: "absolute",
                          bottom: "10px",
                          right: "-5px",
                          bgcolor: "var(--button1)",
                          borderRadius: "50%",
                          fontSize: "35px",
                          padding: "5px",
                          color: "white",
                          transition: "0.3s",
                          "&:hover": {
                            fontSize: "40px",
                          },
                        }}
                      />
                    </Link>
                  </div>
                </div>
                <div className="_mentor-profile-and-name">
                  <div className="_mentor-initals">
                    <h2>{user?.user?.name || stuUser?.user?.name}</h2>
                    <p>
                      {user?.user?.collegeName}
                      {user?.user?.branch}
                    </p>
                    <p>
                      {user?.user?.mobileNumber || stuUser?.user?.mobileNumber}
                    </p>

                    <p>{user?.user?.email || stuUser?.user?.email}</p>

                    <p>
                      {user?.exam?.name === "jeemains" && (
                        <span>JEE MAINS({user?.exam?.rank})</span>
                      )}
                      {user?.exam?.name === "jeeadv" && (
                        <span>JEE ADV({user?.exam?.rank})</span>
                      )}
                      {user?.exam?.name === "bitsat" && (
                        <span>BITSAT({user?.exam?.rank})</span>
                      )}
                    </p>
                    {user?.user?.isStepLastCompleted &&
                      user?.user?.role === "mentor" && (
                        <FormControl sx={{ p: 2 }}>
                          <FormLabel
                            id="demo-radio-buttons-group-label"
                            disabled={statusLoading}
                          >
                            Your Status
                          </FormLabel>
                          <hr />
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={
                              user?.user?.mentoringStatus === "active"
                                ? "active"
                                : "inactive"
                            }
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="active"
                              control={<Radio />}
                              label="Active"
                              onClick={() =>
                                dispatch(updateMentoringStatus("active"))
                              }
                            />
                            <FormControlLabel
                              value="inactive"
                              control={<Radio />}
                              label="Inactive"
                              onClick={() =>
                                dispatch(updateMentoringStatus("inactive"))
                              }
                            />
                          </RadioGroup>
                        </FormControl>
                      )}
                  </div>
                </div>
              </div>
              <div className="right__col">
                {user?.user?.signedUpFor === "mentor" &&
                user?.user?.role === "user" ? (
                  <>
                    {user?.user?.isStepLastCompleted === false ? (
                      <>
                        <Box
                          sx={{
                            background: "rgba( 255, 255, 255, 0.25 )",
                            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                            backdropFilter: " blur( 13px )",
                            borderRadius: "10px",
                            border: "1px solid rgba( 255, 255, 255, 0.18 )",
                            height: { xs: "60vh", md: "96%" },
                            width: "95%",
                            margin: "10px auto",
                            display: "flex",
                            textAlign: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            p: 2,
                          }}
                        >
                          <LockIcon
                            sx={{
                              color: "grey",
                              fontSize: { xs: "6vmax", md: "3vmax" },
                            }}
                          />
                          <Typography
                            component="h2"
                            variant="p"
                            color={"grey"}
                            sx={{ fontSize: { xs: "2vmax", md: "1.8vmax" } }}
                          >
                            Kindly complete the mentor application to activate
                            your Mentor's dashboard
                          </Typography>
                        </Box>
                      </>
                    ) : (
                      <>
                        {/* <Box
                          sx={{
                            position: "relative",
                            minHeight: "40vmax",
                            overflow: "hidden",
                          }}
                        >
                         */}
                            <Box
                            
                            sx={{
                              background: "rgba( 255, 255, 255, 0.25 )",
                              boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                              backdropFilter: " blur( 13px )",
                              borderRadius: "10px",
                              border: "1px solid rgba( 255, 255, 255, 0.18 )",
                              height: { xs: "60vh", md: "96%" },
                              width: "95%",
                              margin: "10px auto",
                              display: "flex",
                              textAlign: "center",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              p: 2,
                            }}
                            >
                              <LockIcon
                                sx={{
                                  fontSize: { xs: "3.8vmax", md: "2.8vmax" },
                                  color: "grey",
                                }}
                              />
                              <Typography
                                component="h2"
                                variant="p"
                                color={"grey"}
                                sx={{
                                  fontSize: { xs: "2vmax", md: "1.8vmax" },
                                }}
                              >
                                {user?.user?.updateRequest === "yes" ? (
                                  <>
                                    You can access your mentor's dashboard once
                                    your changes are approved{" "}
                                  </>
                                ) : (
                                  <>
                                    You can access your mentor's dashboard once
                                    your account is verified{" "}
                                  </>
                                )}
                              </Typography>
                            </Box>
                          {/* </Box> */}
                        
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Box sx={{ width: "100%" }}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          aria-label="basic tabs example"
                          sx={{
                            justifyContent: "center",
                            backgroundColor: "#2b2b2b",
                          }}
                        >
                          <Tab
                            sx={{ minWidth: "50%", color: "white" }}
                            label="Active Mentorship"
                            {...a11yProps(0)}
                          />
                          <Tab
                            sx={{ minWidth: "50%", color: "white" }}
                            label="Past Mentoships"
                            {...a11yProps(1)}
                          />
                        </Tabs>
                      </Box>
                      <CustomTabPanel value={value} index={0}>
                        {stuLoading === false &&
                          stuUser?.user?.role === "student" && (
                            <MenorInfo active={true} />
                          )}
                        {loading === false && user?.user?.role === "mentor" && (
                          <MenorInfoConnection active={true} />
                        )}
                      </CustomTabPanel>
                      <CustomTabPanel value={value} index={1}>
                        {stuLoading === false &&
                          stuUser?.user?.role === "student" && (
                            <MenorInfo active={false} />
                          )}
                        {loading === false && user?.user?.role === "mentor" && (
                          <MenorInfoConnection active={false} />
                        )}
                      </CustomTabPanel>
                    </Box>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Mentor;
