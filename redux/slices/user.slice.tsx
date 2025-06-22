import { createSlice } from '@reduxjs/toolkit';
import { UserInterface } from '@/interfaces/user.interface';

const initialState: { user: UserInterface | null } = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserReducer: (state, action) => {
      const data: { user: UserInterface } = action.payload;
      state.user = data.user;
    },
    updateUserReducer: (state, action) => {
      const data: { user?: UserInterface } = action.payload;

      if (data.user) {
        state.user = { ...state.user, ...data.user };
      }
    },
  },
});

export const { setUserReducer, updateUserReducer } = userSlice.actions;

export default userSlice.reducer;
