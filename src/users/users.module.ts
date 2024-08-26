import { Module } from '@nestjs/common';
import { AbilityService } from './services/ability.service';
import { AccountTransactionService } from './services/account_transactions.service';
import { PassportService } from './services/passport.service';
import { PermissionService } from './services/permission.service';
import { ProfileService } from './services/profile.service';
import { AccountRepository } from './repositiries/account.repository';
import { AccountTransactionsRepository } from './repositiries/account_transactions.repository';
import { PassportRepository } from './repositiries/passport.repository';
import { ProfileRepository } from './repositiries/profile.repository';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports: [
        SharedModule
    ],
    providers: [
        AbilityService,
        AccountTransactionService,
        PassportService,
        PermissionService,
        ProfileService,

        AccountRepository,
        AccountTransactionsRepository,
        PassportRepository,
        ProfileRepository,
    ]
})
export class UsersModule { }
