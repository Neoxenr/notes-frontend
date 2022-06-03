export type SignUpDto = {
  email: string;
  password: string;
};

export type SignInDto = {
  email: string;
  password: string;
};

export type SignInResponseDto = {
  token: string;
};
