import { Resolver, ResolveField, Parent, Context, Query, Args } from '@nestjs/graphql';
import { AccountPaginationType, AccountType } from '../types/account.type';
import { AbilityType, PermissionType } from '../types/permission.type';
import { AccountTransactionType } from '../types/accont_transaction.type';
import { PermissionService } from '../../services/permission.service';
import { AccountTransactionService } from '../../services/account_transactions.service';
import { AbilityService } from '../../services/ability.service';
import { PaginationInputType } from 'src/shared/gql/types/pagination.type';
import { AccountService } from 'src/users/services/account.service';
import { SortingInputType } from 'src/shared/gql/types/sorting.type';


@Resolver(() => AccountType)
export class AccountResolver {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly accountTransactionService: AccountTransactionService,
    private readonly abilityService: AbilityService,
    private readonly accountService: AccountService,
  ) {}

  @Query(() => AccountPaginationType, { description: 'Получение списка аккаунтов с пагинацией и сортировкой' })
  async getAccounts(
    @Args('paginationInput', { type: () => PaginationInputType }) paginationInput: PaginationInputType,
    @Args('sortingInput', { type: () => SortingInputType, nullable: true }) sortingInput?: SortingInputType,
  ): Promise<AccountPaginationType> {
    const result = await this.accountService.findPaginatedAccounts(paginationInput, sortingInput);
    return result;
  }

  @ResolveField(() => [PermissionType], { nullable: true })
  async permissions(@Parent() account: AccountType, @Context() context: any) {
    return this.permissionService.getPermissions({
      user: context.user,
      account_id: account.id,
    });
  }

  @ResolveField(() => [AbilityType], { nullable: true })
  async ability(@Parent() account: AccountType, @Context() context: any) {
    return this.abilityService.getAbility({
      user: context.user,
      account_id: account.id,
    });
  }

  @ResolveField(() => [AccountTransactionType], { nullable: true })
  async transactions(@Parent() account: AccountType, @Context() context: any) {
    return this.accountTransactionService.get({
      user: context.user,
      account_id: account.id,
    });
  }
}
