import axios  from "axios";

const REST_API_URL='http://localhost:8080/api/tenants';

export const getTenants=() => axios.get(REST_API_URL);

export const createTenant=(tenant) => axios.post(REST_API_URL,tenant);

export const getTenantById=(id) => axios.get(REST_API_URL+'/'+id);

export const updateTenant=(id,tenant) =>axios.put(REST_API_URL+'/'+id,tenant);

export const deleteTenantById=(id) => axios.delete(REST_API_URL+'/'+id);