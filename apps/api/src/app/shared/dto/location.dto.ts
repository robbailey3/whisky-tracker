import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class LocationDto {
  @IsNumber()
  @ApiProperty({ name: 'longitude', type: Number })
  longitude: number;

  @IsNumber()
  @ApiProperty({ name: 'latitude', type: Number })
  latitude: number;
}
