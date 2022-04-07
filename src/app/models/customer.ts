import { Address } from "./address";
import { Contact } from "./contact";
import { ServiceModel } from "./serviceModel";
import { Status } from "./status";

export class Customer{
    userId!:number;
    userName!: string;
    userFirstName!:string;
    userMiddleName!:string;
    userLastName!:string;
    status!:Status;
    userCreated!:string;
    addresses!:Address[];
    contacts!:Contact[];
    services!:ServiceModel[];
}