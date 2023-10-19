import type { WalletSelector } from '@near-wallet-selector/core';

export interface WalletStoreInterface {
  toggleModal: () => void;
  accountId: string | null;
  showWalletModal: boolean;
  signOut: () => Promise<void>;
  selector: WalletSelector | null;
  initWallet: () => Promise<string>;
}
