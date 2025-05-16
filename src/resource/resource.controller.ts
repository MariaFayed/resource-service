// src/resource.controller.ts
import { Controller, Get, Req } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { ResourceService } from './resource.service';

@Controller()
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Get('courses')
  @Roles('user')
  getCourses(@Req() req) {
    return this.resourceService.getCourses();
  }

  @Get('companies')
  @Roles('admin')
  getCompanies() {
    return this.resourceService.getCompanies();
  }
}
