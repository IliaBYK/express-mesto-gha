import HttpError from './HttpError.js';
import { BAD_REQUEST_ERR_CODE } from '../utils/errorsCodes.js';

export default class BadRequestError extends HttpError {
  constructor(message) {
    super(BAD_REQUEST_ERR_CODE, message);
    this.name = 'BadRequestError';
  }
}
