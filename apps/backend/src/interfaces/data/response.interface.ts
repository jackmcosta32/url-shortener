import { RESPONSE_STATUS } from '@/constants/response-status.constant';

export interface IHttpResponse<TData = unknown> {
  data?: TData;
  errors?: unknown;
  message?: string;
  status?: (typeof RESPONSE_STATUS)[keyof typeof RESPONSE_STATUS];
}
