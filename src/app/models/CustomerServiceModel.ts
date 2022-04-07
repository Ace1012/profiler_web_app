import { Timestamp } from "rxjs";
import { ServiceOrganization } from "./service-organization";

export class CustomerServiceModel{
    serviceId!:number;
    serviceName!:string;
    serviceStart!:Timestamp<Date>;
    serviceEnd!:Timestamp<Date>;
    organization!:ServiceOrganization | null;
    serviceOrganizationId?:number;
    serviceStatus?:number;
    level!:number;
    expandable!: boolean;
}