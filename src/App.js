import React, { useEffect, useMemo, useRef, useState } from "react";
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
import notificationSound from './not.wav'
import MentorProfile from "./Pages/MentorList/MentorProfile.jsx";
import EditProfile from "./Pages/EditProfile/EditProfile.jsx";
import About from "./Pages/About/About.jsx";
import { io } from "socket.io-client";
import ChatService from "./Pages/ChatService/ChatService.jsx";
import PaymentSuccess from "./Pages/PaymentSuccess/PaymentSuccess.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";
import MentorDashboard from "./Pages/MentorDashboard/MentorDashboard.jsx";
import EditProfileStudent from "./Pages/EditProfileStudent/EditProfileStudent.jsx";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword.jsx";
import TrackPageView from "./Pages/TrackPageView/TrackPageView.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy.jsx";
import ConfirmMentorShipPayment from "./Pages/ConfirmMentorShipPayment/ConfirmMentorShipPayment.jsx";
import { Toaster } from "react-hot-toast";
import { clearError, getAllNotification, getAllNotificationStu, loadUser } from "./action/userAction.js";
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
  const [notification,setNotification] = useState([])
  const [soundEnabled, setSoundEnabled] = useState(false); // Control sound permissions
  const sound = new Audio(notificationSound); 
  const socket = useMemo(
    () =>
      io("http://localhost:5000", {
          withCredentials: true
         }),
      []
    );

  const { user, error } = useSelector((state) => state.mentor);
  const { user:stuUser ,error: stuError } = useSelector((state) => state.student);
  const {notificatioin} = useSelector(state => state.notification)
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  useEffect(() => {
    dispatch(stuLoad());
  }, [dispatch]);
  useEffect(() => {
    const enableSound = () => {
      setSoundEnabled(true);  // Enable sound for the rest of the session
      document.removeEventListener('click', enableSound);
    };

    document.addEventListener('click', enableSound);  // Listen for any user click

    return () => {
      document.removeEventListener('click', enableSound);  // Clean up the event listener
    };
  }, []);
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
    if (stuError) {
      dispatch(stuErrorClear());
    }
  }, [error, dispatch, stuError]);

  useEffect(() => {
    // console.log(user?.isAuthenticated,stuUser?.isAuthenticated )
    if(user?.user){
      dispatch(getAllNotification(user?.user?._id))
    }
    if(stuUser?.user){
      dispatch(getAllNotificationStu(stuUser?.user?._id))
    }
  }, [user,stuUser])


  useEffect(() => {
    if(notificatioin){
    setNotification(notificatioin)
    }
  }, [notificatioin])

  useEffect(() => {
    if(user?.user || stuUser?.user){
      socket.on("connect", () => {
        console.log("connected", socket.id);
      });
      
      socket.emit('main-s', (user?.user?._id || stuUser?.user?._id))
      socket.on('send-not', ({ notificationUser }) => {
        console.log(notificationUser);
        if (soundEnabled) {
          sound.play().catch(error => console.log('Error playing sound:', error));
        }
        setNotification((prev) => {
          // Find the index of the notification if it exists
          const index = prev?.findIndex(item => item._id === notificationUser._id);
  
          // If the notification exists, reorder it at the top
          if (index !== -1) {
            const arr = [...prev];
            const notToMove = arr.splice(index, 1)[0];
            return [notToMove, ...arr]; // Move the notification to the top
          }
  
          // Otherwise, add the new notification to the top
          return [notificationUser, ...prev];
        });
  
        console.log("Updated notifications:", notification);
      });
  
    }
  },[user,stuUser,socket,soundEnabled, sound])
  return (
    <>
    <MetaData title="PrepSaarthi" />
      <Navbar notification={notification}/>
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
        <Route path="/chat" element={<ChatService userId={stuUser?.user?._id|| user?.user?._id} role={stuUser?.user?.role|| user?.user?.role} userAvatar={stuUser?.user?.avatar|| user?.user?.avatar}/> }></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/bm" element={<Signup />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/user/:id" element={<Mentor />}></Route>
        <Route path="/lists/mentors" element={<MentorList />}></Route>
        <Route path="/mentors/:id" element={<MentorProfile />}></Route>
        <Route path="/privacy" element={<PrivacyPolicy />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/payment/success" element={<PaymentSuccess />}></Route>
        <Route path="/forgot/password/:tkid" element={<ForgotPassword />}></Route>
        <Route exact path="/forgot/password/" element={<ForgotPassword />}></Route>
        <Route path="*" element={<NotFound />} /> 
      </Routes>
      <Footer />
      <TrackPageView />
      <Toaster />
    </>
  );
};

export default App;
