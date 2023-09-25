import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResponseDto {
  @IsNumber()
  @IsNotEmpty()
  statusCode: number;

  @IsString()
  @IsNotEmpty()
  message: string;

  content?: any;

  @IsNumber()
  total?: number;
}
