import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks for asynchronous actions
export const fetchDisasters = createAsyncThunk("disaster/fetchDisasters", async () => {
  const response = await axios.get("http://localhost/disaster/getDisasters.php");
  return response.data;
});

export const addOrUpdateDisaster = createAsyncThunk("disaster/addOrUpdateDisaster", async (disaster) => {
  const url = disaster.id
    ? "http://localhost/disaster/updateDisaster.php"
    : "http://localhost/disaster/createDisaster.php";
  await axios.post(url, disaster);
  return disaster;
});

export const deleteDisaster = createAsyncThunk("disaster/deleteDisaster", async (id) => {
  await axios.post("http://localhost/disaster/deleteDisaster.php", { id });
  return id;
});

const disasterSlice = createSlice({
  name: "disaster",
  initialState: {
    disasters: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDisasters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDisasters.fulfilled, (state, action) => {
        state.loading = false;
        state.disasters = action.payload;
      })
      .addCase(fetchDisasters.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch disasters";
      })
      .addCase(addOrUpdateDisaster.fulfilled, (state, action) => {
        state.disasters = [...state.disasters.filter((d) => d.id !== action.payload.id), action.payload];
      })
      .addCase(deleteDisaster.fulfilled, (state, action) => {
        state.disasters = state.disasters.filter((d) => d.id !== action.payload);
      });
  },
});

export default disasterSlice.reducer;
