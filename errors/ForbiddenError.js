import HttpError from './HttpError.js';
import { FORBIDDEN_ERROR } from '../utils/errorsCodes.js';

export default class ForbiddenError extends HttpError {
  constructor(message) {
    super(FORBIDDEN_ERROR, message);
    this.name = 'ForbiddenError';
  }
}
