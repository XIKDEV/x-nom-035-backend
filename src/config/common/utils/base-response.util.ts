import { IBaseResponse } from '../interfaces';

export const baseResponse = ({
  success = true,
  data = {},
  info = {},
  message = 'Operación realizada correctamente',
}: IBaseResponse) => ({ success, data, info, message });
