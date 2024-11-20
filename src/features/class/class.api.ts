import { rootApi } from "~/redux/api";

const classApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClass: builder.query({
      query: (data) => ({
        url: "/class",
        params: data,
      }),
      providesTags: ["class"],
    }),

    getClass: builder.query({
      query: (id) => ({
        url: `/class/${id}`,
      }),
      providesTags: ["class"],
    }),

    addClass: builder.mutation({
      query: (data) => ({
        url: "/class",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["class"],
    }),

    deleteClass: builder.mutation({
      query: (id) => ({
        url: `/class/${id}`,
        method: "DELETE",
      }),
      
      invalidatesTags: ["class"], // Pessimistic Update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistic Update
        const patchResult = dispatch(
          classApi.util.updateQueryData("getAllClass", undefined, (draft) => {
            return draft.filter((classItem:Record<string, unknown>) => classItem.id !== id);
          })
        );

        try {
          await queryFulfilled; // Wait for API response
        } catch {
          patchResult.undo(); // Rollback if API call fails
        }
      },
    }),

    EditClass: builder.mutation({
      query: ({ id, data }) => ({
        url: `/class/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["class"], // Pessimistic Update
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        // Optimistic Update
        const patchResult = dispatch(
          classApi.util.updateQueryData("getAllClass", undefined, (draft) => {
            const classItem = draft.find((item:Record<string, unknown>) => item.id === id);
            if (classItem) {
              Object.assign(classItem, data);
            }
          })
        );

        try {
          await queryFulfilled; // Wait for API response
        } catch {
          patchResult.undo(); // Rollback if API call fails
        }
      },
    }),
  }),
});

export const {
  useGetAllClassQuery,
  useGetClassQuery,
  useEditClassMutation,
  useDeleteClassMutation,
  useAddClassMutation,
} = classApi;
