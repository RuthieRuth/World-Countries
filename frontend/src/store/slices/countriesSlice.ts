import { countriesAPI } from "../../api/services/countries";
import { CountryState } from "../../types/country";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: CountryState = {
    countries: [],
    loading: false,
    error: null,
    selectedCountry: null,
}

export const fetchAllCountries = createAsyncThunk('countries/fetchAllCountries', async () => {
    const response = await countriesAPI.getAllCountries();
    return response;

});


export const countriesSlice = createSlice({
    name: "countries",
    initialState,
    reducers: {
        clearSelectedCountry: (state) => {
            state.selectedCountry = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCountries.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAllCountries.fulfilled, (state, action) => {
            state.loading = false;
            state.countries = action.payload;
        })
        .addCase(fetchAllCountries.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || 'Failed to load countries'; // if u cant extract type as string give the OR
        })
    }
});

export const selectAllCountries = (state: RootState) => state.countries.countries;
export const selectCountriesLoading = (state: RootState) => state.countries.loading;
export const selectCountriesError = (state: RootState) => state.countries.error;

export const { clearSelectedCountry } = countriesSlice.actions;
export default countriesSlice.reducer;