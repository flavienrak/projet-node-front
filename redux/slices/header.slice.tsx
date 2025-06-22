import { createSlice } from '@reduxjs/toolkit';
import { HeaderInterface } from '@/interfaces/header.interface';

const initialState: {
  methods: string | null;
  protocol: string | null;
  host: string | null;
  status: number | null;
  url: string | null;
  headers: HeaderInterface[];
} = {
  methods: null,
  protocol: null,
  host: null,
  status: null,
  url: null,
  headers: [],
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeaderReducer: (state, action) => {
      const data: {
        methods: string | null;
        protocol: string | null;
        host: string | null;
        status: number | null;
        url: string | null;
        headers: HeaderInterface[];
      } = action.payload;

      if (data.methods) {
        state.methods = data.methods;
      }
      if (data.protocol) {
        state.protocol = data.protocol;
      }
      if (data.host) {
        state.host = data.host;
      }
      if (data.host) {
        state.host = data.host;
      }
      if (data.status) {
        state.status = data.status;
      }
      if (data.url) {
        state.url = data.url;
      }

      state.headers = data.headers;
    },
  },
});

export const { setHeaderReducer } = headerSlice.actions;

export default headerSlice.reducer;
