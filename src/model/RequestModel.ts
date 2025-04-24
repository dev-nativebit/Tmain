import { Entity } from "@/model/core";
import { RequestDto } from "@/dtos";

export class RequestModel extends Entity<RequestDto>{
  constructor(dto:RequestDto) {
    super(dto,'monitorId');
  }
  get com(): number{
    return this.dto?.com ?? 0
  }
  get string_point(): number{
    return this.dto?.string_point ?? 0
  }
  get monitorId(): number{
    return this.dto?.monitorId ?? 0
  }
  get addr_stat_no(): number{
    return this.dto?.addr_stat_no ?? 0
  }
  get actAuth(): number{
    return this.dto?.actAuth ?? 0
  }
  get monitorName(): string{
    return this.dto?.monitorName ?? '0'
  }
  get groupId(): number{
    return this.dto?.groupId ?? 0
  }
  get state(): number{
    return this.dto?.state ?? 0
  }
  get float_point(): number{
    return this.dto?.float_point ?? 0
  }
  get templateId(): number{
    return this.dto?.templateId ?? 0
  }
  get value(): string{
    return this.dto?.value ?? ''
  }
  get boxId(): number{
    return this.dto?.boxId ?? 0
  }
}
