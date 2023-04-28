import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EnvsConfig } from 'src/infrastructure/config/env';

@Injectable()
export class EmailService {
  async sendEmail(subject: string, text: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: EnvsConfig.getAuthUserEmail(),
        pass: EnvsConfig.getAuthUserPassword(),
      },
    });

    const mailOptions = {
      from: EnvsConfig.getEmailFrom(),
      to: EnvsConfig.getEmailTo(),
      subject,
      text,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new HttpException('Error sending email', HttpStatus.BAD_GATEWAY);
    }
  }
}
