import { Injectable } from '@nestjs/common';
import { UserProfileType } from '../gql/types/profile.type';

@Injectable()
export class ProfileService {
  // Это пример метода, который может взаимодействовать с базой данных для получения профиля пользователя
  async getUserProfileById(userId: number): Promise<UserProfileType> {
    // Логика для получения данных профиля из базы данных
    return {
      user_id: userId,
      first_name: 'John',
      last_name: 'Doe',
      middle_name: 'M',
    };
  }
}
