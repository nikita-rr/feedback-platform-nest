import { ObjectType, Field, Int, InputType, registerEnumType } from '@nestjs/graphql';
import { PermissionType } from './permission.type';
import { PaginationInfo } from 'src/shared/gql/types/pagination.type';
import { RoleTypes } from 'src/shared/constants/role_types';

enum CreateRoleTypes {
    EMPLOYEE = RoleTypes.EMPLOYEE,
}

registerEnumType(RoleTypes, {
    name: 'RoleTypes',
    description: 'Типы ролей',
});

registerEnumType(CreateRoleTypes, {
    name: 'CreateRoleTypes',
    description: 'Типы ролей при создании',
});

@ObjectType({ description: 'Это информация о роли' })
export class RoleType {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => Int, { nullable: true })
    account_id?: number;

    @Field(() => RoleTypes)
    type: RoleTypes;

    @Field(() => [PermissionType], { nullable: true })
    permissions?: PermissionType[];
}

@ObjectType({ description: 'Это информация о пагинации ролей' })
export class RolePaginationType {
    @Field(() => [RoleType])
    items: RoleType[];

    @Field(() => PaginationInfo)
    pageInfo: PaginationInfo;
}

@InputType({ description: 'Это информация о создании роли' })
export class CreateRoleInputType {
    @Field(() => String)
    name: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => Int, { nullable: true })
    account_id?: number;

    @Field(() => CreateRoleTypes)
    type: CreateRoleTypes;

    @Field(() => [Int])
    permission_ids: number[];
}

@InputType({ description: 'Это информация об обновлении роли' })
export class UpdateRoleInputType {
    @Field(() => Int)
    id: number;

    @Field(() => Int)
    account_id: number;

    @Field(() => String, { nullable: true })
    name?: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => [Int], { nullable: true })
    permission_ids?: number[];
}

@ObjectType({ description: 'Это информация об удалении роли' })
export class DeleteRoleResultType {
    @Field(() => RoleType, { nullable: true })
    deleted?: RoleType;

    @Field(() => Boolean)
    status: boolean;
}

@InputType({ description: 'Это информация для удаления роли' })
export class DeleteRoleInputType {
    @Field(() => Int)
    role_id: number;

    @Field(() => Int)
    account_id: number;
}

export const roleType = {
    RoleType,
    RolePaginationType,
    CreateRoleInputType,
    UpdateRoleInputType,
    DeleteRoleInputType,
    DeleteRoleResultType,
};
