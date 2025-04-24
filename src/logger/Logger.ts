import { logger as RNLogger, consoleTransport } from 'react-native-logs';

class Logger {
	/**
   * Default configuration
   * for logger
   */
	defaultConfig = {
		levels: {
			debug: 0,
			info: 1,
			warn: 2,
			error: 3,
		},
		severity: 'debug',
		transport: consoleTransport,
		transportOptions: {
			colors: {
				info: 'blueBright',
				warn: 'yellowBright',
				error: 'redBright',
			},
		},
		async: true,
		dateFormat: 'time',
		printLevel: true,
		printDate: true,
		enabled: __DEV__,
	};

	/**
   * Created instance of logger
   */
	log = RNLogger.createLogger(this.defaultConfig);

	/**
   * Log the value as debug
   * @param key - Label of the message
   * @param message - message which you want to log
   */
	debug(key: string, message: any) {
		this.log.debug(key, message);
	}

	/**
   * Will do an informative log
   * @param key - Label of the message
   * @param message - message which you want to log
   */
	info(key: string, message: any) {
		this.log.info(key, message);
	}

	/**
   * Will do an warning log
   * @param key - Label of the message
   * @param message - message which you want to log
   */
	warn(key: string, message: any) {
		this.log.warn(key, message);
	}

	/**
   * Will do an error log
   * @param key - Label of the message
   * @param message - message which you want to log
   */
  error(key: string, message: any) {
    this.log.error(key, message);
  }
}

export const logger = new Logger();
