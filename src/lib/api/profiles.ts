import { apiFetch } from './client';

/**
 * Student Profile APIs
 */
export const getStudentProfile = async (studentId: string) => {
  return apiFetch(`/api/v1/students/${studentId}`);
};

export const updateStudentProfile = async (studentId: string, updates: { phone?: string; bio?: string }) => {
  return apiFetch(`/api/v1/students/${studentId}`, {
    method: 'PATCH',
    body: updates,
  });
};

/**
 * Parent Profile APIs
 */
export const getParentChildren = async (parentId: string) => {
  return apiFetch(`/api/v1/parents/${parentId}/children`);
};

export const linkChildToParent = async (parentId: string, studentId: string | number) => {
  return apiFetch(`/api/v1/parents/${parentId}/link-child`, {
    method: 'POST',
    body: { student_id: studentId },
  });
};

export const unlinkChildFromParent = async (parentId: string, studentId: string) => {
  return apiFetch(`/api/v1/parents/${parentId}/unlink-child/${studentId}`, {
    method: 'DELETE',
  });
};

/**
 * Teacher Profile APIs
 */
export const getTeacherProfile = async (teacherId: string) => {
  return apiFetch(`/api/v1/teachers/${teacherId}`);
};

export const updateTeacherProfile = async (teacherId: string, updates: { phone?: string; bio?: string }) => {
  return apiFetch(`/api/v1/teachers/${teacherId}`, {
    method: 'PATCH',
    body: updates,
  });
};

export const uploadTeacherCV = async (teacherId: string, cvUrl: string) => {
  return apiFetch(`/api/v1/teachers/${teacherId}/upload-cv`, {
    method: 'POST',
    body: { cv_url: cvUrl },
  });
};

/**
 * Teacher Availability APIs
 */
export const getTeacherAvailability = async (teacherId: string) => {
  return apiFetch(`/api/v1/teachers/${teacherId}/availability`);
};

export const updateTeacherAvailability = async (teacherId: string, availability: Record<string, unknown>) => {
  return apiFetch(`/api/v1/teachers/${teacherId}/availability`, {
    method: 'PUT',
    body: availability,
  });
};

/**
 * Teacher Subjects APIs
 */
export const getTeacherSubjects = async (teacherId: string) => {
  return apiFetch(`/api/v1/teachers/${teacherId}/subjects`);
};

export const addTeacherSubject = async (teacherId: string, subjectName: string) => {
  return apiFetch(`/api/v1/teachers/${teacherId}/subjects`, {
    method: 'POST',
    body: { subject_name: subjectName },
  });
};

export const deleteTeacherSubject = async (teacherId: string, subjectId: string) => {
  return apiFetch(`/api/v1/teachers/${teacherId}/subjects/${subjectId}`, {
    method: 'DELETE',
  });
};

/**
 * Parent Subjects/Children Management
 */
export const getParentProfile = async (parentId: string) => {
  return apiFetch(`/api/v1/parents/${parentId}`);
};

export const updateParentProfile = async (parentId: string, updates: Record<string, unknown>) => {
  return apiFetch(`/api/v1/parents/${parentId}`, {
    method: 'PATCH',
    body: updates,
  });
};
