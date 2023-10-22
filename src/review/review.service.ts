import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ReviewCreateRequest, ReviewStatus, ReviewUpdateRequest } from './review.dto';
import { ReviewDocument } from './review.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<ReviewDocument>,
  ) {}  

  async create(data: ReviewCreateRequest) {
    const createdReview = new this.reviewModel({
      ...data,
      status: ReviewStatus.Reviewing
    });
    await createdReview.save();

    return createdReview;
  }

  async findById(id: mongoose.Types.ObjectId) {
    return await this.reviewModel.findById(id).exec();
  }

  async update(id: mongoose.Types.ObjectId, data: ReviewUpdateRequest) {
    return await this.reviewModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: mongoose.Types.ObjectId) {
    return await this.reviewModel.findByIdAndDelete(id).exec();
  }

  async getReviews(number: string) {
    const reviews = await this.reviewModel.find({
      phone: number,
      status: ReviewStatus.Verified,
    }).exec();

    if (!reviews) {
      throw new HttpException('Не знайдено', HttpStatus.NOT_FOUND);
    }
    return reviews;
  }

  async getById(id: mongoose.Types.ObjectId) {
    const review = await this.reviewModel.findById(id);
    if (!review) {
      throw new HttpException('Не знайдено', HttpStatus.NOT_FOUND);
    }
    return review;
  }

  async getByStatus(status: ReviewStatus) {
    const reviews = await this.reviewModel.find({ status: status });
    if (!reviews) {
      throw new HttpException('Не знайдено', HttpStatus.NOT_FOUND);
    }
    return reviews;
  }

  async getByPhone(phone: string | number) {
    const reviews = await this.reviewModel.find({ phone });
    if (!reviews) {
      throw new HttpException('Не знайдено', HttpStatus.NOT_FOUND);
    }
    return reviews;
  }
}
