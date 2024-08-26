export class AccountTransactionType {
  static get tableName() {
    return 'transactions_types'
  }

  static get idColumn() {
    return 'type'
  }

  static get defaultSelect() {
    return [
      `${this.tableName}.id`,
      `${this.tableName}.type`,
      `${this.tableName}.description`,
    ]
  }
  
}