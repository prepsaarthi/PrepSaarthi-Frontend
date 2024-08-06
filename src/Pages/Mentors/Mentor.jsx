import React, { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import "./mentor.css";
import LockIcon from "@mui/icons-material/Lock";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Tabs,
  Typography,
} from "@mui/material";
import MenorInfo from "../MentorInfo/MenorInfo";
import MenorInfoConnection from "../MenorInfoConnection/MenorInfoConnection";
import { useDispatch, useSelector } from "react-redux";
import imageCompression from "browser-image-compression";
import { Link, useNavigate } from "react-router-dom";
import {
  allMentorConnection,
  clearError,
  clearMessage,
  loadUser,
  popUpState,
  reset,
  updateCoverImage,
  updateMentoringStatus,
} from "../../action/userAction";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "../../Components/Loader/Loader";
import EditIcon from "@mui/icons-material/Edit";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MetaData from "../../utils/Metadata";
import toast from "react-hot-toast";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  updateCoverImageStu,
  loadUser as stuLoad,
  reset as sReset,
  clearError as sClearError,
} from "../../action/studentAction";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  maxWidth: { xs: "95vw", md: "70vw" },
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  borderRadius: "15px",
  p: 4,
};
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  maxWidth: { xs: "95vw", md: "70vw" },
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  borderRadius: "15px",
  p: 2,
};

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

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
    error: coverImgError,
    loading: coverImgLoading,
    success: coverImgSuccess,
  } = useSelector((state) => state.changeCoverImage);
  const {
    error: coverImgErrorStu,
    loading: coverImgLoadingStu,
    success: coverImgSuccessStu,
  } = useSelector((state) => state.changeCoverImageStu);
  const {
    loading: stuLoading,
    user: stuUser,
    isAuthenticated: stuAuth,
  } = useSelector((state) => state.student);

  useEffect(() => {
    if (coverImgSuccess) {
      toast.success("Cover Photo updated successfully");
      dispatch(loadUser());
      setOpen(false);
      dispatch(reset());
    }
    if (coverImgError) {
      toast.success(coverImgError.message);
      dispatch(clearError());
    }
    if (coverImgSuccessStu) {
      toast.success("Cover Photo updated successfully");
      dispatch(stuLoad());
      setOpen(false);
      dispatch(sReset());
    }
    if (coverImgErrorStu) {
      toast.success(coverImgErrorStu.message);
      dispatch(sClearError());
    }
  }, [
    dispatch,
    coverImgError,
    coverImgSuccess,
    coverImgErrorStu,
    coverImgSuccessStu,
  ]);
  const {
    success: connSuccess,
    loading: connLoading,
    error: connError,
  } = useSelector((state) => state.getAllConnectionMenPast);

  useEffect(() => {
    if (connError) {
      dispatch(clearError());
      return;
    }
  }, [connError, dispatch]);

  useEffect(() => {
    dispatch(allMentorConnection());
  }, [dispatch]);
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
  const [open, setOpen] = React.useState(false);
  const [avatar, setAvatar] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = (event, newValue) => {
    setOpen(true);
  };
  const handleClose = (event, newValue) => {
    setOpen(false);
  };
  const [avatarPrview, setAvatarPreview] = React.useState("");

  useEffect(() => {
    if (loading === false && isAuthenticated) {
      setAvatarPreview(user?.user?.coverImg?.public_URI || "/images/cover.jpg");
    }
    if (stuLoading === false && stuAuth) {
      setAvatarPreview(
        stuUser?.user?.coverImg?.public_URI || "/images/cover.jpg"
      );
    }
  }, [
    stuLoading,
    loading,
    user?.user?.coverImg?.public_URI,
    stuUser?.user?.coverImg?.public_URI,
    isAuthenticated,
    stuAuth,
  ]);
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [prgress, setProgress] = React.useState(0);
  const [success, setSuccess] = React.useState(false);
  const [uploading, setuploading] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);

  React.useEffect(() => {
    if (prgress === 100) {
      setSuccess(true);
      setTimeout(() => {
        setProgress(0);
      }, 800);
      setTimeout(() => {
        setSuccess(false);
      }, 1200);
    }
  }, [prgress]);

  const handleChangeCover = async (event) => {
    if (event.target.name === "avatar") {
      setuploading(true);
      const imageFile = event.target.files[0];
      const options = {
        maxSizeMB: 1.5,
        maxWidthOrHeight: 1920,
        onProgress: (progress) => {
          setProgress((prevProgress) => {
            if (progress !== prevProgress) {
              return progress;
            }
            return prevProgress;
          });
        },
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(imageFile, options);
        const base64img = await convertBase64(compressedFile);
        setuploading(false);
        setAvatar(base64img);
        setAvatarPreview(base64img);
      } catch (error) {
        setuploading(false);
        toast.error(error.message);
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const userCoverPhoto = new FormData();
    userCoverPhoto.set("avatar", avatar);

    const serializedData = {};
    userCoverPhoto.forEach((value, key) => {
      serializedData[key] = value;
    });
    if (isAuthenticated) {
      dispatch(updateCoverImage(serializedData));
    }
    if (stuAuth) {
      dispatch(updateCoverImageStu(serializedData));
    }
  };
  const activeConnection = connSuccess?.connection?.filter(
    (item) => item.isActive
  );
  const closedConnection = connSuccess?.connection?.filter(
    (item) => !item.isActive
  );
  const [openPop, setPop] = useState(false);
  useEffect(() => {
    setPop(user?.user?.popUp);
  }, [user?.user?.popUp]);
  return (
    <>
      {loading || stuLoading ? (
        <Loader />
      ) : (
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} component={"form"} onSubmit={handleSubmit}>
              <Box display="flex" alignItems="center" flexDirection={"column"}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16/9",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: `${prgress}%`,
                      bgcolor: "#e5dfdf99",
                      transition: "0.3s ease-in-out",
                      bottom: 0,
                      left: 0,
                      zIndex: 1,
                    }}
                  ></Box>
                  <Typography
                    sx={
                      prgress > 0
                        ? {
                            zIndex: 12,
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                            fontSize: "4vmax",
                            color: "white",
                            transition: "0.5s ease-in-out",
                            opacity: 1,
                            fontWeight: 700,
                          }
                        : { opacity: 1 }
                    }
                  >
                    {prgress}%
                  </Typography>
                  <CircularProgress
                    variant="determinate"
                    value={prgress}
                    sx={
                      prgress === 0
                        ? {
                            position: "absolute",
                            top: "5.18px",
                            left: "5px",
                            display: "none",
                          }
                        : {
                            position: "absolute",
                            top: "5.18px",
                            left: "5px",
                          }
                    }
                  />
                  <div
                    class="success-animation"
                    style={success ? { display: "block" } : { display: "none" }}
                  >
                    <svg
                      class="checkmark"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 52 52"
                    >
                      <circle
                        class="checkmark__circle"
                        cx="26"
                        cy="26"
                        r="25"
                        fill="none"
                      />
                      <path
                        class="checkmark__check"
                        fill="none"
                        d="M14.1 27.2l7.1 7.2 16.7-16.8"
                      />
                    </svg>
                  </div>
                  <Box
                    component="img"
                    src={avatarPrview}
                    width="100%"
                    height="100%"
                    sx={{
                      aspectRatio: "1/1",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    mr="10px"
                  ></Box>
                </Box>

                <Button
                  variant="outlined"
                  component="label"
                  sx={{ mt: "1vmax" }}
                >
                  Upload Your Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    name="avatar"
                    onChange={handleChangeCover}
                  />
                </Button>
                <LoadingButton
                  variant="contained"
                  sx={{
                    mt: "1vmax",
                    bgcolor: "var(--button1)",
                    "&:hover": { bgcolor: "var(--button1Hover)" },
                  }}
                  type="submit"
                  disabled={uploading}
                  loading={coverImgLoading || coverImgLoadingStu}
                >
                  submit
                </LoadingButton>
                <Button
                  sx={{ fontSize: { xs: "1.5vmax", md: "0.8vmax" } }}
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Modal>
          {user?.user?.role === "mentor" &&
            user?.user?.isHeadMentor === true && (
              <Modal
                open={openPop}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style1}>
                  <Box
                    sx={{ position: "relative", width: "100%", height: "100%" }}
                  >
                    <IconButton
                      onClick={() => {
                        dispatch(popUpState(isChecked));
                        setPop(false);
                      }}
                      sx={{ position: "absolute", top: "1px", right: "1px" }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <Box>
                      <Typography
                        variant="h6"
                        component="div"
                        gutterBottom
                        fontWeight={700}
                      >
                        Congratulations, {(user?.user?.name).split(" ")[0]}!🥳
                      </Typography>
                      <Typography
                        variant="body1"
                        gutterBottom
                        marginBottom={"1vmax"}
                      >
                        You have been appointed as the Head Mentor at
                        PrepSaarthi. This is a significant and honorable
                        responsibility, and we are confident in your ability to
                        lead with excellence.
                      </Typography>
                      <Typography
                        variant="body1"
                        gutterBottom
                        marginBottom={"1vmax"}
                      >
                        To help you get started and familiarize yourself with
                        your new role, please click on the "Dashboard" button
                        below your status updater. There, you'll find a
                        comprehensive list of mentors. By selecting specific
                        mentors, you can delve deeper into their profiles and
                        tasks.
                      </Typography>
                      <Typography
                        variant="body1"
                        gutterBottom
                        marginBottom={"1vmax"}
                      >
                        Wishing you the best of luck as you embark on this
                        exciting journey as Head Mentor. Your leadership and
                        dedication will undoubtedly inspire and guide many.
                      </Typography>
                      <Typography
                        variant="body1"
                        gutterBottom
                        marginBottom={"2vmax"}
                      >
                        Feel free to ask any questions or give any suggestions.
                        We are here to support you every step of the way.
                      </Typography>
                      <Typography variant="body1" fontWeight={700} gutterBottom>
                        Best regards,
                      </Typography>
                      <Typography variant="body1" fontWeight={700} gutterBottom>
                        The PrepSaarthi Team
                      </Typography>
                    </Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={isChecked}
                          onChange={() => setIsChecked((prev) => !prev)}
                        />
                      }
                      label="Do not show this message again"
                    />
                  </Box>
                </Box>
              </Modal>
            )}
          <MetaData title="Your Profile" />
          <div className="header__wrapper">
            <div className="cols__container">
              <div className="left__col">
                <div className="_college-background">
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "5px",
                      bgcolor: "grey",
                      borderRadius: "50%",
                      fontSize: "35px",
                      padding: "5px",
                      color: "white",
                      transition: "0.3s",
                    }}
                    onClick={() => handleOpen()}
                  >
                    <EditIcon />
                  </IconButton>
                  <img
                    src={
                      user?.user?.coverImg?.public_URI ||
                      stuUser?.user?.coverImg?.public_URI ||
                      "/images/cover.jpg"
                    }
                    alt={"college"}
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
                  {user?.user?.isHeadMentor && user?.user?.isHeadMentor && (
                    <>
                      <div>
                        <Link to="/mentor/controlls/dash">
                          <Button variant="contained" sx={{ mb: "2vmax" }}>
                            Dashboard
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
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
                                You can access your mentor's dashboard once your
                                changes are approved{" "}
                              </>
                            ) : (
                              <>
                                You can access your mentor's dashboard once your
                                account is verified{" "}
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
                          <>
                            {connLoading === false ? (
                              <MenorInfoConnection active={activeConnection} />
                            ) : (
                              <Loader />
                            )}
                          </>
                        )}
                      </CustomTabPanel>
                      <CustomTabPanel value={value} index={1}>
                        {stuLoading === false &&
                          stuUser?.user?.role === "student" && (
                            <MenorInfo active={false} />
                          )}
                        {loading === false && user?.user?.role === "mentor" && (
                          <>
                            {connLoading === false ? (
                              <MenorInfoConnection active={closedConnection} />
                            ) : (
                              <Loader />
                            )}
                          </>
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
