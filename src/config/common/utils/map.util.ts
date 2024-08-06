import { IMappingCatalogs } from '../interfaces';

export const mappingCatalogs = <T extends { id: number; name: string }>({
  data,
}: IMappingCatalogs<T>) => {
  const catalogProps = data.map(({ id, name, ...catalog }) => ({
    value: id,
    label: name,
    ...catalog,
  }));

  return catalogProps;
};

export const getArrayFromProperty = <T>(data: T[], property: string) => {
  return data.map((item) => item[property as keyof T]);
};
