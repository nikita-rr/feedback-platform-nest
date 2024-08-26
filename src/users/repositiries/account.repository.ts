import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Knex } from 'knex';
import { GraphQLError } from 'graphql';
import { RoleTypes } from 'src/shared/constants/role_types';
import { InjectKnex } from 'nestjs-knex';
import { PaginationRepository } from 'src/shared/repositories/pagination.repository';

@Injectable()
export class AccountRepository {
  constructor(@InjectKnex() private readonly knex: Knex,  private readonly paginationRepository: PaginationRepository,) {}

  async allUserAccountsWithRoles(params: {
    userId?: number;
    accountId?: number;
    accountType?: string;
    roleName?: string;
    roleType?: string;
    pagination?: any;
    filter?: any;
    sorting?: any;
  }) {
    const { userId, accountId, accountType, roleName, roleType, pagination, sorting } = params;

    const payersQ = this.knex('payers')
      .select(this.knex.raw(`to_json(payers)`))
      .where('payers.account_id', this.knex.ref('accounts.id'));

    const taxPayersQ = this.knex('tax_payers')
      .select(this.knex.raw(`jsonb_agg(tax_payers)`))
      .where('tax_payers.account_id', this.knex.ref('accounts.id'));

    const taxPayerQ = this.knex('tax_payers')
      .select(this.knex.raw(`to_json(tax_payers)`))
      .where('tax_payers.account_id', this.knex.ref('accounts.id'))
      .andWhere('tax_payers.is_default', true);

    const selectedColumns = [
      'accounts.*',
      payersQ.as('payer'),
      taxPayersQ.as('taxpayers'),
      taxPayerQ.as('taxpayer'),
      this.knex.raw(`to_json(roles) as role`),
      this.knex.raw(`to_json(memberships) as memberships`),
      this.knex.raw(`rtrim(concat_ws(' ', profiles.last_name, profiles.first_name, profiles.middle_name), ' ') as full_name_fio`),
      this.knex.raw(`profiles.inn as inn`),
    ];

    let query = this.knex('accounts')
      .select(selectedColumns)
      .innerJoin('memberships', 'memberships.account_id', 'accounts.id')
      .innerJoin('roles', 'memberships.role_id', 'roles.id')
      .innerJoin('profiles', 'memberships.user_id', 'profiles.user_id');

    if (userId) {
      query = query.where('memberships.user_id', userId);
    }
    if (roleType) {
      query = query.andWhere('roles.type', roleType);
    }
    if (roleName) {
      query = query.andWhere('roles.name', roleName);
    }
    if (accountId) {
      query = query.andWhere('accounts.id', accountId);
    }
    if (accountType) {
      query = query.andWhere('accounts.account_type', accountType);
    }

    query = query.groupBy(
      'accounts.id',
      'roles.id',
      'memberships.id',
      'profiles.user_id',
    );

    if (sorting) {
      for (const sort of sorting) {
        query = query.orderBy(sort.column_name, sort.order);
      }
    } else {
      query = query.orderBy('accounts.id', 'asc');
    }

    if (pagination) {
      return await this.paginationRepository.paginateOffset({
        pagination,
        id_column: 'accounts.id',
        table_name: 'accounts',
        query: query,
      });
    }

    return await query;
  }

  async getAll(params: { userId?: number; pagination?: any; filter?: any; sorting?: any }) {
    return this.allUserAccountsWithRoles(params);
  }

  async get(params: { accountId: number; userId?: number; accountType?: string }) {
    return this.allUserAccountsWithRoles(params);
  }

  async getVerifiedAccounts(params: { userId?: number; accountId?: number; verificationStatus?: string }) {
    const { userId, accountId, verificationStatus } = params;

    const selectedColumns = [
      'accounts.*',
      'verifications.*',
    ];

    let query = this.knex('accounts')
      .select(selectedColumns)
      .innerJoin('verifications', 'verifications.account_id', 'accounts.id')
      .innerJoin('memberships', 'memberships.account_id', 'accounts.id');

    if (userId) {
      query = query.where('memberships.user_id', userId);
    }
    if (accountId) {
      query = query.andWhere('accounts.id', accountId);
    }
    if (verificationStatus) {
      query = query.andWhere('verifications.status', verificationStatus);
    }

    return await query;
  }

  async createAccount(params: { account_name: string; account_support_email: string; account_type: string; user: any; db_transaction?: Knex.Transaction }) {
    const { account_name, account_support_email, account_type, user, db_transaction } = params;

    const trx = db_transaction || await this.knex.transaction();
    try {
      const [account] = await this.knex('accounts')
        .transacting(trx)
        .insert({
          name: account_name,
          support_email: account_support_email,
          account_type,
        })
        .returning('*');

      const role = await this.knex('roles')
        .select('*')
        .where({
          name: account_type,
          type: RoleTypes.OWNER,
        })
        .first();

      if (!role) {
        throw new GraphQLError('Такого типа роли не существует', {
          extensions: {
            code: 'INCORRECT-ROLE',
            http: { status: 401 },
          },
        });
      }

      await this.knex('memberships')
        .transacting(trx)
        .insert({
          user_id: user.id,
          account_id: account.id,
          role_id: role.id,
        });

      if (!db_transaction) {
        await trx.commit();
      }

      return account;
    } catch (error) {
      await trx.rollback(error);
      if (error.constraint === 'accounts_support_email_key') {
        throw new GraphQLError('Указанный e-mail уже используется', {
          extensions: {
            code: 'UNIQUE-CONSTRAINT-ACCOUNT-SUPPORT-EMAIL',
            http: { status: 401 },
            detail: error.detail,
          },
        });
      }
      throw error;
    }
  }

  async cancelAccount(accountId: number) {
    return await this.knex('accounts')
      .where({ id: accountId, is_active: false, is_verified: false })
      .delete()
      .returning('*');
  }

  async updateAccount(params: { accountId: number; support_email: string }) {
    try {
      const [updatedAccount] = await this.knex('accounts')
        .where('id', params.accountId)
        .update({ support_email: params.support_email })
        .returning('*');

      return updatedAccount;
    } catch (error) {
      if (error.constraint === 'accounts_support_email_key') {
        throw new GraphQLError('Указанный e-mail уже используется', {
          extensions: {
            code: 'UNIQUE-CONSTRAINT-ACCOUNT-SUPPORT-EMAIL',
            http: { status: 401 },
            detail: error.detail,
          },
        });
      }
      throw error;
    }
  }

  async deleteAccount(accountId: number) {
    return await this.knex('accounts')
      .where('id', accountId)
      .delete()
      .returning('*');
  }

  async getAccountMembers(accountId: number) {
    return await this.knex('memberships')
      .where('account_id', accountId)
      .select('*');
  }

  async getAllAccountsByAccountType(accountType: string) {
    return await this.knex('accounts')
      .where('account_type', accountType)
      .select('id');
  }
}
