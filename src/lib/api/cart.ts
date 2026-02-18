import { apiFetch } from './client';
import { CartItem } from '@/lib/types';
import { extractList, toCourse } from './normalize';

type CartResponse = unknown;

const normalizeCartItems = (data: CartResponse): CartItem[] => {
  const items = extractList(data);
  return items.map((item) => {
    const record = item as Record<string, unknown>;
    const course = toCourse(record.course || record.course_detail || {});
    const quantity = typeof record.quantity === 'number' ? record.quantity : 1;
    return { course, quantity };
  });
};

export const getCart = async (): Promise<CartItem[]> => {
  try {
    const data: CartResponse = await apiFetch('/api/v1/commerce/cart');
    return normalizeCartItems(data);
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    return [];
  }
};

export const addToCart = async (courseId: number | string, quantity = 1): Promise<CartItem[]> => {
  try {
    const data: CartResponse = await apiFetch('/api/v1/commerce/cart/add', {
      method: 'POST',
      body: { course_id: Number(courseId), quantity },
    });
    return normalizeCartItems(data);
  } catch (error) {
    console.error('Failed to add to cart:', error);
    throw error;
  }
};

export const removeFromCart = async (courseId: number | string): Promise<void> => {
  try {
    await apiFetch(`/api/v1/commerce/cart/remove/${courseId}`, { method: 'DELETE' });
  } catch (error) {
    console.error('Failed to remove from cart:', error);
    throw error;
  }
};

export const clearCart = async (): Promise<void> => {
  try {
    await apiFetch('/api/v1/commerce/cart', { method: 'DELETE' });
  } catch (error) {
    console.error('Failed to clear cart:', error);
    throw error;
  }
};

export const getCartTotal = async (): Promise<number> => {
  try {
    const data = await apiFetch<{ total?: number }>('/api/v1/commerce/cart/total');
    return data?.total ?? 0;
  } catch (error) {
    console.error('Failed to get cart total:', error);
    return 0;
  }
};
