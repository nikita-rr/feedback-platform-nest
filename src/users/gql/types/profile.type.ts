import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

// Assuming these custom scalars and types are defined elsewhere in your project
import { UpdateUserPassportInput, UserPassportType } from './password.type';
import InnScalar from 'src/shared/gql/types/scalar/inn.type';
import DateScalar from 'src/shared/gql/types/scalar/date.type';

@ObjectType({ description: 'Это информация о профиле пользователя' })
export class UserProfileType {
    @Field(() => Int)
    user_id: number;

    @Field(() => String)
    first_name: string;

    @Field(() => String)
    last_name: string;

    @Field(() => String, { nullable: true })
    middle_name?: string;

    @Field(() => DateScalar, { nullable: true })
    birth_date?: Date;

    @Field(() => String, { nullable: true })
    gender?: string;

    @Field(() => String, { nullable: true })
    about_me?: string;

    @Field(() => InnScalar, { nullable: true })
    inn?: string;

    @Field(() => Int, { nullable: true })
    city_id?: number;

    @Field(() => UserPassportType, { nullable: true })
    passport?: UserPassportType
}

@InputType({ description: 'Это информация об обновлении профиля пользователя' })
export class UpdateUserProfileInput {
    @Field(() => String, { nullable: true })
    first_name?: string;

    @Field(() => String, { nullable: true })
    last_name?: string;

    @Field(() => String, { nullable: true })
    middle_name?: string;

    @Field(() => DateScalar, { nullable: true })
    birth_date?: Date;

    @Field(() => String, { nullable: true })
    gender?: string;

    @Field(() => String, { nullable: true })
    about_me?: string;

    @Field(() => InnScalar, { nullable: true })
    inn?: string;

    @Field(() => Int, { nullable: true })
    city_id?: number;

    @Field(() => UpdateUserPassportInput, { nullable: true })
    passport?: UpdateUserPassportInput;
}

export const profileType = {
    UserProfileType,
    UpdateUserProfileInput,
};
