import React, { useEffect } from "react";
import Tab from "@mui/material/Tab";
import "./mentor.css";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import LockIcon from '@mui/icons-material/Lock';
import { Box, Tabs, Typography } from "@mui/material";
import MenorInfo from "../MentorInfo/MenorInfo";
import MenorInfoConnection from "../MenorInfoConnection/MenorInfoConnection";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError } from "../../action/userAction";
import Loader from "../../Components/Loader/Loader";
import EditIcon from "@mui/icons-material/Edit";
import MetaData from "../../utils/Metadata";
const Mentor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    if (isAuthenticated === false && stuAuth === false) {
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
                  </div>
                </div>
              </div>
              <div className="right__col">
                {user?.user?.signedUpFor === "mentor" &&
                user?.user?.role === "user" ? (
                  <>
                    {user?.user?.isStepLastCompleted === false ? (
                      <>
                        <Box>
                          <Typography>
                            Kindly complete the mentor application to activate
                            your Mentor's dashboard
                          </Typography>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box sx={{ position: "relative", minHeight: "40vmax" ,overflow:'hidden'}}>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Facere reprehenderit, odio voluptatem
                            explicabo, pariatur consectetur sequi amet animi,
                            obcaecati asperiores maxime? Necessitatibus ipsam
                            expedita itaque mollitia numquam officia sunt
                            molestiae velit? Distinctio eligendi similique
                            reprehenderit debitis consequuntur quas accusamus
                            aspernatur, labore a ab fugit voluptatem soluta,
                            autem esse eos suscipit?Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Officiis quae, saepe,
                            magni aperiam officia necessitatibus amet deleniti
                            suscipit eius voluptatem odit! Corporis eaque itaque
                            fuga nesciunt repellendus, excepturi delectus
                            tempore at, ipsum maiores dolorum commodi et error
                            laudantium cum sapiente quam saepe odio asperiores,
                            voluptatibus similique! Saepe, rem facilis eveniet
                            necessitatibus temporibus aliquid illo natus?
                            Perferendis assumenda aut voluptates.
                          </p>
                          <Box
                            sx={{
                              background: "rgba( 104, 146, 236, 0.35 )",
                              boxShadow:
                                "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                              backdropFilter: "blur(4px)",
                              WebkitBackdropFilter: "blur( 4px )",
                              borderRadius: "10px",
                              border: "1px solid rgba( 255, 255, 255, 0.18 )",
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              display:'flex',
                              alignItems:'center',
                              justifyContent:'center'
                            }}
                          >
                            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}> 
                              <LockIcon sx={{fontSize:'12vmax'}} />
                              <Typography sx={{fontSize:'1.5vmax'}}>
                                You can access your mentor's dashboard once your
                                account is verified{" "}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
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
