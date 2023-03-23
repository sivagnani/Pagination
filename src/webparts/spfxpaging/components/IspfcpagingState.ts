import { Employee } from "../model/model";

export interface ISpfxpagingState{
    startIndex:number;
    itemsCount:number;
    pageItems:Employee[];
    pageSize:number;
}