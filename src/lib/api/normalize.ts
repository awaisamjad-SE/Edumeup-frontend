import { Course, CurriculumSection, Enrollment } from '@/lib/types';

const toLevel = (value: unknown): Course['level'] => {
  if (value === 'Intermediate' || value === 'Advanced' || value === 'Beginner') {
    return value;
  }
  return 'Beginner';
};

const toNumber = (value: unknown, fallback = 0): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? fallback : parsed;
  }
  return fallback;
};

const toString = (value: unknown, fallback = ''): string => {
  return typeof value === 'string' ? value : fallback;
};

export const extractList = (data: unknown): unknown[] => {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>;
    if (Array.isArray(record.results)) return record.results;
    if (Array.isArray(record.data)) return record.data;
    if (Array.isArray(record.items)) return record.items;
  }
  return [];
};

export const toCurriculumSections = (data: unknown): CurriculumSection[] => {
  const items = extractList(data);
  return items.map((section) => {
    const record = section as Record<string, unknown>;
    const lessons = extractList(record.lessons).map((lesson) => {
      const lessonRecord = lesson as Record<string, unknown>;
      return {
        title: toString(lessonRecord.title, 'Lesson'),
        duration: toString(lessonRecord.duration, '0 min'),
        free: Boolean(lessonRecord.free),
      };
    });

    return {
      title: toString(record.title, 'Curriculum'),
      lessons,
    };
  });
};

export const toCourse = (data: unknown): Course => {
  const record = (data || {}) as Record<string, unknown>;
  const categoryValue = record.category as Record<string, unknown> | string | undefined;
  const instructorValue = record.instructor as Record<string, unknown> | string | undefined;
  const curriculum = Array.isArray(record.curriculum) ? toCurriculumSections(record.curriculum) : [];
  const requirements = extractList(record.requirements).map((req) => toString(req, ''));
  const outcomes = extractList(record.outcomes).map((outcome) => toString(outcome, ''));

  // Handle various ID formats from API (could be number or string)
  let courseId = String(record.id ?? '0');
  if (courseId === '0' || courseId === '') {
    console.warn('Course missing ID, using fallback', record);
  }

  return {
    id: courseId,
    title: toString(record.title, 'Untitled Course'),
    description: toString(record.description, toString(record.short_description, '')),
    shortDescription: toString(record.short_description, toString(record.description, '')),
    price: toNumber(record.price, 0),
    originalPrice: record.original_price ? toNumber(record.original_price, 0) : undefined,
    image: toString(record.image, ''),
    category: typeof categoryValue === 'string' ? categoryValue : toString(categoryValue?.name, 'General'),
    level: toLevel(record.level),
    duration: toString(record.duration, '0 hours'),
    lessons: toNumber(record.lessons ?? record.lesson_count, 0),
    students: toNumber(record.students ?? record.student_count, 0),
    rating: toNumber(record.rating, 0),
    reviewCount: toNumber(record.review_count ?? record.reviews, 0),
    instructor: typeof instructorValue === 'string' ? instructorValue : toString(instructorValue?.name, 'Instructor'),
    instructorAvatar: toString((instructorValue as Record<string, unknown> | undefined)?.avatar, ''),
    featured: Boolean(record.featured),
    curriculum,
    requirements,
    outcomes,
    moodleCourseId: record.moodle_course_id ? toNumber(record.moodle_course_id) : undefined,
  };
};

export const toEnrollment = (data: unknown): Enrollment => {
  const record = (data || {}) as Record<string, unknown>;
  const course = toCourse(record.course || record.course_detail || {});

  return {
    id: String(record.id ?? ''),
    course,
    progress: toNumber(record.progress, 0),
    enrolledAt: toString(record.enrolled_at ?? record.enrolledAt, ''),
    status: (record.status as Enrollment['status']) ?? 'active',
    lastAccessed: toString(record.last_accessed ?? record.lastAccessed, ''),
  };
};

export const toUser = (data: unknown) => {
  const record = (data || {}) as Record<string, unknown>;
  const firstName = toString(record.first_name ?? record.firstName, '');
  const lastName = toString(record.last_name ?? record.lastName, '');
  const username = toString(record.username, '');
  const displayName = firstName && lastName ? `${firstName} ${lastName}` : username || 'User';
  const verificationValue = record.is_verified ?? record.email_verified;
  const isVerified = verificationValue === undefined ? undefined : Boolean(verificationValue);
  
  return {
    id: String(record.id ?? ''),
    username,
    email: toString(record.email, ''),
    firstName,
    lastName,
    name: displayName,
    phone: toString(record.phone ?? record.phone_number, ''),
    bio: toString(record.bio ?? record.description, ''),
    avatar: toString(record.avatar ?? record.profile_picture, ''),
    role: (record.role as 'student' | 'parent' | 'teacher' | 'admin') ?? 'student',
    isVerified,
    dateJoined: toString(record.date_joined ?? record.created_at, ''),
    moodleUserId: record.moodle_user_id ? toNumber(record.moodle_user_id) : undefined,
  };
};
