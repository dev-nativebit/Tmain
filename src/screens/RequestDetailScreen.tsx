import React, { useMemo, useRef, useState } from "react";
import {
  Box, hideFullScreenProgress,
  Image,
  Pressable,
  ResignBottomSheet,
  Screen,
  ScreenHeader,
  showFullScreenProgress,
  StatusBarType,
  Text
} from "@/component";
import { useTheme } from "@shopify/restyle";
import { fonts, Theme } from "@/style";
import { SvgIcon } from "@/assets/SvgIcon";
import { DeviceHelper } from "@/helper";
import { RouteProp, useRoute } from "@react-navigation/native";
import { goBack, StackParamList } from "@/navigation/AppNavigation";
import {  ScrollView } from "react-native";
import moment from "moment";
import { Images } from "@/assets";
import { SaveTagValueApiParams, GetRequestListApiParams } from "@/api";
import { actions } from "@/redux/root.store";
import { useForm } from "react-hook-form";
import { customFormGenerator, RejectNotesIDs } from "@/customFormGenerator";


export const RequestDetailScreen:React.FC =() =>{
  const routes = useRoute<RouteProp<StackParamList,'RequestDetailScreen'>>()
  const data =  routes.params?.data
  const {colors} =useTheme<Theme>()
  const [isVisibleNote, setIsVisibleNote] = useState(false)
  const status = useRef('')
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const form = useMemo(() => customFormGenerator.generateRejectNotesForm(), []);

  const approveRejectApiCall = () =>{
    setIsVisibleNote(false)
    const params:SaveTagValueApiParams ={
      reason:getValues()[RejectNotesIDs.notes] ? getValues()[RejectNotesIDs.notes] : '',
      req_status:status.current === 'Approved' ? '2' : '3',
      id:data?.id,
    }
    showFullScreenProgress()
    actions.approveRequestApiThunkCallActions(params).then(value => {
      hideFullScreenProgress()
      console.log(value);
      if (value.isSuccess){
        const params: GetRequestListApiParams = {
          length: '1000',
          search: '',
          start: '0',
        };
        actions.getRequestListApiThunkCallActions(params).then();
        goBack()
      }
    })
  }

  const handleOnPressNote = () => {
    handleSubmit(approveRejectApiCall)()
  }


  return(
      <Screen
        backgroundColor={'antiFlashWhite2'}
        statusBarColor={colors.primary}
        statusBarType={StatusBarType.Dark}>

        <ScreenHeader
          title={'Request Detail'}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box
            backgroundColor={'white'}
            paddingBottom={'lm'}
            marginBottom={'se'}
          >
            <Text
              paddingVertical={'sr'}
              fontFamily={fonts.regular}
              paddingHorizontal={'sr'}
              color={'eerieBlack'}
              fontSize={15}
            >
              {'trans_prefix'}
            </Text>
            <Box
              borderTopWidth={0.8}
              borderBottomWidth={0.8}
              paddingHorizontal={'sr'}
              borderColor={'lightGray2'}
              flexDirection={'row'}
            >
              <Text
                paddingVertical={'e6'}
                fontFamily={fonts.medium}
                color={'gray'}
                fontSize={15}
                style={{flex:0.65}}
              >
                {'Item'}
              </Text>
              <Text
                paddingVertical={'e6'}
                fontFamily={fonts.medium}
                color={'gray'}
                fontSize={15}
                style={{
                  flex:0.35,
                  borderLeftWidth:0.8,
                  borderColor:colors.lightGray,
                }}
                textAlign={'center'}
              >
                {'Oty'}
              </Text>
            </Box>
            <Box
              borderBottomWidth={0.8}
              paddingHorizontal={'sr'}
              borderColor={'lightGray2'}
              flexDirection={'row'}
            >
              <Box flex={0.65} paddingVertical={'e6'}>
                <Text
                  fontFamily={fonts.medium}
                  color={'eerieBlack'}
                  fontSize={15}
                >
                  {data?.item_name}
                </Text>
                {/*<Text*/}
                {/*  fontFamily={fonts.medium}*/}
                {/*  style={{color:'#5F44CE'}}*/}
                {/*  paddingVertical={'es'}*/}
                {/*  fontSize={11}*/}
                {/*>*/}
                {/*  {'View Description and Photo'}*/}
                {/*</Text>*/}
                <Text
                  fontFamily={fonts.medium}
                  color={'green'}
                  fontSize={13}
                >
                  {data?.status.toUpperCase()}
                </Text>
              </Box>
              <Box
                flex={0.35}
                paddingVertical={'e6'}
                borderLeftWidth={0.8}
                borderColor={'lightGray'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'row'}
              >
                <Text
                  paddingVertical={'e6'}
                  fontFamily={fonts.semiBold}
                  color={'eerieBlack'}
                  fontSize={15}
                  textAlign={'center'}
                >
                  {data?.qty.toLowerCase()}
                </Text>
              </Box>

            </Box>
            <Box
              marginVertical={'r'}
              flexDirection={'row'}
              marginHorizontal={'sr'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Box>
                <Text
                  fontFamily={fonts.semiBold}
                  color={'gray'}
                  fontSize={11}
                >
                  {`Enter by ${data?.request_by}`}
                </Text>
                <Text
                  fontFamily={fonts.semiBold}
                  color={'gray'}
                  fontSize={11}
                >
                  {`Date: ${moment(data?.request_at).format('DD MMM YYYY')}`}
                </Text>
              </Box>
              {
                data?.req_status === '1' && (
                  <Box flexDirection={'row'}>
                    <Pressable
                      onPress={() =>{
                        status.current = 'Approved'
                        approveRejectApiCall()
                      }}
                      height={DeviceHelper.calculateWidthRatio(45)}
                      width={DeviceHelper.calculateWidthRatio(45)}
                      borderRadius={DeviceHelper.calculateWidthRatio(25)}
                      backgroundColor={'green'}
                      alignItems={'center'}
                      marginEnd={'s'}
                      justifyContent={'center'}
                    >
                      <Image source={Images.check} tintColor={'white'} height={28} width={30}/>
                    </Pressable>
                    <Pressable
                      onPress={() =>{
                        setIsVisibleNote(true)
                      }}
                      height={DeviceHelper.calculateWidthRatio(45)}
                      width={DeviceHelper.calculateWidthRatio(45)}
                      borderRadius={DeviceHelper.calculateWidthRatio(25)}
                      backgroundColor={'red'}
                      alignItems={'center'}
                      marginStart={'s'}
                      justifyContent={'center'}
                    >
                      <Image source={Images.close} tintColor={'white'} height={25} width={28} />
                    </Pressable>
                  </Box>
                )
              }

            </Box>
            <Box
              width={'100%'}
              position={'absolute'}
              bottom={-5}
            >
              <SvgIcon name={'zigzagCurve'} width={'100%'} />
            </Box>
          </Box>
        </ScrollView>
        <ResignBottomSheet
          isVisible={isVisibleNote}
          onClose={()=>{
            setIsVisibleNote(false)
            setValue(RejectNotesIDs.notes, '')
          }}
          fieldArray={form}
          control={control}
          errors={errors}
          onSavePress={() =>{
            status.current = 'reject'
            handleOnPressNote()
          }}
        />
    </Screen>
  )
}
