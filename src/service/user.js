import { $uc } from "@/utils/api";

/**
 * 获取用户信息
 * @returns {Promise}
 */
export function getUserInfo() {
    return $uc().get("/api/uc/user/account/i");
}