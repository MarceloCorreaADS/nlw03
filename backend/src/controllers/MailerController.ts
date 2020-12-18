import * as nodemailer from 'nodemailer';
import path from 'path';
const hbs = require('nodemailer-express-handlebars');

  const handlebarOptions = {
    viewEngine: {
      extName: 'hbs',
      partialsDir: path.join(__dirname, '../resources/mails'),
      layoutsDir: path.join(__dirname, '../resources/mails'),
      defaultLayout: false,
    },
    viewPath: path.join(__dirname, '../resources/mails'),
    extName: '.hbs',
  };

  export const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ff56e52c4e5439",
      pass: "292edcfbb8209a"
    }
  });

transport.use('compile', hbs(handlebarOptions));