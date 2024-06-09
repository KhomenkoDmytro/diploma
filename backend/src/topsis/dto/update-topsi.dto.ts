import { PartialType } from '@nestjs/swagger';
import { CreateTopsisDto } from './create-topsi.dto';

export class UpdateTopsiDto extends PartialType(CreateTopsisDto) {}
