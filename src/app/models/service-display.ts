import { Timestamp } from "rxjs";
import { ServiceOrganization } from "./service-organization";

export class ServiceModel{
    serviceId!:number;
    serviceName!:string;
    serviceStart!:Timestamp<Date>;
    serviceEnd!:Timestamp<Date>;
    organization!:ServiceOrganization | null;
    serviceOrganizationId?:number;
    serviceStatus!:number;
}