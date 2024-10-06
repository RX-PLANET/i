import { $uc } from "@iruxu/pkg-common/utils/api.js";

export function getMessages(params) {
    return $uc().get("/api/uc/user/message/inbox", { params });
}
export function getMessage(id) {
    return $uc().get(`/api/uc/user/message/inbox/${id}`);
}
// 获取当前用户未读消息数量
export function getMessageUnreadCount(params) {
    return $uc().get("/api/uc/user/message/count", { params });
}
// 修改消息状态&备注
export function updateMessage(id, data) {
    return $uc().put(`/api/uc/user/message/${id}`, data);
}
/**
 * 将所有未读消息设为已读
 * @param {*} app 应用
 * @returns
 */
export function readAllMessages(data) {
    return $uc().put(`/api/uc/user/message/count`, data);
}
/**
 * 删除消息 多条记录用,分割
 * @param {*} id
 * @returns
 */
export function delMessages(ids) {
    return $uc().delete(`/api/uc/user/message`, { params: { id: ids } });
}
