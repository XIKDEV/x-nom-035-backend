/**
 * @fileoverview The `PrismaService` class extends `PrismaClient` and implements `OnModuleInit` to handle Prisma
database connections in a NestJS application. */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super();
  }

  /**
   * The `onModuleInit` function in TypeScript connects to Prisma and logs a message indicating
   * successful connection.
   */
  async onModuleInit() {
    await this.$connect();

    this.logger.log('Prisma connected');
  }
}
