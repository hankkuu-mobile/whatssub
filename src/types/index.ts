import { DefaultTheme } from 'styled-components';
/**
 * Fix error typing in `split` method in `apollo-link`
 * Related issue https://github.com/apollographql/apollo-client/issues/3090
 */
export interface Definition {
  kind: string;
  operation?: string;
};

export enum Gender { MALE, FEMALE };

export interface SocialInput {
  social: string;
  photo?: string;
  email?: string;
  password?: string;
  name?: string;
  nickname?: string;
  birthday?: Date;
  gender?: Gender;
  phone?: string;
}

export interface User {
  id: string;
  email: string;
  name: String;
  nickname: String;
  photo: String;
  birthday: Date;
  gender: Gender;
  social: String;
  verified: Boolean;
  notifications: [Notification]
  // customServices: [CustomService]
  // userProducts: [UserProduct]
  // reviews: [Review]
  created: Date
  updated: Date
  deleted: Date
}

export interface AuthPayload {
  token: string
  user: User
}

export enum ThemeType {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
};

export interface ScreenProps {
  theme: DefaultTheme;
  changeTheme: () => void;
}
