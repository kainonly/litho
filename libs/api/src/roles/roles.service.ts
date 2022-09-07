import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';

import { DATABASE } from '../api.providers';
import { Role } from './role';

@Injectable()
export class RolesService {
  protected collection = this.db.collection<Role>('roles');

  constructor(@Inject(DATABASE) private db: Db) {}

  findNamesByIds(ids: ObjectId[]): Promise<string[]> {
    return this.collection
      .find({ _id: { $in: ids }, status: true })
      .map((v) => v.name)
      .toArray();
  }
}
