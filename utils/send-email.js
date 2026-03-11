const nodemailer = require("nodemailer");
const CustomErrorHandler = require("../error/custom-error.handler");

async function sendMessage(code, email) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "maqsudamadrahimova.9@gmail.com", 
                pass: process.env.GOOGLE_PASS
            }
        });

        await transporter.sendMail({
            subject: "Car-Exem | Tasdiqlash kodi",
            from: '"Car-Exem Support" <maqsudamadrahimova.9@gmail.com>',
            to: email,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Tasdiqlash kodi</title>
</head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;margin:40px 0;border-radius:20px;overflow:hidden;box-shadow:0 15px 40px rgba(0,0,0,0.08);">

                <tr>
                    <td style="background:linear-gradient(135deg,#0984e3,#74b9ff);padding:40px 30px;text-align:center;color:white;">
                        <h1 style="margin:0;font-size:28px;letter-spacing:1px;">🚗 Car-Exem</h1>
                        <p style="margin-top:10px;font-size:15px;opacity:0.9;">Sizning ishonchli avto-hamrohingiz</p>
                    </td>
                </tr>

                <tr>
                    <td style="padding:40px 35px;color:#333333;text-align:center;">
                        <h2 style="margin-top:0;font-size:22px;">Salom! ✨</h2>
                        <p style="font-size:15px;line-height:1.7;color:#555;">
                            Platformamizga xush kelibsiz. Ro'yxatdan o'tishni yakunlash yoki parolni tiklash uchun quyidagi maxfiy koddan foydalaning:
                        </p>

                        <div style="background:#f8f9ff;border:2px dashed #0984e3;border-radius:15px;padding:25px;margin:30px 0;">
                            <span style="font-size:36px;font-weight:bold;color:#0984e3;letter-spacing:10px;">
                                ${code}
                            </span>
                        </div>

                        <p style="font-size:13px;color:#888;">
                            Ushbu kod 2 daqiqa davomida amal qiladi. Iltimos, kodni hech kimga bermang.
                        </p>

                        <div style="text-align:center;margin-top:30px;">
                            <a href="#" style="background:linear-gradient(135deg,#0984e3,#74b9ff);color:white;text-decoration:none;padding:15px 35px;border-radius:50px;display:inline-block;font-weight:bold;font-size:14px;box-shadow:0 10px 20px rgba(9,132,227,0.3);">
                                Tizimga kirish
                            </a>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td style="background:#f4f6fb;padding:25px;text-align:center;font-size:12px;color:#888;">
                        © 2026 Car-Exem. Barcha huquqlar himoyalangan. <br>
                        Urganch, Xorazm viloyati.
                    </td>
                </tr>

            </table>
        </td>
    </tr>
</table>

</body>
</html>`
        });
    } catch (error) {
        throw CustomErrorHandler.InternalServerError(error.message);
    }
}

module.exports = sendMessage;