import { Injectable } from '@nestjs/common';
import { SortingInputType } from 'src/shared/gql/types/sorting.type';
import { AccountRepository } from '../repositiries/account.repository';
import { PaginationInputType } from 'src/shared/gql/types/pagination.type';

@Injectable()
export class AccountService {
    constructor(
        private readonly accountRepository: AccountRepository
    ) {}
  async findPaginatedAccounts(pagination: PaginationInputType, sorting?: SortingInputType) {
    const userIdFromSession = -1;
    const repoAccounts = await this.accountRepository.getAll({
        userId: userIdFromSession,
        pagination,
        sorting,
      })
  
      if (pagination) {
        const [ repoUserAccounts, pageInfo ] = repoAccounts
        console.log('repoUserAccounts', repoUserAccounts)
        // await redisManager.storeData(accounts_store_key(user.id), repoUserAccounts)
        
        return {
          items: repoUserAccounts,
          pageInfo,
        }
      }
      return {
        items: repoAccounts,
        pageInfo: {
          totalPages: 0,
          totalItems: 0,
          page: 0,
          perPage: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        }
      }
  }
}
