import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, Mail, Tag, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCartStore } from '@/lib/cart-store';
import { motion, AnimatePresence } from 'framer-motion';
import { createOrder, validateCoupon } from '@/lib/api/payments';
import { autoRegisterGuest, login } from '@/lib/api/auth';
import { tokenStore } from '@/lib/api/client';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const { items, total, clearCart, refresh, loading, syncGuestCartToServer } = useCartStore();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('check_payment');
  const [error, setError] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!tokenStore.getAccessToken());

  const isValid = isAuthenticated || (email.trim() !== '' && phone.trim() !== '');

  const handlePayment = async () => {
    if (!isValid) return;
    setProcessing(true);
    setError('');
    
    try {
      // If user is not authenticated, register them first
      if (!isAuthenticated) {
        try {
          const { password } = await autoRegisterGuest(email, phone);
          setGeneratedPassword(password);
          
          // Auto-login the newly registered user
          await login(email, password);
          setIsAuthenticated(true);
          
          // Sync guest cart to server
          await syncGuestCartToServer();
          
        } catch (regError: any) {
          if (regError?.message?.includes('already exists') || regError?.message?.includes('duplicate')) {
            // User already exists, try to show helpful message
            setError('An account with this email already exists. Please login first.');
            return;
          }
          throw regError;
        }
      }
      
      // Process payment
      const response = await createOrder(paymentMethod);
      if (response?.redirect_url) {
        window.location.href = response.redirect_url;
        return;
      }
      
      setSuccess(true);
      await clearCart();
      setTimeout(() => navigate('/dashboard'), 2500);
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err?.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const paymentMethods = [
    { id: 'check_payment', label: 'Check Payment', icon: '🧾' },
    { id: 'payfast', label: 'PayFast', icon: '💳' },
    { id: 'manual', label: 'Manual', icon: '🏦' },
  ];

  useEffect(() => {
    void refresh();
  }, [refresh]);

  if (!loading && items.length === 0 && !success) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <CheckCircle className="h-20 w-20 text-secondary mx-auto mb-6" />
              <h1 className="text-3xl font-bold font-display text-foreground mb-3">Payment Successful!</h1>
              <p className="text-muted-foreground mb-2">You've been enrolled in your courses.</p>
              {generatedPassword && (
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 max-w-md mx-auto mt-4 mb-4">
                  <div className="flex items-center gap-2 mb-2 text-accent font-semibold">
                    <Mail className="h-4 w-4" />
                    <span>Your Account Credentials</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Email: <strong>{email}</strong></p>
                  <p className="text-sm text-muted-foreground mb-2">Password: <strong className="font-mono">{generatedPassword}</strong></p>
                  <p className="text-xs text-muted-foreground">
                    ⚠️ Please save these credentials. We've also sent them to your email.
                  </p>
                </div>
              )}
              <p className="text-sm text-muted-foreground">Redirecting to your dashboard...</p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl font-bold font-display text-foreground mb-8">Checkout</h1>

              {!isAuthenticated && (
                <div className="bg-card rounded-xl p-6 card-shadow mb-6 space-y-4">
                  <h2 className="font-bold text-foreground flex items-center gap-2">
                    <Lock className="h-4 w-4 text-secondary" /> Your Details
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    We'll create an account for you and send the password to your email.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Email *</label>
                      <Input placeholder="your@email.com" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Phone Number *</label>
                      <Input placeholder="+1234567890" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {isAuthenticated && (
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
                  <p className="text-sm text-foreground">
                    ✓ You're logged in and ready to complete your purchase!
                  </p>
                </div>
              )}

              <div className="bg-card rounded-xl p-6 card-shadow mb-6 space-y-4">
                <h2 className="font-bold text-foreground flex items-center gap-2"><CreditCard className="h-4 w-4 text-secondary" /> Payment Method</h2>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                        paymentMethod === m.id
                          ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                          : 'border-border hover:border-muted-foreground/30'
                      }`}
                    >
                      <span className="text-2xl">{m.icon}</span>
                      <span className="font-medium text-foreground text-sm">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 card-shadow mb-6">
                <h2 className="font-bold text-foreground mb-3">Order Summary</h2>
                <div className="space-y-2 text-sm">
                  {items.map(item => (
                    <div key={item.course.id} className="flex justify-between text-muted-foreground">
                      <span className="truncate pr-4">{item.course.title}</span>
                      <span className="font-medium text-foreground flex-shrink-0">${item.course.price}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 mt-2 flex justify-between">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="font-bold text-foreground text-lg">${total().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {error && <p className="text-sm text-destructive mb-4">{error}</p>}
              <Button
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-2"
                size="lg"
                onClick={handlePayment}
                disabled={processing || !isValid}
              >
                <CreditCard className="h-4 w-4" />
                {processing ? 'Processing...' : `Pay $${total().toFixed(2)} via ${paymentMethods.find(m => m.id === paymentMethod)?.label}`}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
