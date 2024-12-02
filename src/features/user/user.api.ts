import { rootApi } from "~/redux/api";

const userApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (data) => ({
        url: "/user/student",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["student"],
    }),

    createTeacher: builder.mutation({
      query: (data) => ({
        url: "/user/teacher",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["teacher"],
    }),

    createGuardian: builder.mutation({
      query: (data) => ({
        url: "/user/guardian",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["guardian"],
    }),

    uploadFile: builder.mutation({
      query: (data) => ({
        url: "/user/file-upload",
        body: data,
        method: "POST",
      }),
    }),

    removeFile: builder.mutation({
      query: (publicId) => ({
        url: `/user/file-remove/${publicId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useCreateGuardianMutation,
  useCreateTeacherMutation,
  useRemoveFileMutation,
  useUploadFileMutation,
} = userApi;
