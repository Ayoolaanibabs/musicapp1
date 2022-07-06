import { ReactNode } from 'react';

interface IUser {
  id: string;
  name: string;
  imageUrl: ReactNode | string | null;
}

export interface IUserType {
  user: IUser,
}
