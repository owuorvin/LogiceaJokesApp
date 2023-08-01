import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiStatus } from "../../utils/helpers";
import { ErrorType } from "../../utils/types";

export interface Bookings {
  typeOfService?: string;
  name?: string;
  email?: string;
  status?: string;
}


export interface User {
  country?: object;
  modifiedBy?: string;
  name?: string;
  email?: string;
  staffNumber?: string;
  status?: string;
  userCode?: string;
  userType?: string;
  userTypeCode?: string;
  countryCode?: string;
  uniqueReferenceCode?: string;
  phoneNumber?: string;
}

interface UserProfileState {
  user: User;
  status: string | number;
  error: ErrorType | boolean;
  imageError: boolean | object;
  selectedUser: User;
  selectBookings: Bookings;
}

const initialState: UserProfileState = {
  user: {
    country: {},
    modifiedBy: "",
    name: "",
    staffNumber: "",
    status: "",
    userCode: "",
    userType: "",
    uniqueReferenceCode: "",
  },
  status: apiStatus.initial,
  error: false,
  imageError: false,
  selectedUser: {
    country: {},
    modifiedBy: "",
    name: "",
    staffNumber: "",
    status: "",
    userCode: "",
    userTypeCode: "",
  },
  selectBookings: {}
};

export const profileSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    createUserSuccess: (state, { payload }: PayloadAction<object>) => {
      state.user = payload;
      state.status = apiStatus.ok;
      state.error = false;
    },
    createUserFailure: (state, { payload }: PayloadAction<object>) => {
      state.error = payload;
      state.status = apiStatus.error;
    },
    setImageError: (state, action: PayloadAction<object>) => {
      state.imageError = action.payload;
    },
    clearError: (state) => {
      state.error = false;
      state.status = apiStatus.initial;
    },
    setSelectedUser: (state, { payload }) => {
      state.selectedUser = payload;
    },
    setSelectedBookings: (
      state,
      { payload }: PayloadAction<Bookings>,
    ) => {
      state.selectBookings = {
        ...state.selectBookings,
        ...payload,
      };
    },
  },
});

export const {
  createUserSuccess,
  createUserFailure,
  setImageError,
  clearError,
  setSelectedUser,
  setSelectedBookings
} = profileSlice.actions;

export default profileSlice.reducer;
