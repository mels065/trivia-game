// For generating action types for thunks

export const createActionPending = (action: string) => `${action}_PENDING`;
export const createActionFulfilled = (action: string) => `${action}_FULFILLED`;
export const createActionRejected = (action: string) => `${action}_REJECTED`;
