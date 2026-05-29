"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
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

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    return parseStoredCart(window.localStorage.getItem(CART_STORAGE_KEY));
  });
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    if (typeof window === "undefined") return [];
    return parseStoredOrders(window.localStorage.getItem(ORDERS_STORAGE_KEY));
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const addToCart = useCallback((product: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prev, product];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const increaseQty = useCallback((id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const decreaseQty = useCallback((id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const saveOrder = useCallback((order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
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
