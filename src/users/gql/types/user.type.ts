import { ObjectType, Field, Int, InputType, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { UserProfileType } from './profile.type';
import { AccountType } from './account.type';

// Enum Types
enum SexType {
    ANY = 'any',
    MALE = 'male',
    FEMALE = 'female',
}

enum EducationType {
    ANY = 'any',
    COLLEGE = 'college',
    UNIVERSITY = 'university',
}

// Object Types
@ObjectType({ description: 'Это информация о пользователе' })
export class UserType {
    @Field(() => Int)
    id: number;

    @Field(() => UserProfileType)
    profile: UserProfileType;

    @Field(() => AccountType, { nullable: true })
    secretbuyer_account?: AccountType;

    @Field(() => String, { deprecationReason: 'Будет удалено в следующем выпуске', nullable: true })
    login?: string;

    @Field(() => String, { nullable: true })
    username?: string;

    @Field(() => String, { nullable: true })
    phone?: string;

    @Field(() => String, { nullable: true })
    email?: string;

    @Field(() => String)
    first_name: string;

    @Field(() => String, { nullable: true })
    last_name?: string;

    @Field(() => String, { nullable: true })
    middle_name?: string;

    @Field(() => Boolean)
    is_active: boolean;

    @Field(() => Boolean)
    is_verified: boolean;

    @Field(() => GraphQLISODateTime, { nullable: true })
    created_at?: Date;

    @Field(() => GraphQLISODateTime, { nullable: true })
    updated_at?: Date;
}

@ObjectType({ description: 'Это информация о создателе' })
export class UserCreatorType {
    @Field(() => Int)
    id: number;

    @Field(() => String, { nullable: true })
    first_name?: string;

    @Field(() => String, { nullable: true })
    last_name?: string;

    @Field(() => String, { nullable: true })
    middle_name?: string;
}

@ObjectType({ description: 'Это информация об авторизованном пользователе' })
export class UserLoginResponseType {
    @Field(() => UserType)
    user: UserType;

    @Field(() => String)
    token: string;

    @Field(() => String)
    refresh_token: string;
}

// Input Types
@InputType({ description: 'Это информация для авторизации пользователя' })
export class UserLoginInputType {
    @Field(() => String)
    login: string;

    @Field(() => String)
    password: string;

    @Field(() => String, { nullable: true })
    token_firebase?: string;
}

@InputType({ description: 'Это информация о договорах пользователя' })
export class SignUpAgreementsInputType {
    @Field(() => Boolean)
    privacy_policy: boolean;

    @Field(() => Boolean)
    terms_of_use: boolean;

    @Field(() => Boolean)
    personal_data: boolean;

    @Field(() => Boolean)
    personal_agree: boolean;
}

@InputType({ description: 'Это информация для регистрации пользователя' })
export class SignUpInputType {
    @Field(() => String)
    phone: string;

    @Field(() => String)
    first_name: string;

    @Field(() => String)
    password: string;

    @Field(() => SignUpAgreementsInputType)
    agreements: SignUpAgreementsInputType;
}

@ObjectType({ description: 'Это информация о регистрации пользователя' })
export class SignUpUserType {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    phone: string;

    @Field(() => String)
    first_name: string;

    @Field(() => String, { nullable: true })
    last_name?: string;
}

@ObjectType({ description: 'Это информация о регистрации пользователя' })
export class SignUpType {
    @Field(() => SignUpUserType)
    user: SignUpUserType;
}

@ObjectType({ description: 'Это информация о выходе пользователя из системы' })
export class LogoutType {
    @Field(() => Boolean, { nullable: true })
    success?: boolean;
}

@InputType({ description: 'Это информация для верификации пользователя' })
export class VerifySignUpInputType {
    @Field(() => String)
    phone: string;

    @Field(() => String)
    code: string;

    @Field(() => String, { nullable: true })
    token_firebase?: string;
}

@ObjectType({ description: 'Это информация о верификации пользователя' })
export class VerifySignUpType {
    @Field(() => SignUpUserType)
    user: SignUpUserType;

    @Field(() => String)
    token: string;
}

@ObjectType({ description: 'Это информация о деактивации профиля пользователя' })
export class DeactivateUserProfileType {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    first_name: string;

    @Field(() => String, { nullable: true })
    last_name?: string;

    @Field(() => String, { nullable: true })
    middle_name?: string;

    @Field(() => Boolean)
    is_active: boolean;

    @Field(() => Boolean)
    is_verified: boolean;

    @Field(() => GraphQLISODateTime)
    deleted_at: Date;
}

@ObjectType({ description: 'Это информация о запросе восстановления профиля пользователя' })
export class RequestRestoreUserProfileType {
    @Field(() => Boolean)
    ok: boolean;

    @Field(() => String)
    message: string;
}

@InputType({ description: 'Это информация для восстановления профиля пользователя' })
export class RequestRestoreUserProfileInputType {
    @Field(() => String)
    login: string;
}

@ObjectType({ description: 'Это информация о восстановленном пользователе' })
export class RestoreUserType {
    @Field(() => Int, { nullable: true })
    id?: number;

    @Field(() => String, { nullable: true })
    email?: string;

    @Field(() => String, { nullable: true })
    phone?: string;
}

@ObjectType({ description: 'Это информация о восстановлении профиля пользователя' })
export class RestoreUserProfileType {
    @Field(() => Boolean)
    ok: boolean;

    @Field(() => String)
    message: string;

    @Field(() => String, { nullable: true })
    token?: string;

    @Field(() => RestoreUserType, { nullable: true })
    user?: RestoreUserType;
}

@InputType({ description: 'Это информация для восстановления профиля пользователя почтой' })
export class RestoreUserProfileByEmailInputType {
    @Field(() => String)
    token: string;
}

@InputType({ description: 'Это информация для восстановления профиля пользователя телефоном' })
export class RestoreUserProfileByPhoneInputType {
    @Field(() => String)
    otp: string;

    @Field(() => String)
    phone: string;
}

@ObjectType({ description: 'Это информация о пользователе восстанавливающем пароль' })
export class ResetPasswordUserType {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    first_name: string;

    @Field(() => String, { nullable: true })
    last_name?: string;

    @Field(() => String, { nullable: true })
    middle_name?: string;

    @Field(() => Boolean)
    is_active: boolean;

    @Field(() => Boolean)
    is_verified: boolean;

    @Field(() => String, { nullable: true })
    email?: string;

    @Field(() => String, { nullable: true })
    phone?: string;
}

@ObjectType({ description: 'Это информация о восстановлении пароля пользователя' })
export class RequestResetUserPasswordType {
    @Field(() => ResetPasswordUserType)
    user: ResetPasswordUserType;
}

@InputType({ description: 'Это информация для восстановления пароля пользователя' })
export class RequestResetUserPasswordInputType {
    @Field(() => String, { nullable: true })
    phone?: string;

    @Field(() => String, { nullable: true })
    email?: string;
}

@InputType({ description: 'Это информация для смены пароля пользователя телефоном' })
export class ResetUserPasswordByPhoneInputType {
    @Field(() => String)
    otp: string;

    @Field(() => String)
    password: string;

    @Field(() => String)
    retryPassword: string;

    @Field(() => String)
    phone: string;
}
