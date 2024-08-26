import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { AccountTransaction } from '../../shared/models/account_transactions.model';
import { AccountTransactionType } from '../../shared/models/account_transactions_type.model';

@Injectable()
export class AccountTransactionsRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async getTransactions(params: {
    id?: number;
    ids?: number[];
    account_id: number;
  }): Promise<any> {
    const { id, ids, account_id } = params;

    if (!account_id) {
      return null;
    }

    const selectedColumns = [
      ...AccountTransaction.defaultSelect,
      `${AccountTransactionType.tableName}.description as type_description`,
    ];

    let query = this.knex('account_transactions')
      .select(selectedColumns)
      .innerJoin(
        'account_transaction_types',
        'account_transaction_types.type',
        'account_transactions.type',
      )
      .where({ account_id });

    if (id) {
      query = query.andWhere({ id });
    }

    if (ids && ids.length > 0) {
      query = query.andWhere('account_transactions.id', 'in', ids);
    }

    return await query;
  }
}
