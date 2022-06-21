import {Axios} from "./axios";


const baseUrl='units/';


function getAll(){
    return Axios.get(`${baseUrl}get-all`);
}

const UnitService = {
    getAll
};

export default UnitService;