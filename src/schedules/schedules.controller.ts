import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { GetUser } from '~/common/decorators';
import { ScheduleRequestDto, ScheduleResponseDto } from '~/schedules/dto';
import { SchedulesService } from '~/schedules/schedules.service';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly scheduleService: SchedulesService) {}

  @Post()
  async createSchedule(@GetUser() user, @Body() body: ScheduleRequestDto) {
    const { id } = user;
    const response = await this.scheduleService
      .createSchedule({ userId: id, body })
      .catch(error => {
        throw new BadRequestException(error.message);
      });

    return ScheduleResponseDto.factory(response);
  }
}
