import {get, post, exportExcel} from "@/utils/httpRequest"

export const loginHandle = params => post('/system/login', params);

export const getShoesList = params => post('/shoes/getShoesList', params);

export const addAndUpdateShoesInfo = (url, params) => post(url, params);

export const deleteShoesInfo = params => post('/shoes/deleteShoesInfo', params);

export const downloadModle = () => exportExcel('/shoes/download');

export const loginOut = () => post('/system/loginOut');
