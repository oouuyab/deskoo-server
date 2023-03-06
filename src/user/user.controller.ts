import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserReqDto, CreateUserResDto } from './dto/create-user.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '유저 생성', description: '유저를 생성한다.' })
  @ApiCreatedResponse({
    description: '유저를 생성한다.',
    type: CreateUserResDto,
  })
  async create(
    @Body() createUserReqDto: CreateUserReqDto,
  ): Promise<CreateUserResDto> {
    return await this.userService.create(createUserReqDto);
  }
}
