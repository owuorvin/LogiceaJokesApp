import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiStatus } from "../../../utils/helpers";
import { ErrorType } from "../../../utils/types";


export interface CurrentUser {
    id?: string;
    title?: string;
    firstName?: string;
    lastName?:string;
    role?:string;
    jwtToken?: string;
    email?: string;
}

interface UserProfileState {
  user: CurrentUser;
  status: string | number;
  error: ErrorType | boolean;
  imageError: boolean | object;
  selectedUser: CurrentUser;

}

const initialState: UserProfileState = {
  user: {
    id: "",
    title: "",
    firstName: "",
    lastName:"",
    role:"",
    jwtToken: "",
    email: ""
  },

  status: apiStatus.initial,
  error: false,
  imageError: false,
  selectedUser: {
     id: "",
    title: "",
    firstName: "",
    lastName:"",
    role:"",
    jwtToken: "",
    email: ""
  },
};

export const profileSlice = createSlice({
  name: "login",
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
  },
});

export const {
  createUserSuccess,
  createUserFailure,
  setImageError,
  clearError,
  setSelectedUser
} = profileSlice.actions;

export default profileSlice.reducer;
