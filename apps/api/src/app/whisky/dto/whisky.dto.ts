import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { ObjectID } from 'mongodb';

export class WhiskyDto {
  @ApiProperty()
  @IsEmpty()
  @Type(() => String)
  public _id: ObjectID;

  @ApiProperty({ name: 'name', type: 'string' })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ name: 'name', type: 'string' })
  @IsString()
  @IsNotEmpty()
  public distilleryID: ObjectID;
}
