import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { KeyRound, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { resetPassword } from '@/lib/api/auth';

const ResetPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const canSubmit = token.trim() && newPassword.trim() && confirmPassword.trim();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || loading) return;

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please confirm your new password.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token.trim(), newPassword);
      toast({
        title: 'Password reset successful',
        description: 'You can now log in with your new password.',
      });
      setTimeout(() => navigate('/login'), 1200);
    } catch (error) {
      console.error('Reset password error:', error);
      toast({
        title: 'Reset failed',
        description: 'Please check the token and try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-md px-4 py-12">
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-foreground mb-2">Reset Password</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Paste your reset token and choose a new password.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Reset token"
                className="pl-10"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
            <Input
              placeholder="New password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              placeholder="Confirm new password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold"
              type="submit"
              disabled={!canSubmit || loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-secondary hover:underline inline-flex items-center gap-1">
              Back to Login <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
