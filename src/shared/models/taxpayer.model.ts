export class TaxPayer {
  static get tableName() {
    return 'taxpayers'
  }

  static get idColumn() {
    return 'id'
  }

  static get defaultSelect() {
    return [
      `${this.tableName}.id`,
      `${this.tableName}.account_id`,
      `${this.tableName}.taxation_status`,
      // `${this.tableName}.inn`,
      `${this.tableName}.bank_account`,
      `${this.tableName}.corr_account`,
      `${this.tableName}.bank_bik`,
      `${this.tableName}.bank_name`,
      `${this.tableName}.ogrnip`,
      `${this.tableName}.is_active`,
      `${this.tableName}.created_at`,
      `${this.tableName}.updated_at`,
      `${this.tableName}.is_default`,
      `${this.tableName}.user_id`,
      `${this.tableName}.verified_selfemployed_at`,
      `${this.tableName}.is_linked_bank131`,
    ]
  }

}