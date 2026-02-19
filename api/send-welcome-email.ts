import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL = process.env.VITE_SITE_URL || 'https://team3pn.vercel.app';

function buildWelcomeHtml(fullName: string): string {
  const firstName = fullName.split(' ')[0] || 'there';
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to 3PN</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f4;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f4;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1a1a 0%,#2d2d2d 100%);padding:32px 40px;text-align:center;">
              <div style="font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">3<span style="color:#f97316;">PN</span></div>
              <div style="font-size:11px;color:#a1a1aa;margin-top:4px;letter-spacing:1.5px;text-transform:uppercase;">Professional Network</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h1 style="font-size:22px;font-weight:700;color:#1a1a1a;margin:0 0 8px 0;">Welcome aboard, ${firstName}! 🎉</h1>
              <p style="font-size:15px;color:#52525b;line-height:1.6;margin:0 0 24px 0;">
                You've just taken the first step on your journey from <strong>Point A</strong> (Potential) to <strong>Point B</strong> (Power). We're thrilled to have you in the 3PN community.
              </p>

              <p style="font-size:14px;color:#71717a;margin:0 0 24px 0;">Here's how to get the most out of 3PN:</p>

              <!-- Step 1 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td width="40" valign="top">
                    <div style="width:32px;height:32px;border-radius:8px;background-color:#fff7ed;color:#f97316;font-size:14px;font-weight:700;line-height:32px;text-align:center;">1</div>
                  </td>
                  <td style="padding-left:12px;">
                    <div style="font-size:14px;font-weight:600;color:#1a1a1a;">Take the CAD Assessment</div>
                    <div style="font-size:13px;color:#71717a;margin-top:2px;">Discover your career quadrant and get personalized AI insights</div>
                  </td>
                </tr>
              </table>

              <!-- Step 2 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td width="40" valign="top">
                    <div style="width:32px;height:32px;border-radius:8px;background-color:#fff7ed;color:#f97316;font-size:14px;font-weight:700;line-height:32px;text-align:center;">2</div>
                  </td>
                  <td style="padding-left:12px;">
                    <div style="font-size:14px;font-weight:600;color:#1a1a1a;">Complete Your Profile</div>
                    <div style="font-size:13px;color:#71717a;margin-top:2px;">Set up your dashboard and track your growth journey</div>
                  </td>
                </tr>
              </table>

              <!-- Step 3 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td width="40" valign="top">
                    <div style="width:32px;height:32px;border-radius:8px;background-color:#fff7ed;color:#f97316;font-size:14px;font-weight:700;line-height:32px;text-align:center;">3</div>
                  </td>
                  <td style="padding-left:12px;">
                    <div style="font-size:14px;font-weight:600;color:#1a1a1a;">Explore Resources</div>
                    <div style="font-size:13px;color:#71717a;margin-top:2px;">Access curated content tailored to your career stage</div>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${SITE_URL}/assessment" style="display:inline-block;background:linear-gradient(135deg,#f97316 0%,#ea580c 100%);color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:10px;box-shadow:0 2px 8px rgba(249,115,22,0.3);">
                      Start Your Assessment →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="border-top:1px solid #e4e4e7;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size:16px;font-weight:700;color:#1a1a1a;">3<span style="color:#f97316;">PN</span></div>
                    <div style="font-size:12px;color:#a1a1aa;margin-top:4px;">From Feeling Stuck to Steering Your Own Future</div>
                  </td>
                  <td align="right" valign="top">
                    <a href="${SITE_URL}" style="font-size:12px;color:#f97316;text-decoration:none;font-weight:500;">team3pn.vercel.app</a>
                  </td>
                </tr>
              </table>
              <div style="font-size:11px;color:#d4d4d8;margin-top:16px;">© ${new Date().getFullYear()} 3PN Professional Network. All rights reserved.</div>
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

    const { data, error } = await resend.emails.send({
      from: '3PN <info@momms.co.uk>',
      to: email,
      subject: `Welcome to 3PN, ${fullName.split(' ')[0]}! 🎉`,
      html: buildWelcomeHtml(fullName),
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error('Email error:', err);
    return res.status(500).json({ error: err.message });
  }
}
