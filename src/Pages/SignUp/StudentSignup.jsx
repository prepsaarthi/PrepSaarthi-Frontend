import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { clearError, signUpStudent } from "../../action/studentAction";
import toast from "react-hot-toast";
import MetaData from "../../utils/Metadata";
import CircularProgress from "@mui/material/CircularProgress";
import imageCompression from "browser-image-compression";
import { reset, stusendOTP,clearError as otpClearError, sturesendOTP, otpReset } from "../../action/userAction";
const defaultTheme = createTheme();

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

export default function StudentSignUp() {
  const dispatch = useDispatch();
  const {
    error: otpError,
    loading: otpLoading,
    success: otpSuccess,
    sent
  } = useSelector((state) => state.newStuOTPsend);

  const {
    loading: reLoading,
    success: reSuccess,
    error: reError,
  } = useSelector((state) => state.resendOtherOTPStu);
  const { loading, error, user, isAuthenticated } = useSelector(
    (state) => state.student
  );
  const navigate = useNavigate();
  const [studentInfo, setstudentInfo] = React.useState({});
  const [avatarPrview, setAvatarPreview] = React.useState(
    "/images/profile.png"
  );
  const [avatar, setAvatar] = React.useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const studentInformation = new FormData();

    studentInformation.set("name", studentInfo.fullName);
    studentInformation.set("email", studentInfo.email);
    studentInformation.set("mobileNumber", studentInfo.phoneNo);
    studentInformation.set("password", studentInfo.password);
    studentInformation.set("emailOTP", studentInfo.emailOTP);
    studentInformation.set("numberOTP", studentInfo.numberOTP);
    studentInformation.set("avatar", avatar);

    const serializedData = {};
    studentInformation.forEach((value, key) => {
      serializedData[key] = value;
    });
    dispatch(signUpStudent(serializedData));
  };

  const [prgress, setProgress] = React.useState(0);
  const [success, setSuccess] = React.useState(false);
  const [uploading, setuploading] = React.useState(false);
  
  React.useEffect(() => {
    if(prgress === 100)
      {setSuccess(true)
      setTimeout(() => {
        
    setProgress(0)
      }, 800);
      setTimeout(() => {
        setSuccess(false)
      }, 1200);}
  }, [prgress ])

  const handleChange = async (event) => {
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
        setuploading(false)
        setAvatar(base64img);
            setAvatarPreview(base64img);
      } catch (error) {
        setuploading(false)
        toast.error(error.message)
      }
    } else {
      setstudentInfo({
        ...studentInfo,
        [event.target.name]: event.target.value,
      });
    }
  };
  React.useEffect(() => {
    if(otpSuccess){
      toast.success("OTP has been sent to your submitted email and mobile number")
      dispatch(reset())
    }
    if(otpError){
      toast.error(otpError.message)
      dispatch(otpClearError())
    }
  }, [dispatch, otpError, otpSuccess])
  React.useEffect(() => {
    if(reSuccess){
      toast.success("OTP has been resent")
      dispatch(reset())
    }
    if(reError){
      toast.error(reError.message)
      dispatch(otpClearError())
    }
  }, [dispatch, reSuccess, reError])
  React.useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(otpReset())
      dispatch(clearError());
    }
    if (!loading && isAuthenticated) {
      dispatch(otpReset())
      toast.success("Signed up successfully");
      navigate(`/verify/account`);
    }
  }, [error, dispatch, isAuthenticated, loading, navigate, user?.user?._id]);
  return (
    <>
      <MetaData title="Sign Up Student" />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: "2.5vmax",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pb: "2.5vmax",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="fullName"
                    required
                    fullWidth
                    onChange={handleChange}
                    id="Name"
                    label="Full Name"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    disabled={sent}
                    onChange={handleChange}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    onChange={handleChange}
                    disabled={sent}
                    fullWidth
                    id="phoneno"
                    label="Mobile Number"
                    name="phoneNo"
                    autoComplete="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    onChange={handleChange}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        position: "relative",
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <CircularProgress
                        variant="determinate"
                        value={prgress}
                        sx={prgress === 0 ? {
                          position: "absolute",
                          top: "5.18px",
                          left: "5px",
                          display:"none"
                        }:{
                          position: "absolute",
                          top: "5.18px",
                          left: "5px",
                        }}
                      />
                      <div class="success-animation" style={success? {display:'block'} : {display:'none'}}>
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
                        width="30px"
                        height="30px"
                        sx={{
                          aspectRatio: "1/1",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                          borderRadius: "50%",
                        }}
                        mr="10px"
                      ></Box>
                    </Box>

                    <Button variant="contained" component="label">
                      Upload Your Photo
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        name="avatar"
                        onChange={handleChange}
                      />
                    </Button>
                  </Box>
                  <Grid item xs={12}>
                  <LoadingButton
                    loading={otpLoading}
                    onClick={() => {
                      dispatch(
                        stusendOTP({
                          email: studentInfo.email,
                          mobileNumber: studentInfo.phoneNo,
                        })
                      );
                    }}
                    fullWidth
                    sx={!sent ? {
                      display:'block',
                      mt: 3,
                      mb: 2,
                      color:'white',
                      p: "0.8vmax 0",
                      fontSize: { xs: "2.3vmax", md: "2vmax", lg: "1.1vmax" },
                      bgcolor: "var(--button1)",
                      "&:hover": { backgroundColor: "var(--button1Hover)" },
                    } : {display:"none"}}
                  >
                    Verify your Email and Number
                  </LoadingButton>
                </Grid>
                <Grid item xs={12} sx={sent ? {display:'block'} : {display:'none'}}>
                  <TextField
                    required
                    fullWidth
                    id="emailOTP"
                    label="Email Verification Code"
                    name="emailOTP"
                    autoComplete="emailOTP"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sx={sent ? {display:'block'} : {display:'none'}}>
                  <TextField
                    required
                    fullWidth
                    id="numberOTP"
                    label="Mobile Number Verification Code"
                    name="numberOTP"
                    autoComplete="numberOTP"
                    onChange={handleChange}
                  />
                  <LoadingButton 
                  loading={reLoading}
                  onClick={() => {
                    dispatch(sturesendOTP({email: studentInfo.email,
                      mobileNumber: studentInfo.phoneNo}))
                  }}>Resend OTP</LoadingButton>
                </Grid>
                </Grid>
                <Grid item xs={12} sx={sent ? {display:'block'} : {display:'none'}}>
                  <Typography variant="p">
                    By signing up you are agreeing to our{" "}
                    <Link style={{ textDecoration: "underline" }} to="/privacy">
                      Privacy & Policy
                    </Link>
                  </Typography>
                  <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
                disabled={uploading}
                sx={{
                  mt: 3,
                  mb: 2,
                  p: "0.8vmax 0",
                  fontSize: { xs: "2.3vmax", md: "2vmax", lg: "1.1vmax" },
                  bgcolor: "var(--button1)",
                  "&:hover": { backgroundColor: "var(--button1Hover)" },
                }}
              >
                Sign Up
              </LoadingButton>
                </Grid>
               
              </Grid>
              
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}