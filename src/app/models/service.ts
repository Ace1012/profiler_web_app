import { Timestamp } from "rxjs";

export class Service{
    serviceId!:number;
    serviceName!:string;
    serviceStart!:Timestamp<Date>;
    serviceEnd!:Timestamp<Date>;
    serviceOrganizationId!:number;
}