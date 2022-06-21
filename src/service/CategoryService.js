import {Axios} from "./axios";


const baseUrl='categories/';


function getAll(){
    return Axios.get(`${baseUrl}get-all`);
}

const CategoryService = {
    getAll
};

export default CategoryService;