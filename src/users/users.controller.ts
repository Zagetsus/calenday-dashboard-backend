import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags
} from '@nestjs/swagger';
import { BadRequestDto } from '../common/dto';
import { UserRequestDto, UserResponseDto } from './dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiCreatedResponse({
    type: UserResponseDto
  })
  @ApiBadRequestResponse({
    type: BadRequestDto
  })
  @Post()
  async createUser(@Body() body: UserRequestDto) {
    const response = await this.userService.createUser(body).catch(error => {
      throw new BadRequestException(error.message);
    });

    return UserResponseDto.factory(response);
  }
}
