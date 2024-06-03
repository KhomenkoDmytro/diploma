import { HttpException, HttpStatus } from "@nestjs/common";
import { Not, Repository } from "typeorm";

async function isUniquePropertyValue(
  propertyName: string,
  propertyValue: any,
  repository: Repository<any>,
  id?: any,
) {
  try {
    const whereClause: any = {};
    if (id !== undefined) {
      whereClause.id = Not(id);
    }
    whereClause[propertyName] = propertyValue;

    const field = await repository.findOne({
      where: whereClause,
    });

    if (field) {
      throw new HttpException(
        `There already ${propertyName} with value: ${propertyValue}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  } catch (error) {
    throw error;
  }
}
export { isUniquePropertyValue };
