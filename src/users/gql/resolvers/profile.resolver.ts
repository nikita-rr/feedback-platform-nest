import { Resolver, Query, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UserProfileType } from '../types/profile.type';
import { ProfileService } from '../../services/profile.service';
import { UserPassportType } from '../types/password.type';
import { PassportService } from '../../services/passport.service';

@Resolver(() => UserProfileType)
export class UserProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly passportService: PassportService
  ) {}

  @ResolveField(() => UserPassportType, { nullable: true })
  async passport(@Parent() userProfile: UserProfileType): Promise<UserPassportType> {
    return this.passportService.getPassportByUserId(userProfile.user_id);
  }

  @Query(() => UserProfileType, { name: 'userProfile' })
  async getUserProfile(@Args('id', { type: () => Int }) id: number): Promise<UserProfileType> {
    return this.profileService.getUserProfileById(id);
  }

}
