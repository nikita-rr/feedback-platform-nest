import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { TaxationStatus } from 'src/shared/constants/taxation-status';
import { Passport } from '../../shared/models/passport.model';

@Injectable()
export class PassportRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async getPassport(user_id: number): Promise<Passport> {
    const passport = await this.knex('passports')
      .select('*')
      .where({ user_id })
      .first();
    
    return passport;
  }

  async updatePassport(params: {
    user_id: number;
    authority: string;
    serial: string;
    number: string;
    issue_date: string;
    authority_code: string;
    place_of_birth: string;
    last_name: string;
    first_name: string;
    middle_name?: string;
    date_of_birth: string;
    gender: string;
    secretbuyer_account?: any; // Тип для secretbuyer_account зависит от его структуры
  }): Promise<Passport> {
    const {
      user_id,
      authority,
      serial,
      number,
      issue_date,
      authority_code,
      place_of_birth,
      last_name,
      first_name,
      middle_name,
      date_of_birth,
      gender,
      secretbuyer_account,
    } = params;

    const trx = await this.knex.transaction();

    try {
      const existingPassport = await this.knex('passports')
        .transacting(trx)
        .select('*')
        .where({ user_id })
        .first();

      let updatedPassport;

      if (!existingPassport) {
        // Создаем новый паспорт, если не существует
        updatedPassport = await this.knex('passports')
          .transacting(trx)
          .insert({
            authority,
            serial,
            number,
            issue_date,
            authority_code,
            place_of_birth,
            last_name,
            first_name,
            middle_name,
            date_of_birth,
            gender,
            user_id,
          })
          .returning('*');
      } else {
        // Обновляем существующий паспорт
        updatedPassport = await this.knex('passports')
          .transacting(trx)
          .update({
            authority,
            serial,
            number,
            issue_date,
            authority_code,
            place_of_birth,
            last_name,
            first_name,
            middle_name,
            date_of_birth,
            gender,
          })
          .where({ user_id })
          .returning('*');
      }

      // Проверка на secretbuyer_account и обновление налогового статуса
      if (secretbuyer_account) {
        await this.knex('tax_payers')
          .transacting(trx)
          .update({ is_active: false })
          .where({
            account_id: secretbuyer_account.id,
            taxation_status: TaxationStatus.INDIVIDUAL,
          });
      }

      await trx.commit();
      return updatedPassport[0];
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }
}
