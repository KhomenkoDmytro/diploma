import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { ComplaintsService } from "./complaints.service";
import { CreateComplaintDto } from "./dto/create-complaint.dto";
import { UpdateComplaintDto } from "./dto/update-complaint.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("complaints")
@Controller("complaints")
export class ComplaintsController {
  constructor(private readonly complaintService: ComplaintsService) {}

  @Get()
  async findAll() {
    return this.complaintService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return this.complaintService.findOne(id);
  }

  @Post()
  async create(@Body() createComplaintDto: CreateComplaintDto) {
    return this.complaintService.create(createComplaintDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updateComplaintDto: UpdateComplaintDto,
  ) {
    return this.complaintService.update(id, updateComplaintDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: number) {
    return this.complaintService.remove(id);
  }
}
