import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/models/user.model';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(user: User) {
    const url = `${process.env.api_url}/api/auth/activate/${user.activation_link}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Tasdiqlash linki',
      template: './confirmation',
      context: {
        name: `${user.first_name} ${user.last_name}`,
        url,
      },
    });
  }
}
