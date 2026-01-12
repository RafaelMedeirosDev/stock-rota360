import { IsNotEmpty, IsString } from "class-validator";

export class CreateCredentialDTO {
    @IsNotEmpty()
    @IsString()
    email!: string;

    @IsNotEmpty()
    @IsString()
    passwordHash!: string;

    @IsNotEmpty()
    @IsString()
    role!: string;
}