import { HttpException, HttpStatus } from '@nestjs/common';

function isIdNumber(id) {
  if (!id) {
    throw new HttpException('Id must be a number.', HttpStatus.BAD_REQUEST);
  }
}
export { isIdNumber };
