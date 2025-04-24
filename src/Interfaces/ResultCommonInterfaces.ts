import { LoginDto, RequestDto } from "@/dtos";

export interface ResultCommonInterfaces {
  message: string;
  success: number | boolean;
  data: LoginDto
    | RequestDto[]
  // current_page: number;
  // total_pages: number;
  // per_page_record: number;
  // total_record: number;
  // total_rat:number;
  // based_on:number;
  // user_name:string;
  // profile_image:string;
  // commited_earning:number;
  // tabs_count: NonNullable<unknown>;
}
