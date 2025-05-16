import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Company {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export type CompanyDocumentType = Company & Document;

const CompanySchema = SchemaFactory.createForClass(Company);

export { CompanySchema, CompanyDocumentType as CompanyDocument };
