import { apiSlice } from "../api/apiSlice";

export interface IDepositRequest {
  _id: string;
  user: string;
  phoneNumber: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  processedBy?: string;
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export const depositApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDepositRequest: builder.mutation<IDepositRequest, { phoneNumber: string; amount: number }>({
      query: (body) => ({
        url: "/deposite-request",
/*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Endpoints for user and agent to manage deposit requests
   *
   * - `createDepositRequest`: User creates a deposit request
   * - `getPendingDepositRequests`: Agent gets all pending requests
   * - `approveDepositRequest`: Agent approves a request
   * - `rejectDepositRequest`: Agent rejects a request
   */
/*******  b62af45a-5b6e-463d-9a4f-26b320c5b07e  *******/        method: "POST",
        body,
      }),
      invalidatesTags: ["DepositRequest"],
    }),

    getPendingDepositRequests: builder.query<IDepositRequest[], void>({
      query: () => "/deposite-request/pending",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "DepositRequest" as const, id: _id })),
              { type: "DepositRequest", id: "LIST" },
            ]
          : [{ type: "DepositRequest", id: "LIST" }],
    }),

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    approveDepositRequest: builder.mutation<{ request: IDepositRequest; cashInResult: any }, string>({
      query: (requestId) => ({
        url: `/deposite-request/approve/${requestId}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "DepositRequest", id: "LIST" }],
    }),

    rejectDepositRequest: builder.mutation<IDepositRequest, string>({
      query: (requestId) => ({
        url: `/deposite-request/reject/${requestId}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "DepositRequest", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateDepositRequestMutation,
  useGetPendingDepositRequestsQuery,
  useApproveDepositRequestMutation,
  useRejectDepositRequestMutation,
} = depositApi;
