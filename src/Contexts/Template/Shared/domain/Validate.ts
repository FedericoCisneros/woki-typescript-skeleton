import { Nullable } from './Nullable';

export class Validate {
    /**
     * @returns true if value is not null or undefined
     */
    static undefined(data: any): boolean {
        return data !== undefined && data !== null;
    }

    static resolveNullable(obj: Nullable<any>, error: Error) {
        if (!obj) {
            throw error;
        }
        return obj!;
    }
}
