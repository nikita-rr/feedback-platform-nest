import { GraphQLScalarType, Kind, GraphQLError } from 'graphql';
import { CustomScalar, Scalar } from '@nestjs/graphql';

@Scalar('DateTimestamp', () => Date)
export class DateTimestampScalar implements CustomScalar<number, Date> {
  description = 'Date Timestamp custom scalar type in milliseconds';

  serialize(value: Date): number {
    return value.getTime(); // Convert outgoing Date to timestamp in milliseconds for JSON
  }

  parseValue(value: number): Date {
    return new Date(value); // Convert incoming integer (timestamp in milliseconds) to Date
  }

  parseLiteral(ast: any): Date {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST integer to Date
    }
    throw new GraphQLError(
      `Неправильный формат даты. Дата должна быть в формате timestamp в миллисекундах и числовой`,
      {
        extensions: { code: 'BAD_USER_INPUT' },
      }
    );
  }
}

export default DateTimestampScalar;
