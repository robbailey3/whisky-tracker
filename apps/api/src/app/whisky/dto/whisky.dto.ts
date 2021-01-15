import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';
import { ObjectID } from 'mongodb';

export class WhiskyDto {
  @ApiProperty({ name: '_id' })
  @IsEmpty()
  _id: string | ObjectID;

  @ApiProperty({ name: 'name', type: 'string' })
  name: string;
}
