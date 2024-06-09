import React, { useEffect } from 'react'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import {useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage, loadUser, updateStudentFinalInfo } from "../../action/studentAction";
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

const EditProfileStudent = () => {
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector(
      (state) => state.student
    );
    const {
        error: updateError,
        loading: updateLoading,
        user: successMssg,
      } = useSelector((state) => state.updateStudentInfo);
    const navigate = useNavigate();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [mobileNo, setMobileNo] = React.useState("");
    const [avatar, setAvatar] = React.useState("");
    const [avatarUpdate, setAvatarUpdate] = React.useState("");
    const handleSubmit = (event) => {
      event.preventDefault();
      const studentInformation = new FormData();
  
      studentInformation.set("name", name);
      studentInformation.set("email", email);
      studentInformation.set("mobileNumber", mobileNo);
      studentInformation.set("avatar", avatarUpdate);
  
      const serializedData = {};
      studentInformation.forEach((value, key) => {
        serializedData[key] = value;
      });
      console.log(serializedData)
      dispatch(updateStudentFinalInfo(serializedData));
    };
  
    const handleChange = async (event) => {
      if (event.target.name === "avatar") {
        const files = event.target.files;
        if (files.length === 1) {
          const base64 = await convertBase64(files[0]);
          setAvatar(base64);
          setAvatarUpdate(base64);
          return;
        }
      } 
    };

    useEffect(() => {
        if (!updateLoading && successMssg?.success) {
          toast.success("Your profile updated successfully");
          dispatch(loadUser());
          dispatch(clearMessage());
        }
        if (updateError) {
          toast.error(updateError);
          dispatch(clearError());
        }
        if (error) {
          toast.error(error?.message);
          dispatch(clearError());
        }
      }, [
        dispatch,
        error,
        navigate,
        user,
        updateError,
        successMssg,
        updateLoading,
      ]);
    useEffect(() => {
        if(loading === false){
            setName(user.user.name)
            setEmail(user.user.email)
            setMobileNo(user.user.mobileNumber)
            setAvatar(user.user.avatar.public_URI)
        }
    },[loading, user])
    React.useEffect(() => {
      if (error) {
        toast.error(error.message);
        dispatch(clearError());
      }
      
    }, [error, dispatch]);
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
              Update Your Profile   
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
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
                    id="Name"
                    label="Full Name"
                    autoFocus
                    />
                </Grid>
  
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    value={mobileNo}
                    onChange={(e) => {setMobileNo(e.target.value)}}
                    fullWidth
                    id="phoneno"
                    label="Mobile Number"
                    name="phoneNo"
                    type="number"
                    autoComplete="number"
                  />
                </Grid>
    
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center">
                    <Box
                      component="img"
                      src={avatar}
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
              </Grid>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={updateLoading}
                sx={{
                  mt: 3,
                  mb: 2,
                  p: "0.8vmax 0",
                  fontSize: { xs: "2.3vmax", md: "2vmax", lg: "1.1vmax" },
                  bgcolor: "var(--button1)",
                  "&:hover": { backgroundColor: "var(--button1Hover)" },
                }}
              >
                Update
              </LoadingButton>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
}

export default EditProfileStudent