import { createSlice } from '@reduxjs/toolkit';

type Mode = 'light' | 'dark';

const initialState: {
  mode: Mode;
} = {
  mode: 'light',
};

const persistSlice = createSlice({
  name: 'persist',
  initialState,
  reducers: {
    updatePersistReducer: (state, action) => {
      const data: {
        mode?: Mode;
      } = action.payload;

      if (data.mode) {
        state.mode = data.mode;
      }
    },
  },
});

export const { updatePersistReducer } = persistSlice.actions;
export default persistSlice.reducer;
