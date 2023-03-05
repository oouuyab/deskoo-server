import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ERR_MSG } from '../../common/error-message';
import { UserEntity } from '../entities/user.entity';

export class CreateUserResDto {
  @Exclude()
  private readonly _id: number;

  @Exclude()
  private readonly _password: string;

  @Exclude()
  private readonly _email: string;

  @Exclude()
  private readonly _name: string;

  @Exclude()
  private readonly _regDate: Date;

  constructor(user: UserEntity) {
    this._id = user.id;
    this._email = user.email;
    this._password = user.password;
    this._name = user.name;
    this._regDate = user.regDate;
  }

  @Expose()
  get email(): string {
    return this._email;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  @Expose()
  get regDate(): Date {
    return this._regDate;
  }
}

export class CreateUserReqDto {
  @IsString({ message: ERR_MSG.INVALID_PASSWORD })
  @MaxLength(50, { message: ERR_MSG.INVALID_PASSWORD })
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,30}$/,
    {
      message: ERR_MSG.INVALID_PASSWORD,
    },
  )
  password: string;

  @IsEmail({}, { message: ERR_MSG.INVALID_EMAIL })
  @MaxLength(50, { message: ERR_MSG.INVALID_EMAIL })
  email: string;

  @IsString({ message: ERR_MSG.INVALID_NAME })
  @MaxLength(15, { message: ERR_MSG.INVALID_NAME })
  name: string;

  @Matches(/^01\d{9}/, { message: ERR_MSG.INVALID_HP_NO })
  @MaxLength(11, { message: ERR_MSG.INVALID_HP_NO })
  @MinLength(11, { message: ERR_MSG.INVALID_HP_NO })
  hpNo: string;
}
