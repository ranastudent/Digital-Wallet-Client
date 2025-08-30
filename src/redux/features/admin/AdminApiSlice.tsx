import { apiSlice } from "../api/apiSlice";

// --------------------- Types ---------------------

// Transaction type
export interface Transaction {
  _id: string;
  from: { _id: string; user: string } | null;
  to: { _id: string; user: string } | null;
  amount: number;
  type: string;
  status: string;
  agent: { _id: string; name: string; phoneNumber: string } | null;
  commission: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// User / Agent type
export interface UserOrAgent {
  _id: string;
  name: string;
  phoneNumber: string;
  role: "user" | "agent" | "admin";
  isAgentApproved?: boolean;
  __v: number;
}

// System Setting type
export interface SystemSetting {
  key: string;
  value: number;
}

// Generic API response
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// --------------------- RTK Query ---------------------

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --------------------- Queries ---------------------
    getAdminUsers: builder.query<ApiResponse<UserOrAgent[]>, void>({
      query: () => "/admin/users",
      providesTags: ["AdminUsers"],
    }),
    getAdminAgents: builder.query<ApiResponse<UserOrAgent[]>, void>({
      query: () => "/admin/agents",
      providesTags: ["AdminAgents"],
    }),
    getAdminTransactions: builder.query<ApiResponse<Transaction[]>, void>({
      query: () => "/admin/transactions",
      providesTags: ["AdminTransactions"],
    }),
    getSystemSetting: builder.query<ApiResponse<SystemSetting>, string>({
      query: (key: string) => `/settings/${key}`,
      providesTags: (_result, _error, key) => [{ type: "Settings", id: key }],
    }),

    // --------------------- Mutations ---------------------
    approveAgent: builder.mutation<ApiResponse<UserOrAgent>, string>({
      query: (id: string) => ({
        url: `/admin/agents/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["AdminAgents"],
    }),
    suspendAgent: builder.mutation<ApiResponse<UserOrAgent>, string>({
      query: (id: string) => ({
        url: `/admin/agents/${id}/suspend`,
        method: "PATCH",
      }),
      invalidatesTags: ["AdminAgents"],
    }),
    blockUser: builder.mutation<ApiResponse<UserOrAgent>, string>({
      query: (id: string) => ({
        url: `/admin/users/${id}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["AdminUsers"],
    }),
    unblockUser: builder.mutation<ApiResponse<UserOrAgent>, string>({
      query: (id: string) => ({
        url: `/admin/users/${id}/unblock`,
        method: "PATCH",
      }),
      invalidatesTags: ["AdminUsers"],
    }),
    updateSystemSetting: builder.mutation<
      ApiResponse<SystemSetting>,
      { key: string; value: number }
    >({
      query: ({ key, value }) => ({
        url: "/settings",
        method: "PATCH",
        body: { key, value },
      }),
      invalidatesTags: (_result, _error, { key }) => [{ type: "Settings", id: key }],
    }),
  }),
  overrideExisting: false,
});

// --------------------- Export Hooks ---------------------

export const {
  useGetAdminUsersQuery,
  useGetAdminAgentsQuery,
  useGetAdminTransactionsQuery,
  useApproveAgentMutation,
  useSuspendAgentMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useGetSystemSettingQuery,
  useUpdateSystemSettingMutation,
} = adminApi;
