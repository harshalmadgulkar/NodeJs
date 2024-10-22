// Please don't change the pre-written code
// Import the necessary modules here
import nodemailer from 'nodemailer';
import readline from 'readline';

const Solution = () => {
  // Write your code here
  const promptInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'codingninjas2k16@gmail.com',
      pass: 'slwvvlczduktvhdj',
    },
  });
  const recepientsMail = promptInterface.question(
    'EnterRecepientsMail\n',
    (userMail) => {
      const mailOptions = {
        from: 'codingninjas2k16@gmail.com',
        to: userMail,
        subject: 'Coding Ninjas',
        text: 'The world has enough coders; be a coding ninja!',
      };
      // Send mail with defined transport object
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(`Success: Email sent to ${userMail}`);
        }
      });
      promptInterface.close();
    }
  );
};

export default Solution;
