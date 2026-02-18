import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, BookOpen, LogOut, UserCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { Button } from '@/components/ui/button';
import { tokenStore } from '@/lib/api/client';
import { logout } from '@/lib/api/auth';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const itemCount = useCartStore(s => s.itemCount());
  const refreshCart = useCartStore(s => s.refresh);
  const initialized = useCartStore(s => s.initialized);
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthed, setIsAuthed] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'Our Story' },
    { to: '/courses', label: 'Courses' },
    { to: '/dashboard', label: 'My Learning', authRequired: true },
    { to: '/profile', label: 'Profile', authRequired: true },
  ];

  useEffect(() => {
    const loadCart = async () => {
      const hasToken = Boolean(tokenStore.getAccessToken());
      if (hasToken && !initialized) {
        await refreshCart();
      }
    };
    void loadCart();
  }, [refreshCart, initialized]);

  useEffect(() => {
    setIsAuthed(Boolean(tokenStore.getAccessToken()));
    const handleStorage = () => {
      setIsAuthed(Boolean(tokenStore.getAccessToken()));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    setIsAuthed(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 glass-header">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-heading text-foreground">EduMeUp</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => {
            if (link.authRequired && !isAuthed) return null;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground">
                {itemCount}
              </span>
            )}
          </Link>
          {isAuthed ? (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/profile">
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-2"
                >
                  <UserCircle className="h-4 w-4" />
                  Profile
                </Button>
              </Link>
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" className="hidden md:flex gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                <User className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-3">
          {navLinks.map(link => {
            if (link.authRequired && !isAuthed) return null;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-medium text-foreground hover:text-primary py-2"
              >
                {link.label}
              </Link>
            );
          })}
          {isAuthed ? (
            <div className="space-y-2 mt-2">
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                <Button size="sm" variant="ghost" className="w-full gap-2">
                  <UserCircle className="h-4 w-4" />
                  Profile
                </Button>
              </Link>
              <Button size="sm" variant="outline" className="w-full gap-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <Button size="sm" className="w-full mt-2 gap-2 bg-primary text-primary-foreground">
                <User className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
