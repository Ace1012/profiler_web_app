import { Address } from "./address";
import { Service } from "./service";

export class Organization{
    organizationId!:number;
    organizationName!:string;
    organizationMobile!:string;
    organizationPostal!:string;
    organizationServices!:Service[];
    addresses!:Address[];
}