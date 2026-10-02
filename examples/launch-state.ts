// Public-safe example. This is not production Baggy source code.
export type LaunchPhase =
  | "draft"
  | "uploading"
  | "signing"
  | "confirming"
  | "success"
  | "error";

export type LaunchState = {
  phase: LaunchPhase;
  transactionHash?: `0x${string}`;
  tokenAddress?: `0x${string}`;
  message?: string;
};

export type LaunchEvent =
  | { type: "UPLOAD_STARTED" }
  | { type: "UPLOAD_FINISHED" }
  | { type: "SIGNATURE_REQUESTED" }
  | { type: "TRANSACTION_SUBMITTED"; hash: `0x${string}` }
  | { type: "LAUNCH_CONFIRMED"; tokenAddress: `0x${string}` }
  | { type: "WALLET_REJECTED" }
  | { type: "FAILED"; message: string }
  | { type: "RETRY" };

export function reduceLaunch(state: LaunchState, event: LaunchEvent): LaunchState {
  switch (event.type) {
    case "UPLOAD_STARTED":
      return { phase: "uploading" };
    case "UPLOAD_FINISHED":
    case "SIGNATURE_REQUESTED":
      return { phase: "signing" };
    case "TRANSACTION_SUBMITTED":
      return { phase: "confirming", transactionHash: event.hash };
    case "LAUNCH_CONFIRMED":
      return {
        ...state,
        phase: "success",
        tokenAddress: event.tokenAddress,
      };
    case "WALLET_REJECTED":
    case "RETRY":
      return { phase: "draft" };
    case "FAILED":
      return {
        ...state,
        phase: "error",
        message: event.message,
      };
  }
}
