import { Country } from "../../types/country";
import { api } from "../axios";

export const countriesAPI = {
    getAllCountries:  () : Promise<Country[]> => api.get('https://restcountries.com/v3.1/all'),
}