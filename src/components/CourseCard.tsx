import { Link, useNavigate } from 'react-router-dom';
import { Star, Clock, Users, BookOpen, CheckCircle2 } from 'lucide-react';
import { Course } from '@/lib/types';
import { useCartStore } from '@/lib/cart-store';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface CourseCardProps {
  course: Course;
  index?: number;
  isEnrolled?: boolean;
}

const CourseCard = ({ course, index = 0, isEnrolled = false }: CourseCardProps) => {
  const navigate = useNavigate();
  const addItem = useCartStore(s => s.addItem);
  const items = useCartStore(s => s.items);
  const inCart = items.some(i => String(i.course.id) === String(course.id));
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (inCart || adding || isEnrolled) return;
    
    setAdding(true);
    try {
      await addItem(course);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAdding(false);
    }
  };

  const handleGoToDashboard = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group bg-card rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 flex flex-col"
    >
      <Link to={`/courses/${course.id}`} className="block">
        <div className="relative h-44 bg-muted overflow-hidden">
          <div className="absolute inset-0 hero-gradient opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-secondary/60" />
          </div>
          {course.originalPrice && (
            <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-full">
              {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
            </span>
          )}
          <span className="absolute top-3 right-3 bg-card/90 text-foreground text-xs font-medium px-2.5 py-1 rounded-full">
            {course.level}
          </span>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-medium text-secondary uppercase tracking-wider mb-1">{course.category}</span>
        <Link to={`/courses/${course.id}`}>
          <h3 className="font-semibold text-card-foreground font-display text-lg leading-snug mb-2 group-hover:text-secondary transition-colors line-clamp-2">
            {course.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.shortDescription}</p>

        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{course.students.toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-1 mb-4">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="text-sm font-semibold text-foreground">{course.rating}</span>
          <span className="text-xs text-muted-foreground">({course.reviewCount})</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground">${course.price}</span>
            {course.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
            )}
          </div>
          {isEnrolled ? (
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 border-secondary text-secondary hover:bg-secondary/10"
              onClick={handleGoToDashboard}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Enrolled
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={inCart ? "outline" : "default"}
                className={inCart ? '' : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'}
                onClick={handleAddToCart}
                disabled={inCart || adding}
              >
                {adding ? 'Adding...' : inCart ? 'In Cart' : 'Add to Cart'}
              </Button>
              {inCart && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/cart');
                  }}
                >
                  Go to Cart
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
