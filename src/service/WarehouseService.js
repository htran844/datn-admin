import {Axios} from "./axios";

const baseUrl = 'warehouse/';

function getAllWarehouses(page, size){
    return Axios.get(`${baseUrl}?page=${page}&size=${size}`);
}

function getDetailWarehouseById(id){
    return Axios.get(`${baseUrl}detail/${id}`);
}

const WarehouseService = {
    getAllWarehouses,
    getDetailWarehouseById
};

export default WarehouseService;