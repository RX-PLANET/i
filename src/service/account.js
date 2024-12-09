import { $uc, $cms } from "@iruxu/rx-common/utils/api.js";

// ============ 基础信息 ============
/**
 * 获取用户信息
 * @returns {Promise}
 */
export function getUserInfo() {
    return $uc().get("/api/uc/user/account/i");
}

/**
 * 更新用户信息
 * @param {Object} data 用户信息
 * @param {String} data.lang 语言
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function updateUserInfo(data, params) {
    return $uc().put("/api/uc/user/account/i", data, {
        params,
    });
}

/**
 * 更新用户昵称
 * @param {Object} data
 * @param {String} data.nickname 昵称
 * @returns
 */
export function updateNickname(data) {
    return $uc().put("/api/uc/user/account/i/nickname", data);
}

/**
 * 获取用户资料
 * @returns
 */
export async function getProfile() {
    return $uc().get("/api/uc/user/i/profile");
}

/**
 * 更新用户资料
 * @param {Object} data
 * @param {String} data.country 国家
 * @param {String} data.birth_year 出生年
 * @param {String} data.birth_month 出生月
 * @param {String} data.birth_day 出生日
 * @param {String} data.bio 签名
 * @returns
 */
export function updateProfile(data) {
    return $uc().post("/api/uc/user/i/profile", data);
}

/**
 * 检查昵称是否可用
 * @param {String} nickname 昵称
 * @returns {Promise}
 * @returns
 */
export async function checkNickname(nickname) {
    return $uc()
        .get("/api/uc/user/account/nickname/valid", {
            params: {
                nickname,
            },
        })
        .then((res) => res.data.data);
}

/**
 * 上传头像
 * @param {Object} file
 */
export const uploadAvatar = async (file) => {
    return $cms().post("/api/cms/user/upload/avatar", file, {
        headers: {
            "Content-Type": file.type || "application/octet-stream",
        },
    });
};

/**
 * 登出
 * @returns
 */
export function logout() {
    return $uc().post("/api/uc/user/account/logout");
}

// ============ 邮箱相关 ============
/**
 * 查询邮箱是否可用
 * @param {String} email 邮箱
 * @returns {Promise}
 */
export async function checkEmail(email) {
    return $uc()
        .get("/api/uc/user/account/email/valid", {
            params: {
                email,
            },
        })
        .then((res) => res.data.data?.isExist);
}

/**
 * 注册账号 - 邮箱注册
 * @param {Object} data
 * @param {String} data.email 邮箱
 * @param {String} data.password 密码
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function registerByEmail(data, params) {
    return $uc().post("/api/uc/user/account/email/register", data, {
        params,
    });
}

/**
 * 邮箱注册 - 激活
 * @param {Object} data
 * @param {String} data.token
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function activeByEmail(data, params) {
    return $uc({ mute: true }).post("/api/uc/user/account/email/active", data, {
        params,
    });
}

/**
 * 邮箱登录
 * @param {Object} data
 * @param {String} data.email 邮箱
 * @param {String} data.password 密码
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function loginByEmail(data, params) {
    return $uc({ mute: true }).post("/api/uc/user/account/email/login", data, {
        params,
    });
}

/**
 * 绑定邮箱
 * @param {Object} data
 * @param {String} data.email 邮箱
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function bindEmail(data, params) {
    return $uc().post("/api/uc/user/account/email/bind", data, {
        params,
    });
}

/**
 * 验证邮箱
 * @param {Object} data
 * @param {String} data.code 验证码
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function verifyEmail(data, params) {
    return $uc().put("/api/uc/user/account/email/verify", data, {
        params,
    });
}

/**
 * 找回密码
 * @param {Object} data
 * @param {String} data.email 邮箱
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function findPassword(data, params) {
    return $uc().post("/api/uc/user/account/email/forgot-password", data, {
        params,
    });
}

/**
 * 重设密码
 * @param {Object} data
 * @param {String} data.email 邮箱
 * @param {String} data.code 验证码
 * @param {String} data.password 密码
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function resetPassword(data, params) {
    return $uc().put("/api/uc/user/account/email/reset-password", data, {
        params,
    });
}

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
 * 绑定手机号 - 发送验证码
 * @param {Object} data
 * @param {String} data.phone 手机号
 * @param {Object} params
 * @param {String} params.app 应用标识
 */
export function sendBindCode(data, params) {
    return $uc().post("/api/uc/user/account/phone/bind", data, {
        params,
    });
}

/**
 * 绑定手机号 - 认证验证码
 * @param {Object} data
 * @param {String} data.phone 手机号
 * @param {String} data.code 验证码
 * @param {Object} params
 * @param {String} params.app 应用标识
 */
export function bindPhoneCode(data, params) {
    return $uc().put("/api/uc/user/account/phone/verify", data, {
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
export function resetPasswordByPhone(data, params) {
    return $uc().put("/api/uc/user/account/phone/reset-password", data, {
        params,
    });
}

// ============ 用户名相关 ============
/**
 * 查询用户名称是否可用
 * @param {String} username 用户名
 * @returns {Promise}
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
 * 注册账号 - 用户名注册
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
    return $uc({ mute: true }).post("/api/uc/user/account/username/login", data, {
        params,
    });
}

/**
 * 修改密码
 * @param {Object} data
 * @param {String} data.password1 新密码
 * @param {String} data.password2 重复密码
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function changePassword(data, params) {
    return $uc().put("/api/uc/user/account/password", data, {
        params,
    });
}

/**
 * 注销账号
 * @param {Object} data
 * @param {String} data.password 密码
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function destroyAccount(data, params) {
    return $uc().post("/api/uc/user/account/destroy", data, {
        params,
    });
}
