import { InputType, Field, registerEnumType } from '@nestjs/graphql';

export enum SortingOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

// Регистрация перечисления GraphQL
registerEnumType(SortingOrder, {
  name: 'SortingOrder',
  description: 'Порядок сортировки',
});

@InputType({ description: 'Параметры сортировки' })
export class SortingInputType {
  @Field(() => SortingOrder)
  order: SortingOrder;

  @Field(() => String)
  column_name: string;
}
