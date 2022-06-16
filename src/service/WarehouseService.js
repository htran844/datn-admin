import {Axios} from "./axios";

const baseUrl = 'warehouse/';

function getAllWarehouses(page, size) {
    return Axios.get(`${baseUrl}?page=${page}&size=${size}`);
}

function getDetailWarehouseById(id) {
    return Axios.get(`${baseUrl}detail/${id}`);
}

function saveWarehouse(payload) {
    return Axios.post(`${baseUrl}`, payload);
}

function updateWarehouse(payload) {
    return Axios.put(`${baseUrl}${payload.id}`, payload);
}

const WarehouseService = {
    getAllWarehouses,
    getDetailWarehouseById,
    saveWarehouse,
    updateWarehouse
};


export default WarehouseService;