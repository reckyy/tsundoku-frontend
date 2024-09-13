export type UserInfo = {
  name: string;
  id: string;
  image: string;
};

export type UserParams = {
  id?: string | string[];
  close?: () => void;
};
