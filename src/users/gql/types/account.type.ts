import { ObjectType, Field, Int, Float, InputType, Context, Args } from '@nestjs/graphql';
import InnScalar from 'src/shared/gql/types/scalar/inn.type';
import EmailScalar from 'src/shared/gql/types/scalar/email.type';
import DateTimestampScalar from 'src/shared/gql/types/scalar/datetime.type';
import { TaxpayerType } from './taxpayer.type';
import { PaginationInfo } from 'src/shared/gql/types/pagination.type';
import { PayerType } from './payer.type';
import { RoleType } from './role.type';
import { AbilityType, PermissionType } from './permission.type';
import { AccountTransactionType } from './accont_transaction.type';

// Enum Types
@ObjectType({ description: 'Тип аккаунта' })
export class AccountTypes {
    @Field(() => String)
    CUSTOMER: string;

    @Field(() => String)
    SECRETBUYER: string;
}

@ObjectType({ description: 'Тип аккаунта для получения' })
export class GetAccountTypes {
    @Field(() => String)
    CUSTOMER: string;

    @Field(() => String)
    SECRETBUYER: string;

    @Field(() => String)
    ADMIN: string;

    @Field(() => String)
    ACCOUNTANT: string;
}

// Object Types
@ObjectType({ description: 'Это информация об аккаунте' })
export class AccountType {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => Float, { nullable: true })
    balance?: number;

    @Field(() => EmailScalar, { nullable: true })
    support_email?: string;

    @Field(() => EmailScalar, { nullable: true })
    email?: string;

    @Field(() => InnScalar, { nullable: true })
    inn?: string;

    @Field(() => DateTimestampScalar)
    created_at: Date;

    @Field(() => DateTimestampScalar)
    updated_at: Date;

    @Field(() => Boolean, { nullable: true })
    is_active?: boolean;

    @Field(() => Boolean, { nullable: true })
    is_verified?: boolean;

    @Field(() => GetAccountTypes)
    account_type: GetAccountTypes;

    @Field(() => PayerType, { nullable: true })
    payer?: PayerType;

    @Field(() => TaxpayerType, { nullable: true })
    taxpayer(@Args('id') id: number, @Context() context: any) {
        return context.taxPayerByAccountIdLoader.load(id);
    }

    @Field(() => RoleType)
    role: RoleType;

    @Field(() => [PermissionType], { nullable: true })
    permissions: PermissionType

    @Field(() => [AbilityType], { nullable: true })
    ability: AbilityType

    @Field(() => [AccountTransactionType], { nullable: true })
    transactions: AccountTransactionType
}

@ObjectType({ description: 'Это информация о пагинации аккаунтов' })
export class AccountPaginationType {
    @Field(() => [AccountType])
    items: AccountType[];

    @Field(() => PaginationInfo)
    pageInfo: PaginationInfo;
}

@ObjectType({ description: 'Результат удаления аккаунта' })
export class DeletedAccountResult {
    @Field(() => Boolean)
    status: boolean;

    @Field(() => Int)
    deleted_count: number;
}

@ObjectType({ description: 'Результат отмены создания аккаунта' })
export class CanceledAccount {
    @Field(() => Boolean)
    status: boolean;

    @Field(() => [AccountType], { nullable: true })
    canceledAccount?: AccountType[];
}

@ObjectType({ description: 'Результат очистки аккаунта из кэша' })
export class ClearCacheResult {
    @Field(() => Boolean)
    status: boolean;

    @Field(() => String, { nullable: true })
    result?: string;
}

// Input Types
@InputType({ description: 'Создание аккаунта для заказчика' })
export class CreateCustomerAccountInput {
    @Field(() => String)
    name: string;

    @Field(() => EmailScalar, { nullable: true })
    support_email?: string;
}

@InputType({ description: 'Создание аккаунта для исполнителя' })
export class CreateSecretBuyerAccountInput {
    @Field(() => String)
    first_name: string;

    @Field(() => String)
    last_name: string;

    @Field(() => String, { nullable: true })
    middle_name?: string;

    @Field(() => InnScalar, { nullable: true })
    inn?: string;

    @Field(() => Int)
    city_id: number;

    @Field(() => EmailScalar, { nullable: true })
    support_email?: string;

    @Field(() => String, { nullable: true })
    bank_account?: string;

    @Field(() => String, { nullable: true })
    bank_bik?: string;
}

export const accountType = {
    AccountTypes,
    GetAccountTypes,
    AccountType,
    AccountPaginationType,
    DeletedAccountResult,
    CanceledAccount,
    ClearCacheResult,
    CreateCustomerAccountInput,
    CreateSecretBuyerAccountInput,
};
