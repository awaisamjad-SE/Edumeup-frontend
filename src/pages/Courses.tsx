import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/CourseCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Course } from '@/lib/types';
import { filterCourses, listCourses, searchCourses } from '@/lib/api';
import { useEnrollmentCheck } from '@/hooks/use-enrollment';

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const { isEnrolled, loading: enrollmentLoading } = useEnrollmentCheck();

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const categories = useMemo(() => {
    return Array.from(new Set(courses.map(course => course.category))).filter(Boolean);
  }, [courses]);

  const filtered = useMemo(() => {
    return courses.filter(c => {
      const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = !selectedCategory || c.category === selectedCategory;
      const matchLevel = !selectedLevel || c.level === selectedLevel;
      return matchSearch && matchCat && matchLevel;
    });
  }, [courses, search, selectedCategory, selectedLevel]);

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      setError('');
      try {
        if (search.trim()) {
          const data = await searchCourses(search.trim());
          setCourses(data);
        } else if (selectedCategory || selectedLevel) {
          const data = await filterCourses(selectedLevel ?? undefined, selectedCategory ?? undefined);
          setCourses(data);
        } else {
          const data = await listCourses();
          setCourses(data);
        }
      } catch (err) {
        setError('Unable to load courses right now.');
      } finally {
        setLoading(false);
      }
    };

    void loadCourses();
  }, [search, selectedCategory, selectedLevel]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold font-display text-foreground mb-2">All Courses</h1>
        <p className="text-muted-foreground mb-8">Browse our complete catalog of courses</p>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? 'bg-secondary text-secondary-foreground' : ''}
            >
              All
            </Button>
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={selectedCategory === cat ? 'bg-secondary text-secondary-foreground' : ''}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {levels.map(level => (
            <Button
              key={level}
              variant={selectedLevel === level ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
              className={selectedLevel === level ? 'bg-primary text-primary-foreground' : ''}
            >
              {level}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">Loading courses...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-lg text-destructive">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <SlidersHorizontal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">No courses found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} isEnrolled={isEnrolled(course.id)} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
