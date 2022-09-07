import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';

import { DATABASE } from '../api.providers';
import { Department } from './department';

@Injectable()
export class DepartmentsService {
  protected collection = this.db.collection<Department>('departments');

  constructor(@Inject(DATABASE) private db: Db) {}

  async findNameById(id: ObjectId): Promise<string> {
    const { name } = await this.collection.findOne({ _id: id });
    return name;
  }
}
