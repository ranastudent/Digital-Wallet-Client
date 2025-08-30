// src/redux/feature/wallet/WalletApiSlice.tsx
import { apiSlice } from "../api/apiSlice";

export const walletApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    myWallet: builder.query<
      { success: boolean; message: string; data: { balance: number; isBlocked: boolean } },
      void
    >({
      query: () => "/wallets/my-wallet",
    }),
  }),
});

export const { useMyWalletQuery } = walletApi;
