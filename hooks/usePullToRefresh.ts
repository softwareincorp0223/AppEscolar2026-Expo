import { useCallback, useState } from "react";

type RefreshAction = () => Promise<void> | void;

export function usePullToRefresh(action: RefreshAction) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    if (refreshing) return;

    setRefreshing(true);

    try {
      await action();
    } finally {
      setRefreshing(false);
    }
  }, [action, refreshing]);

  return {
    refreshing,
    onRefresh,
  };
}
