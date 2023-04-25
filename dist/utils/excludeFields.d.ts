export declare function excludeField<Field, Key extends keyof Field>(field: Field, keys: Key[]): Omit<Field, Key>;
