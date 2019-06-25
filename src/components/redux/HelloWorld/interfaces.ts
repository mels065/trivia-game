export interface IHelloWorldStateShape {
    error: Error | null;
    isLoading: boolean;
    text: string;
}

export interface IHelloWorldAction {
    error?: Error | null;
    text?: string;
}
