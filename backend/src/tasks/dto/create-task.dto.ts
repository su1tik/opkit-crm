import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Заголовок не может быть пустым' })
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
