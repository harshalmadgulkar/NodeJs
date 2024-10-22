// 1.Import nodemailer
const nodemailer = require('nodemailer');

// 2.Configure email & send
async function sendMail() {
  // 3.Create email transporter
  // using SMTP (simple Mail Transporter Protocol)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'harshal.madgulkar725@gmail.com',
      pass: 'suiuvbichckuuqyt',
    },
  });

  // 4.Configure Email content
  const mailOptions = {
    from: "'harshal.madgulkar725@gmail.com'",
    to: 'ghatulesankett@gmail.com',
    subject: 'Welcome to My App',
    text: 'This is an mail generated through nodemailer',
  };

  // 5.Send an email
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Mail sent successfully!');
  } catch (error) {
    console.log('Email send failed with error due to: ' + error);
  }
}

sendMail();
