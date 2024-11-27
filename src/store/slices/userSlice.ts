import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../api/userActions";

export const loginUserStore = createAsyncThunk(
  "user/login",
  async (
    { username, password }: { username: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await loginUser(username, password);
      if (response.access_token) {
        dispatch(loginSuccess(response));
        localStorage.setItem("token", response.access_token);
        return response;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface UserState {
  user: null | { username: string; userId: string };
  isLogged: boolean;
  status: string;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLogged: false,
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
      console.log("l", state.isLogged);
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
      console.log("l", state.isLogged);
    },
    logout: (state) => {
      state.user = null;
      state.isLogged = false;
      console.log("l", state.isLogged);
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserStore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserStore.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLogged = true;
      })
      .addCase(loginUserStore.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { loginSuccess, login, logout } = userSlice.actions;
export default userSlice.reducer;
