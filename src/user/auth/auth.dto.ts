import { Trim } from 'class-sanitizer';
import {ApiProperty} from "@nestjs/swagger"
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Trim()
  @IsEmail()
  @ApiProperty()
  public readonly login: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  public readonly password: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly name?: string;
}

export class LoginDto {
  @Trim()
  @IsEmail()
  @ApiProperty()
  public readonly login: string;

  @IsString()
  @ApiProperty()
  public readonly password: string;
}