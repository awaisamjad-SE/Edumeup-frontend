import { apiFetch } from './client';
import { Course } from '@/lib/types';
import { extractList, toCourse } from './normalize';

export interface Category {
  id: string | number;
  name: string;
  description?: string;
  slug?: string;
  icon?: string;
  parent_id?: number | null;
  created_at?: string;
  updated_at?: string;
}

type CategoryListResponse = unknown;
type CategoryDetailResponse = unknown;
type CourseListResponse = unknown;

const toCategory = (record: any): Category => {
  return {
    id: String(record?.id ?? '0'),
    name: record?.name ?? 'Unknown Category',
    description: record?.description ?? '',
    slug: record?.slug ?? '',
    icon: record?.icon ?? '',
    parent_id: record?.parent_id ?? null,
    created_at: record?.created_at ?? '',
    updated_at: record?.updated_at ?? '',
  };
};

export const listCategories = async (): Promise<Category[]> => {
  const data: CategoryListResponse = await apiFetch('/api/v1/categories');
  return extractList(data).map(toCategory);
};

export const getCategoryDetails = async (categoryId: string): Promise<Category> => {
  const data: CategoryDetailResponse = await apiFetch(`/api/v1/categories/${categoryId}`);
  return toCategory(data);
};

export const getCategoryCourses = async (categoryId: string): Promise<Course[]> => {
  const data: CourseListResponse = await apiFetch(`/api/v1/categories/${categoryId}/courses`);
  return extractList(data).map(toCourse);
};
