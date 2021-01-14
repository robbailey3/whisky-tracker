import { ApiProperty } from '@nestjs/swagger';
export class WhiskyDto {
  @ApiProperty({ name: 'name', type: 'string' })
  name: string;
}
