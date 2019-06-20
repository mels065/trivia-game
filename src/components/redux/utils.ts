// For generating action types for thunks

export const createActionNext = (action: string) => `${action}_NEXT`;
export const createActionComplete = (action: string) => `${action}_COMPLETE`;
export const createActionError = (action: string) => `${action}_ERROR`;
export const createActionCancel = (action: string) => `${action}_CANCEL`;
