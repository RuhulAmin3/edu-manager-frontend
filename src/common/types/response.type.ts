export type ResponseErrorType = {
  statusCode: number;
  message: string | string[];
  timestamp: string;
  path: string;
};

export type ModifiedErrorType = {
  status: number;
  data: string | string[];
};
