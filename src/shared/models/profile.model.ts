export class Profile {
  static get tableName() {
    return 'profiles'
  }

  static get idColumn() {
    return 'user_id'
  }

  static get defaultSelect() {
    return [
      `${this.tableName}.user_id`,
      `${this.tableName}.first_name`,
      `${this.tableName}.last_name`,
      `${this.tableName}.middle_name`,
      `${this.tableName}.birth_date`,
      `${this.tableName}.gender`,
      `${this.tableName}.about_me`,
      `${this.tableName}.inn`,
      `${this.tableName}.rating`,
      `${this.tableName}.city_id`,
    ]
  }

  static get employeeSelect() {
    return [
      `${this.tableName}.first_name`,
      `${this.tableName}.last_name`,
      `${this.tableName}.middle_name`,
      `${this.tableName}.birth_date`,
      `${this.tableName}.gender`,
      `${this.tableName}.about_me`,
      `${this.tableName}.inn`,
      `${this.tableName}.rating`,
      `${this.tableName}.city_id`,
      `${this.tableName}.support_email`
    ]
  }

}