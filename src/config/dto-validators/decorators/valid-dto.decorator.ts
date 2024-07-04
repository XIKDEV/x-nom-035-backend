import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

import { parseValue, typeValidateDtoMigration } from '../constants';
import {
  IClassValidator,
  IDtoDecoratorsOptions,
  IDtoDecoratorsValidators,
  IParseValueReturn,
} from '../interfaces';

export const dtoDecorators = ({
  swaggerOptions,
  validatorsDtoOptions = [],
  baseOptions,
}: IDtoDecoratorsOptions) => {
  const {
    isOptional = false,
    message,
    transform = false,
    type = 'number',
  } = baseOptions;

  const transformDecorator = Transform(({ value }) => {
    return transform
      ? parseValue(value)[type as keyof IParseValueReturn]
      : value;
  });

  const typesDto: PropertyDecorator[] = validatorsDtoOptions.map(
    ({
      typeDto,
      options,
      optionsRegExp,
      num = undefined,
    }: IDtoDecoratorsValidators) =>
      typeValidateDtoMigration({
        options: { message: options.message, each: options.each },
        optionRegExp: optionsRegExp,
        num,
      })[typeDto as keyof IClassValidator],
  );

  return applyDecorators(
    !isOptional
      ? ApiProperty({ ...swaggerOptions })
      : ApiPropertyOptional({ ...swaggerOptions }),
    !isOptional ? IsNotEmpty({ message }) : IsOptional(),
    transformDecorator,
    ...typesDto,
  );
};
