import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import path from 'path';

import { IRenderTemplate, ISearchFileByRoute, ISendEmail } from '../interfaces';

@Injectable()
export class NodemailerService {
  constructor(private readonly configService: ConfigService) {}

  private searchFileByRoute({ nameFile, route }: ISearchFileByRoute) {
    return path.join(__dirname, route, nameFile);
  }

  private getFile(pathFile: fs.PathOrFileDescriptor) {
    return fs.readFileSync(pathFile, 'utf8');
  }

  renderTemplate({ context, template }: IRenderTemplate) {
    const layoutPath = this.searchFileByRoute({
      route: '../../views/layouts',
      nameFile: 'index.hbs',
    });
    const layoutContent = this.getFile(layoutPath);
    const compiledLayout = Handlebars.compile(layoutContent);

    const emailTemplatePath = this.searchFileByRoute({
      route: '../../views',
      nameFile: `${template}.hbs`,
    });
    const emailContent = this.getFile(emailTemplatePath);

    const emailBody = Handlebars.compile(emailContent)(context);
    const finalHtml = compiledLayout({ body: emailBody });

    return finalHtml;
  }

  createTransport() {
    return nodemailer.createTransport({
      service: this.configService.get<string>('EMAIL_SERVICE'),
      auth: {
        user: this.configService.get<string>('EMAIL_EMAIL'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
      port: this.configService.get<number>('EMAIL_PORT'),
    });
  }

  sendEmail({ template, context, to, subject, from }: ISendEmail) {
    const html = this.renderTemplate({
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

    return transporter.sendMail(mailOptions);
  }
}
