import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateJobDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  suggestedPrice?: number;

  @IsString()
  organizationId!: string;
}
