import { $uc } from "@iruxu/rx-common/utils/api";

export function createAddress(data) {
    return $uc().post(`/api/uc/user/i/address`, data);
}

export function getAddressList(params) {
    return $uc().get(`/api/uc/user/i/address`, { params });
}

export function getAddress(id) {
    return $uc().get(`/api/uc/user/i/address/${id}`);
}

export function updateAddress(id, data) {
    return $uc().put(`/api/uc/user/i/address/${id}`, data);
}

export function deleteAddress(id) {
    return $uc().delete(`/api/uc/user/i/address/${id}`);
}

export function setDefaultAddress(id, data) {
    return $uc().put(`/api/uc/user/i/address/${id}/default`, data);
}
