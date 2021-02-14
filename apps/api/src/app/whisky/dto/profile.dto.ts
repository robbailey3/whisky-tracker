import { ApiProperty } from '@nestjs/swagger';
import { ObjectID } from 'mongodb';
import { IsEmpty, IsNumber, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ProfileDto {
  @IsEmpty()
  @Type(() => String)
  @ApiProperty({ name: 'ID', type: ObjectID })
  public _id: ObjectID;

  @IsNumber()
  @Min(0)
  @Max(5)
  @ApiProperty({ name: 'body', type: Number, minimum: 0, maximum: 5 })
  public body: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  @ApiProperty({ name: 'richness', type: Number, minimum: 0, maximum: 5 })
  public richness: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  @ApiProperty({ name: 'sweetness', type: Number, minimum: 0, maximum: 5 })
  public sweetness: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  @ApiProperty({ name: 'smoke', type: Number, minimum: 0, maximum: 5 })
  public smoke: number;
}
