import { Kind } from 'graphql';
import { CustomScalar, Scalar } from '@nestjs/graphql';
import { checkINN } from 'ru-validation-codes';
import { GraphQLError } from 'graphql';

function checkValidINN(value: string) {
  if (checkINN(value)) {
    return value;
  } 
  throw new GraphQLError(`Неправильный ИНН`, {
    extensions: { code: 'BAD_USER_INPUT' },
  });
}

@Scalar('Inn', () => String)
export class InnScalar implements CustomScalar<string, string> {
  description = 'Inn custom scalar type';

  serialize(value: string): string {
    return value; 
  }

  parseValue(value: string): string {
    return checkValidINN(value);
  }

  parseLiteral(ast: any): string {
    if (ast.kind === Kind.STRING) {
      return checkValidINN(ast.value);
    }
    throw new GraphQLError(`Неправильный тип данных для ИНН`, {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }
}

export default InnScalar;
