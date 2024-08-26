export class AccountTransaction {
  static get tableName() {
    return 'transactions'
  }

  static get idColumn() {
    return 'id'
  }

  static get defaultSelect() {
    return [
      `${this.tableName}.id`,
      `${this.tableName}.account_id`,
      `${this.tableName}.type`,
      `${this.tableName}.amount`,
      `${this.tableName}.created_at`,
      `${this.tableName}.period`,
    ]
  }
  
}