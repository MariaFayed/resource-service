import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { Company, CompanyDocument } from './company.schema';

//Seed data
@Injectable()
export class InitDataService implements OnModuleInit {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async onModuleInit() {
    console.log('InitDataService started...');

    const courseCount = await this.courseModel.countDocuments();
    const companyCount = await this.companyModel.countDocuments();

    if (courseCount === 0) {
      await this.courseModel.create([
        { name: 'NestJS for Beginners' },
        { name: 'MongoDB Mastery' },
      ]);
      console.log('Courses seeded');
    }

    if (companyCount === 0) {
      await this.companyModel.create([
        { name: 'TechCorp', description: 'Software Solutions' },
        { name: 'DevHouse', description: 'Full-Stack Training' },
      ]);
      console.log('Companies seeded');
    }

    console.log('InitDataService complete.');
  }
}