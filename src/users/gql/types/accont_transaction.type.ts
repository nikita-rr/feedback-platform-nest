import { ObjectType, Field, Int, Float, registerEnumType, GraphQLISODateTime } from '@nestjs/graphql';
import { AccountTransactionsTypes } from 'src/shared/constants/account_transactions_types';



registerEnumType(AccountTransactionsTypes, {
  name: 'AccountTransactionsType',
  description: 'Типы транзакций аккаунта',
});

@ObjectType({ description: 'Это информация о транзакции аккаунта' })
export class AccountTransactionType {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  account_id: number;

  @Field(() => AccountTransactionsTypes)
  type: AccountTransactionsTypes;

  @Field(() => String, { nullable: true })
  type_description?: string;

  @Field(() => Float)
  amount: number;

  @Field(() => String, { nullable: true })
  period?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  created_at?: Date;
}

export const accountTransactionType = {
  AccountTransactionType,
};
