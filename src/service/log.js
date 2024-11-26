import { $uc } from "@iruxu/rx-common/utils/api";

// 登录日志
export function getLoginLogs(params) {
    return $uc().get("/api/uc/log/login", {
        params,
    });
}

// 账号日志
export function getAccountLogs(params) {
    return $uc().get("/api/uc/log/account", {
        params,
    });
}

// 登录日志
export function getActionLogs(params) {
    return $uc().get("/api/uc/log/action", {
        params,
    });
}
