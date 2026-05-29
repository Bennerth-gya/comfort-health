"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import ToastContainer from "@/app/components/ToastContainer";

export type ToastVariant = "success" | "error" | "info";

export type ToastMessage = {
  id: string;
  title: string;
  description: string;
  variant: ToastVariant;
};

type ToastContextType = {
  pushToast: (toast: Omit<ToastMessage, "id">) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback(({ title, description, variant }: Omit<ToastMessage, "id">) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const toast: ToastMessage = { id, title, description, variant };

    setToasts((current) => [...current, toast]);

    window.setTimeout(() => removeToast(id), 5000);
  }, [removeToast]);

  const value = useMemo(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
}
