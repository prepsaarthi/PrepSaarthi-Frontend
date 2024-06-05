import React, { useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer.jsx";
import Home from "./Pages/Home";
import Mentor from "./Pages/Mentors/Mentor.jsx";
import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/SignUp/Signup.jsx";
import SignIn from "./Pages/SignIn/SignIn.jsx";
import AdminDashboard from "./Pages/Admin/Admin.jsx";
import FinalStep from "./Pages/MentorsFinalSTeo/FinalStep.jsx";
import MentorList from "./Pages/MentorList/MentorList.jsx";
import MentorProfile from "./Pages/MentorList/MentorProfile.jsx";
import EditProfile from "./Pages/EditProfile/EditProfile.jsx";
import ConfirmMentorShipPayment from "./Pages/ConfirmMentorShipPayment/ConfirmMentorShipPayment.jsx";
import  { Toaster } from "react-hot-toast";
import { clearError, loadUser } from "./action/userAction.js";
import {
  clearError as stuErrorClear,
  loadUser as stuLoad,
} from "./action/studentAction.js";
import { useSelector, useDispatch } from "react-redux";
import PrivateRoutes from "./Components/Route/PrivateRoutes.jsx";
import PrivateRouteStu from "./Components/Route/PrivateRouteStu.jsx";
const App = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.mentor);
  const { error: stuError } = useSelector((state) => state.student);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  useEffect(() => {
    dispatch(stuLoad());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
    if (stuError) {
      dispatch(stuErrorClear());
    }
  }, [error, dispatch, stuError]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route element={<PrivateRoutes allowedRoles={["mentor", "admin"]} />}>
          <Route path="/update/profile/mentor" element={<EditProfile />} />
        </Route>
        <Route element={<PrivateRouteStu allowedRoles={["student"]} />}>
          {/* <Route path="/update/profile/mentor" element={<EditProfileStudent />} /> */}
          <Route
            path="/mentorship/buy/:id"
            element={<ConfirmMentorShipPayment />}
          />
        </Route>

        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/lists/mentors" element={<MentorList />}></Route>
        <Route path="/mentors/:id" element={<MentorProfile />}></Route>
        <Route path="/user/:id" element={<Mentor />}></Route>
        <Route path="/role/mentor/final" element={<FinalStep />}></Route>
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
