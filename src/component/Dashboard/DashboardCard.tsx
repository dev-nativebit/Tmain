import React from 'react';
import { Box, Pressable, Text, ToggleButton } from "@/component";
import { DeviceHelper } from "@/helper";
import { fonts } from "@/style";
import moment from "moment";
import { RequestModel } from "@/model";

export interface DashboardCardProps {
  onPress:()=>void
  item:RequestModel
}

export const DashboardCard:React.FC<DashboardCardProps> = ({onPress,item}:DashboardCardProps) =>{
  return(
    <Box
      marginTop={'sr'}
      marginHorizontal={'s'}
      width={'29%'}
      justifyContent={'center'}
    >
      <Box
        padding={'e6'}
        borderRadius={12}
        borderWidth={1}
        height={DeviceHelper.calculateHeightRatio(120)}
        borderColor={'primaryColor'}
      >
       <Box  alignSelf={'flex-end'}>
         <ToggleButton onPress={onPress} isOn={parseInt(item.value) > 0} />
       </Box>
          <Text
            fontSize={15}
            color={'eerieBlack'}
            fontFamily={fonts.Merienda_bold}
            textAlign={'center'}
            marginTop={'sr'}
            fontWeight={'800'}
          >
            {item.monitorName}
          </Text>

      </Box>
    </Box>
  )
}
