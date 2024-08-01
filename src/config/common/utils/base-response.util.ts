import { IBaseResponse } from '../interfaces';

export const baseResponse = <T>({
  success = true,
  data = {},
  info = {},
  message = 'Operación realizada correctamente',
}: IBaseResponse<T>) => ({ success, data, info, message });
