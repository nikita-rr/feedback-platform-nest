import { ObjectType, Field, Int, InputType, registerEnumType } from '@nestjs/graphql';
import InnScalar from 'src/shared/gql/types/scalar/inn.type';

enum PayerTypes {
    SOLE_TRADER = 'SOLE_TRADER',
    CORPORATION = 'CORPORATION',
}

registerEnumType(PayerTypes, {
    name: 'PayerTypes',
    description: 'Типы плательщиков',
});

@ObjectType({ description: 'Это информация о плательщике' })
export class PayerType {
    @Field(() => Int)
    id: number;

    @Field(() => PayerTypes)
    payer_type: PayerTypes;

    @Field(() => String)
    legal_name: string;

    @Field(() => String)
    full_address: string;

    @Field(() => InnScalar)
    inn: string;

    @Field(() => String, { nullable: true })
    bank_kpp?: string;

    @Field(() => String, { nullable: true })
    ogrn?: string;

    @Field(() => String, { nullable: true })
    ogrnip?: string;

    @Field(() => String)
    bank_bik: string;

    @Field(() => String)
    bank_name: string;

    @Field(() => String)
    corr_account: string;

    @Field(() => String)
    bank_account: string;

    @Field(() => Boolean, { nullable: true })
    is_active?: boolean;

    @Field(() => Int)
    account_id: number;

    @Field(() => String, { nullable: true })
    office_phone?: string;
}

@InputType({ description: 'Это информация о плательщике' })
export class PayerInputType {
    @Field(() => PayerTypes)
    payer_type: PayerTypes;

    @Field(() => String)
    legal_name: string;

    @Field(() => String)
    address: string;

    @Field(() => InnScalar)
    inn: string;

    @Field(() => String, { nullable: true })
    bank_kpp?: string;

    @Field(() => String, { nullable: true })
    ogrn?: string;

    @Field(() => String, { nullable: true })
    ogrnip?: string;

    @Field(() => String)
    bank_bik: string;

    @Field(() => String)
    bank_name: string;

    @Field(() => String)
    corr_account: string;

    @Field(() => String)
    bank_account: string;
}

export const payerType = {
    PayerTypes,
    PayerType,
    PayerInputType,
};
