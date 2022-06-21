import {Axios} from "./axios";


const baseUrl='brands/';


function getAll(){
    return Axios.get(`${baseUrl}get-all`);
}

const BrandService = {
    getAll
};

export default BrandService;