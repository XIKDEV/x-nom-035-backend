import {
  dataType,
  dtoDecorators,
  dtoValidatorMessage,
  fieldsDto,
  typeDto,
} from '@/config';

export class LoginDto {
  @dtoDecorators({
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.email),
    },
    swaggerOptions: {
      example: 'test@test.com',
      descriptionOpt: 'Escribir un correo válido',
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.email,
            dataType.string,
          ),
        },
      },
      {
        typeDto: typeDto.isEmail,
        options: {
          message: dtoValidatorMessage.wrongEmail,
        },
      },
    ],
  })
  email: string;

  @dtoDecorators({
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.password),
    },
    swaggerOptions: {
      example: 'contraseña genérico',
      descriptionOpt: 'Escribir una contraseña',
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.password,
            dataType.string,
          ),
        },
      },
    ],
  })
  password: string;
}
