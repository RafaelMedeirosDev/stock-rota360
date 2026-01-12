import { IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
    @IsNotEmpty()
    @IsString()
    public email!: string;

    @IsNotEmpty()
    @IsString()
    public passwordHash!: string;
}