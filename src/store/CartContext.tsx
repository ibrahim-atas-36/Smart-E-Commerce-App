import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Product } from "../types/product";
import type { DeliveryAddress, Order } from "../types/order";

interface CartContextValue {
  cart: Product[];
  favorites: Product[];
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  toggleFavorite: (product: Product) => void;
  isInCart: (productId: number) => boolean;
  isFavorite: (productId: number) => boolean;
  placeOrder: (details: {
    address: DeliveryAddress;
    subtotal: number;
    discount: number;
    total: number;
    paymentLabel: string;
  }) => Order;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const CART_STORAGE_KEY = "smartecommerce.cart-state";

export const CartProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const hasHydrated = useRef(false);

  useEffect(() => {
    const hydrate = async () => {
      try {
        const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as {
            cart?: Product[];
            favorites?: Product[];
            orders?: Order[];
          };
          setCart(parsed.cart ?? []);
          setFavorites(parsed.favorites ?? []);
          setOrders(parsed.orders ?? []);
        }
      } catch {
      } finally {
        hasHydrated.current = true;
      }
    };

    void hydrate();
  }, []);

  useEffect(() => {
    if (!hasHydrated.current) return;
    void AsyncStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({ cart, favorites, orders }),
    );
  }, [cart, favorites, orders]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      favorites,
      orders,
      addToCart: (product) => {
        setCart((currentCart) =>
          currentCart.some((item) => item.id === product.id)
            ? currentCart
            : [...currentCart, product],
        );
      },
      removeFromCart: (productId) => {
        setCart((currentCart) =>
          currentCart.filter((item) => item.id !== productId),
        );
      },
      toggleFavorite: (product) => {
        setFavorites((currentFavorites) =>
          currentFavorites.some((item) => item.id === product.id)
            ? currentFavorites.filter((item) => item.id !== product.id)
            : [...currentFavorites, product],
        );
      },
      isInCart: (productId) => cart.some((item) => item.id === productId),
      isFavorite: (productId) =>
        favorites.some((item) => item.id === productId),
      placeOrder: (details) => {
        const order: Order = {
          id: `SM-${Date.now().toString().slice(-8)}`,
          createdAt: new Date().toISOString(),
          status: "Processing",
          products: cart,
          ...details,
        };

        setOrders((currentOrders) => [order, ...currentOrders]);
        setCart([]);
        return order;
      },
    }),
    [cart, favorites, orders],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
