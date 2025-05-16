// src/resource.service.ts
import { Injectable } from '@nestjs/common';
import { CompanyRepository } from 'src/repositories/company.repository';
import { CourseRepository } from 'src/repositories/course.repository';

@Injectable()
export class ResourceService {

    constructor(private readonly companyRepo: CompanyRepository,private readonly courseRepo: CourseRepository) {}
  getCourses() {
  return this.courseRepo.findAll();
  }

  getCompanies() {
    return  this.companyRepo.findAll();
  }
}
