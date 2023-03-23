import { Employee } from "../model/model";
import {Web} from "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
let sp = Web("https://7zmht7.sharepoint.com/sites/SPFx");
export default class Service{
    getItems(startIndex:number,count:number):Promise<Employee[]>{
        return sp.lists.getByTitle("Employees").items.select("Title,Surname").skip(startIndex).top(count).get();
    }
    getItemsCount():Promise<number>{
        return sp.lists.getByTitle("Employees").items.get().then((items)=>items.length)
    }
}