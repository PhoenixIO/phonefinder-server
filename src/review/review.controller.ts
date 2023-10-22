import mongoose from 'mongoose';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReviewService } from './review.service';
import { ReviewDTO } from './review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewServise: ReviewService,
  ) {}

  @Post('/create')
  async create(@Body() data: ReviewDTO) {
    return await this.reviewServise.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/edit/:id')
  async edit(@Body() data: ReviewDTO, @Param('id') id: mongoose.Types.ObjectId) {
    await this.reviewServise.getById(id);
    return await this.reviewServise.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete/:id')
  async delete(@Param('id') id: mongoose.Types.ObjectId) {
    return await this.reviewServise.delete(id);
  }

  @Get('/check/:number')
  async check(@Param('number') number: string) {
    return await this.reviewServise.getByPhone(number);
  }
}
