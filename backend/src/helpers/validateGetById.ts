import { HttpException, HttpStatus } from '@nestjs/common';

function validateGetById(id:number, item:any, name:string) {
  if (!item) {
    throw new HttpException(
      `There is no ${name} with id: ${id}`,
      HttpStatus.NOT_FOUND,
    );
  }
}
export { validateGetById };
