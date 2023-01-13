/* const http2 = require('node:http2'); */
import http2 from 'node:http2';

export const OK_CODE_STATUS = http2.constants.HTTP_STATUS_OK;
export const CREATED_CODE = http2.constants.HTTP_STATUS_CREATED;

export const BAD_REQUEST_ERR_CODE = http2.constants.HTTP_STATUS_BAD_REQUEST;
export const UNAUTHORIZED_ERR_CODE = http2.constants.HTTP_STATUS_UNAUTHORIZED;
export const FORBIDDEN_ERROR = http2.constants.HTTP_STATUS_FORBIDDEN;
export const NOT_FOUND_ERR_CODE = http2.constants.HTTP_STATUS_NOT_FOUND;
export const CONFLICT_ERROR = http2.constants.HTTP_STATUS_CONFLICT;
export const INTERNAL_SERVER_ERR_CODE = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
