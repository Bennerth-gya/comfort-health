"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string | null;
  quantity: number;
};

export type OrderRecord = {
  reference: string;
  email: string;
  amount: number;
  currency: "GHS";
  items: CartItem[];
  createdAt: string;
  status: "success";
};

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  orders: OrderRecord[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
  saveOrder: (order: OrderRecord) => void;
  getOrderByReference: (reference: string) => OrderRecord | undefined;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "comfi-cart";
const ORDERS_STORAGE_KEY = "comfi-orders";
const EMPTY_CART: CartItem[] = [];
const EMPTY_ORDERS: OrderRecord[] = [];

function parseStoredCart(value: string | null): CartItem[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as CartItem[];
    return Array.isArray(parsed)
      ? parsed.map((item) => ({
          ...item,
          price: Number(item.price) || 0,
          quantity: Math.max(1, Number(item.quantity) || 1),
        }))
      : [];
  } catch {
    return [];
  }
}

function parseStoredOrders(value: string | null): OrderRecord[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as OrderRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function createLocalStorageStore<T>(
  key: string,
  fallback: T,
  parse: (value: string | null) => T,
) {
  let cachedRaw: string | null | undefined;
  let cachedSnapshot = fallback;
  const listeners = new Set<() => void>();

  const emit = () => {
    for (const listener of listeners) {
      listener();
    }
  };

  const getSnapshot = () => {
    if (typeof window === "undefined") {
      return fallback;
    }

    const raw = window.localStorage.getItem(key);
    if (raw === cachedRaw) {
      return cachedSnapshot;
    }

    cachedRaw = raw;
    cachedSnapshot = parse(raw);
    return cachedSnapshot;
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);

    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        cachedRaw = undefined;
        emit();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", handleStorage);
    };
  };

  const setSnapshot = (value: T) => {
    if (typeof window === "undefined") {
      return;
    }

    cachedSnapshot = value;
    cachedRaw = JSON.stringify(value);
    window.localStorage.setItem(key, cachedRaw);
    emit();
  };

  return {
    getServerSnapshot: () => fallback,
    getSnapshot,
    setSnapshot,
    subscribe,
  };
}

const cartStore = createLocalStorageStore(
  CART_STORAGE_KEY,
  EMPTY_CART,
  parseStoredCart,
);
const ordersStore = createLocalStorageStore(
  ORDERS_STORAGE_KEY,
  EMPTY_ORDERS,
  parseStoredOrders,
);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );
  const orders = useSyncExternalStore(
    ordersStore.subscribe,
    ordersStore.getSnapshot,
    ordersStore.getServerSnapshot,
  );

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const addToCart = useCallback((product: CartItem) => {
    const currentCart = cartStore.getSnapshot();
    cartStore.setSnapshot(
      currentCart.find((item) => item.id === product.id)
        ? currentCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity }
              : item,
          )
        : [...currentCart, product],
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    cartStore.setSnapshot(cartStore.getSnapshot().filter((item) => item.id !== id));
  }, []);

  const increaseQty = useCallback((id: string) => {
    cartStore.setSnapshot(
      cartStore.getSnapshot().map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    );
  }, []);

  const decreaseQty = useCallback((id: string) => {
    cartStore.setSnapshot(
      cartStore.getSnapshot().map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      ),
    );
  }, []);

  const clearCart = useCallback(() => cartStore.setSnapshot(EMPTY_CART), []);

  const saveOrder = useCallback((order: OrderRecord) => {
    ordersStore.setSnapshot([order, ...ordersStore.getSnapshot()]);
  }, []);

  const getOrderByReference = useCallback(
    (reference: string) => orders.find((order) => order.reference === reference),
    [orders],
  );

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      subtotal,
      orders,
      addToCart,
      removeFromCart,
      increaseQty,
      decreaseQty,
      clearCart,
      saveOrder,
      getOrderByReference,
    }),
    [
      cart,
      cartCount,
      subtotal,
      orders,
      addToCart,
      removeFromCart,
      increaseQty,
      decreaseQty,
      clearCart,
      saveOrder,
      getOrderByReference,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
