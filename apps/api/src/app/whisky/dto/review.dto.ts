import { ApiProperty } from '@nestjs/swagger';
import { ObjectID } from 'mongodb';
import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min
} from 'class-validator';
import { Type } from 'class-transformer';

export class ReviewDto {
  @IsEmpty()
  @Type(() => String)
  @ApiProperty({ name: 'ID', type: ObjectID })
  public _id: ObjectID;

  @IsString()
  @ApiProperty({ name: 'content', type: String, required: true })
  public content: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  @ApiProperty({ name: 'rating', minimum: 0, maximum: 5, type: Number })
  public rating: number;
}
