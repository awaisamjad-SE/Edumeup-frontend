import { apiFetch } from './client';
import { Enrollment } from '@/lib/types';
import { extractList, toEnrollment } from './normalize';

type EnrollmentResponse = unknown;

type DashboardResponse = unknown;

export const getStudentDashboard = async (): Promise<DashboardResponse> => {
  return apiFetch('/api/v1/dashboard/student');
};

export const getMyEnrollments = async (): Promise<Enrollment[]> => {
  const data: EnrollmentResponse = await apiFetch('/api/v1/enrollments/my-courses');
  return extractList(data).map(toEnrollment);
};

export const getEnrollmentDetails = async (enrollmentId: string): Promise<Enrollment> => {
  const data: EnrollmentResponse = await apiFetch(`/api/v1/enrollments/${enrollmentId}`);
  return toEnrollment(data);
};

export const getCourseProgress = async (enrollmentId: string) => {
  return apiFetch(`/api/v1/enrollments/${enrollmentId}/progress`);
};

export const getCertificate = async (enrollmentId: string) => {
  return apiFetch(`/api/v1/enrollments/${enrollmentId}/certificate`);
};

export const unenroll = async (enrollmentId: string) => {
  return apiFetch(`/api/v1/enrollments/${enrollmentId}/unenroll`, {
    method: 'DELETE',
  });
};

export const manualEnroll = async (userId: string | number, courseId: string | number) => {
  return apiFetch('/api/v1/enrollments/manual-enroll', {
    method: 'POST',
    body: { user_id: userId, course_id: courseId },
  });
};

export const getStudentEnrollments = async (studentId: string): Promise<Enrollment[]> => {
  const data: EnrollmentResponse = await apiFetch(`/api/v1/enrollments/student/${studentId}`);
  return extractList(data).map(toEnrollment);
};

export const getCourseEnrollments = async (courseId: string): Promise<Enrollment[]> => {
  const data: EnrollmentResponse = await apiFetch(`/api/v1/enrollments/course/${courseId}`);
  return extractList(data).map(toEnrollment);
};

export const getAllEnrollments = async (): Promise<Enrollment[]> => {
  const data: EnrollmentResponse = await apiFetch('/api/v1/enrollments/all');
  return extractList(data).map(toEnrollment);
};
