import { Resolver, ResolveField, Parent, Context } from '@nestjs/graphql';
import { AccountType } from '../types/account.type';
import { AbilityType, PermissionType } from '../types/permission.type';
import { AccountTransactionType } from '../types/accont_transaction.type';
import { PermissionService } from '../../services/permission.service';
import { AccountTransactionService } from '../../services/account_transactions.service';
import { AbilityService } from '../../services/ability.service';


@Resolver(() => AccountType)
export class AccountResolver {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly accountTransactionService: AccountTransactionService,
    private readonly abilityService: AbilityService,
  ) {}

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
