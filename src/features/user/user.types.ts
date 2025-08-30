export interface IUser {
  _id: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string; // <-- add this
  role?: 'user' | 'admin' | 'agent';
  isBlocked?: boolean;
  isAgentApproved?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
