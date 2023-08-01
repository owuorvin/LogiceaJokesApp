import { ErrorType } from './types';

export const apiStatus = {
  initial: 'INITIAL',
  fetching: 'FETCHING',
  error: 'ERROR',
  ok: 200,
};

/**
 * @description Check whether error is a not found error
 * @param {ErrorType} error
 * @return {boolean}
 */
export const is404Error = (error: false | ErrorType) =>
  error && error.statusCode === 404;

/**
 * @description Extract useful entities from a delivery point address
 * @param {string} address
 * @return {string[]}
 */
export const parseDeliveryAddressHelper = (address: string) =>
  address?.split(',');

/**
 * @description Extract latest image link
 * @param {any[]}
 * @return {string}
 */
