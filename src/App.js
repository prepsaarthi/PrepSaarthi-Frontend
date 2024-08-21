import React, { useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer.jsx";
import Home from "./Pages/Home";
import Mentor from "./Pages/Mentors/Mentor.jsx";
import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/SignUp/Signup.jsx";
import SignIn from "./Pages/SignIn/SignIn.jsx";
import AdminDashboard from "./Pages/Admin/Admin.jsx";
import PasswordUpdate from "./Pages/PasswordUpdate/PasswordUpdate.jsx";
import Settings from "./Pages/Settings/Settings.jsx";
import FinalStep from "./Pages/MentorsFinalSTeo/FinalStep.jsx";
import MentorList from "./Pages/MentorList/MentorList.jsx";
import MentorProfile from "./Pages/MentorList/MentorProfile.jsx";
import EditProfile from "./Pages/EditProfile/EditProfile.jsx";
import About from "./Pages/About/About.jsx";
import PaymentSuccess from "./Pages/PaymentSuccess/PaymentSuccess.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";

import MentorDashboard from "./Pages/MentorDashboard/MentorDashboard.jsx";
import EditProfileStudent from "./Pages/EditProfileStudent/EditProfileStudent.jsx";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword.jsx";
import TrackPageView from "./Pages/TrackPageView/TrackPageView.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy.jsx";
import ConfirmMentorShipPayment from "./Pages/ConfirmMentorShipPayment/ConfirmMentorShipPayment.jsx";
import { Toaster } from "react-hot-toast";
import { clearError, loadUser } from "./action/userAction.js";
import {
  clearError as stuErrorClear,
  loadUser as stuLoad,
} from "./action/studentAction.js";
import { useSelector, useDispatch } from "react-redux";
import PrivateRoutes from "./Components/Route/PrivateRoutes.jsx";
import PrivateRouteStu from "./Components/Route/PrivateRouteStu.jsx";
import MetaData from "./utils/Metadata.jsx";
import OTPVerification from "./Pages/OTPVerification/OTPVerification.jsx";
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
    <MetaData title="PrepSaarthi" />
      <Navbar />
      <Routes>

{/* ADMIN & Mentor Route  */}
        <Route path="/verify/account" element={<OTPVerification />} />
        <Route element={<PrivateRoutes allowedRoles={["admin", 'mentor','user']} />}>
        <Route path="/password/change" element={<PasswordUpdate />}></Route>
        <Route path="/role/mentor/final" element={<FinalStep />} />
        <Route path="/update/profile/mentor" element={<EditProfile />} />
        <Route path="/mentor/controlls/dash" element={<MentorDashboard />} />
        <Route path="/settings" element={<Settings />} />
        </Route>

{/* ADMIN exclusive route  */}
        <Route element={<PrivateRoutes allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>


        <Route element={<PrivateRouteStu allowedRoles={["student"]} />}>
        <Route path="/password/change" element={<PasswordUpdate />}></Route>
        <Route path="/settings" element={<Settings />} />
          <Route
            path="/update/profile/student"
            element={<EditProfileStudent />}
          />
          <Route
            path="/mentorship/buy/:id"
            element={<ConfirmMentorShipPayment />}
          />
        </Route>

        {/* <Route path="/verify/account" element={<OTPVerification />}></Route> */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/faq" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/bm" element={<Signup />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/user/:id" element={<Mentor />}></Route>
        <Route path="/lists/mentors" element={<MentorList />}></Route>
        <Route path="/mentors/:id" element={<MentorProfile />}></Route>
        <Route path="/privacy" element={<PrivacyPolicy />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/notfound" element={<NotFound />}></Route>
        <Route path="/payment/success" element={<PaymentSuccess />}></Route>
        <Route path="/forgot/password" element={<ForgotPassword />}></Route>
      </Routes>
      <Footer />
      <TrackPageView />
      <Toaster />
    </>
  );
};

export default App;
