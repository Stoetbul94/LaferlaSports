'use client';

import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

/**
 * False on the server and during hydration, true afterwards.
 *
 * Use to gate UI that depends on client-only state (the persisted cart lives in
 * localStorage) so the first client render still matches the server markup.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}
