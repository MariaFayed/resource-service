import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from 'src/data/course.schema';


@Injectable()
export class CourseRepository {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().lean().exec();
  }

  async findById(id: number): Promise<Course | null> {
    return this.courseModel.findOne({ id }).lean().exec();
  }
}