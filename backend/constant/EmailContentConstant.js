

class EmailContentConstant {

    static passwordResetBody = `
            <h1>Password Reset</h1>
            <p>Hello,</p>
            <p>Your new password is: <strong>{password}</strong></p>
            <p>Please keep it safe and do not share it with others.</p>
            <p>Regards,<br/>Shruti Diagnostics</p>
    `
    static passwordResetSubject = "Password Reset";
}

module.exports = EmailContentConstant;
