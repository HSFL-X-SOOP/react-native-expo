import {useCallback, useState} from "react";
import {useToast} from "@/components/useToast";

export type State<R> = {
    loading: boolean;
    error: Error | null;
    data: R | null;
};

export interface AsyncOptions {
    showErrorToast?: boolean;
    errorTitle?: string;
}

export function useAsync<P extends any[], R>(
    fn: (...args: P) => Promise<R>,
    options?: AsyncOptions
): readonly [
    (...args: P) => Promise<R | undefined>,
    State<R>,
] {
    const [state, setState] = useState<State<R>>({
        loading: false,
        error: null,
        data: null,
    });
    const toast = useToast();

    const execute = useCallback(
        async (...args: P) => {
            setState({loading: true, error: null, data: null});
            try {
                const data = await fn(...args);
                setState({loading: false, error: null, data});
                return data;
            } catch (error) {
                const errorObj = error as Error;
                setState({loading: false, error: errorObj, data: null});

                if (options?.showErrorToast) {
                    toast.error(
                        options.errorTitle || 'Error',
                        {
                            message: errorObj.message || 'An unexpected error occurred',
                            duration: 5000
                        }
                    );
                }

                return undefined;
            }
        },
        [fn, toast, options],
    );

    return [execute, state] as const;
}