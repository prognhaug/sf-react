interface Company {
  _id: string;
  name: string;
  instances: string[] | Instance[];
  users: string[] | User[];
  connections: string[] | Connection[];
  active: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  companyID: number;
  __v: number;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Instance {
  _id: string;
  name: string;
  connections: string[] | Connection[];
  solutionID: string;
  config: string;
  history: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Connection {
  _id: string;
  name: string;
  clientID: string;
  clientSecret: string;
  subscriptionKey: string;
  tenantID: string;
  systemID: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Solution {
  _id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface System {
  _id: string;
  name: string;
  type: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Event {
  _id: string;
  timestamp: string;
  level: string;
  message: string;
  meta: {
    method: string;
    url: string;
    params: Record<string, unknown>;
    query: Record<string, unknown>;
    body: Record<string, unknown>;
    ip: string;
    headers: Record<string, string>;
    path: string;
    status: number;
    responseTime: string;
    genericPath: string;
    timestamp: string;
  };
}

// Base response interface
interface BaseResponse {
  status: string;
  statusCode: number;
}

// Success response interface
interface SuccessApiResponse<T> extends BaseResponse {
  result: {
    pageSize: number;
    items: number;
    data: T;
    cursor?: string;
  };
}

// Fail response interface
interface FailApiResponse extends BaseResponse {
  data: string;
}

// Error response interface
interface ErrorApiResponse extends BaseResponse {
  data: string;
}

// Union type for API responses
type ApiResponse =
  | SuccessApiResponse<unknown>
  | FailApiResponse
  | ErrorApiResponse;

// Authentication interface
interface Auth {
  isLoggedIn: boolean;
  user?: User;
}

export type {
  Company,
  ApiResponse,
  SuccessApiResponse,
  FailApiResponse,
  ErrorApiResponse,
  User,
  Instance,
  Connection,
  Solution,
  System,
  Event,
  Auth,
};
