import {
  IReturnPagination,
  TPaginationControl,
  TWhereFilterControl,
} from '../interfaces';

export const getPaginationFields = ({
  page = 1,
  results = 50,
}: TPaginationControl): IReturnPagination => {
  const skip = (page - 1) * results;
  const take = results;
  return { skip, take };
};

export const getWhereFilter = ({ likeField, like }: TWhereFilterControl) => {
  return likeField || like
    ? {
        [likeField]: {
          contains: like,
        },
      }
    : {};
};
