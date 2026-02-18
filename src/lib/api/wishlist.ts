import { apiFetch } from './client';
import { Course } from '@/lib/types';
import { extractList, toCourse } from './normalize';

type WishlistResponse = unknown;

export const getWishlist = async (): Promise<Course[]> => {
  const data: WishlistResponse = await apiFetch('/api/v1/commerce/wishlist');
  return extractList(data).map(toCourse);
};

export const addToWishlist = async (courseId: string | number) => {
  return apiFetch('/api/v1/commerce/wishlist/add', {
    method: 'POST',
    body: { course_id: Number(courseId) },
  });
};

export const removeFromWishlist = async (courseId: string | number) => {
  return apiFetch(`/api/v1/commerce/wishlist/remove/${courseId}`, {
    method: 'DELETE',
  });
};

export const moveWishlistToCart = async (courseId: string | number) => {
  return apiFetch(`/api/v1/commerce/wishlist/move-to-cart/${courseId}`, {
    method: 'POST',
  });
};
