import { Injectable, BadRequestException } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { Pagination } from '../constants/pagination'

@Injectable()
export class PaginationRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async paginate(params: {
    id_column: string;
    table_name: string;
    query: Knex.QueryBuilder;
    pagination: any;
  }): Promise<[any[], any]> {
    const { id_column, table_name, query, pagination } = params;

    pagination.columnName ??= id_column;
    if (pagination.columnName?.endsWith('_at') || pagination.columnName?.endsWith('_date')) {
      pagination.from = new Date(Number(pagination.from));
    }

    const queryClone = query.clone();
    // @ts-ignore
    const queryOrders = queryClone?._statements.filter(
      statement => statement?.grouping == 'order',
    );

    const paginationOrderColumnInQueryOrder = queryOrders?.find(queryOrder => {
      const rawOrderCol = queryOrder.value.split('.');
      const orderCol = rawOrderCol[rawOrderCol.length - 1];
      return orderCol === pagination.columnName;
    });

    let paginationOrderColumnPriority = false;
    if (queryOrders) {
      const firstQueryOrder = queryOrders[0];
      const rawFirstOrderCol = firstQueryOrder.value.split('.');
      const firstOrderCol = rawFirstOrderCol[rawFirstOrderCol.length - 1];
      paginationOrderColumnPriority = firstOrderCol === pagination.columnName;
    }

    let queryResult, from, to, pageInfo, tempQuery;

    if (pagination.direction === Pagination.direction.BACKWARD) {
      if (!pagination.from) {
        throw new GraphQLError('Чтобы идти назад, надо указать откуда начать. *from*', {
          extensions: {
            code: 'PAGINATION-FROM-NOT-PROVIDED',
            http: { status: 401 },
          },
        });
      }

      tempQuery = this.knex
        .with(table_name, queryClone)
        .select('*')
        .from(table_name)
        .whereRaw('?? <= ?', [pagination.columnName, pagination.from])
        .limit(pagination.perPage + 1);

      if (paginationOrderColumnInQueryOrder) {
        const orderDirection = paginationOrderColumnInQueryOrder.direction === 'asc' ? 'desc' : 'asc';
        tempQuery.orderBy(pagination.columnName, orderDirection);
      } else {
        tempQuery.orderBy(pagination.columnName, 'desc');
      }

      queryResult = await tempQuery;
      from = queryResult.length > 0 ? queryResult[0][pagination.columnName] : 0;
      to = queryResult.length > 0 ? queryResult[queryResult.length - 1][pagination.columnName] : 0;

      pageInfo = {
        hasNextPage: queryResult.length > pagination.perPage,
        hasPreviousPage: !!pagination.from,
        from,
        to,
      };

      return [queryResult, pageInfo];
    }

    if (pagination.direction === Pagination.direction.FORWARD) {
      tempQuery = this.knex
        .with(table_name, queryClone)
        .select('*')
        .from(table_name)
        .limit(pagination.perPage + 1);

      if (paginationOrderColumnInQueryOrder && paginationOrderColumnPriority) {
        const orderDirection = paginationOrderColumnInQueryOrder.direction === 'asc' ? 'desc' : 'asc';
        if (orderDirection === 'asc') {
          tempQuery.whereRaw('?? <= ?', [pagination.columnName, pagination.from || 0]);
        } else {
          tempQuery.whereRaw('?? >= ?', [pagination.columnName, pagination.from || 0]);
        }
      } else {
        tempQuery
          .whereRaw('?? >= ?', [pagination.columnName, pagination.from || 0])
          .orderBy(pagination.columnName, 'asc');
      }

      queryResult = await tempQuery;
      from = queryResult.length > 0 ? queryResult[0][pagination.columnName] : 0;
      to = queryResult.length > 0 ? queryResult[queryResult.length - 1][pagination.columnName] : 0;

      pageInfo = {
        hasNextPage: queryResult.length > pagination.perPage,
        hasPreviousPage: !!pagination.from,
        from,
        to,
      };

      return [
        queryResult.length > pagination.perPage ? queryResult.slice(0, -1) : queryResult,
        pageInfo,
      ];
    }
  }

  async paginateOffset(params: {
    id_column: string;
    table_name: string;
    pagination: any;
    query: Knex.QueryBuilder;
  }): Promise<[any[], any]> {
    const { id_column, table_name, pagination, query } = params;
    const queryClone = query.clone();
    // @ts-ignore
    const queryGroups = queryClone?._statements.filter(
      statement => statement?.grouping == 'group',
    );
    const countQueryClone = query.clone();
    let pageInfo, paginationQuery, countQuery;
    let { page, perPage } = pagination;
    page ??= 0;
    perPage ??= 10;
    const _page = page > 0 ? page - 1 : 0;

    const idColumnGroup = queryGroups.find(queryGroup => queryGroup.value.includes(id_column));

    countQuery = countQueryClone.clearSelect().clearOrder().count(id_column);

    paginationQuery = queryClone.limit(perPage).offset(_page * perPage);

    const [countResult, paginationResult] = await Promise.all([countQuery, paginationQuery]);

    pageInfo = {
      page,
      perPage,
      count: idColumnGroup ? countResult.length : countResult[0]?.count,
    };

    return [paginationResult, pageInfo];
  }
}
