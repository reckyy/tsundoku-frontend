export type UserInfo = {
  handleName: string;
  image: string;
  id: string;
};

export type UserParams = {
  id?: string;
  handleName?: string | string[] | undefined;
  close?: () => void;
};
