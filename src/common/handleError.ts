import {
  Logger,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

export class HandleError {
  private logger = new Logger();
  LogError(error: any) {
    console.log(error);
    this.logger.log(error);

    if ((error.code === '23502', error.code === '22007')) {
      throw new BadRequestException(
        error.detail === 'undefined' ? error.detail : this.logger.log(error),
      );
    }

    throw new InternalServerErrorException(error.detail);
  }
}
