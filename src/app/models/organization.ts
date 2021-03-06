import { Address } from "./address";
import { Service } from "./organization-service";
import { ServiceModel } from "./serviceModel";

export class Organization{
    organizationId!:number;
    organizationName!:string;
    organizationMobile!:string;
    organizationPostal!:string;
    organizationServices!:ServiceModel[];
    addresses!:Address[];
}