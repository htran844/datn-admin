import {Axios} from "./axios";


const baseUrl='products/';


function filterProducts(page, size, payload){
    return Axios.post(`${baseUrl}filter?page=${page}&size=${size}&sort=id,desc`,payload);
}

function updateProduct(id, payLoad){
    return Axios.put(`${baseUrl+id}`,payLoad);
}

function addProduct(payLoad){
    return Axios.post(baseUrl,payLoad);
}

function deleteProduct(id){
    return Axios.del(`${baseUrl+id}`);
}

const ProductService = {
    filterProducts,
    addProduct,
    updateProduct,
    deleteProduct
};

export default ProductService;