import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ReviewStatus } from './review.dto';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true }) phone: string;

  @Prop() description: string;

  @Prop() rating: number;

  @Prop({ required: true }) attachments: string[];

  @Prop() status: ReviewStatus;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);


