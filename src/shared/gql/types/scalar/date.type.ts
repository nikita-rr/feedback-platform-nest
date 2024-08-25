import { GraphQLScalarType, Kind, GraphQLError } from 'graphql';
import { CustomScalar, Scalar } from '@nestjs/graphql';

function throwDateGraphQLError() {
  throw new GraphQLError(`Неправильный формат даты. Дата должна быть в формате "ДД.ММ.ГГГГ"`, {
    extensions: { code: 'BAD_USER_INPUT' },
  });
}

function reverseDateString(str: string): string {
  const splitString = str.split(".");
  const splitStringLength = splitString.length;
  if (splitStringLength > 3) {
    throwDateGraphQLError();
  }
  if (splitString[splitStringLength - 1].length < 3) {
    throwDateGraphQLError();
  }

  const reverseArray = splitString.reverse();
  const joinArray = reverseArray.join(".");
  return joinArray;
}

function parseDate(value: string): Date | undefined {
  if (!value) {
    return undefined;
  }

  value = reverseDateString(value);

  try {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date;
  } catch (error) {
    return undefined;
  }
}

function zeroDateString(value: number): string | number {
  if (!Number.isInteger(value)) return value;
  return value < 10 ? `0${value}` : value.toString();
}

function convertDateToStringRU(value: Date): string {
  const date = new Date(value);
  return `${zeroDateString(date.getDate())}.${zeroDateString(date.getMonth() + 1)}.${date.getFullYear()}`;
}

@Scalar('Date', () => String)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  serialize(value: Date): string {
    return convertDateToStringRU(value); // Convert outgoing Date to string in "ДД.ММ.ГГГГ" format
  }

  parseValue(value: string): Date | undefined {
    return parseDate(value); // Convert incoming string to Date
  }

  parseLiteral(ast: any): Date | undefined {
    if (ast.kind === Kind.STRING) {
      return parseDate(ast.value); // Convert hard-coded AST string to Date
    }
    throwDateGraphQLError();
  }

  extensions = {
    codegenScalarType: 'Date | string',
    jsonSchema: {
      type: 'string',
      format: 'date',
    },
  };
}

export default DateScalar;
