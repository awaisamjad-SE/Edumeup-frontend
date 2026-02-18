import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCartStore } from '@/lib/cart-store';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { formatPrice } from '@/lib/utils';

const Cart = () => {
  const { items, removeItem, clearCart, total, refresh, loading, error } = useCartStore();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    void refresh();
  }, [refresh]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-lg text-muted-foreground">Loading your cart...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-lg text-destructive">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold font-display text-foreground mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">Browse our courses and add them to your cart.</p>
          <Link to="/courses"><Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">Browse Courses <ArrowRight className="h-4 w-4" /></Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold font-display text-foreground mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={item.course.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 bg-card rounded-xl p-4 card-shadow"
              >
                <div className="w-24 h-16 rounded-lg hero-gradient flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="h-6 w-6 text-secondary/40" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link to={`/courses/${item.course.id}`} className="font-semibold text-foreground hover:text-secondary text-sm line-clamp-1">
                    {item.course.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">{item.course.instructor}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-foreground">
                    {formatPrice(item.course.displayPrice ?? item.course.price, item.course.displayCurrency)}
                  </div>
                  {item.course.originalPrice && (
                    <div className="text-xs text-muted-foreground line-through">
                      {formatPrice(item.course.originalPrice, item.course.displayCurrency)}
                    </div>
                  )}
                </div>
                <button onClick={() => void removeItem(item.course.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>

          <div>
            <div className="bg-card rounded-xl p-6 card-shadow sticky top-24 space-y-4">
              <h2 className="font-bold text-foreground font-display text-lg">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({items.length} items)</span>
                  <span>{formatPrice(total(), items[0]?.course.displayCurrency)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Discount</span>
                  <span className="text-secondary">
                    -{formatPrice(items.reduce((sum, i) => sum + ((i.course.originalPrice || i.course.price) - i.course.price), 0), items[0]?.course.displayCurrency)}
                  </span>
                </div>
              </div>
              <div className="border-t border-border pt-3 flex justify-between items-center">
                <span className="font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-foreground">
                  {formatPrice(total(), items[0]?.course.displayCurrency)}
                </span>
              </div>
              <Link to="/checkout">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-2" size="lg">
                  Proceed to Checkout <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={() => void clearCart()}>
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
