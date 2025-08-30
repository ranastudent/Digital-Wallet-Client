/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/feature/transaction/TransactionApiSlice.tsx
import { apiSlice } from "../api/apiSlice";

export const transactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Send Money
    sendMoney: builder.mutation<
      { success: boolean; message: string; data: any },
      { recipientPhone: string; amount: number }
    >({
      query: (body) => ({
        url: "/transactions/send-money",
        method: "POST",
        body,
      }),
    }),

    // Add Money
    addMoney: builder.mutation<
      { success: boolean; message: string; data: any },
      { amount: number }
    >({
      query: (body) => ({
        url: "/transactions/add-money",
        method: "POST",
        body,
      }),
    }),

    // Withdraw Money
    withdrawMoney: builder.mutation<
      { success: boolean; message: string; data: any },
      { amount: number }
    >({
      query: (body) => ({
        url: "/transactions/withdraw",
        method: "POST",
        body,
      }),
    }),

    // Cash-In by Agent
    cashInByAgent: builder.mutation<
      { success: boolean; message: string; data: any },
      { recipientPhone: string; amount: number }
    >({
      query: (body) => ({
        url: "/transactions/agent/cash-in",
        method: "POST",
        body,
      }),
    }),

    // Cash-Out by Agent
    cashOutByAgent: builder.mutation<
      { success: boolean; message: string; data: any },
      { recipientPhone: string; amount: number }
    >({
      query: (body) => ({
        url: "/transactions/agent/cash-out",
        method: "POST",
        body,
      }),
    }),

    // Latest Transaction
    latestTransaction: builder.query<
      { success: boolean; message: string; data: any },
      void
    >({
      query: () => "/transactions/my-latest-transaction",
    }),

    // Get All My Transactions
    getMyTransactions: builder.query<
      { success: boolean; message: string; data: any[] },
      void
    >({
      query: () => "/transactions/my-transaction",
    }),

    // ✅ Agent Cash-In Summary
    getAgentCashInSummary: builder.query<
      { success: boolean; message: string; data: any[] },
      void
    >({
      query: () => "/transactions/agent/cash-in-summary",
    }),

    // ✅ Agent Cash-Out Summary
    getAgentCashOutSummary: builder.query<
      { success: boolean; message: string; data: any[] },
      void
    >({
      query: () => "/transactions/agent/cash-out-summary",
    }),
  }),
});

export const {
  useSendMoneyMutation,
  useAddMoneyMutation,
  useWithdrawMoneyMutation,
  useCashInByAgentMutation,
  useCashOutByAgentMutation,
  useLatestTransactionQuery,
  useGetMyTransactionsQuery,
  useGetAgentCashInSummaryQuery,  // ✅ new
  useGetAgentCashOutSummaryQuery, // ✅ new
} = transactionApi;
