import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    private _dataSource: DataSource,
    @InjectRepository(UserEntity)
    private _userRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserEntity): Promise<UserEntity> {
    return await this._userRepository.save(user);
  }

  async findOneById(id: number): Promise<UserEntity> {
    return await this._userRepository.findOne({ where: { id } });
  }

  async findOneByHpNo(hpNo: string): Promise<UserEntity> {
    return await this._userRepository.findOne({ where: { hpNo } });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this._userRepository.findOne({ where: { email } });
  }
}
