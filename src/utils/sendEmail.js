import NodeMailer from "nodemailer";

const factorNumber = (number) => {
    const newNumber = Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0
  }).format(number)
    return newNumber
  }

export const sendEmail = async (dataToSendEmail, email) => {

  let templateProducts = "";
  templateProducts = dataToSendEmail.map((pro, ind) => {
    const total = pro.price*pro.quantity
    const newTotal = factorNumber(total)
    return `<tr style='width: 33.3333%; height: 18px;'><td style='width: 33.3333%; height: 18px;'>${pro.name}</td><td style='width: 33.3333%; height: 18px; text-align: left;;'>x${pro.quantity}</td><td style='width: 33.3333%; height: 18px;'>${newTotal}</td></tr>`;
  });

  const sum = dataToSendEmail.reduce((accumulator, product) => {
    return accumulator + (product.price*product.quantity);
  }, 0);

  let plantilla =
    "<p>&nbsp;</p>" +
    "<h3 style='text-align: center; color: #7444fb; font-size: 3rem;'>Recibo de compra&nbsp;</h3>" +
    "<p><strong>Saludos, acontinuacion vera un resumen de la compra que acaba de realizar en OldWave</strong></p>" +
    "<table style='height: 54px; width: 100%; border-collapse: collapse;>" +
    "<tbody>" +
    `${templateProducts}` +
    "<tr style='height: 18px;'>" +
    "<td style='width: 33.3333%; height: 18px;'></td>" +
    "<td style='width: 33.3333%; height: 18px;'>Total</td>" +
    `<td style='width: 33.3333%; height: 18px;'>${factorNumber(sum)}</td>` +
    "</tr>" +
    "</tbody>" +
    "</table>" +
    "<p></p>" +
    "<p><img src='https://i.imgur.com/VMfJsvH.png' alt='Logo' width='117' height='130' style='display: block; margin-left: auto; margin-right: auto;' /></p>" +
    "<p>&nbsp;</p>" +
    "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Para dudas comuniquese al correo test@test.com</p>";


  const transporter = NodeMailer.createTransport({
    service: process.env.HOST_SMTP,
    auth: {
      user: process.env.USER_SMTP,
      pass: process.env.PASSWORD_STMP,
    },
  });

  await transporter.sendMail(
    {
      from: '"OldWave" loscarr18@example.com', 
      to: email, 
      subject: "Recibo de compra", 
      text: "", 
      html: plantilla, 
    }
  );
};
