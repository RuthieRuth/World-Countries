import { Country } from "../../types/country";
import { api } from "../axios";

// Rest Countries recently changed how data is accessed; prefer requesting
// only the fields we need via query params to reduce payload and avoid
// relying on the old 'all' behaviour.
const RESTCOUNTRIES_FIELDS = [
    'name',
    'capital',
    'region',
    'subregion',
    'population',
    'flags',
    'cca3',
    'currencies',
    'latlng',
    'maps',
].join(',');

export const countriesAPI = {
    // Returns a Promise resolving to the array of countries (response.data)
    getAllCountries: (): Promise<Country[]> =>
        api.get(`https://restcountries.com/v3.1/all?fields=${RESTCOUNTRIES_FIELDS}`),
};