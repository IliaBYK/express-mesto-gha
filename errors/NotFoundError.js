import HttpError from './HttpError.js';
import { NOT_FOUND_ERR_CODE } from '../utils/errorsCodes.js';

export default class NotFoundError extends HttpError {
  constructor(message) {
    super(NOT_FOUND_ERR_CODE, message);
    this.name = 'NotFoundError';
  }
}
