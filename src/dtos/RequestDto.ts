export interface TagsDto{
  data:RequestDto[]
  groupList:string[]
}

export interface RequestDto{
  com: number
  string_point: number
  monitorId: number
  addr_stat_no: number
  actAuth: number
  monitorName: string
  groupId: number
  state: number
  float_point: number
  templateId: number
  value: string
  boxId: number
  group_name: string
}
