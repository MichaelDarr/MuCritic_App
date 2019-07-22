export interface VuexError {
    location: string;
    error: string;
}

export interface RootState {
    errors: VuexError[];
}
