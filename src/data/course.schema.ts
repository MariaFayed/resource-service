import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Course {
  @Prop({ required: true })
  name: string;
}

export type CourseDocumentType = Course & Document;

const CourseSchema = SchemaFactory.createForClass(Course);

export { CourseSchema, CourseDocumentType as CourseDocument };