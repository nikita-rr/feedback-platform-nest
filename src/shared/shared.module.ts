import { Module } from '@nestjs/common';
import { PaginationRepository } from './repositories/pagination.repository';

@Module({
    exports: [PaginationRepository]
})
export class SharedModule {}
