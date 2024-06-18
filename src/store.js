import { configureStore } from "@reduxjs/toolkit";
import {
  allAdminReducer,
  allConnectionReducerMentor,
  allMentorReducer,
  allStudentsReducer,
  assignConnectionReducer,
  changePasswordReducer,
  deleteUserReducer,
  mentorDetailsReducer,
  mentorSignup,
  reSendOTPReducer,
  resetPasswordReducer,
  resoveConnectionReducer,
  sendOTPReducer,
  updateMentor,
  updateMentorFinalReducer,
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
  deleteReviewReducer,
  newReviewReducer,
  reviewReducer,
  studentSignup,
  updateStudent,
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
    resendOtherOTP:reSendOTPReducer,
    verifyUser:verifyOTPReducer,
    passwordReset:resetPasswordReducer,
    passwordChange:changePasswordReducer
  },
});

export default store;
