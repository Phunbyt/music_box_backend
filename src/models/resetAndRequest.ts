import jwt from "jsonwebtoken";
import NewUser from "../schema/registrationSchema";
import Token from "../schema/resetTokenSchema";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendEmail from "../utils/validator/sendemail/sendemail";
const bcryptSalt = process.env.BCRYPT_SALT;

async function requestPasswordReset(emailAddress: string) {
  const user = await NewUser.findOne({ emailAddress });
  if (!user) {
    throw new Error("User doesn't exist");
  }

  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${process.env.CLIENT_URL}/passwordreset?token=${resetToken}&id=${user._id}`;
  await sendEmail(
    user.emailAddress,
    "Password Reset Request",
    {
      name: `${user.firstname} ${user.lastname}`,
      link: link,
    },
    "../../src/utils/template/requestResetPassword.handlebars"
  )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  return link;
}

async function resetPassword(
  userId: string,
  token: string,
  password: string,
  confirmPassword: string
) {
  let passwordResetToken = await Token.findOne({ userId });
  if (!passwordResetToken) {
    throw new Error("Invalid or expired password request token");
  }
  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    throw new Error("Invalid or expired password request token");
  }

  if (password !== confirmPassword) {
    throw new Error("your new password doesn't match");
  }

  const hash = await bcrypt.hash(password, Number(bcryptSalt));

  await NewUser.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );

  const user = await NewUser.findById({ _id: userId });

  await sendEmail(
    user.emailAddress,
    "Password Reset Successfully",
    {
      name: `${user.firstname} ${user.lastname}`,
    },
    "../../src/utils/template/resetPassword.handlebars"
  )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  await passwordResetToken.deleteOne();
  return true;
}

export { requestPasswordReset, resetPassword };
