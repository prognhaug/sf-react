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
  connections?: string[];
  solutionID: string | Solution;
  config?: string | Record<string, unknown>;
  history?: string | Event[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface InstanceExpanded extends Omit<Instance, "connections"> {
  connections: Connection[];
}

interface Connection {
  _id: string;
  name: string;
  clientID: string;
  clientSecret: string;
  subscriptionKey: string;
  tenantID: string;
  systemID: string | System;
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

interface DataType {
  instanceID: string; // Assuming instanceID is a string representation of ObjectId
  companyID: number;
  debugMode: boolean;
}
interface Task {
  _id: string;
  name: string;
  data: DataType; // Assuming DataType is defined elsewhere according to dataSchema
  active: boolean;
  lastRunDate?: string | null;
  nextRunDate: string;
  lastRunSuccess?: boolean | null;
  interval: number;
  createdAt?: string; // Automatically added by mongoose timestamps
  updatedAt?: string; // Automatically added by mongoose timestamps
}

interface ExtendedTask extends Task {
  companyInfo: Company | undefined;
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

interface FieldConfig {
  label: string;
  type: string;
  name: string;
}

interface FormFieldsConnection {
  [key: string]: FieldConfig[]; // This says every string key maps to an array of FieldConfig
}

interface FormFieldsInstanceSolution {
  [key: string]: FieldConfig[];
}

interface FormFieldsInstanceSettleMatch {
  [key: string]: FieldConfig[];
}

interface FormFieldsInstanceCostOfGoods {
  [key: string]: FieldConfig[];
}

interface FormFieldsInstance {
  [key: string]: {
    [key: string]:
      | {
          [key: string]: FieldConfig[];
        }
      | FieldConfig[];
  };
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
  InstanceExpanded,
  FieldConfig,
  FormFieldsConnection,
  FormFieldsInstanceSolution,
  FormFieldsInstanceSettleMatch,
  FormFieldsInstanceCostOfGoods,
  FormFieldsInstance,
  Task,
  ExtendedTask,
};
