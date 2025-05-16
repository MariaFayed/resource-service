// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { ResourceController } from './resource/resource.controller';
import { ResourceService } from './resource/resource.service';
import { KeycloakJwtStrategy } from './auth/keycloak.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './data/course.schema';
import { Company, CompanySchema } from './data/company.schema';
import { InitDataService } from './data/init-data.service';
import { CourseRepository } from './repositories/course.repository';
import { CompanyRepository } from './repositories/company.repository';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ Load env first
    MongooseModule.forRootAsync({
  useFactory: async () => {
    console.log('Connecting to Mongo:', process.env.MONGO_URI);
    return { uri: process.env.MONGO_URI };
  },
}),
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Company.name, schema: CompanySchema },
    ]),
  ],
  controllers: [ResourceController],
  providers: [
    InitDataService,
    CourseRepository,
    CompanyRepository,
    ResourceService,
    KeycloakJwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
