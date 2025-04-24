import React, {useMemo, useRef, useState} from 'react';
import {
  ResignBottomSheet,
  Screen,
  ScreenHeader,
  StatusBarType,
} from '@/component';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/style';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList} from '@/navigation/AppNavigation';
import {ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import {customFormGenerator, RejectNotesIDs} from '@/customFormGenerator';

export const RequestDetailScreen: React.FC = () => {
  const routes = useRoute<RouteProp<StackParamList, 'RequestDetailScreen'>>();
  const data = routes.params?.data;
  const {colors} = useTheme<Theme>();
  const [isVisibleNote, setIsVisibleNote] = useState(false);
  const status = useRef('');
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {errors},
  } = useForm();
  const form = useMemo(() => customFormGenerator.generateRejectNotesForm(), []);



  return (
    <Screen
      backgroundColor={'antiFlashWhite2'}
      statusBarColor={colors.primary}
      statusBarType={StatusBarType.Dark}>
      <ScreenHeader title={'Request Detail'} />
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
      <ResignBottomSheet
        isVisible={isVisibleNote}
        onClose={() => {
          setIsVisibleNote(false);
          setValue(RejectNotesIDs.notes, '');
        }}
        fieldArray={form}
        control={control}
        errors={errors}
        onSavePress={() => {
          status.current = 'reject';
        }}
      />
    </Screen>
  );
};
