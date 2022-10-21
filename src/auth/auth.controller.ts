import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { AuthService } from '~/auth/auth.service';
import { AuthCredentialsRequestDTO } from '~/auth/dto';
import { BadRequestDto, UnauthorizedRequestDto } from '~/common/dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBadRequestResponse({
    type: BadRequestDto
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedRequestDto
  })
  @Post()
  async signIn(
    @Body() params: AuthCredentialsRequestDTO,
    @Req() req
  ): Promise<any> {
    try {
      return await this.authService.signIn(params);
    } catch (error) {
      if (error.status === 401) {
        throw new UnauthorizedException();
      }

      throw new BadRequestException();
    }
  }
}
