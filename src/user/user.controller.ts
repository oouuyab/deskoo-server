import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserReqDto, CreateUserResDto } from './dto/create-user.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

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

  @Get()
  @ApiOperation({
    summary: '이메일로 유저를 조회',
    description: '이메일로 유저를 조회한다.',
  })
  @ApiCreatedResponse({
    description: '이메일로 유저를 조회한다.',
    type: UserEntity,
  })
  async findByEmail(@Query('email') email: string): Promise<UserEntity> {
    return await this.userService.findOneByEmail(email);
  }
}
