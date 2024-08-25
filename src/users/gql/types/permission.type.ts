import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { PaginationInfo } from 'src/shared/gql/types/pagination.type';

@ObjectType({ description: 'Это разрешения' })
export class PermissionType {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => String, { nullable: true })
    display_name?: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => GraphQLISODateTime, { nullable: true })
    created_at?: Date;

    @Field(() => GraphQLISODateTime, { nullable: true })
    updated_at?: Date;

    @Field(() => Boolean, { nullable: true })
    grantable?: boolean;
}

@ObjectType({ description: 'Это разрешения' })
export class AbilityType {
    @Field(() => String)
    subject: string;

    @Field(() => [String], { nullable: true })
    action?: string[];
}

@ObjectType({ description: 'Это информация о разрешениях с пагинацией' })
export class PermissionPaginationType {
    @Field(() => [PermissionType])
    items: PermissionType[];

    @Field(() => PaginationInfo)
    pageInfo: PaginationInfo;
}

export const permissionType = {
    PermissionType,
    AbilityType,
    PermissionPaginationType,
};
