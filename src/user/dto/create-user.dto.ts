import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({ description: '이메일', example: 'email@email.com' })
  @Expose()
  get email(): string {
    return this._email;
  }

  @ApiProperty({ description: '이름', example: '데스쿠' })
  @Expose()
  get name(): string {
    return this._name;
  }

  @ApiProperty({ description: '등록일시', example: new Date() })
  @Expose()
  get regDate(): Date {
    return this._regDate;
  }
}

export class CreateUserReqDto {
  @ApiProperty({
    description:
      '비밀번호는 영문 대문자와 소문자, 숫자, 특수기호를 포함해야 하며 비밀번호는 50자를 초과하면 안된다.',
    example: 'Password123!@#',
  })
  @IsString({ message: ERR_MSG.INVALID_PASSWORD })
  @MaxLength(50, { message: ERR_MSG.INVALID_PASSWORD })
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,30}$/,
    {
      message: ERR_MSG.INVALID_PASSWORD,
    },
  )
  password: string;

  @ApiProperty({
    description: '이메일 형식을 입력해야 하며 50자를 초과할 수 없다.',
    example: 'email@email.com',
  })
  @IsEmail({}, { message: ERR_MSG.INVALID_EMAIL })
  @MaxLength(50, { message: ERR_MSG.INVALID_EMAIL })
  email: string;

  @ApiProperty({
    description: '이름은 15자를 초과할 수 없다.',
    example: '데스쿠',
  })
  @IsString({ message: ERR_MSG.INVALID_NAME })
  @MaxLength(15, { message: ERR_MSG.INVALID_NAME })
  name: string;

  @ApiProperty({
    description: `휴대전화 번호는 '-'를 제외한 11자리이며 '01'로 시작한다.`,
    example: '01000000000',
  })
  @Matches(/^01\d{9}/, { message: ERR_MSG.INVALID_HP_NO })
  @MaxLength(11, { message: ERR_MSG.INVALID_HP_NO })
  @MinLength(11, { message: ERR_MSG.INVALID_HP_NO })
  hpNo: string;
}
