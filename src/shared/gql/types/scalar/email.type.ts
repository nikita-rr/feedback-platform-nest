import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { CustomScalar, Scalar } from '@nestjs/graphql';

const matcher = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function isEmail(string: string): boolean {
  if (string.length > 320) return false;
  return matcher.test(string);
}

function checkEmail(value: string): string {
  if (isEmail(value)) {
    return value;
  } 
  throw new GraphQLError(`Неправильная почта`, {
    extensions: { code: 'BAD_USER_INPUT' },
  });
}

@Scalar('Email', () => String)
export class EmailScalar implements CustomScalar<string, string> {
  description = 'Email custom scalar type';

  serialize(value: string): string {
    return value; 
  }

  parseValue(value: string): string {
    return checkEmail(value);
  }

  parseLiteral(ast: any): string {
    if (ast.kind === Kind.STRING) {
      return checkEmail(ast.value);
    }
    throw new GraphQLError(`Неправильная почта`, {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }
}

export default EmailScalar;
