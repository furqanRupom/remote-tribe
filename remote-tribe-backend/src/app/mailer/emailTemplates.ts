class Templates {
    private mailHeader() {
        return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Remote Tribe</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f7;
          margin: 0;
          padding: 0;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #999;
          margin-top: 20px;
          padding: 20px 0;
        }
        a {
          color: #007BFF;
          text-decoration: none;
        }
        .code-box {
          background: #f0f0f0;
          padding: 10px 20px;
          font-size: 24px;
          font-weight: bold;
          letter-spacing: 4px;
          text-align: center;
          border-radius: 6px;
          margin: 20px 0;
          display: inline-block;
        }
      </style>
    </head>
    <body>`;
    }

    private mailFooter() {
        return `
      <div class="footer">
        <p>This is an automated message from <strong>Remote Tribe</strong>.</p>
        <p>If you didn’t expect this email, you can safely ignore it.</p>
        <p><a href="https://remote-tribe.com">Visit our site</a> or <a href="https://remote-tribe.com/unsubscribe">unsubscribe</a></p>
      </div>
    </body>
    </html>`;
    }

    private mailContainer(content: string): string {
        return `<div class="container">${content}</div>`;
    }

    public generateEmail(content: string): string {
        return this.mailHeader() + this.mailContainer(content) + this.mailFooter();
    }

    // ✅ Template: Registration Email with Verification Code
    public registrationEmail(name: string, code: string): string {
        const content = `
      <h2>Welcome to Remote Tribe, ${name}!</h2>
      <p>To complete your registration, please verify your email with the code below:</p>
      <div class="code-box">${code}</div>
      <p>This code will expire in 10 minutes.</p>
    `;
        return this.generateEmail(content);
    }

    // ✅ Template: Confirmation After Verification
    public confirmationEmail(name: string): string {
        const content = `
      <h2>Hi ${name}, your email has been successfully verified!</h2>
      <p>Thanks for joining <strong>Remote Tribe</strong>. You can now start exploring remote jobs tailored just for you.</p>
      <p><a href="https://remote-tribe.com/jobs">Browse Remote Jobs</a></p>
    `;
        return this.generateEmail(content);
    }

    // ✅ Template: Login Notification
    public loginNotificationEmail(name: string, location: string, time: string): string {
        const content = `
      <h2>Hello ${name},</h2>
      <p>We noticed a login to your account:</p>
      <ul>
        <li><strong>Location:</strong> ${location}</li>
        <li><strong>Time:</strong> ${time}</li>
      </ul>
      <p>If this was you, no action is needed.</p>
      <p>If you didn’t log in, please <a href="https://remote-tribe.com/reset-password">reset your password</a> immediately.</p>
    `;
        return this.generateEmail(content);
    }
}
export const EmailTemplates = new Templates();