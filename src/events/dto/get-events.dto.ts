import { IsOptional, IsDateString, IsString } from 'class-validator';

export class GetEventsDto {
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  categories?: string;
}
