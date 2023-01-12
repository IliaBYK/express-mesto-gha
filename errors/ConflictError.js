import { CONFLICT_ERROR } from '../utils/errorsCodes.js';
import HttpError from './HttpError.js';

export default class ConflictError extends HttpError {
  constructor(message) {
    super(CONFLICT_ERROR, message);
    this.name = 'LogedError';
  }
}
