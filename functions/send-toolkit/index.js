const { Resend } = require('resend');

const ALLOWED_ORIGINS = [
  'https://whatifnow.ie',
  'https://www.whatifnow.ie',
  'https://whatifnow.github.io',
];

const PDF_URL = 'https://whatifnow.ie/toolkit/ai-ready-business-toolkit.pdf';

let resend;
function getResend() {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

function buildEmail({ name, company, sector, overall, tier, topStrength, topStrengthScore, priorityGap, priorityGapScore, quickWin }) {
  const tierColor = tier === 'Foundation' ? '#E8913A' : tier === 'Building' ? '#2EC4B6' : '#2A4365';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F2EEE9;font-family:Arial,sans-serif;color:#2D3142;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F2EEE9;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#2A4365;border-radius:12px 12px 0 0;padding:28px 32px;">
          <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:2px;color:#2EC4B6;text-transform:uppercase;">what if now</p>
          <h1 style="margin:8px 0 0;font-size:24px;font-weight:400;color:#fff;font-family:Georgia,serif;">Your AI Readiness Toolkit</h1>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#fff;padding:32px;">
          <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#475569;">Hi ${name},</p>
          <p style="margin:0 0 28px;font-size:16px;line-height:1.6;color:#475569;">
            Thanks for completing the assessment. Here's your personalised AI Readiness Report for
            <strong style="color:#2A4365;">${company}</strong> — and your free toolkit is linked below.
          </p>

          <!-- Score -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr><td style="background:#2A4365;border-radius:12px;padding:24px;text-align:center;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#2EC4B6;text-transform:uppercase;">Overall Score</p>
              <p style="margin:0;font-size:52px;font-weight:700;color:${tierColor};line-height:1;">${overall}%</p>
              <p style="margin:4px 0 0;font-size:18px;font-weight:400;color:#fff;font-family:Georgia,serif;">${tier}</p>
            </td></tr>
          </table>

          <!-- Strength / Gap -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td width="48%" style="background:#F2EEE9;border-radius:10px;padding:16px;vertical-align:top;">
                <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:1px;color:#2EC4B6;text-transform:uppercase;">Top Strength</p>
                <p style="margin:0 2px 0;font-size:14px;font-weight:700;color:#2A4365;">${topStrength}</p>
                <p style="margin:0;font-size:20px;font-weight:700;color:#2EC4B6;">${topStrengthScore}%</p>
              </td>
              <td width="4%"></td>
              <td width="48%" style="background:#F2EEE9;border-radius:10px;padding:16px;vertical-align:top;">
                <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:1px;color:#E8913A;text-transform:uppercase;">Priority Gap</p>
                <p style="margin:0 2px 0;font-size:14px;font-weight:700;color:#2A4365;">${priorityGap}</p>
                <p style="margin:0;font-size:20px;font-weight:700;color:#E8913A;">${priorityGapScore}%</p>
              </td>
            </tr>
          </table>

          <!-- Quick win -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
            <tr><td style="border-left:4px solid #2EC4B6;padding:14px 18px;background:#F0FDFC;border-radius:0 10px 10px 0;">
              <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:1px;color:#2EC4B6;text-transform:uppercase;">Quick Win for ${sector}</p>
              <p style="margin:0;font-size:14px;line-height:1.6;color:#2D3142;">${quickWin}</p>
            </td></tr>
          </table>

          <!-- Download CTA -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
            <tr><td align="center" style="background:#2EC4B6;border-radius:10px;padding:16px 24px;">
              <a href="${PDF_URL}" style="font-size:16px;font-weight:700;color:#fff;text-decoration:none;display:block;">Download Your Free Toolkit &rarr;</a>
            </td></tr>
          </table>

          <!-- Book a call -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr><td align="center" style="background:#2A4365;border-radius:10px;padding:14px 24px;">
              <a href="https://whatifnow.ie/contact?subject=AI+Readiness+Assessment+-+Book+a+Call" style="font-size:14px;font-weight:600;color:#fff;text-decoration:none;display:block;">Book a Free 30-Minute Call</a>
            </td></tr>
          </table>

          <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.6;">No obligation. No hard sell. Just a conversation about where AI could help your team.</p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#2A4365;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center;">
          <p style="margin:0 0 4px;font-size:12px;color:#C4D2E0;">what if now &middot; <a href="https://whatifnow.ie" style="color:#C4D2E0;text-decoration:none;">whatifnow.ie</a> &middot; Dublin, Ireland</p>
          <p style="margin:0;font-size:11px;color:#64748b;">
            <a href="https://whatifnow.ie/privacy" style="color:#64748b;">Privacy Policy</a>
            &middot; You received this because you completed the AI Readiness Assessment.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

exports.sendToolkit = async (req, res) => {
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
  }
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).send('');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, company, sector, overall, tier, topStrength, topStrengthScore, priorityGap, priorityGapScore, quickWin } = req.body;

  if (!name || !email || !company) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const resendClient = getResend();
    await resendClient.emails.send({
      from: 'What If Now <hello@mail.whatifnow.ie>',
      to: email,
      subject: `Your AI Readiness Toolkit — ${overall}% (${tier})`,
      html: buildEmail({ name, company, sector, overall, tier, topStrength, topStrengthScore, priorityGap, priorityGapScore, quickWin }),
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
