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
