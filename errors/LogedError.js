import { LOGGED_ERROR } from '../utils/errorsCodes.js';
import HttpError from './HttpError.js';

export default class LogedError extends HttpError {
  constructor(message) {
    super(LOGGED_ERROR, message);
    this.name = 'LogedError';
  }
}
