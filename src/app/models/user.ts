import * as moment from "moment";
import { Address } from "./address";
import { contact } from "./contact";

export class user{
    userid!:number;
    username!: string;
    firstname!:string;
    middlename!:string;
    lastname!:string;
    dateCreated!:string;
    status!:string;
    addresses!:Address[];
    contacts!:contact[];
}