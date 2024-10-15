import {
  dataType,
  dtoDecorators,
  dtoValidatorMessage,
  fieldsDto,
  typeDto,
} from '@/config';

export class CreateRoleDto {
  @dtoDecorators({
    swaggerOptions: {
      example: 'Desarrollador',
      descriptionOpt: 'Nombre del tipo de rol',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.general.name),
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
      {
        typeDto: typeDto.isLenght,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.roles.maxLenght,
            dataType.string,
          ),
        },
        num: 15,
      },
    ],
  })
  name: string;
  @dtoDecorators({
    swaggerOptions: {
      example:
        'El tipo de rol de DESARROLLADOR, es un rol solamente para usuarios que tienen como objetivo la manipulacion y revision de cambios en la plataforma',
      descriptionOpt: 'Descripcion del tipo de rol',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.roles.description),
    },
  })
  descripction: string;
  @dtoDecorators({
    swaggerOptions: {
      example: 'Para saber si el rol es activo o no',
      descriptionOpt: 'Descripcion del estatus del rol',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.roles.active),
    },
  })
  active: boolean;
  //name, description, active
}
