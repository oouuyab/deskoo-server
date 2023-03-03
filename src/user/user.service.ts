import { BadRequestException, Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import { CreateUserReqDto, CreateUserResDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';
import { ERR_MSG } from '../common/error-message';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  private async _hash(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  private async _match(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  private async _findOneById(id: number): Promise<UserEntity> {
    return await this._userRepository.findOneById(id);
  }

  private async _findOneByEmail(email: string): Promise<UserEntity> {
    return await this._userRepository.findOneByEmail(email);
  }

  private async _findOneByHpNo(hpNo: string): Promise<UserEntity> {
    return await this._userRepository.findOneByHpNo(hpNo);
  }

  async create(createUserReqDto: CreateUserReqDto): Promise<CreateUserResDto> {
    if (await this._findOneByEmail(createUserReqDto.email)) {
      throw new BadRequestException(ERR_MSG.ALREADY_EXIST_EMAIL);
    }

    if (await this._findOneByHpNo(createUserReqDto.hpNo)) {
      throw new BadRequestException(ERR_MSG.ALREADY_EXIST_HP_NO);
    }

    const user = new UserEntity();

    user.email = createUserReqDto.email;
    user.hpNo = createUserReqDto.hpNo;
    user.name = createUserReqDto.name;
    user.password = await this._hash(createUserReqDto.password);

    const result = await this._userRepository.create(user);

    return _.omit(result, ['id', 'password']);
  }
}
