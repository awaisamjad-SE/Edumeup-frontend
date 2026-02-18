import { apiFetch } from './client';
import { Course, CurriculumSection } from '@/lib/types';
import { extractList, toCourse, toCurriculumSections } from './normalize';

type CourseListResponse = unknown;

type CourseDetailResponse = unknown;

type CurriculumResponse = unknown;

export const listCourses = async (): Promise<Course[]> => {
  const data: CourseListResponse = await apiFetch('/api/v1/courses');
  return extractList(data).map(toCourse);
};

export const getFeaturedCourses = async (): Promise<Course[]> => {
  const data: CourseListResponse = await apiFetch('/api/v1/courses/featured');
  return extractList(data).map(toCourse);
};

export const searchCourses = async (query: string): Promise<Course[]> => {
  const data: CourseListResponse = await apiFetch(`/api/v1/courses/search?q=${encodeURIComponent(query)}`);
  return extractList(data).map(toCourse);
};

export const filterCourses = async (level?: string, category?: string): Promise<Course[]> => {
  const params = new URLSearchParams();
  if (level) params.set('level', level);
  if (category) params.set('category', category);
  const suffix = params.toString();
  const data: CourseListResponse = await apiFetch(`/api/v1/courses/filter${suffix ? `?${suffix}` : ''}`);
  return extractList(data).map(toCourse);
};

export const getCourseDetails = async (courseId: string): Promise<Course> => {
  const data: CourseDetailResponse = await apiFetch(`/api/v1/courses/${courseId}`);
  return toCourse(data);
};

export const getCourseCurriculum = async (courseId: string): Promise<CurriculumSection[]> => {
  const data: CurriculumResponse = await apiFetch(`/api/v1/courses/${courseId}/curriculum`);
  return toCurriculumSections(data);
};

export const getSimilarCourses = async (courseId: string): Promise<Course[]> => {
  const data: CourseListResponse = await apiFetch(`/api/v1/courses/${courseId}/similar`);
  return extractList(data).map(toCourse);
};

export const getCourseReviews = async (courseId: string) => {
  return apiFetch(`/api/v1/courses/${courseId}/reviews`);
};

export const addCourseReview = async (courseId: string, rating: number, comment: string) => {
  return apiFetch(`/api/v1/courses/${courseId}/reviews`, {
    method: 'POST',
    body: { rating, comment },
  });
};

export const getCourseFAQs = async (courseId: string) => {
  return apiFetch(`/api/v1/courses/${courseId}/faqs`);
};
