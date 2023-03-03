import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ERR_MSG } from '../../common/error-message';

export interface CreateUserResDto {
  email: string;

  name: string;

  regDate: Date;
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
