import { PartialType } from '@nestjs/swagger';
import { CreatePriviligeDto } from './create-privilige.dto';

export class UpdatePriviligeDto extends PartialType(CreatePriviligeDto) {}
