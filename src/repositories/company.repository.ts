import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from 'src/data/company.schema';


@Injectable()
export class CompanyRepository {
  constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) {}

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().lean().exec();
  }

  async findById(id: number): Promise<Company | null> {
    return this.companyModel.findOne({ id }).lean().exec();
  }
}