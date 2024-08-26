import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Profile } from '../../shared/models/profile.model';

@Injectable()
export class ProfileRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async updateProfile(params: {
    user: any;
    first_name: string;
    last_name: string;
    middle_name?: string;
    birth_date: Date;
    gender: string;
    about_me?: string;
    inn?: string;
    city_id?: number;
    db_transaction?: any;
  }): Promise<Profile> {
    const {
      user,
      first_name,
      last_name,
      middle_name,
      birth_date,
      gender,
      about_me,
      inn,
      city_id,
      db_transaction,
    } = params;

    const trx = db_transaction || (await this.knex.transaction());

    try {
      const updatedUserProfile = await this.knex('profiles')
        .update({
          first_name,
          last_name,
          middle_name,
          birth_date,
          gender,
          about_me,
          inn,
          city_id,
        })
        .where({
          user_id: user.id,
        })
        .transacting(trx)
        .returning('*')
        .first();

      if (!db_transaction) {
        await trx.commit();
      }

      return updatedUserProfile;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }
}
