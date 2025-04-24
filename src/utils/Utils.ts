import {I18nManager, Linking, Platform} from 'react-native';
import moment from 'moment';
import {DeviceHelper} from '@/helper/DeviceHelper';
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';
import {logger} from '@/logger/Logger';
import {showErrorMessage} from '@/core';

class Utils {
  get language(): string {
    return I18nManager.isRTL ? 'english' : 'arabic';
  }

  get device(): string {
    return DeviceHelper.ios() ? '2' : '1';
  }

  convertMinsToTime(mins: number): string {
    const hours = Math.floor(mins / 60);
    let minutes: number = mins % 60;
    // @ts-ignore
    minutes = minutes < 10 ? '0' + minutes : minutes;
    if (hours > 0) {
      return `${hours} hrs:${minutes} mins`;
    } else {
      return `${minutes} mins`;
    }
  }

  redirectToGoogleMap(branch_lat_long: string, address: string) {
    if (branch_lat_long) {
      const latLongArray = branch_lat_long.split(',');
      const lat = latLongArray[0];
      const lng = latLongArray[1];
      const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
      });
      const latLng = `${lat},${lng}`;
      const label = address;
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      });
      if (url) {
        Linking.openURL(url);
      }
    }
  }

  redirectToGoogleMapUsingLink(url: string) {
    if (url) {
      Linking.openURL(url);
    }
  }

  branchImageHeight() {
    return DeviceHelper.calculateHeightRatio(
      (DeviceHelper.width() * 147) / 277,
    );
  }

  utcToLocal(
    date: string,
    dateFormat: string = 'YYYY-MM-DD HH:mm:ss',
    requiredDateFormat: string = 'DD MMM, YYYY hh:mm a',
  ): string {
    const dateUtc = moment.utc(date).format(dateFormat);
    const stillUtc = moment.utc(dateUtc).toDate();
    return stillUtc.toString();
    // return moment(stillUtc).local().format(requiredDateFormat);
  }

  GSTRegex(): RegExp {
    return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  }

  bytesToMB(bytes: number): number {
    return bytes / (1024 * 1024);
  }

  handleEnabledPressed = async () => {
    if (Platform.OS === 'android') {
      try {
        const enableResult = await promptForEnableLocationIfNeeded();
        logger.info('enableResult', enableResult);
        return true;
        // The user has accepted to enable the location services
        // data can be :
        //  - "already-enabled" if the location services has been already enabled
        //  - "enabled" if user has clicked on OK button in the popup
      } catch (error: unknown) {
        if (error instanceof Error) {
          // console.error(error.message);
          showErrorMessage('Location Compulsory');
          return false;
          // The user has not accepted to enable the location services or something went wrong during the process
          // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
          // codes :
          //  - ERR00 : The user has clicked on Cancel button in the popup
          //  - ERR01 : If the Settings change are unavailable
          //  - ERR02 : If the popup has failed to open
          //  - ERR03 : Internal error
        }
      }
    }
  };
}

export const utils = new Utils();
