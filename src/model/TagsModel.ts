import {Model} from '@/model/core';
import {RequestDto, TagsDto} from '@/dtos';
import {RequestList} from '@/model/RequestList';

export class TagsModel extends Model<TagsDto>{
  constructor(dto: TagsDto) {
    super(dto);
  }
  get data():RequestList{
    return new RequestList(this.dto?.data);
  }
  get groupList():string[]{
    return this.dto?.groupList ?? [];
  }
}
