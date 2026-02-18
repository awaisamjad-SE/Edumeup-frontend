import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MailCheck, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { getMyProfile, resendVerification, verifyEmail } from '@/lib/api/auth';
import { tokenStore } from '@/lib/api/client';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [autoResent, setAutoResent] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    }

    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const loadProfile = async () => {
      if (!tokenStore.getAccessToken()) return;
      try {
        const profile = await getMyProfile();
        if (profile.email) {
          setEmail(profile.email);
        }
      } catch (error) {
        console.error('Failed to load profile for email verification:', error);
      }
    };

    void loadProfile();
  }, []);

  useEffect(() => {
    const sendAutoResend = async () => {
      if (!email.trim() || autoResent || resending) return;
      setResending(true);
      try {
        await resendVerification(email.trim());
        setAutoResent(true);
        toast({
          title: 'Verification email sent',
          description: 'Please check your inbox for the new verification email.',
        });
      } catch (error) {
        console.error('Auto resend verification failed:', error);
      } finally {
        setResending(false);
      }
    };

    void sendAutoResend();
  }, [email, autoResent, resending, toast]);

  const handleVerify = async () => {
    if (!token.trim() || verifying) return;
    setVerifying(true);
    try {
      await verifyEmail(token.trim());
      toast({
        title: 'Email verified',
        description: 'Thanks! Your email is verified now.',
      });
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (error) {
      console.error('Verify email failed:', error);
      toast({
        title: 'Verification failed',
        description: 'Please check the token and try again.',
        variant: 'destructive',
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!email.trim() || resending) {
      toast({
        title: 'Email required',
        description: 'Please enter your email to resend the verification.',
        variant: 'destructive',
      });
      return;
    }
    setResending(true);
    try {
      await resendVerification(email.trim());
      toast({
        title: 'Verification email sent',
        description: 'Please check your inbox for the new verification email.',
      });
    } catch (error) {
      console.error('Resend verification failed:', error);
      toast({
        title: 'Resend failed',
        description: 'Unable to resend right now. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-xl px-4 py-12">
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <MailCheck className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Verify your email</h1>
              <p className="text-sm text-muted-foreground">Confirm your account to keep it secure.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Verification token</label>
              <Input
                value={token}
                onChange={(event) => setToken(event.target.value)}
                placeholder="Paste the token from your email"
                className="mt-1"
              />
            </div>

            <Button
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
              onClick={handleVerify}
              disabled={!token.trim() || verifying}
            >
              {verifying ? 'Verifying...' : 'Verify now'}
            </Button>

            <div className="border-t border-border pt-4 space-y-3">
              <p className="text-sm text-muted-foreground">Did not receive the email?</p>
              <div>
                <label className="text-sm font-medium text-foreground">Email address</label>
                <Input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="mt-1"
                />
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleResend}
                disabled={resending}
              >
                <Mail className="h-4 w-4 mr-2" />
                {resending ? 'Sending...' : 'Resend verification email'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyEmail;
