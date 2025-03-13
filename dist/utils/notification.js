"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const tslib_1 = require("tslib");
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
const { EMAIL_FROM, MAIL_USERNAME, MAIL_PASSWORD, OAUTH_CLIENTID, OAUTH_CLIENT_SECRET, OAUTH_REFRESH_TOKEN, } = process.env;
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: "OAuth2",
        user: MAIL_USERNAME,
        clientId: OAUTH_CLIENTID,
        clientSecret: OAUTH_CLIENT_SECRET,
        refreshToken: OAUTH_REFRESH_TOKEN,
        accessToken: MAIL_PASSWORD,
    },
});
const sendMail = (to, subject, html) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield transporter.sendMail({
        from: EMAIL_FROM,
        to: to,
        subject: subject,
        html: html,
    });
    return true;
});
exports.sendMail = sendMail;
//# sourceMappingURL=notification.js.map