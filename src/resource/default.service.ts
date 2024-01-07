import { Injectable } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  ObjectLiteral,
  Repository,
  SaveOptions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class DefaultService<Entity extends ObjectLiteral> {
  constructor(protected repository: Repository<Entity>) {}

  async findAll(options?: FindManyOptions<Entity>) {
    return await this.repository.find(options);
  }

  async findOne(options: FindOneOptions<Entity>) {
    return await this.repository.findOne(options);
  }

  async create(user: DeepPartial<Entity>, options?: SaveOptions) {
    return await this.repository.save(user, options);
  }

  async remove(id: number) {
    return await this.repository.delete({ id } as any);
  }

  async update(id: number, user: QueryDeepPartialEntity<Entity>) {
    return await this.repository.update({ id } as any, user);
  }
}
