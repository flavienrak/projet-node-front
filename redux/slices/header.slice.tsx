import { createSlice } from '@reduxjs/toolkit';
import { HeaderInterface } from '@/interfaces/header.interface';

const initialState: { header: HeaderInterface | null } = {
  header: null,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeaderReducer: (state, action) => {
      const data: { header: HeaderInterface } = action.payload;

      state.header = data.header;
    },
  },
});

export const { setHeaderReducer } = headerSlice.actions;

export default headerSlice.reducer;
