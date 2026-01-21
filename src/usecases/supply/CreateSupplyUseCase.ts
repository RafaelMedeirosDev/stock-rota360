import { Injectable } from "@nestjs/common";
import { Supply } from "@prisma/client";
import { SupplyRepository } from "src/domains/repositories/SupplyRepository";
import { CreateSupplyDTO } from "src/shared/dtos/supply/CreateSupplyDTO";
import { SupplyAlreadeyExists } from "src/shared/errors/cases/SupplyAlreadyExists";

type Response = Supply

@Injectable()
export class CreateSupplyUseCase {
    constructor(private readonly supplyRepository: SupplyRepository){}

    async execute({name, unitType, minStock}: CreateSupplyDTO){
        const normalizedName = name.trim();

        const exists = await this.supplyRepository.findByName({
            name: normalizedName
        })

        if(exists){
            throw new SupplyAlreadeyExists();
        }

        return this.supplyRepository.create({
            name: normalizedName,
            unitType,
            minStock
        })
    }
}