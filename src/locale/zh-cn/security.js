export default {
    nav: {
        index: "安全中心",
        log: "日志审计",
        password: "修改密码",
        destroy: "注销账号",
        device: "设备管理",
    },
    log: {
        type: {
            login: "登录日志",
            account: "账号日志",
            action: "操作日志",
        },
        status: {
            all: "全部",
            success: "登录成功",
            fail: "登录失败",
        },
        table: {
            action: "行为",
            event: "事件",
            status: "状态",
            remark: "备注",
            app: "应用",
            device: "设备",
            time: "时间",
        },
    },
    password: {
        alert: "请设置一个合理安全的密码",
        new: "新密码",
        repeat: "重复密码",
        changeSuccess: "修改成功",
    },
    destroy: {
        alert: `<p>请注意，本操作是永久性的，不可恢复。</p>
        <p>一旦注销，您的所有本站信息和数据资产将丢失。</p>`,
        next: "我想好了，下一步",
        confirm: "确认注销",
        agree: "我已知晓并同意上述规则",
        confirmTip: "请输入您的登录密码",
        success: "注销成功",
    },
    device: {
        name: "别名",
        type: "设备类型",
        lastTime: "最后一次登录时间",
        lastLocation: "最后一次登录地点",
    },
};
