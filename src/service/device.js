import { $uc } from "@iruxu/rx-common/utils/api";

// 我的常用设备
export function getMyDevices() {
    return $uc().get("/api/uc/user/security/device");
}

// 备注设备
export function remarkDevice(id, data) {
    return $uc().put(`/api/uc/user/security/device/${id}`, data);
}

// 移除设备
export function removeDevice(id) {
    return $uc().delete(`/api/uc/user/security/device/${id}`);
}
