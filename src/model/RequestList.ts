import { List } from "@/model/core";
import { RequestModel } from "@/model/RequestModel";
import { RequestDto } from "@/dtos";

export class RequestList extends List<RequestModel>{
  constructor(dto?:RequestDto[]) {
    super(dto,RequestModel,false);
  }
}
