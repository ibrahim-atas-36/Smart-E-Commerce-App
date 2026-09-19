import React, { createContext, useContext, useMemo, useState } from "react";
import type { Product } from "../types/product";

interface CartContextValue {
  cart: Product[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  toggleFavorite: (product: Product) => void;
  isInCart: (productId: number) => boolean;
  isFavorite: (productId: number) => boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      favorites,
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
    }),
    [cart, favorites],
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
