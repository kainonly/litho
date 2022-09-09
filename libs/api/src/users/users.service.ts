import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '@weplanx/common';
import * as argon2 from 'argon2';
import Redis from 'ioredis';
import { Db, ObjectId, UpdateFilter, UpdateResult, WithId } from 'mongodb';

import { DATABASE, REDIS } from '../api.providers';
import { DepartmentsService } from '../departments/departments.service';
import { RolesService } from '../roles/roles.service';
import { SetUserDto } from './dto/set-user.dto';

@Injectable()
export class UsersService {
  protected collection = this.db.collection<User>('users');

  constructor(
    private config: ConfigService,
    @Inject(DATABASE) private db: Db,
    @Inject(REDIS) private redis: Redis,
    private roles: RolesService,
    private departments: DepartmentsService
  ) {}

  /**
   * 从用户名或电子邮件获取用户
   * @param identity 身份
   */
  async findOneByIdentity(identity: string): Promise<WithId<User>> {
    return this.collection.findOne({
      status: true,
      $or: [{ username: identity }, { email: identity }]
    });
  }

  /**
   * 获取授权用户数据
   * @param id
   */
  async getActived(id: ObjectId): Promise<WithId<User>> {
    return this.collection.findOne({ _id: id, status: true });
  }

  /**
   * 获取授权用户信息
   * @param data
   */
  async getUser(data: WithId<User>): Promise<any> {
    const roles = await this.roles.findNamesByIds(data.roles as ObjectId[]);
    const department = data.department ? await this.departments.findNameById(data.department as ObjectId) : '无';
    return {
      username: data.username,
      email: data.email,
      roles,
      department,
      name: data.name,
      avatar: data.avatar,
      sessions: data.sessions,
      last: data.last,
      create_time: data.create_time
    };
  }

  /**
   * 更新授权用户
   * @param id 用户 ID
   * @param data 数据
   */
  async setUser(id: ObjectId, data: SetUserDto): Promise<UpdateResult> {
    if (data.password) {
      data.password = await argon2.hash(data.password, { type: argon2.argon2id });
    }
    const update: UpdateFilter<User> = {};
    if (data.type) {
      update.$unset = { [data.type]: '' };
      delete data.type;
    }
    Reflect.set(update, '$set', data);
    return this.collection.updateOne({ _id: id, status: true }, update);
  }
}
