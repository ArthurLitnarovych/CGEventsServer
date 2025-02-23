import {
  IsString,
  IsNumber,
  IsObject,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

class Location {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  @Transform(({ value }) => new Date(value))
  eventDate: Date;

  @IsObject()
  @ValidateNested()
  @Type(() => Location)
  location?: Location;

  @IsString()
  category: string;
}
