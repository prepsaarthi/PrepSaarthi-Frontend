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
    studentInformation.set("avatar", avatar);

    const serializedData = {};
    studentInformation.forEach((value, key) => {
      serializedData[key] = value;
    });
    dispatch(signUpStudent(serializedData));
  };

  const handleChange = async (event) => {
    if (event.target.name === "avatar") {
      const files = event.target.files;
      if (files.length === 1) {
        const base64 = await convertBase64(files[0]);
        setAvatar(base64);
        setAvatarPreview(base64);
        return;
      }
    } else {
      setstudentInfo({
        ...studentInfo,
        [event.target.name]: event.target.value,
      });
    }
  };
  React.useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (!loading && isAuthenticated) {
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
                    fullWidth
                    id="phoneno"
                    label="Mobile Number"
                    name="phoneNo"
                    type="number"
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
                      component="img"
                      src={avatarPrview}
                      width="30px"
                      height="30px"
                      sx={{ aspectRatio: "1/1" }}
                      mr="10px"
                      borderRadius="50%"
                    ></Box>
                    <Button variant="contained" component="label">
                      Upload Your Photo
                      <input
                        type="file"
                        hidden
                        name="avatar"
                        onChange={handleChange}
                      />
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="p">
                    By signing up you are agreeing to our{" "}
                    <Link style={{ textDecoration: "underline" }} to="/privacy">
                      Privacy & Policy
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
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
