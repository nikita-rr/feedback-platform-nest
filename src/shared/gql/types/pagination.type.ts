import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';

// Enum Type
enum DirectionType {
  FORWARD = 'FORWARD',
  BACKWARD = 'BACKWARD',
}

registerEnumType(DirectionType, {
  name: 'DirectionType',
  description: 'Направление пагинации',
});

// Input Type
@InputType({ description: 'Пагинация' })
export class PaginationInputType {
  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  perPage: number;

  @Field(() => DirectionType, {
    defaultValue: DirectionType.FORWARD,
    deprecationReason: 'Новый способ пагинация не используется это поле',
  })
  direction?: DirectionType;

  @Field(() => String, {
    nullable: true,
    deprecationReason: 'Новый способ пагинация не используется это поле',
  })
  from?: string;

  @Field(() => String, {
    nullable: true,
    deprecationReason: 'Новый способ пагинация не используется это поле',
  })
  columnName?: string;
}

// Object Type
@ObjectType({ description: 'Информация о пагинации' })
export class PaginationInfo {
  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  perPage?: number;

  @Field(() => Int, { nullable: true })
  count?: number;

  @Field(() => Boolean, {
    nullable: true,
    deprecationReason: 'Новый способ пагинация не используется это поле',
  })
  hasNextPage?: boolean;

  @Field(() => Boolean, {
    nullable: true,
    deprecationReason: 'Новый способ пагинация не используется это поле',
  })
  hasPreviousPage?: boolean;

  @Field(() => String, {
    nullable: true,
    deprecationReason: 'Новый способ пагинация не используется это поле',
  })
  from?: string;

  @Field(() => String, {
    nullable: true,
    deprecationReason: 'Новый способ пагинация не используется это поле',
  })
  to?: string;
}

export const paginationType = {
  PaginationInputType,
  PaginationInfo,
};
