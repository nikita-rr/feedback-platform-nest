import { Injectable } from '@nestjs/common';
import { UserPassportType } from '../gql/types/password.type';

@Injectable()
export class PassportService {
    async getPassportByUserId(user_id: number): Promise<UserPassportType> {
        return {
            user_id: 1,
            first_name: "",
            last_name: "",
        };
    }
}