import { create } from 'zustand';
import { CartItem, Course } from './types';
import { addToCart, clearCart as clearRemoteCart, getCart, removeFromCart } from './api/cart';
import { tokenStore } from './api/client';

const GUEST_CART_KEY = 'edumeup_guest_cart';

interface CartStore {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
  refresh: () => Promise<void>;
  addItem: (course: Course | string | number) => Promise<void>;
  removeItem: (courseId: string | number) => Promise<void>;
  clearCart: () => Promise<void>;
  total: () => number;
  itemCount: () => number;
  syncGuestCartToServer: () => Promise<void>;
  getGuestCart: () => CartItem[];
}

// Helper functions for guest cart
const loadGuestCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(GUEST_CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveGuestCart = (items: CartItem[]) => {
  try {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save guest cart:', error);
  }
};

const clearGuestCart = () => {
  try {
    localStorage.removeItem(GUEST_CART_KEY);
  } catch (error) {
    console.error('Failed to clear guest cart:', error);
  }
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: loadGuestCart(),
  loading: false,
  error: null,
  initialized: false,
  getGuestCart: () => loadGuestCart(),
  refresh: async () => {
    const isAuthenticated = !!tokenStore.getAccessToken();
    
    if (!isAuthenticated) {
      // Load from localStorage for guests
      const guestItems = loadGuestCart();
      set({ items: guestItems, loading: false, initialized: true });
      return;
    }
    
    set({ loading: true, error: null });
    try {
      const items = await getCart();
      set({ items, loading: false, initialized: true });
    } catch (error) {
      console.error('Cart refresh error:', error);
      set({ loading: false, error: error instanceof Error ? error.message : 'Failed to load cart', initialized: true });
    }
  },
  syncGuestCartToServer: async () => {
    const guestItems = loadGuestCart();
    if (guestItems.length === 0) return;
    
    try {
      // Add each guest cart item to server
      for (const item of guestItems) {
        try {
          await addToCart(item.course.id, item.quantity);
        } catch (error) {
          console.error('Failed to sync item:', item.course.id, error);
        }
      }
      
      // Clear guest cart and refresh from server
      clearGuestCart();
      await get().refresh();
    } catch (error) {
      console.error('Failed to sync guest cart:', error);
    }
  },
  addItem: async (course) => {
    const courseObj = typeof course === 'object' ? course : null;
    const courseId = typeof course === 'object' ? course.id : course;
    const isAuthenticated = !!tokenStore.getAccessToken();
    const existingItem = get().items.find(item => String(item.course.id) === String(courseId));

    if (existingItem) {
      return;
    }
    
    if (!isAuthenticated) {
      // Guest cart - save to localStorage
      const currentItems = loadGuestCart();
      if (!courseObj) {
        throw new Error('Course object required for guest cart');
      }
      currentItems.push({
        id: `guest-${Date.now()}`,
        course: courseObj,
        quantity: 1,
        addedAt: new Date().toISOString(),
      });
      
      saveGuestCart(currentItems);
      set({ items: currentItems });
      return;
    }
    
    // Authenticated user - use API
    const previousItems = get().items;
    if (courseObj) {
      const optimisticItems = [
        ...previousItems,
        { course: courseObj, quantity: 1 },
      ];
      set({ items: optimisticItems, loading: true, error: null });
    } else {
      set({ loading: true, error: null });
    }
    try {
      await addToCart(courseId, 1);
      const items = await getCart();
      set({ items, loading: false });
    } catch (error) {
      console.error('Add to cart error:', error);
      set({ items: previousItems, loading: false, error: error instanceof Error ? error.message : 'Failed to add to cart' });
      throw error;
    }
  },
  removeItem: async (courseId) => {
    const isAuthenticated = !!tokenStore.getAccessToken();
    
    if (!isAuthenticated) {
      // Guest cart - remove from localStorage
      const currentItems = loadGuestCart();
      const filtered = currentItems.filter(item => String(item.course.id) !== String(courseId));
      saveGuestCart(filtered);
      set({ items: filtered });
      return;
    }
    
    // Authenticated user - use API
    const previousItems = get().items;
    set({ loading: true, error: null });
    try {
      await removeFromCart(courseId);
      const items = await getCart();
      set({ items, loading: false });
    } catch (error) {
      console.error('Remove from cart error:', error);
      set({ items: previousItems, loading: false, error: error instanceof Error ? error.message : 'Failed to remove from cart' });
      throw error;
    }
  },
  clearCart: async () => {
    const isAuthenticated = !!tokenStore.getAccessToken();
    
    if (!isAuthenticated) {
      clearGuestCart();
      set({ items: [] });
      return;
    }
    
    const previousItems = get().items;
    set({ loading: true, error: null });
    try {
      await clearRemoteCart();
      set({ items: [], loading: false });
    } catch (error) {
      console.error('Clear cart error:', error);
      set({ items: previousItems, loading: false, error: error instanceof Error ? error.message : 'Failed to clear cart' });
      throw error;
    }
  },
  total: () => get().items.reduce((sum, i) => sum + i.course.price * i.quantity, 0),
  itemCount: () => get().items.length,
}));
