import { createReducer } from "@reduxjs/toolkit";

import { serializeError } from "serialize-error";
import {
  allMentorConnection,
  assignConnection,
  changePassword,
  clearError,
  clearMessage,
  deleteUser,
  getAllAdmin,
  getAllMentors,
  getAllStudents,
  getUserDetails,
  loadUser,
  loginUser,
  logoutUser,
  resendOTP,
  reset,
  resetPassword,
  resolveConnection,
  sendOTP,
  signUpMentor,
  stuVerifyOTP,
  sturesendOTP,
  stusendOTP,
  updateMentorFinalInfo,
  updateMentorFinalInfoAfter,
  updateMentorInfo,
  updateRoleMentor,
  verifyOTP,
} from "../action/userAction";

const initalState = {};

// export const cartItemReducer = createReducer(initalState, (builder) => {
//   builder

//     .addCase(addItemToCart.pending, (state, action) => {
//       return {
//         ...state,
//         loading: true,
//      te };
//     })
//     .addCase(addItemToCart.fulfilled, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         success: action.payload.success,
//       };
//     })
//     .addCase(addItemToCart.rejected, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     })

//   // get Cart Item
//     .addCase(getCartItem.pending, (state, action) => {
//       return {
//         ...state,
//         loading: true,
//       };
//     })
//     .addCase(getCartItem.fulfilled, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         cart: action.payload.cart,
//       };
//     })
//     .addCase(getCartItem.rejected, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     })
//     .addCase(reset.fulfilled, (state, action) => {
//       return {
//         ...state,
//         success: false,
//       };
//     })
//     .addCase(clearError.fulfilled, (state, action) => {
//       return {
//         ...state,
//         error: null,
//       };
//     });
// });

// export const updateRoleReducer = createReducer(initalState, (builder) => {
//   builder
//     .addCase(updateUser.pending, (state, action) => {
//       return {
//         ...state,
//         loading: true,
//       };
//     })
//     .addCase(updateUser.fulfilled, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         isUpdated: action.payload,
//       };
//     })
//     .addCase(updateUser.rejected, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     })
//     .addCase(reset.fulfilled, (state, action) => {
//       return {
//         ...state,
//         isUpdated: false,
//       };
//     })
//     .addCase(clearError.fulfilled, (state, action) => {
//       return {
//         ...state,
//         error: null,
//       };
//     });
// });

export const mentorSignup = createReducer(initalState, (builder) => {
  builder
    //Signup
    .addCase(signUpMentor.pending, (state, action) => {
      return {
        loading: true,
        isAuthenticated: false,
      };
    })
    .addCase(signUpMentor.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: serializeError(action.payload),
      };
    })
    .addCase(signUpMentor.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: serializeError(action.payload),
      };
    })

    //Logout
    .addCase(logoutUser.pending, (state, action) => {
      return {
        loading: true,
      };
    })
    .addCase(logoutUser.fulfilled, (state, action) => {
      return {
        loading: false,
        message: action.payload.message,
        isAuthenticated: false,
      };
    })
    .addCase(logoutUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: serializeError(action.payload.message),
      };
    })
    //login
    .addCase(loginUser.pending, (state, action) => {
      return {
        loading: true,
        isAuthenticated: false,
      };
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        loginMessage: "Logged In",
      };
    })
    .addCase(clearMessage.fulfilled, (state, action) => {
      return {
        ...state,
        loginMessage: null,
        message: null,
      };
    })
    .addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    })
    .addCase(loadUser.pending, (state, action) => {
      return {
        loading: true,
        isAuthenticated: false,
      };
    })
    .addCase(loadUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    })
    .addCase(loadUser.rejected, (state, action) => {
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    })

    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

