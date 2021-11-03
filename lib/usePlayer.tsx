import { usePlayerQuery } from '../types/generated-queries';

export function usePlayer() {
  const { data } = usePlayerQuery();
  return data?.authenticatedItem;
}
