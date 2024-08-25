import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { GraphQLDateTimeISO } from 'graphql-scalars';

// Object Type
@ObjectType({ description: 'Это информация о паспорте' })
export class UserPassportType {
    @Field(() => Int)
    user_id: number;

    @Field(() => String)
    first_name: string;

    @Field(() => String)
    last_name: string;

    @Field(() => String, { nullable: true })
    middle_name?: string;

    @Field(() => GraphQLDateTimeISO, { nullable: true })
    date_of_birth?: Date;

    @Field(() => String, { nullable: true })
    gender?: string;

    @Field(() => String, { nullable: true })
    place_of_birth?: string;

    @Field(() => String, { nullable: true })
    authority_code?: string;

    @Field(() => String, { nullable: true })
    authority?: string;

    @Field(() => GraphQLDateTimeISO, { nullable: true })
    issue_date?: Date;

    @Field(() => String, { nullable: true })
    number?: string;

    @Field(() => String, { nullable: true })
    serial?: string;
}

// Input Type
@InputType({ description: 'Это информация об обновлении паспорта пользователя' })
export class UpdateUserPassportInput {
    @Field(() => String, { nullable: true })
    first_name?: string;

    @Field(() => String, { nullable: true })
    last_name?: string;

    @Field(() => String, { nullable: true })
    middle_name?: string;

    @Field(() => GraphQLDateTimeISO, { nullable: true })
    date_of_birth?: Date;

    @Field(() => String, { nullable: true })
    gender?: string;

    @Field(() => String, { nullable: true })
    place_of_birth?: string;

    @Field(() => String, { nullable: true })
    authority_code?: string;

    @Field(() => String, { nullable: true })
    authority?: string;

    @Field(() => GraphQLDateTimeISO, { nullable: true })
    issue_date?: Date;

    @Field(() => String, { nullable: true })
    number?: string;

    @Field(() => String, { nullable: true })
    serial?: string;
}
