import { CreateSupply, FindById, FindByName, SupplyRepository } from "src/domains/repositories/SupplyRepository";
import { PrismaRemoteRepository } from "./PrismaRemoteRepository";
import { Injectable } from "@nestjs/common";
import { Supply } from "@prisma/client";


@Injectable()
export class PrismaSupplyRepository implements SupplyRepository {
    constructor(private readonly prisma: PrismaRemoteRepository) {}

    create({name, unitType, minStock}: CreateSupply): Promise<Supply> {
        return this.prisma.supply.create({
            data: {
                name,
                unitType,
                minStock,
            },
        });
    }

    findByName({name}: FindByName): Promise<Supply | null> {
        return this.prisma.supply.findFirst({
            where: {
                name
            },
        });
    }

    findById({id}: FindById): Promise<Supply | null> {
        return this.prisma.supply.findUnique({
            where: {
                id
            },
        });
    }
}