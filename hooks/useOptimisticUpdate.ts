import { useState, useCallback } from "react";

export type OptimisticState<T> = {
  data: T[];
  isOptimistic: boolean;
};

export function useOptimisticUpdate<T extends { id: string }>(initialData: T[]) {
  const [data, setData] = useState<T[]>(initialData);
  const [isOptimistic, setIsOptimistic] = useState(false);

  const updateOptimistic = useCallback(
    async (
      itemId: string,
      updater: (item: T) => T,
      apiCall: () => Promise<T>,
      onError?: (error: Error) => void
    ) => {
      const originalData = [...data];
      const index = data.findIndex((item) => item.id === itemId);

      if (index === -1) {
        onError?.(new Error("Item not found"));
        return null;
      }

      // Apply optimistic update
      const updatedItem = updater(data[index]);
      setData((prev) => {
        const newData = [...prev];
        newData[index] = updatedItem;
        return newData;
      });
      setIsOptimistic(true);

      try {
        // Make API call
        const result = await apiCall();
        // Update with server response
        setData((prev) => {
          const newData = [...prev];
          const idx = newData.findIndex((item) => item.id === itemId);
          if (idx !== -1) {
            newData[idx] = result;
          }
          return newData;
        });
        setIsOptimistic(false);
        return result;
      } catch (error) {
        // Rollback on error
        setData(originalData);
        setIsOptimistic(false);
        onError?.(error instanceof Error ? error : new Error("Unknown error"));
        throw error;
      }
    },
    [data]
  );

  const deleteOptimistic = useCallback(
    async (
      itemId: string,
      apiCall: () => Promise<void>,
      onError?: (error: Error) => void
    ) => {
      const originalData = [...data];

      // Remove from UI immediately (optimistic)
      setData((prev) => prev.filter((item) => item.id !== itemId));
      setIsOptimistic(true);

      try {
        // Make API call
        await apiCall();
        setIsOptimistic(false);
      } catch (error) {
        // Rollback on error
        setData(originalData);
        setIsOptimistic(false);
        onError?.(error instanceof Error ? error : new Error("Unknown error"));
        throw error;
      }
    },
    [data]
  );

  const addOptimistic = useCallback(
    async (
      tempItem: T,
      apiCall: () => Promise<T>,
      onError?: (error: Error) => void
    ) => {
      const originalData = [...data];

      // Add to UI immediately (optimistic)
      setData((prev) => [...prev, tempItem]);
      setIsOptimistic(true);

      try {
        // Make API call
        const result = await apiCall();
        // Update with server response (replace temp item)
        setData((prev) => {
          const newData = [...prev];
          const index = newData.findIndex((item) => item.id === tempItem.id);
          if (index !== -1) {
            newData[index] = result;
          }
          return newData;
        });
        setIsOptimistic(false);
        return result;
      } catch (error) {
        // Rollback on error
        setData(originalData);
        setIsOptimistic(false);
        onError?.(error instanceof Error ? error : new Error("Unknown error"));
        throw error;
      }
    },
    [data]
  );

  return {
    data,
    setData,
    isOptimistic,
    updateOptimistic,
    deleteOptimistic,
    addOptimistic,
  };
}
