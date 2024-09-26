import { SetMetadata } from '@nestjs/common';

export const MODULES_KEY = 'modules';

export const ModulesSecurity = (...modules: number[]) =>
  SetMetadata(MODULES_KEY, modules);
