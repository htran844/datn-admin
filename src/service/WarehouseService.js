import {Axios} from "./axios";

const baseUrl = 'warehouse/';

function getAllWarehouses(page, size) {
    return Axios.get(`${baseUrl}?page=${page}&size=${size}&sort=createdDate,desc`);
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

function deleteWarehouse(warehouseId){
    return Axios.del(`${baseUrl}${warehouseId}`);
}

const WarehouseService = {
    getAllWarehouses,
    getDetailWarehouseById,
    saveWarehouse,
    updateWarehouse,
    deleteWarehouse
};


export default WarehouseService;