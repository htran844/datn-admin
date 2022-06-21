import {Axios} from "./axios";


const baseUrl='weights/';


function getAll(){
    return Axios.get(`${baseUrl}get-all`);
}

const WeightService = {
    getAll
};

export default WeightService;