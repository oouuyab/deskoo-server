import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserReqDto, CreateUserResDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createUserReqDto: CreateUserReqDto,
  ): Promise<CreateUserResDto> {
    return await this.userService.create(createUserReqDto);
  }
}
