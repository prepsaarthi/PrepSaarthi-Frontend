import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

// LOGIN

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ loginEmail, loginPassword }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axiosInstance.post(
        `/v1/login`,
        { email: loginEmail, password: loginPassword },
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// SIGN UP
export const signUpMentor = createAsyncThunk(
  "mentor/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axiosInstance.post(
        `/v1/register/mentor`,
        userData,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// Update Profile
export const updateMentorFinalInfo = createAsyncThunk(
  "mentor/update/updateInfo",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axiosInstance.put(
        `/v1/self/update/profile/info`,
        userData,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// update metor info
export const updateMentorFinalInfoAfter = createAsyncThunk(
  "mentor/update/updateInfo/after",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axiosInstance.put(
        `/v1/self/update/profile/info/after`,
        userData,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// update mentoring status
export const updateMentoringStatus = createAsyncThunk(
  "admin/mentoring/update",
  async (status, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axiosInstance.put(
        `/v1/mentor/update/status`,
        { status },
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//update password
export const updatePasswordMentor = createAsyncThunk(
  "admin/mentoring/update/password",
  async (payload, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axiosInstance.put(
        `/v1/self/update/password`,
        payload,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// Update
export const updateMentorInfo = createAsyncThunk(
  "mentor/update/updateInfo",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axiosInstance.put(
        `/v1/self/update/profile`,
        userData,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//LOAD USER

export const loadUser = createAsyncThunk(
  "user/load",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/v1/self`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// LOGOUT USER

export const logoutUser = createAsyncThunk(
  "/user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/v1/logout");
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//Mentor Detail

export const getUserDetails = createAsyncThunk(
  "mentor/signleMentor",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/v1/user/info/${id}`);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//Mentor Request Affirmation(Admin)
export const updateRoleMentor = createAsyncThunk(
  "admin/request/decide",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axiosInstance.put(
        `/v1/admin/users/${id}`,
        { role },
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//All Students (Admin)
export const getAllStudents = createAsyncThunk(
  "admin/request/all/students",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/v1/admin/students/all`);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//All mentors (Admin)
export const getAllMentors = createAsyncThunk(
  "admin/request/all/mentors",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/v1/admin/mentors/all`);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//All admin (Admin)
export const getAllAdmin = createAsyncThunk(
  "admin/all",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/v1/admins/all`);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//delete user (Admin)
export const deleteUser = createAsyncThunk(
  "admin/delete/user",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `/v1/admin/user/delete/${id}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//connection  (Admin)
export const getAllConnections = createAsyncThunk(
  "admin/all/connections",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/v1/admin/all/connection`);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const addNewConnection = createAsyncThunk(
  "admin/add/connection/new",
  async ({id,phnNo,duration,time,price}, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axiosInstance.post(`/v1/admin/add/connection`, {mobileNumber:phnNo, id:id,duration:duration,date:time,price:price});
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
//assign connection  (Admin)
export const assignConnection = createAsyncThunk(
  "admin/connectionsAssign",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/v1/admin/edit/connection/${id}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//connection  (Admin)
export const resolveConnection = createAsyncThunk(
  "admin/connections/resolve",
  async ({ id, sid }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axiosInstance.put(
        `/v1/admin/remove/connections`,
        { id, sid },
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//connection (mentor)
export const allMentorConnection = createAsyncThunk(
  "mentor/connection/past",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/v1/mentor/all/connection`);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const allHeadConnection = createAsyncThunk(
  "head/connection/specific",
  async (id, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axiosInstance.post(
        `/v1/head/all/connection`,
        { id },
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const allMentors = createAsyncThunk(
  "head/mentor/all",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/v1/mentor/head/allmentors`);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

//update status to head mentors (Admin)
export const updateStatusHeadMentor = createAsyncThunk(
  "admin/update/head/status",
  async ({id, status}, { rejectWithValue }) => {
    try {
      const config = {headers:{"Content-Type" : "application/json"}}
      const { data } = await axiosInstance.put(
        `/v1/admin/update/status`,
        {id,status},
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCoverImage = createAsyncThunk(
  "user/update/cover/img",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axiosInstance.put(
        `/v1/user/update/cover`,
        userData,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const sendOTP = createAsyncThunk(
  "mentor/send/OTP",
  async ({email, mobileNumber}, { rejectWithValue }) => {
    try {
      const config = {headers:{"Content-Type" : "application/json"}}
      const { data } = await axiosInstance.post(`/v1/users/send/otp`, {email,mobileNumber},config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  } 
);
export const popUpState = createAsyncThunk(
  "update/popup/state",
  async (popUp, { rejectWithValue }) => {
    try {
      const config = {headers:{"Content-Type" : "application/json"}}
      const { data } = await axiosInstance.put(`/v1/mentor/update/popup`,{popUp}, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const stusendOTP = createAsyncThunk(
  "student/send/OTP",
  async ({email, mobileNumber}, { rejectWithValue }) => {
    try {
      const config = {headers:{"Content-Type" : "application/json"}}
      const { data } = await axiosInstance.post(`/v1/student/send/otp`,{email,mobileNumber},config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const resendOTP = createAsyncThunk(
  "mentor/resend/OTP",
  async ({email, mobileNumber}, { rejectWithValue }) => {
    try {
      const config = {headers:{"Content-Type" : "application/json"}}
      const { data } = await axiosInstance.post(`/v1/users/resend/otp`, {email, mobileNumber}, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const sturesendOTP = createAsyncThunk(
  "student/resend/OTP",
  async ({email, mobileNumber}, { rejectWithValue }) => {
    try {
      const config = {headers:{"Content-Type" : "application/json"}}
      const { data } = await axiosInstance.post(`/v1/student/resend/otp`,{email, mobileNumber}, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const isTKid = createAsyncThunk(
  "user/tkid",
  async (tkid, { rejectWithValue }) => {
    try {
      const config = {headers:{"Content-Type" : "application/json"}}
      const { data } = await axiosInstance.post(`/v1/tkid/isexists`,{tkid}, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const verifyOTP = createAsyncThunk(
  "mentor/verify/OTP",
  async (otp, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axiosInstance.post(
        `/v1/users/verify/otp`,
        { otp: otp },
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const stuVerifyOTP = createAsyncThunk(
  "student/verify/OTP",
  async (otp, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axiosInstance.post(
        `/v1/student/verify/otp`,
        { otp: otp },
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset/password",
  async (email, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axiosInstance.post(
        `/v1/password/forgot`,
        { email: email },
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const changePassword = createAsyncThunk(
  "user/change/password",
  async ({ password, confirmPassword, tkid }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axiosInstance.put(
        `/v1/password/reset/${tkid}`,
        {
          password,
          confirmPassword,
        },
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// update mentoring status
export const getVisitsData = createAsyncThunk(
  "all/visiting/data",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axiosInstance.get(
        `/v1/api/get/date?startDate=${startDate}&endDate=${endDate}`,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const clearError = createAsyncThunk("user/clearError", async () => {
  return null;
});
export const clearMessage = createAsyncThunk("user/clearMssg", async () => {
  return null;
});
export const reset = createAsyncThunk("user/reset", async () => {
  return null;
});
export const otpReset = createAsyncThunk("user/reset/for/otp", async () => {
  return null;
});
