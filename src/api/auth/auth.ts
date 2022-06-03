import { api } from '../api';
import { SignInDto, SignInResponseDto, SignUpDto } from '../../common/dto';

const extendedAuthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<boolean, SignUpDto>({
      query: (dto) => ({
        url: 'auth/signUp',
        body: dto,
        method: 'POST',
      }),
    }),
    signIn: builder.mutation<SignInResponseDto, SignInDto>({
      query: (dto) => ({
        url: 'auth/signIn',
        body: dto,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSignInMutation, useSignUpMutation } = extendedAuthApi;
