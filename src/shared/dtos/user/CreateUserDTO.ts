import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDTO {
    
    @IsNotEmpty()
    @IsString()
    name!: string

    @IsNotEmpty()
    @IsString()
    cpf!: string
}