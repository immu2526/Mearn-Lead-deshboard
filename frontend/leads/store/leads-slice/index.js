import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// all leads

export const allLeads = createAsyncThunk(
  "api/allleads",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/leads");
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//

// create new leads

export const createLeads = createAsyncThunk(
  "api/createLeads",
  async (form, { rejectWithValue }) => {
    try {
      const data = await axios.post(
        "http://localhost:3000/api/leads/new",
        form
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// featch single leads

export const featchSingleLeads = createAsyncThunk(
  "api/featchSingle",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/leads/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// edit leads

export const updateLeada = createAsyncThunk(
  "api/editleads",
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/leads/${id}`,
        formData
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//

// delete leads

export const deleteLeads = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      let { data } = await axios.delete(
        `http://localhost:3000/api/leads/${id}/delete`
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  isLoading: true,
  data: null,
};

const leadSlice = createSlice({
  name: "author",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(allLeads.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allLeads.fulfilled, (state, action) => {
        (state.isLoading = false), (state.data = action.payload.data);
      })
      .addCase(allLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
      })
      .addCase(createLeads.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLeads.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createLeads.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteLeads.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLeads.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedId = action.meta.arg;
        state.data = state.data.filter((val) => val._id !== deletedId);
      })
      .addCase(deleteLeads.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { setUser } = leadSlice.actions;

export default leadSlice.reducer;
