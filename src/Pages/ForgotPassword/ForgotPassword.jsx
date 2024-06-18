import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  clearError,
  clearMessage,
  loadUser,
  reset,
  resetPassword,
} from "../../action/userAction";
import {
  loadUser as stuLoad
} from "../../action/studentAction";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();


  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButton, setButton] = useState(false)
  const {  isAuthenticated } = useSelector(
    (state) => state.mentor
  );
  const {
    isAuthenticated: stuAuth,
  } = useSelector((state) => state.student);
  const { loading, success, message, userId, error } = useSelector(
    (state) => state.passwordReset
  );
  const {
    loading: rloading,
    success: rsuccess,
    error: rError,
  } = useSelector((state) => state.passwordChange);
  const navigate = useNavigate();

  useEffect(() => {

    if(stuAuth || isAuthenticated){
          navigate(`/user/${userId}`);
    
      }
}, [stuAuth, isAuthenticated, navigate, userId])
 
  useEffect(() => {
    if (loading === false && success & message !==null) {
      toast.success(message);
      dispatch(clearMessage())
    }
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
    }
    if (rError) {
      toast.error(rError.message);
      dispatch(clearError());
    }
    if (rsuccess) {
      toast.success("Password changed successfully");
      dispatch(reset());
      dispatch(loadUser());
      dispatch(stuLoad());
    }
}, [
    error,
    dispatch,
    loading,
    success,
    message,
    navigate,
    rError,
    rsuccess,
    userId,
]);



useEffect(() => {
    if(!otp || !password || !confirmPassword )  {
        setButton(false)
    }else{
        setButton(true)
    }
}, [otp,password,confirmPassword])
  return (
    <>
      {success ? (
        <Box
          sx={{
            maxWidth: "100vw",
            minHeight: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              border: "0.2px solid grey",
              borderRadius: "10px",
              p: "2vmax",
            }}
          >
            <TextField
            sx={{mb:'1vmax'}}
              variant="outlined"
              label="Enter the OTP"
              type="text"
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              value={otp}
            />
            <TextField
            sx={{mb:'1vmax'}}
              variant="outlined"
              label="Enter the new password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <TextField
            sx={{mb:'1vmax'}}
              variant="outlined"
              label="Confirm your password "
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <LoadingButton
              loading={rloading}
              disabled={!isButton}
              onClick={() => {
                dispatch(
                  changePassword({ otp, password, confirmPassword, userId })
                );
              }}
            >
              Change Password
            </LoadingButton>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            maxWidth: "100vw",
            minHeight: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              border: "0.2px solid grey",
              borderRadius: "10px",
              p: "2vmax",
            }}
          >
            <TextField
              variant="outlined"
              label="Enter your registered email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <LoadingButton
              loading={loading}
              onClick={() => {
                dispatch(resetPassword(email));
              }}
            >
              Send OTP
            </LoadingButton>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ForgotPassword;
