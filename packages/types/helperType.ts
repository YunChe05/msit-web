export type WithId<Type, IdType extends string | number = string> = Omit<
  Type,
  "id"
> & {
  id: IdType;
};

export type MakePayload<Type> = {
  data: Type;
};

export type MakePayloadWithMetaData<Type> = {
  data: Type;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
