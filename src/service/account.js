import { $uc } from "@/utils/api";

// ============ 用户名相关 ============
/**
 * 查询用户名称是否可用
 * @param {String} username 用户名
 * @returns {Promise}
 * @example
 * checkUsername("admin").then(res => {
 *    console.log(res);
 * });
 */
export async function checkUsername(username) {
    return $uc()
        .get("/api/uc/user/account/username/valid", {
            params: {
                username,
            },
        })
        .then((res) => res.data.data?.isExist);
}

/**
 * 注册用户
 * @param {Object} data
 * @param {String} data.username 用户名
 * @param {String} data.password 密码
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function registerByUsername(data, params) {
    return $uc().post("/api/uc/user/account/username/register", data, {
        params,
    });
}

/**
 * 用户登录
 * @param {Object} data
 * @param {String} data.username 用户名
 * @param {String} data.password 密码
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function loginByUsername(data, params) {
    return $uc().post("/api/uc/user/account/username/login", data, {
        params,
    });
}
