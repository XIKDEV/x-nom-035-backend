import {
  dataType,
  dtoDecorators,
  dtoValidatorMessage,
  fieldsDto,
  typeDto,
} from '@/config';

export class UpdateUserDto {
  @dtoDecorators({
    swaggerOptions: {
      example: 1,
      descriptionOpt: 'id del usuario',
    },
    baseOptions: {
      isOptional: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isInt,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.general.id,
            dataType.int,
          ),
        },
      },
    ],
  })
  id: number;

  @dtoDecorators({
    swaggerOptions: {
      example: 'Fer',
      descriptionOpt: 'Nombre del usuario',
    },
    baseOptions: {
      isOptional: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.general.name,
            dataType.string,
          ),
        },
      },
    ],
  })
  name: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 'Nu',
      descriptionOpt: 'Apellido del usuario',
    },
    baseOptions: {
      isOptional: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.general.lastname,
            dataType.string,
          ),
        },
      },
    ],
  })
  lastname: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 'fer@fer.com',
      descriptionOpt: 'Correo del usuario',
    },
    baseOptions: {
      isOptional: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isEmail,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.general.email,
            dtoValidatorMessage.wrongEmail,
          ),
        },
      },
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.general.email,
            dataType.string,
          ),
        },
      },
    ],
  })
  email: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 1,
      descriptionOpt: 'id del rol',
    },
    baseOptions: {
      isOptional: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isInt,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.pagination.page,
            dataType.int,
          ),
        },
      },
    ],
  })
  idRole: number;

  @dtoDecorators({
    swaggerOptions: {
      example: 1,
      descriptionOpt: 'id de la empresa',
    },
    baseOptions: {
      isOptional: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isInt,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.pagination.page,
            dataType.int,
          ),
        },
      },
    ],
  })
  idEnterprise: number;
}
