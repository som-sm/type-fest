import {expectNotAssignable, expectType} from 'tsd';
import type {SetOptional} from '../index';

// Update one required and one optional to optional.
declare const variation1: SetOptional<{a: number; b?: string; c: boolean}, 'b' | 'c'>;
expectType<{a: number; b?: string; c?: boolean}>(variation1);

// Update two required to optional.
declare const variation2: SetOptional<{a: number; b: string; c: boolean}, 'a' | 'b'>;
expectType<{a?: number; b?: string; c: boolean}>(variation2);

// Three optional remain optional.
declare const variation3: SetOptional<{a?: number; b?: string; c?: boolean}, 'a' | 'b' | 'c'>;
expectType<{a?: number; b?: string; c?: boolean}>(variation3);

// Fail if type changes even if optional is right.
declare const variation4: SetOptional<{a: number; b?: string; c: boolean}, 'b' | 'c'>;
expectNotAssignable<{a: boolean; b?: string; c?: boolean}>(variation4);

// Preserves readonly modifier.
declare const variation5: SetOptional<{readonly a: number; readonly b?: string; c: boolean}, 'b' | 'c'>;
expectType<{readonly a: number; readonly b?: string; c?: boolean}>(variation5);

// Marks all keys as optional, if `Keys` is `any`.
declare const variation6: SetOptional<{a: number; b: string; c: boolean}, any>;
expectType<{a?: number; b?: string; c?: boolean}>(variation6);

// Does nothing, if `Keys` is `never`.
declare const variation7: SetOptional<{a?: number; readonly b?: string; readonly c: boolean}, never>;
expectType<{a?: number; readonly b?: string; readonly c: boolean}>(variation7);
