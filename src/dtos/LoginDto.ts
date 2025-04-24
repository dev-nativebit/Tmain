export interface LoginDto {
  sign: string;
  authToken: string;
  userDetail: UserDetailDto;
}

export interface UserDetailDto {
  loginId:string
  role:string
  roleName:string
  user_name:string
  user_code:string
  empId:string
  superAuth:string
  zoneId:string
  customerId:string
}
