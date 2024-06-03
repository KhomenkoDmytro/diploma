import { PartialType } from '@nestjs/swagger';
import { CreateDecreeDto } from './create-decree.dto';

export class UpdateDecreeDto extends PartialType(CreateDecreeDto) {}
