import {Axios} from "./axios";

const baseUrl = 'productsDetails/';

function search(q, page, size){
    return Axios.get(`${baseUrl}search?q=${q}&page=${page}&size=${size}&sort=productDetailId,desc`);
}

function filter(page, size, payload){
    return Axios.post(`${baseUrl}filter?page=${page}&size=${size}`, payload);
}

function getAll(page, size){
    return Axios.get(`${baseUrl}?page=${page}&size=${size}&sort=productDetailId,desc`);
}

const ProductDetailService = {
    search,
    filter,
    getAll
};

export default ProductDetailService;