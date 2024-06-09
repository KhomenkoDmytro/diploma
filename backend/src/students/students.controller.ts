import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from "@nestjs/common";
import { StudentsService } from "./students.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("students")
@Controller("students")
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create({ ...createStudentDto });
  }

  @Get()
  findAll(@Query("institutionId") institutionId: number) {
    return this.studentsService.findAll(institutionId);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.studentsService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.studentsService.remove(id);
  }
}
