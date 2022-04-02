export declare function throttle(callback: Function, millis: number): (...args: any[]) => void;
export declare function debounce(callback: Function, millis: number): {
    (...args: any[]): void;
    cancel(): void;
};
export declare function chain(...callbacks: Function[]): (...args: any[]) => Promise<any>;
