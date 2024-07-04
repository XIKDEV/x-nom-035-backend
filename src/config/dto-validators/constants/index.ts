import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsIn,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
  ValidationOptions,
} from 'class-validator';

import { IClassValidator, IParseValueReturn } from '../interfaces';

export const parseValue = (value: string | boolean): IParseValueReturn => {
  let booleanValues;
  if (value !== undefined && value !== 'undefined') {
    booleanValues = value === 'true' || value === true;
  }
  return {
    number: Number(value),
    string: String(value),
    boolean: value === 'undefined' ? undefined : booleanValues,
  };
};

export const typeValidateDtoMigration = ({
  options,
  optionRegExp,
  num,
}: {
  optionRegExp?: RegExp;
  options: ValidationOptions;
  num?: number | number[] | string[];
}): IClassValidator => ({
  isString: IsString(options),
  isInt: IsInt(options),
  isEmail: IsEmail({}, options),
  isNumber: IsNumber({}, options),
  isUuid: IsUUID('all', options),
  isObject: IsObject(),
  isArray: IsArray(options),
  isDate: IsDate(options),
  matches: Matches(optionRegExp, options),
  minLength: MinLength(num as number, options),
  maxLength: MaxLength(num as number, options),
  isBoolean: IsBoolean(options),
  isDateString: IsDateString({}, options),
  arrayMaxSize: ArrayMaxSize(num as number, options),
  arrayMinSize: ArrayMinSize(num as number, options),
  isOptional: IsOptional(options),
  isIn: IsIn(num as number[] | string[], options),
});
