import { Injectable } from '@nestjs/common';
import { AbilityType } from '../gql/types/permission.type';

@Injectable()
export class AbilityService {
  async getAbility({ user, account_id }: { user: any; account_id: number }): Promise<AbilityType[]> {
    // Здесь должна быть логика для получения возможностей, связанных с учетной записью и пользователем
    return []; // Возвращаемый массив возможностей
  }
}
