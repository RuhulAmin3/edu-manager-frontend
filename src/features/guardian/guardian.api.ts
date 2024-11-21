import { rootApi } from "../../redux/api";

const guardianApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all guardians
    getAllGuardians: builder.query({
      query: (data) => ({
        url: "/guardian",
        params: data,
      }),
      providesTags: ["guardian"],
    }),

    // Get a single guardian
    getGuardian: builder.query({
      query: (id) => ({
        url: `/guardian/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "guardian", id }],
    }),

    // Add a guardian
    addGuardian: builder.mutation({
      query: (data) => ({
        url: "/user/guardian",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["guardian"], // Pessimistic update
    }),

    // Update a guardian
    updateGuardian: builder.mutation({
      query: ({ id, data }) => ({
        url: `/guardian/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "guardian", id }], // Pessimistic update
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        // Optimistic Update
        const patchResult = dispatch(
          guardianApi.util.updateQueryData("getAllGuardians", undefined, (draft) => {
            const guardian = draft?.find((item:Record<string, unknown>) => item.id === id);
            if (guardian) {
              Object.assign(guardian, data);
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

    // Delete a guardian
    deleteGuardian: builder.mutation({
      query: (id) => ({
        url: `/guardian/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["guardian"], // Pessimistic update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistic Update
        const patchResult = dispatch(
          guardianApi.util.updateQueryData("getAllGuardians", undefined, (draft) => {
            return draft?.filter((guardian:Record<string, unknown>) => guardian.id !== id);
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
  useGetAllGuardiansQuery,
  useGetGuardianQuery,
  useAddGuardianMutation,
  useUpdateGuardianMutation,
  useDeleteGuardianMutation,
} = guardianApi;
