import { Injectable } from '@nestjs/common';
import { AccountTransactionType } from '../gql/types/accont_transaction.type';

@Injectable()
export class AccountTransactionService {
  async get({ user, account_id }: { user: any; account_id: number }): Promise<AccountTransactionType[]> {
    // Здесь должна быть логика для получения транзакций, связанных с учетной записью и пользователем
    return []; // Возвращаемый массив транзакций
  }
}
