import { rootApi } from "../../redux/api";
import type {
  TeacherListApiResponse,
  TeacherApiResponse,
  TeacherQueryParams,
  UpdateTeacherData
} from "./teacher.types";

const teacherApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all teachers
    getAllTeachers: builder.query<TeacherListApiResponse, TeacherQueryParams>({
      query: (params) => ({
        url: "/teacher",
        params,
      }),
      providesTags: ["teacher"],
    }),

    // Get a single teacher
    getTeacher: builder.query<TeacherApiResponse, string>({
      query: (id) => ({
        url: `/teacher/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "teacher", id }],
    }),

    // Add a teacher
    addTeacher: builder.mutation({
      query: (data) => ({
        url: "/user/teacher",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["teacher"], // Pessimistic update
    }),

    // Update a teacher
    updateTeacher: builder.mutation<TeacherApiResponse, { id: string; data: UpdateTeacherData }>({
      query: ({ id, data }) => ({
        url: `/teacher/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "teacher", id }], // Pessimistic update
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        // Optimistic Update
        const patchResult = dispatch(
          teacherApi.util.updateQueryData("getAllTeachers", {}, (draft) => {
            const teacher = draft?.find((item:Record<string, unknown>) => item.id === id);
            if (teacher) {
              Object.assign(teacher, data);
            }
          })
        );

        try {
          await queryFulfilled; // Wait for API response
        } catch {
          patchResult.undo(); // Rollback on failure
        }
      },
    }),

    // Delete a teacher
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/teacher/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["teacher"], // Pessimistic update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistic Update
        const patchResult = dispatch(
          teacherApi.util.updateQueryData("getAllTeachers", {}, (draft) => {
            return draft?.filter((teacher:Record<string, unknown>) => teacher.id !== id);
          })
        );

        try {
          await queryFulfilled; // Wait for API response
        } catch {
          patchResult.undo(); // Rollback on failure
        }
      },
    }),
  }),
});

export const {
  useGetAllTeachersQuery,
  useGetTeacherQuery,
  useAddTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teacherApi;
