import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Clock, Users, BookOpen, CheckCircle, ChevronDown, ChevronUp, ShoppingCart, Play, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCartStore } from '@/lib/cart-store';
import { motion } from 'framer-motion';
import { Course, CurriculumSection } from '@/lib/types';
import { getCourseCurriculum, getCourseDetails } from '@/lib/api';
import { useEnrollmentCheck } from '@/hooks/use-enrollment';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [curriculum, setCurriculum] = useState<CurriculumSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);
  const addItem = useCartStore(s => s.addItem);
  const items = useCartStore(s => s.items);
  const inCart = items.some(i => String(i.course.id) === String(id));
  const [openSection, setOpenSection] = useState<number | null>(0);
  const { isEnrolled } = useEnrollmentCheck();
  const enrolled = id ? isEnrolled(id) : false;

  const handleAddToCart = async () => {
    if (!course || inCart || adding || enrolled) return;
    
    setAdding(true);
    try {
      await addItem(course);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    const loadCourse = async () => {
      if (!id) return;
      setLoading(true);
      setError('');
      try {
        const courseData = await getCourseDetails(id);
        setCourse(courseData);
        const curriculumData = await getCourseCurriculum(id);
        setCurriculum(curriculumData);
      } catch (err) {
        setError('Unable to load course details right now.');
      } finally {
        setLoading(false);
      }
    };

    void loadCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-lg text-muted-foreground">Loading course...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">{error || 'Course not found'}</h1>
          <Link to="/courses" className="text-secondary hover:underline mt-4 inline-block">Back to Courses</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero banner */}
      <div className="hero-gradient py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-secondary text-sm font-medium uppercase tracking-wider">{course.category} · {course.level}</span>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-primary-foreground mt-2 mb-4">{course.title}</h1>
            <p className="text-primary-foreground/80 mb-4 max-w-2xl">{course.shortDescription}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-accent" /> {course.rating} ({course.reviewCount} reviews)</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {course.students.toLocaleString()} students</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {course.duration}</span>
              <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {course.lessons} lessons</span>
            </div>
            <p className="text-primary-foreground/60 text-sm mt-3">By {course.instructor}</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <section>
              <h2 className="text-xl font-bold font-display text-foreground mb-3">About This Course</h2>
              <p className="text-muted-foreground leading-relaxed">{course.description}</p>
            </section>

            {/* Outcomes */}
            <section>
              <h2 className="text-xl font-bold font-display text-foreground mb-3">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.outcomes.map((o, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{o}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section>
              <h2 className="text-xl font-bold font-display text-foreground mb-3">Curriculum</h2>
              <div className="space-y-2">
                {curriculum.map((section, si) => (
                  <div key={si} className="border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenSection(openSection === si ? null : si)}
                      className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <span className="font-medium text-foreground text-sm">{section.title}</span>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <span>{section.lessons.length} lessons</span>
                        {openSection === si ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                    </button>
                    {openSection === si && (
                      <div className="divide-y divide-border">
                        {section.lessons.map((lesson, li) => (
                          <div key={li} className="flex items-center justify-between px-4 py-3">
                            <div className="flex items-center gap-3">
                              <Play className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-foreground">{lesson.title}</span>
                              {lesson.free && <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-medium">Free</span>}
                            </div>
                            <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="text-xl font-bold font-display text-foreground mb-3">Requirements</h2>
              <ul className="space-y-2">
                {course.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-secondary mt-1">•</span> {r}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24 bg-card rounded-xl p-6 card-shadow space-y-5">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">${course.price}</span>
                {course.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">${course.originalPrice}</span>
                )}
              </div>

              {enrolled ? (
                <>
                  <Button
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold gap-2"
                    size="lg"
                    onClick={() => navigate('/dashboard')}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Already Enrolled - Go to Dashboard
                  </Button>
                  <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3">
                    <p className="text-sm text-secondary font-medium text-center">
                      ✓ You have access to this course
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Button
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold gap-2"
                    size="lg"
                    disabled={inCart || adding}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {adding ? 'Adding...' : inCart ? 'Already in Cart' : 'Add to Cart'}
                  </Button>

                  {inCart && (
                    <Link to="/cart">
                      <Button variant="outline" className="w-full">Go to Cart</Button>
                    </Link>
                  )}
                </>
              )}

              <div className="space-y-3 pt-3 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium text-foreground">{course.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Lessons</span>
                  <span className="font-medium text-foreground">{course.lessons}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Level</span>
                  <span className="font-medium text-foreground">{course.level}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Certificate</span>
                  <span className="font-medium text-foreground">Yes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;
