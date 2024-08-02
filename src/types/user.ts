export type UserInfo = {
  name: string;
  image: string;
  id: string;
};

export type UserParams = {
  uid: string | string[] | undefined;
  close?: () => void;
};
