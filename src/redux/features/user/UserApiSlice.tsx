/* eslint-disable @typescript-eslint/no-explicit-any */
// redux/features/user/UserApiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IUser } from '@/features/user/user.types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://digital-wallet-api-2.onrender.com/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getSingleUser: builder.query<{ success: boolean; data: IUser }, string>({
      query: (id) => `/user/${id}`,
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<{ success: boolean; message: string; data: IUser }, { id: string; userData: Partial<IUser> }>({
      query: ({ id, userData }) => ({
        url: `/user/${id}`,
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetSingleUserQuery, useUpdateUserMutation } = userApi;
