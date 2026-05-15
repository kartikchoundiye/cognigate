import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from app.config.settings import settings


def send_otp_email(to_email: str, otp: str, purpose: str):

    # =====================================
    # EMAIL SUBJECT
    # =====================================
    subject = f"CogniGate • {purpose} OTP"

    # =====================================
    # HTML EMAIL TEMPLATE
    # =====================================
    html_content = f"""
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <style>

            body {{
                margin: 0;
                padding: 0;
                background-color: #f4f7fb;
                font-family: Arial, sans-serif;
            }}

            .container {{
                width: 100%;
                padding: 40px 20px;
                box-sizing: border-box;
            }}

            .card {{
                max-width: 500px;
                margin: auto;
                background: white;
                border-radius: 16px;
                padding: 40px 30px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.08);
                text-align: center;
            }}

            .logo {{
                font-size: 32px;
                font-weight: bold;
                color: #2563eb;
                margin-bottom: 10px;
            }}

            .title {{
                font-size: 24px;
                font-weight: bold;
                color: #111827;
                margin-bottom: 20px;
            }}

            .description {{
                font-size: 16px;
                color: #4b5563;
                line-height: 1.6;
                margin-bottom: 30px;
            }}

            .otp-box {{
                background: #2563eb;
                color: white;
                font-size: 38px;
                font-weight: bold;
                letter-spacing: 8px;
                padding: 18px 24px;
                border-radius: 12px;
                display: inline-block;
                margin-bottom: 30px;
            }}

            .footer {{
                font-size: 13px;
                color: #9ca3af;
                margin-top: 30px;
                line-height: 1.6;
            }}

            @media screen and (max-width: 600px) {{

                .card {{
                    padding: 30px 20px;
                }}

                .title {{
                    font-size: 22px;
                }}

                .otp-box {{
                    font-size: 30px;
                    letter-spacing: 5px;
                    padding: 15px 18px;
                }}
            }}

        </style>
    </head>

    <body>

        <div class="container">

            <div class="card">

                <div class="logo">
                    CogniGate
                </div>

                <div class="title">
                    {purpose}
                </div>

                <div class="description">
                    Use the OTP below to continue.
                    This OTP is valid for only 10 minutes.
                </div>

                <div class="otp-box">
                    {otp}
                </div>

                <div class="description">
                    If you did not request this OTP,
                    you can safely ignore this email.
                </div>

                <div class="footer">
                    © 2026 CogniGate <br>
                    Tech Interview Preparation System
                </div>

            </div>

        </div>

    </body>

    </html>
    """

    # =====================================
    # CREATE EMAIL MESSAGE
    # =====================================
    msg = MIMEMultipart("alternative")

    msg["Subject"] = subject
    msg["From"] = settings.EMAIL_USER
    msg["To"] = to_email

    # =====================================
    # ATTACH HTML CONTENT
    # =====================================
    msg.attach(MIMEText(html_content, "html"))

    # =====================================
    # SEND EMAIL
    # =====================================
    try:

        # server = smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT)
        server = smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT, timeout=10)

        server.starttls()

        server.login(settings.EMAIL_USER, settings.EMAIL_PASSWORD)

        server.sendmail(settings.EMAIL_USER, to_email, msg.as_string())

        server.quit()

        print("✅ HTML Email sent successfully")

        return True

    except smtplib.SMTPException as e:
        print("❌ SMTP Error:", e)
        return False

    except Exception as e:
        print("❌ General Email Error:", e)
        return False
