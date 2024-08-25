import { ObjectType, Field, Int, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { PaginationInfo } from 'src/shared/gql/types/pagination.type';
import InnScalar from 'src/shared/gql/types/scalar/inn.type';

@ObjectType({ description: 'Taxation Status Enum Type' })
export class TaxationStatusType {
    @Field(() => String)
    INDIVIDUAL: string;

    @Field(() => String)
    SELF_EMPLOYED: string;

    @Field(() => String)
    SOLE_TRADER: string;
}

@ObjectType({ description: 'Это информация о реквизитах' })
export class TaxpayerType {
    @Field(() => Int)
    id: number;

    @Field(() => Int)
    account_id: number;

    @Field(() => TaxationStatusType)
    taxation_status: TaxationStatusType;

    @Field(() => String)
    bank_account: string;

    @Field(() => String, { nullable: true })
    corr_account?: string;

    @Field(() => String)
    bank_bik: string;

    @Field(() => String, { nullable: true })
    bank_name?: string;

    @Field(() => String, { nullable: true })
    ogrnip?: string;

    @Field(() => Boolean, { nullable: true })
    is_active?: boolean;

    @Field(() => String, { nullable: true })
    full_name_fio?: string;

    @Field(() => Boolean, { nullable: true })
    is_default?: boolean;
}

@InputType({ description: 'Это информация о реквизитах' })
export class TaxpayerInputType {
    @Field(() => TaxationStatusType)
    taxation_status: TaxationStatusType;

    @Field(() => String)
    bank_account: string;

    @Field(() => String, { nullable: true })
    corr_account?: string;

    @Field(() => String)
    bank_bik: string;

    @Field(() => String, { nullable: true })
    bank_name?: string;

    @Field(() => String, { nullable: true })
    ogrnip?: string;
}

@ObjectType({ description: 'Это информация о пагинации налогоплательщиков' })
export class TaxPayerPaginationType {
    @Field(() => [TaxpayerType])
    items: TaxpayerType[];

    @Field(() => PaginationInfo)
    pageInfo: PaginationInfo;
}

@InputType({ description: 'Это информация о получении реквизитов' })
export class GetTaxpayersInputType {
    @Field(() => Int)
    account_id: number;

    @Field(() => [Int], { nullable: true })
    ids?: number[];

    @Field(() => [TaxationStatusType], { nullable: true })
    taxation_statuses?: TaxationStatusType[];
}

@InputType({ description: 'Это информация о получении реквизитов' })
export class GetTaxpayerInputType {
    @Field(() => Int)
    account_id: number;

    @Field(() => Int)
    id: number;
}

@InputType({ description: 'Это информация об обновлении реквизитов' })
export class UpdateTaxpayerInputType {
    @Field(() => Int)
    id: number;

    @Field(() => Int)
    account_id: number;

    @Field(() => String, { nullable: true })
    bank_account?: string;

    @Field(() => String, { nullable: true })
    corr_account?: string;

    @Field(() => String, { nullable: true })
    bank_bik?: string;

    @Field(() => String, { nullable: true })
    bank_name?: string;

    @Field(() => Boolean, { nullable: true })
    is_default?: boolean;
}

@InputType({ description: 'Это информация об удалении реквизитов' })
export class DeleteTaxpayerInputType {
    @Field(() => Int)
    account_id: number;

    @Field(() => Int)
    id: number;
}

@ObjectType({ description: 'Это информация об удалении реквизитов' })
export class DeleteTaxpayerType {
    @Field(() => Boolean)
    status: boolean;
}

@ObjectType({ description: 'Это информация для создания реквизитов' })
export class CreateTaxPayerType {
    @Field(() => Int)
    account_id: number;

    @Field(() => TaxationStatusType)
    taxation_status: TaxationStatusType;

    @Field(() => InnScalar, { nullable: true })
    inn?: string;

    @Field(() => String)
    bank_account: string;

    @Field(() => String, { nullable: true })
    corr_account?: string;

    @Field(() => String)
    bank_bik: string;

    @Field(() => String, { nullable: true })
    bank_name?: string;

    @Field(() => String, { nullable: true })
    snils?: string;

    @Field(() => String, { nullable: true })
    ogrnip?: string;

    @Field(() => String, { nullable: true })
    first_name?: string;

    @Field(() => String, { nullable: true })
    last_name?: string;

    @Field(() => String, { nullable: true })
    middle_name?: string;

    @Field(() => Boolean, { nullable: true })
    is_default?: boolean;
}

@ObjectType({ description: 'Верифицировать статус самозанятого' })
export class VerifySelfEmployedStatusType {
    @Field(() => Boolean, { nullable: true })
    isSelfEmployed?: boolean;

    @Field(() => Boolean, { nullable: true })
    is_linked_bank131?: boolean;
}

@InputType({ description: 'Верифицирование статуса самозанятого' })
export class VerifySelfEmployedStatusInputType {
    @Field(() => Int)
    account_id: number;

    @Field(() => InnScalar)
    inn: string;
}

export const taxpayerType = {
    TaxationStatusType,
    TaxpayerType,
    TaxpayerInputType,
    GetTaxpayersInputType,
    TaxPayerPaginationType,
    UpdateTaxpayerInputType,
    GetTaxpayerInputType,
    DeleteTaxpayerInputType,
    DeleteTaxpayerType,
    CreateTaxPayerType,
    VerifySelfEmployedStatusType,
    VerifySelfEmployedStatusInputType,
};
