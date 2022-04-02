export declare const WEEK_DAYS: string[];
export declare const MONTHS: string[];
export declare const MILLIS_BEFORE_1970 = 62125920000000;
interface Dictionary {
    [index: string]: any;
}
export declare function destructDate(date?: Date, addMonth?: boolean): Dictionary;
export declare function createTimeFormat(format: string, prefix?: string, addMonth?: boolean): (date?: Date, utc?: boolean, names?: boolean) => string;
export {};
