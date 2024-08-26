
export class Passport {
  static get tableName() {
    return 'passports'
  }

  static get idColumn() {
    return 'user_id'
  }

  static get defaultSelect() {
    return [
      `${this.tableName}.user_id`,
      `${this.tableName}.authority`,
      `${this.tableName}.serial`,
      `${this.tableName}.number`,
      `${this.tableName}.issue_date`,
      `${this.tableName}.authority_code`,
      `${this.tableName}.place_of_birth`,
      `${this.tableName}.last_name`,
      `${this.tableName}.first_name`,
      `${this.tableName}.middle_name`,
      `${this.tableName}.date_of_birth`,
      `${this.tableName}.gender`,
    ]
  }

}