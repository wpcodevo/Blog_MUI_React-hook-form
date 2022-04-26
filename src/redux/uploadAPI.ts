import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const uploadAPI = createApi({
  reducerPath: 'uploadAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation<{}, FormData>({
      query(data) {
        return {
          url: 'upload',
          method: 'POST',
          credentials: 'include',
          body: data,
        };
      },
    }),
    uploadSingleImage: builder.mutation<{}, FormData>({
      query(data) {
        return {
          url: 'upload/single',
          method: 'POST',
          credentials: 'include',
          body: data,
        };
      },
    }),
    uploadMultipleImage: builder.mutation<{}, FormData>({
      query(data) {
        return {
          url: 'upload/multiple',
          method: 'POST',
          credentials: 'include',
          body: data,
        };
      },
    }),
  }),
});

export const { useUploadImageMutation } = uploadAPI;
