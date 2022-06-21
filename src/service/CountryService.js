import {Axios} from "./axios";


const baseUrl='countries/';


function getAll(){
    return Axios.get(`${baseUrl}get-all`);
}

const CountryService = {
    getAll
};

export default CountryService;