export const mentorDetailsReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(getUserDetails.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getUserDetails.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    })
    .addCase(getUserDetails.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

export const updateMentorFinalReducer = createReducer(
  initalState,
  (builder) => {
    builder

      .addCase(updateMentorFinalInfo.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateMentorFinalInfo.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
      })
      .addCase(updateMentorFinalInfo.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })
      .addCase(updateMentorFinalInfoAfter.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateMentorFinalInfoAfter.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
      })
      .addCase(updateMentorFinalInfoAfter.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })
      .addCase(clearMessage.fulfilled, (state, action) => {
        return {
          ...state,
          user: {},
        };
      })
      .addCase(clearError.fulfilled, (state, action) => {
        return {
          ...state,
          error: null,
        };
      });
  }
);

export const updateMentor = createReducer(initalState, (builder) => {
  builder

    .addCase(updateMentorInfo.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(updateMentorInfo.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    })
    .addCase(updateMentorInfo.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearMessage.fulfilled, (state, action) => {
      return {
        ...state,
        user: {},
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

export const updateMentorRole = createReducer(initalState, (builder) => {
  builder

    .addCase(updateRoleMentor.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(updateRoleMentor.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        status: action.payload,
      };
    })
    .addCase(updateRoleMentor.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    })
    .addCase(clearMessage.fulfilled, (state, action) => {
      return {
        ...state,
        status: {},
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

// get all user (admin)
export const allStudentsReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(getAllStudents.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getAllStudents.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    })
    .addCase(getAllStudents.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
// get all mentors (admin)
export const allMentorReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(getAllMentors.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getAllMentors.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    })
    .addCase(getAllMentors.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
// get all admin (admin)
export const allAdminReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(getAllAdmin.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getAllAdmin.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    })
    .addCase(getAllAdmin.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

// delete user admin
export const deleteUserReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(deleteUser.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.sucess,
        message: action.payload.message,
      };
    })
    .addCase(deleteUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        isDeleted: false,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

//change approval
export const assignConnectionReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(assignConnection.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(assignConnection.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };
    })
    .addCase(assignConnection.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: false,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const allConnectionReducerMentor = createReducer(
  initalState,
  (builder) => {
    builder

      .addCase(allMentorConnection.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(allMentorConnection.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          success: action.payload,
        };
      })
      .addCase(allMentorConnection.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })
      .addCase(reset.fulfilled, (state, action) => {
        return {
          ...state,
          success: false,
        };
      })
      .addCase(clearError.fulfilled, (state, action) => {
        return {
          ...state,
          error: null,
        };
      });
  }
);
export const resoveConnectionReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(resolveConnection.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(resolveConnection.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };
    })
    .addCase(resolveConnection.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: false,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

export const sendOTPReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(sendOTP.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(sendOTP.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.status,
        message: action.payload.message,
      };
    })
    .addCase(sendOTP.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(stusendOTP.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(stusendOTP.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.status,
        message: action.payload.message,
      };
    })
    .addCase(stusendOTP.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: null,
        message: null,
      };
    })

    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const reSendOTPReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(resendOTP.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(resendOTP.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.status,
        message: action.payload.message,
      };
    })
    .addCase(resendOTP.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    })
    .addCase(sturesendOTP.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(sturesendOTP.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.status,
        message: action.payload.message,
      };
    })
    .addCase(sturesendOTP.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: null,
        message: null,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const verifyOTPReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(verifyOTP.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(verifyOTP.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.status,
        message: action.payload.message,
      };
    })
    .addCase(verifyOTP.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(stuVerifyOTP.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(stuVerifyOTP.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.status,
        message: action.payload.message,
      };
    })
    .addCase(stuVerifyOTP.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: null,
        message: null,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const resetPasswordReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(resetPassword.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(resetPassword.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
        userId:action.payload.userId
      };
    })
    .addCase(resetPassword.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: null,
        message: null,
      };
    })
    .addCase(clearMessage.fulfilled, (state, action) => {
      return {
        ...state,
        message: null,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const changePasswordReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(changePassword.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(changePassword.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };
    })
    .addCase(changePassword.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: null,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
