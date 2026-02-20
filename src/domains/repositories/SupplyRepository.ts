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
    public abstract create({name, unitType, minStock}: CreateSupply): Promise<Supply>;
    public abstract findByName({name}: FindByName): Promise<Supply | null>;
    public abstract findById({id}: FindById): Promise<Supply | null>;
}