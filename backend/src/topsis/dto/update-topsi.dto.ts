import { PartialType } from '@nestjs/swagger';
import { CreateTopsiDto } from './create-topsi.dto';

export class UpdateTopsiDto extends PartialType(CreateTopsiDto) {}
