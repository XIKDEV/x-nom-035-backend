import {
  dataType,
  dtoDecorators,
  dtoValidatorMessage,
  fieldsDto,
  regularExpressionsLocals,
  typeDto,
} from '@/config';

export class CreateEnterpriseDto {
  @dtoDecorators({
    swaggerOptions: {
      example: 'Facebook',
      descriptionOpt: 'Nombre de la empresa',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(
        fieldsDto.enterprise.businessName,
      ),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.enterprise.businessName,
            dataType.string,
          ),
        },
      },
    ],
  })
  businessName: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 'Meta Inc.',
      descriptionOpt: 'Nombre comercial',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(
        fieldsDto.enterprise.comercialName,
      ),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.enterprise.comercialName,
            dataType.string,
          ),
        },
      },
    ],
  })
  comercialName: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 'Mack Zuckerberg',
      descriptionOpt: 'Nombre del representante legal',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(
        fieldsDto.enterprise.legalRepresentative,
      ),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.enterprise.legalRepresentative,
            dataType.string,
          ),
        },
      },
    ],
  })
  legalRepresentative: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 'XAX010101D33',
      descriptionOpt: 'rfc de la empresa',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.general.rfc),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.general.rfc,
            dataType.string,
          ),
        },
        optionsRegExp: regularExpressionsLocals.rfcEnterprise,
      },
    ],
  })
  rfc: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 'Zona rio',
      descriptionOpt: 'Calle de la empresa',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.enterprise.street),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.enterprise.street,
            dataType.string,
          ),
        },
      },
    ],
  })
  street: string;

  @dtoDecorators({
    swaggerOptions: {
      example: '11111',
      descriptionOpt: 'Número exterior de la empresa',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(
        fieldsDto.enterprise.exteriorNumber,
      ),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.enterprise.exteriorNumber,
            dataType.string,
          ),
        },
      },
    ],
  })
  exteriorNumber: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 'C5',
      descriptionOpt: 'Número interior de la empresa',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(
        fieldsDto.enterprise.interiorNumber,
      ),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.enterprise.interiorNumber,
            dataType.string,
          ),
        },
      },
    ],
  })
  interiorNumber: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 'San Antonio',
      descriptionOpt: 'Colonia de la empresa',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.enterprise.suburb),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.enterprise.suburb,
            dataType.string,
          ),
        },
      },
    ],
  })
  suburb: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 22222,
      descriptionOpt: 'Código postal de la empresa',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(
        fieldsDto.enterprise.postalCode,
      ),
      transform: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isNumber,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.enterprise.postalCode,
            dataType.number,
          ),
        },
      },
    ],
  })
  postalCode: number;

  @dtoDecorators({
    swaggerOptions: {
      example: 'Sociedad de bienes',
      descriptionOpt: 'Tipo de empresa',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(
        fieldsDto.enterprise.enterpriseType,
      ),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.enterprise.enterpriseType,
            dataType.string,
          ),
        },
      },
    ],
  })
  enterpriseType: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 'Fer',
      descriptionOpt: 'pendiente de revisar',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(
        fieldsDto.enterprise.turnEnterprise,
      ),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.enterprise.turnEnterprise,
            dataType.string,
          ),
        },
      },
    ],
  })
  turnEnterprise: string;

  @dtoDecorators({
    swaggerOptions: {
      example: '1115498745',
      descriptionOpt: 'Telefono de la empresa',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(
        fieldsDto.enterprise.tellphone,
      ),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.enterprise.tellphone,
            dataType.string,
          ),
        },
      },
    ],
  })
  tellphone: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 'test@test.com',
      descriptionOpt: 'Correo de la empresa',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.general.email),
    },
    validatorsDtoOptions: [
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
      example: 'url firebase',
      descriptionOpt: 'imagen',
    },
    baseOptions: {
      isOptional: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.enterprise.image,
            dataType.string,
          ),
        },
      },
    ],
  })
  image: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 1,
      descriptionOpt: 'Ciudad',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.enterprise.idCity),
      transform: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isNumber,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.enterprise.idCity,
            dataType.number,
          ),
        },
      },
    ],
  })
  idCity: number;

  @dtoDecorators({
    baseOptions: {
      isOptional: true,
    },
    swaggerOptions: {
      format: 'binary',
      type: 'string',
    },
  })
  logo: Express.Multer.File;
}
