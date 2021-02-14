import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateNested
} from 'class-validator';
import { ObjectID } from 'mongodb';
import { ProfileDto } from './profile.dto';
import { ReviewDto } from './review.dto';

export class WhiskyDto {
  @ApiProperty()
  @IsEmpty()
  @Type(() => String)
  public _id: ObjectID;

  @ApiProperty({ name: 'name', type: String })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ name: 'age', type: Number })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(60)
  public age: number;

  @ApiProperty({
    name: 'strength',
    description: 'The alcohol content of the whisky (e.g. 40 for 40%)',
    required: true,
    minimum: 0,
    maximum: 100
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  public strength: number;

  @ApiProperty({ name: 'distilleryID', type: ObjectID })
  @IsNotEmpty()
  @Type(() => String)
  @Transform((params) => ObjectID.createFromHexString(String(params.value)))
  public distilleryID: ObjectID;

  @ApiProperty({ name: 'reviews', type: [ReviewDto], required: false })
  @ValidateNested()
  public reviews: ReviewDto[];

  @ApiProperty({ name: 'profiles', type: [ProfileDto], required: false })
  @ValidateNested()
  public profiles: ProfileDto[];
}
