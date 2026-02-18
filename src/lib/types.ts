export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  reviewCount: number;
  instructor: string;
  instructorAvatar: string;
  featured?: boolean;
  curriculum: CurriculumSection[];
  requirements: string[];
  outcomes: string[];
  moodleCourseId?: number;
}

export interface CurriculumSection {
  title: string;
  lessons: { title: string; duration: string; free?: boolean }[];
}

export interface CartItem {
  course: Course;
  quantity: number;
}

export interface Enrollment {
  id: string;
  course: Course;
  progress: number;
  enrolledAt: string;
  status: 'active' | 'completed' | 'expired';
  lastAccessed?: string;
}

export interface User {
  id: string;
  username?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  name: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  role: 'student' | 'parent' | 'teacher' | 'admin';
  isVerified?: boolean;
  dateJoined?: string;
  moodleUserId?: number;
}
