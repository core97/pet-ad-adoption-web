export type AsyncStatus = 'idle' | 'loading' | 'error' | 'success';

export interface NextAsyncAction {
  action?: () => void;
  redirect?: string;
  toast?: {
    title: string;
  };
}
