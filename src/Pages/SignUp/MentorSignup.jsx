import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { clearError, signUpMentor } from "../../action/userAction";
import toast from "react-hot-toast";

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

export default function MentorSignUp() {
  const navigate = useNavigate();
  const [mentorInfo, setMentorInfo] = React.useState({});
  const [avatarPrview, setAvatarPreview] = React.useState(
    "/images/profile.png"
  );
  const [avatar, setAvatar] = React.useState("");
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector(
    (state) => state.mentor
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    const mentorInformation = new FormData();

    mentorInformation.set("name", mentorInfo.name);
    mentorInformation.set("email", mentorInfo.email);
    mentorInformation.set("mobileNumber", mentorInfo.phoneNo);
    mentorInformation.set("password", mentorInfo.password);
    mentorInformation.set("collegeName", mentorInfo.college);
    mentorInformation.set("avatar", avatar);

    const serializedData = {};
    mentorInformation.forEach((value, key) => {
      serializedData[key] = value;
    });
    dispatch(signUpMentor(serializedData));
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
      setMentorInfo({ ...mentorInfo, [event.target.name]: event.target.value });
    }
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (user) {
      navigate("/role/mentor/final");
    }
  }, [dispatch, error, navigate, user]);
  return (
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="mentorName"
                  label="Your Name"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="college"
                  label="College"
                  name="college"
                  autoComplete="college"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNo"
                  label="Mobile Number"
                  name="phoneNo"
                  type="number"
                  autoComplete="number"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
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
                  <Link style={{ textDecoration: "underline" }} to="/policy">
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
                <Link to="/login" variant="body2" component={ReactLink}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
