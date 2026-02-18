import { apiFetch } from './client';

type MoodleRedirectResponse = {
  sso_url?: string;
  url?: string;
};

export const getMoodleRedirect = async (courseId?: number | string): Promise<string> => {
  const suffix = courseId ? `?courseId=${encodeURIComponent(String(courseId))}` : '';
  const data = await apiFetch<MoodleRedirectResponse>(`/api/v1/moodle/redirect${suffix}`);
  return data.sso_url ?? data.url ?? '';
};

export const getMoodleSsoUrl = async (courseId?: number | string): Promise<string> => {
  const suffix = courseId ? `?courseId=${encodeURIComponent(String(courseId))}` : '';
  const data = await apiFetch<MoodleRedirectResponse>(`/api/v1/moodle/sso-url${suffix}`);
  return data.sso_url ?? data.url ?? '';
};

export const syncUserToMoodle = async (userId: string | number) => {
  return apiFetch(`/api/v1/moodle/sync-user/${userId}`, {
    method: 'POST',
  });
};

export const syncCourseToMoodle = async (courseId: string | number) => {
  return apiFetch(`/api/v1/moodle/sync-course/${courseId}`, {
    method: 'POST',
  });
};

export const syncEnrollmentToMoodle = async (enrollmentId: string | number) => {
  return apiFetch(`/api/v1/moodle/sync-enrollment/${enrollmentId}`, {
    method: 'POST',
  });
};

export const syncAllUsersToMoodle = async () => {
  return apiFetch('/api/v1/moodle/sync-all-users', {
    method: 'POST',
  });
};

export const syncCoursesFromMoodle = async () => {
  return apiFetch('/api/v1/moodle/sync-courses-from-moodle', {
    method: 'POST',
  });
};

export const pullCourseProgressFromMoodle = async (enrollmentId: string | number) => {
  return apiFetch(`/api/v1/moodle/pull-progress/${enrollmentId}`, {
    method: 'POST',
  });
};

export const getMoodleSyncLogs = async () => {
  return apiFetch('/api/v1/moodle/sync-logs');
};
