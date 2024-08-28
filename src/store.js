import { configureStore } from "@reduxjs/toolkit";
import {
  addNewConnectionReducer,
  allAdminReducer,
  allConnectionReducerHead,
  allConnectionReducerMentor,
  allMentorHead,
  allMentorReducer,
  allStudentsReducer,
  assignConnectionReducer,
  changeCoverReducer,
  changePasswordReducer,
  deleteUserReducer,
  getVisitReducer,
  grantStatusHeadMentor,
  mentorDetailsReducer,
  mentorSignup,
  mentoringStatus,
  popUpReducer,
  reSendOTPReducer,
  reSendOTPReducerStu,
  resetPasswordReducer,
  resoveConnectionReducer,
  sendOTPReducer,
  stuSendOTPReducer,
  tkidReducer,
  updateMentor,
  updateMentorFinalReducer,
  updateMentorPassword,
  updateMentorRole,
  verifyOTPReducer,
} from "./reducer/userReducer";
import {
  allConnectionReducer,
  allSuccessConnectionReducer,
  mentorListReducer,
  mentorRequestListReducer,
} from "./reducer/mentorListReducer";
import {
  allStuMentorshipReducer,
  changeCoverReducerStu,
  deleteReviewReducer,
  newReviewReducer,
  reviewReducer,
  studentSignup,
  updateStudent,
  updateStudentPassword,
} from "./reducer/studentReducer";
import { newPayment, newSubscription } from "./reducer/paymnentReducer";
const store = configureStore({
  reducer: {
    mentor: mentorSignup,
    student: studentSignup,
    mentorDeatil: mentorDetailsReducer,
    mentorUpdateLastStep: updateMentorFinalReducer,
    mentorList: mentorListReducer,
    updateMentorInfo: updateMentor,
    updateStudentInfo:updateStudent,
    requestList: mentorRequestListReducer,
    roleUpdate: updateMentorRole,
    allStudents: allStudentsReducer,
    allMentors: allMentorReducer,
    allAdmin: allAdminReducer,
    deleteUser: deleteUserReducer,
    connections: allConnectionReducer,
    connectionsHead: allConnectionReducerHead,
    connectionAssign: assignConnectionReducer,
    connectionResolve: resoveConnectionReducer,
    connectionCount: allSuccessConnectionReducer,
    getAllConnectionStuPast: allStuMentorshipReducer,
    getAllConnectionMenPast: allConnectionReducerMentor,
    paymentReducer: newPayment,
    subscriptionReducer: newSubscription,
    newReviews: newReviewReducer,
    allReview: reviewReducer,
    deleteReview: deleteReviewReducer,
    newOTPsend:sendOTPReducer,
    newStuOTPsend:stuSendOTPReducer,
    resendOtherOTP:reSendOTPReducer,
    resendOtherOTPStu:reSendOTPReducerStu,
    verifyUser:verifyOTPReducer,
    passwordReset:resetPasswordReducer,
    passwordChange:changePasswordReducer,
    status:mentoringStatus,
    mentorPassword:updateMentorPassword,
    studentPassword:updateStudentPassword,
    visitReducer:getVisitReducer,
    headMentor:allMentorHead,
    grantStatus:grantStatusHeadMentor,
    changeCoverImage:changeCoverReducer,
    changeCoverImageStu:changeCoverReducerStu,
    popUp:popUpReducer,
    tkid:tkidReducer,
    newConnection:addNewConnectionReducer
  },
  devTools:process.env.NODE_ENV === 'development' ? true : false
});

export default store;
