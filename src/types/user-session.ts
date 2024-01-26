export interface IUserSession {
  id: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profilePicture?: string;
  token: string;
}