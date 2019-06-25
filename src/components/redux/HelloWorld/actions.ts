export enum ActionTypes {
  CHANGE_TEXT = "CHANGE_TEXT",
  CHANGE_TEXT_ASYNC = "CHANGE_TEXT_ASYNC",
}

export const changeText = (text: string) => (
    {
        payload: {
            text,
        },
        type: ActionTypes.CHANGE_TEXT,
    }
);

export const changeTextAsync = (text: string) => (
    {
        payload: new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!text) {
                    reject({ error: new Error("No string provided!!") });
                } else {
                    resolve({ text });
                }
            }, 5000);
        }),
        type: ActionTypes.CHANGE_TEXT_ASYNC,
    }
);
