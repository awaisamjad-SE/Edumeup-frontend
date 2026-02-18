import { useState, useEffect } from 'react';
import { getMyEnrollments } from '@/lib/api/enrollments';
import { tokenStore } from '@/lib/api/client';

/**
 * Hook to check if user is enrolled in specific courses
 * Returns enrollment status map and loading state
 */
export const useEnrollmentCheck = () => {
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!tokenStore.getAccessToken());

  useEffect(() => {
    const loadEnrollments = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const enrollments = await getMyEnrollments();
        const courseIds = new Set(enrollments.map(e => e.course.id));
        setEnrolledCourseIds(courseIds);
      } catch (error) {
        console.error('Failed to load enrollments:', error);
      } finally {
        setLoading(false);
      }
    };

    void loadEnrollments();
  }, [isAuthenticated]);

  const isEnrolled = (courseId: string) => enrolledCourseIds.has(courseId);

  const refresh = async () => {
    const authenticated = !!tokenStore.getAccessToken();
    setIsAuthenticated(authenticated);
    
    if (!authenticated) {
      setEnrolledCourseIds(new Set());
      return;
    }

    try {
      const enrollments = await getMyEnrollments();
      const courseIds = new Set(enrollments.map(e => e.course.id));
      setEnrolledCourseIds(courseIds);
    } catch (error) {
      console.error('Failed to refresh enrollments:', error);
    }
  };

  return { isEnrolled, loading, enrolledCourseIds, refresh };
};
