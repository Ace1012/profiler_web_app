import * as moment from "moment";
import { Address } from "./address";
import { Contact } from "./contact";

export class User{
    userid!:number;
    username!:string;
    firstname!:string;
    middlename!:string;
    lastname!:string;
    dateCreated!:string;
    status!:string;
    addresses!:Address[];
    contacts!:Contact[];
}