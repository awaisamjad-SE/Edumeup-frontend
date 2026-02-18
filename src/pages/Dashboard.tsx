import { Link } from 'react-router-dom';
import { BookOpen, ExternalLink, Clock, Award, TrendingUp, CreditCard, CheckCircle, XCircle, Clock3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Enrollment, User } from '@/lib/types';
import { getMoodleSsoUrl, getMyEnrollments, getMyProfile } from '@/lib/api';
import { getMyPayments } from '@/lib/api/payments';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils';

interface Payment {
  id: string | number;
  amount: string | number;
  status: string;
  gateway: string;
  created_at: string;
  order_items?: Array<{ course_title?: string }>;
  currency?: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loadingMoodle, setLoadingMoodle] = useState(false);
  const { toast } = useToast();

  const active = enrollments.filter(e => e.status === 'active');
  const completed = enrollments.filter(e => e.status === 'completed');

  const handleMoodleRedirect = async (courseId?: number, courseName?: string) => {
    if (loadingMoodle) return;
    
    setLoadingMoodle(true);
    try {
      const ssoUrl = await getMoodleSsoUrl(courseId);
      
      if (!ssoUrl) {
        toast({
          title: 'SSO URL Not Available',
          description: 'Unable to generate Moodle SSO link. Please contact support.',
          variant: 'destructive',
        });
        return;
      }
      
      // Open Moodle in new tab
      window.open(ssoUrl, '_blank', 'noopener,noreferrer');
      
      toast({
        title: 'Opening Course in Moodle',
        description: courseName ? `Redirecting to ${courseName}...` : 'Opening Moodle LMS...',
      });
    } catch (error) {
      console.error('Moodle SSO error:', error);
      toast({
        title: 'Failed to Open Course',
        description: 'Could not connect to Moodle. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoadingMoodle(false);
    }
  };


  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError('');
      try {
        const [profile, myEnrollments, myPayments] = await Promise.all([
          getMyProfile(),
          getMyEnrollments(),
          getMyPayments().catch(() => []) // Don't fail if payments fail
        ]);
        setUser(profile);
        setEnrollments(myEnrollments);
        setPayments(myPayments as Payment[]);
      } catch (err) {
        setError('Unable to load your dashboard right now.');
      } finally {
        setLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">My Learning</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name ?? 'Learner'}</p>
          </div>
          <Link to="/courses">
            <Button variant="outline" className="gap-2"><BookOpen className="h-4 w-4" /> Browse Courses</Button>
          </Link>
        </div>

        {user?.isVerified === false && (
          <div className="mb-6 rounded-xl border border-amber-300/50 bg-amber-50 px-4 py-4 text-amber-900">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                <div>
                  <p className="font-semibold">Verify your email</p>
                  <p className="text-sm text-amber-900/80">
                    Please check your inbox and verify your email to secure your account. You can continue using the site now.
                  </p>
                </div>
              </div>
              <Link to="/verify-email">
                <Button className="bg-amber-600 text-white hover:bg-amber-700">
                  Verify now
                </Button>
              </Link>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">Loading dashboard...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-lg text-destructive">{error}</p>
          </div>
        ) : (
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="orders">Order History</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-10">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card rounded-xl p-5 card-shadow">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{enrollments.length}</div>
                      <div className="text-sm text-muted-foreground">Enrolled Courses</div>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-xl p-5 card-shadow">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Award className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{completed.length}</div>
                      <div className="text-sm text-muted-foreground">Completed</div>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-xl p-5 card-shadow">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{active.length}</div>
                      <div className="text-sm text-muted-foreground">In Progress</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Active Courses */}
              {active.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold font-display text-foreground mb-4">Continue Learning</h2>
                  <div className="space-y-4">
                    {active.map((enrollment, i) => (
                      <motion.div
                        key={enrollment.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-card rounded-xl p-5 card-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1">
                            <Link to={`/courses/${enrollment.course.id}`} className="font-semibold text-foreground hover:text-secondary font-display">
                              {enrollment.course.title}
                            </Link>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />Last accessed: {enrollment.lastAccessed}</span>
                              <span>{enrollment.course.instructor}</span>
                            </div>
                            <div className="mt-3 flex items-center gap-3">
                              <Progress value={enrollment.progress} className="flex-1 h-2" />
                              <span className="text-sm font-semibold text-foreground">{enrollment.progress}%</span>
                            </div>
                          </div>
                          <Button
                            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 whitespace-nowrap"
                            onClick={() => handleMoodleRedirect(enrollment.course.moodleCourseId, enrollment.course.title)}
                            disabled={loadingMoodle}
                          >
                            <ExternalLink className="h-4 w-4" />
                            {loadingMoodle ? 'Loading...' : 'Continue in LMS'}
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* Completed */}
              {completed.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold font-display text-foreground mb-4">Completed Courses</h2>
                  <div className="space-y-4">
                    {completed.map((enrollment, i) => (
                      <motion.div
                        key={enrollment.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-card rounded-xl p-5 card-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Award className="h-5 w-5 text-accent" />
                              <span className="font-semibold text-foreground font-display">{enrollment.course.title}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Completed · {enrollment.course.instructor}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                              onClick={() => handleMoodleRedirect(enrollment.course.moodleCourseId, enrollment.course.title)}
                              disabled={loadingMoodle}
                            >
                              <ExternalLink className="h-3 w-3" /> {loadingMoodle ? 'Loading...' : 'View in LMS'}
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Award className="h-3 w-3" /> Certificate
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {enrollments.length === 0 && (
                <div className="text-center py-20">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Courses Yet</h3>
                  <p className="text-muted-foreground mb-6">Start your learning journey by enrolling in a course!</p>
                  <Link to="/courses">
                    <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      Browse Courses
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            <TabsContent value="orders">
              {payments.length === 0 ? (
                <div className="text-center py-20">
                  <CreditCard className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Orders Yet</h3>
                  <p className="text-muted-foreground">Your purchase history will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {payments.map((payment, i) => {
                    const statusIcon = payment.status === 'completed' ? CheckCircle : payment.status === 'failed' ? XCircle : Clock3;
                    const statusColor = payment.status === 'completed' ? 'text-secondary' : payment.status === 'failed' ? 'text-destructive' : 'text-muted-foreground';
                    const StatusIcon = statusIcon;
                    
                    return (
                      <motion.div
                        key={payment.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-card rounded-xl p-5 card-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-foreground">Order #{payment.id}</span>
                              <div className={`flex items-center gap-1 text-xs ${statusColor}`}>
                                <StatusIcon className="h-3.5 w-3.5" />
                                <span className="capitalize">{payment.status}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(payment.created_at).toLocaleDateString()} · via {payment.gateway}
                            </p>
                            {payment.order_items && payment.order_items.length > 0 && (
                              <div className="mt-2 text-sm text-foreground">
                                {payment.order_items.map((item, idx) => (
                                  <div key={idx}>• {item.course_title ?? 'Course'}</div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-foreground">
                              {formatPrice(Number(payment.amount), payment.currency)}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
