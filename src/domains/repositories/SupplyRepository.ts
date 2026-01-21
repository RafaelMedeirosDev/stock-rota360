import { Supply, UNIT_TYPE } from "@prisma/client";

export interface CreateSupply {
    name: string;
    unitType: UNIT_TYPE;
    minStock?: number;
}

export interface FindByName {
    name: string;
}

export interface FindById {
    id: string;
}

export abstract class SupplyRepository {
    public abstract create(supply: CreateSupply): Promise<Supply>;
    public abstract findByName(supply: FindByName): Promise<Supply | null>;
    public abstract findById(supply: FindById): Promise<Supply | null>;
}