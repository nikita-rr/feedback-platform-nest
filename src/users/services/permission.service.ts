import { Injectable } from '@nestjs/common';
import { PermissionType } from '../gql/types/permission.type';

@Injectable()
export class PermissionService {
  async getPermissions({ user, account_id }: { user: any; account_id: number }): Promise<PermissionType[]> {
    // Здесь должна быть логика для получения разрешений, связанная с учетной записью и пользователем
    return []; // Возвращаемый массив разрешений
  }
}
