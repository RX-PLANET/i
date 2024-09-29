import { $uc } from "@iruxu/pkg-common/utils/api";

// ============ 手机相关 ============

/**
 * 校验手机与验证码
 * @param {Object} params
 * @param {String} params.phone 手机号
 * @param {String} params.code 验证码
 * @returns
 */
export async function checkPhoneCode(params) {
    return $uc().get("/api/uc/user/account/phone/check-code", {
        params,
    });
}

// 绑定

/**
 * 绑定手机号
 * @param {Object} data
 * @param {String} data.phone 手机号
 * @param {Object} params
 * @param {String} params.app 应用标识
 */
export function bindPhone(data, params) {
    return $uc().post("/api/uc/user/account/phone/bind", data, {
        params,
    });
}

// 忘记密码

/**
 * 忘记密码 - 发送验证码
 * @param {Object} data
 * @param {String} data.phone 手机号
 * @param {Object} params
 * @param {String} params.app 应用标识
 */
export function sendCode(data, params) {
    return $uc().post("/api/uc/user/account/phone/forgot-password", data, {
        params,
    });
}

/**
 * 重置密码
 * @param {Object} data
 * @param {String} data.phone 手机号
 * @param {String} data.code 验证码
 * @param {String} data.password 密码
 * @param {Object} params
 * @param {String} params.app 应用标识
 */
export function resetPassword(data, params) {
    return $uc().put("/api/uc/user/account/phone/reset-password", data, {
        params,
    });
}
