import { IsArray, IsNumber, IsString, Length } from "class-validator";

export enum ReviewStatus {
    Verified = 'verified',
    Reviewing = 'reviewing',
    Declined = 'declined'
}

export class ReviewDTO {
    @IsString() @Length(10, 10) phone: string;
    @IsString() description: string;
    @IsArray() attachments: string[];
    @IsNumber() @Length(1, 5) rating: number;
    @IsString() status: ReviewStatus;
}

export class ReviewCreateRequest {
    @IsString() @Length(10, 10) phone: string;
    @IsString() description: string;
    @IsArray() attachments: string[];
    @IsNumber() @Length(1, 5) rating: number;
}

export class ReviewUpdateRequest {
    @IsString() description: string;
    @IsArray() attachments: string[];
    @IsNumber() @Length(1, 5) rating: number;
    @IsString() status: ReviewStatus;
}
