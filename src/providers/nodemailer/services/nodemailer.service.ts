import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import path from 'path';

import { IRenderTemplate, ISearchFileByRoute, ISendEmail } from '../interfaces';

@Injectable()
export class NodemailerService {
  constructor(private readonly configService: ConfigService) {}

  private searchFileByRoute({ nameFile, route }: ISearchFileByRoute): string {
    return path.join(__dirname, route, nameFile);
  }

  private getFile(pathFile: fs.PathOrFileDescriptor): string {
    return fs.readFileSync(pathFile, 'utf8');
  }

  renderTemplate<T>({ context, template }: IRenderTemplate<T>): string {
    const layoutPath = this.searchFileByRoute({
      route: '../../../../views/layouts',
      nameFile: 'index.hbs',
    });
    const layoutContent = this.getFile(layoutPath);
    const compiledLayout = Handlebars.compile(layoutContent);

    const emailTemplatePath = this.searchFileByRoute({
      route: '../../../../views',
      nameFile: `${template}.hbs`,
    });
    const emailContent = this.getFile(emailTemplatePath);

    const emailBody = Handlebars.compile(emailContent)(context);
    const finalHtml = compiledLayout({ body: emailBody });

    return finalHtml;
  }

  createTransport(): nodemailer.Transporter<SMTPTransport.SentMessageInfo> {
    return nodemailer.createTransport({
      service: this.configService.get<string>('EMAIL_SERVICE'),
      auth: {
        user: this.configService.get<string>('EMAIL_FROM'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
      port: this.configService.get<number>('EMAIL_PORT'),
    });
  }

  async sendEmail<T>({
    template,
    context,
    to,
    subject,
    from,
  }: ISendEmail<T>): Promise<void> {
    const html = this.renderTemplate<T>({
      context,
      template,
    });

    const mailOptions = {
      from,
      to,
      subject,
      html,
    };

    const transporter = this.createTransport();

    await transporter.sendMail(mailOptions);
  }
}
