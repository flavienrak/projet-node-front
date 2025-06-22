import { FileInterface } from './file.interface';

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  acceptConditions: boolean;
  role: 'user' | 'recruiter' | 'admin';
  qualiCarriere: string;

  files: FileInterface[];

  createdAt: Date;
  updatedAt: Date;
}
