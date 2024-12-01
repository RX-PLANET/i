export default {
    nav: {
        index: "Security",
        log: "Log Audit",
        password: "Change Password",
        destroy: "Account Deletion",
        device: "Device Management",
    },
    log: {
        type: {
            login: "Login Log",
            account: "Account Log",
            action: "Operation log",
        },
        status: {
            all: "All",
            success: "Success",
            fail: "Failure",
        },
        table: {
            action: "Action",
            event: "Event",
            status: "Status",
            remark: "Remark",
            app: "Application",
            device: "Device",
            time: "Time",
        },
    },
    password: {
        alert: "Please set a secure and reasonable password.",
        new: "New Password",
        repeat: "Repeat Password",
        changeSuccess: "Change Successful",
    },
    destroy: {
        alert: `<p>Please note that this operation is permanent and cannot be restored. </p>
                <p>Once you log out, all your information and data assets on this site will be lost. </p>`,
        next: "I've thought about it, next step",
        confirm: "Confirm Logout",
        agree: "I have understood and agree to the above rules",
        confirmTip: "Please enter your login password",
        success: "Logout successful",
    },
    device: {
        name: "Aliases",
        type: "Device Type",
        lastTime: "Last login time",
        lastLocation: "Last login location",
    },
};
