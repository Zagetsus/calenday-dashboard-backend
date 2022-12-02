import { snakeKeys } from '~/common/utils';

export class ScheduleResponseDto {
  static factory(schedule) {
    return snakeKeys(schedule);
  }
}
