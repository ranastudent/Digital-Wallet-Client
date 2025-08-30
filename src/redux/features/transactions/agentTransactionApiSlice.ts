// src/redux/features/transactions/agentTransactionApiSlice.tsx
import { apiSlice } from "../api/apiSlice";

// Define types for the API request and response
interface CashInRequest {
  recipientPhone: string;
  amount: number;
}

interface CashInResponse {
  success: boolean;
  message: string;
  data: {
    from: string | null;
    to: string;
    amount: number;
    type: string;
    status: string;
    agent: string;
    commission: number;
    _id: string;
    createdAt: string;
    updatedAt: string;
    currentBalance: number;
  };
}

// Inject endpoints into the existing apiSlice
export const agentTransactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    cashInByAgent: builder.mutation<CashInResponse, CashInRequest>({
      query: (body) => ({
        url: "/transactions/agent/cash-in",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCashInByAgentMutation } = agentTransactionApi;
