import {Axios} from "./axios";

const baseUrl = 'productsDetails/';

function search(q, page, size){
    return Axios.get(`${baseUrl}search?q=${q}&page=${page}&size=${size}&sort=id,desc`);
}

const ProductDetailService = {
    search,
};

export default ProductDetailService;