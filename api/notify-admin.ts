import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL = process.env.VITE_SITE_URL || 'https://team3pn.vercel.app';

const ADMIN_EMAILS = [
  'eguko.efetive@gmail.com',
  'dk@dkjonah.com',
  'olusowunmi79@gmail.com',
];

const CC_EMAILS = [
  'david.oludepo@gmail.com',
];

function buildAdminNotificationHtml(fullName: string, email: string, signupDate: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New 3PN Signup</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f4;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f4;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1a1a 0%,#2d2d2d 100%);padding:24px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size:22px;font-weight:800;color:#ffffff;">3<span style="color:#f97316;">PN</span></div>
                  </td>
                  <td align="right">
                    <span style="font-size:11px;color:#a1a1aa;background-color:rgba(249,115,22,0.15);padding:4px 10px;border-radius:6px;letter-spacing:0.5px;">ADMIN ALERT</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 36px 24px;">
              <h1 style="font-size:18px;font-weight:700;color:#1a1a1a;margin:0 0 6px 0;">New User Signup 🚀</h1>
              <p style="font-size:14px;color:#71717a;margin:0 0 24px 0;">Someone just joined the 3PN community.</p>

              <!-- User Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fafafa;border:1px solid #e4e4e7;border-radius:10px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:12px;">
                          <div style="font-size:11px;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Full Name</div>
                          <div style="font-size:15px;color:#1a1a1a;font-weight:600;margin-top:3px;">${fullName}</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:12px;border-top:1px solid #e4e4e7;padding-top:12px;">
                          <div style="font-size:11px;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Email</div>
                          <div style="font-size:15px;color:#1a1a1a;margin-top:3px;">${email}</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="border-top:1px solid #e4e4e7;padding-top:12px;">
                          <div style="font-size:11px;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Signed Up</div>
                          <div style="font-size:15px;color:#1a1a1a;margin-top:3px;">${signupDate}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 36px 24px;" align="center">
              <a href="${SITE_URL}/admin" style="display:inline-block;background-color:#1a1a1a;color:#ffffff;font-size:13px;font-weight:600;text-decoration:none;padding:12px 28px;border-radius:8px;">
                View in Admin Dashboard →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 36px;border-top:1px solid #e4e4e7;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size:14px;font-weight:700;color:#1a1a1a;">3<span style="color:#f97316;">PN</span></div>
                    <div style="font-size:11px;color:#d4d4d8;margin-top:4px;">© ${new Date().getFullYear()} 3PN Professional Network. All rights reserved.</div>
                  </td>
                  <td align="right" valign="bottom">
                    <a href="${SITE_URL}" style="font-size:11px;color:#a1a1aa;text-decoration:none;">team3pn.vercel.app</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, fullName } = req.body;

    if (!email || !fullName) {
      return res.status(400).json({ error: 'Missing email or fullName' });
    }

    const signupDate = new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Africa/Lagos',
    }).format(new Date());

    const { data, error } = await resend.emails.send({
      from: '3PN <onboarding@resend.dev>',
      to: ADMIN_EMAILS,
      cc: CC_EMAILS,
      subject: `New 3PN Signup: ${fullName}`,
      html: buildAdminNotificationHtml(fullName, email, signupDate),
    });

    if (error) {
      console.error('Admin notification error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error('Admin notification error:', err);
    return res.status(500).json({ error: err.message });
  }
}
