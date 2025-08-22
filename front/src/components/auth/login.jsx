import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Heart, Utensils, MapPin, Clock, Star, ChefHat, Award, Users, Sparkles, TrendingUp, Menu, X, Bell, Search, User, ShoppingBag } from 'lucide-react';

// Utility function for class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', href: '#', active: true },
    { name: 'Restaurantes', href: '#' },
    { name: 'Reservas', href: '#' },
    { name: 'Ofertas', href: '#' },
    { name: 'Contacto', href: '#' }
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-white/20" 
        : "bg-white/80 backdrop-blur-lg"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent">
                Quovi
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Tu mesa perfecta</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105",
                  item.active 
                    ? "text-amber-600" 
                    : "text-gray-600 hover:text-amber-600"
                )}
              >
                {item.name}
                {item.active && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            
            {/* Search */}
            <button className="hidden sm:flex items-center justify-center w-9 h-9 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 hover:scale-110">
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className="relative flex items-center justify-center w-9 h-9 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 hover:scale-110">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                3
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-2xl">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                  item.active 
                    ? "text-amber-600 bg-amber-50" 
                    : "text-gray-600 hover:text-amber-600 hover:bg-amber-50"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            
            {/* Mobile search */}
            <div className="pt-4 border-t border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar restaurantes..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// ConfettiButton Component
const ConfettiButton = ({ children, onClick, loading, className, ...props }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!window.confetti) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js";
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  const triggerConfetti = (e) => {
    if (scriptLoaded && window.confetti) {
      const rect = e.target.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
        colors: ['#F59E0B', '#EAB308', '#3B82F6', '#1D4ED8', '#F97316', '#FB923C']
      });
      
      setTimeout(() => {
        window.confetti({
          particleCount: 50,
          spread: 50,
          origin: { x: x - 0.1, y },
          colors: ['#F59E0B', '#EAB308', '#3B82F6']
        });
      }, 250);
    }
    onClick && onClick(e);
  };

  return (
    <button
      onClick={triggerConfetti}
      disabled={loading}
      className={cn(
        "relative w-full py-4 px-6 bg-gradient-to-r from-amber-400 via-orange-400 to-blue-500 text-white font-semibold rounded-2xl",
        "shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300",
        "focus:outline-none focus:ring-4 focus:ring-amber-300",
        "active:scale-95 overflow-hidden group",
        loading && "cursor-not-allowed opacity-75",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Iniciando sesión...
          </>
        ) : (
          <>
            <Utensils className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            {children}
          </>
        )}
      </span>
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </div>
    </button>
  );
};

// Enhanced Login Form Component
const EnhancedLoginForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.password) newErrors.password = 'Contraseña requerida';
    else if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({ ...formData, rememberMe });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-2xl animate-pulse" />
          <div className="relative bg-gradient-to-br from-amber-400 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
            <Utensils className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
            ¡Bienvenido!
          </span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Inicia sesión para continuar
        </p>
      </div>

      <div className="space-y-6">
        {/* Email Input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-500" />
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="tu@email.com"
              className={cn(
                "w-full px-4 py-4 bg-white border-2 rounded-2xl transition-all duration-300 outline-none",
                "placeholder:text-gray-400 text-gray-800",
                focusedField === 'email' 
                  ? "border-amber-400 shadow-xl shadow-amber-400/25 scale-[1.02] bg-amber-50/30" 
                  : errors.email
                  ? "border-red-400 bg-red-50/30"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-md"
              )}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 animate-shake">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              placeholder="••••••••"
              className={cn(
                "w-full px-4 py-4 pr-14 bg-white border-2 rounded-2xl transition-all duration-300 outline-none",
                "placeholder:text-gray-400 text-gray-800",
                focusedField === 'password' 
                  ? "border-blue-400 shadow-xl shadow-blue-400/25 scale-[1.02] bg-blue-50/30" 
                  : errors.password
                  ? "border-red-400 bg-red-50/30"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-md"
              )}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 animate-shake">{errors.password}</p>
            )}
          </div>
        </div>

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only"
              />
              <div className={cn(
                "w-6 h-6 rounded-lg border-2 transition-all duration-300 flex items-center justify-center transform group-hover:scale-110",
                rememberMe 
                  ? "bg-gradient-to-r from-amber-400 to-orange-500 border-amber-500 shadow-lg" 
                  : "border-gray-300 group-hover:border-amber-400 group-hover:shadow-md"
              )}>
                {rememberMe && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors font-medium">
              Recordarme
            </span>
          </label>
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-800 transition-all duration-200 font-semibold hover:underline hover:scale-105"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Submit Button */}
        <ConfettiButton 
          loading={loading} 
          onClick={handleSubmit}
          className="mt-8"
        >
          Iniciar Sesión
        </ConfettiButton>

        {/* Divider */}
        <div className="relative flex items-center py-6">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-sm text-gray-500 bg-white">o continúa con</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105 hover:shadow-md">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="ml-2 text-sm font-medium text-gray-700">Google</span>
          </button>
          <button className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105 hover:shadow-md">
            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="ml-2 text-sm font-medium text-gray-700">Facebook</span>
          </button>
        </div>

        {/* Sign up link */}
        <div className="text-center pt-6">
          <div className="bg-gradient-to-r from-gray-50 to-amber-50 rounded-2xl p-6 border border-gray-100">
            <span className="text-gray-600">¿No tienes cuenta? </span>
            <button
              type="button"
              className="text-amber-600 hover:text-amber-800 font-semibold transition-all duration-200 hover:underline hover:scale-105 inline-flex items-center gap-1"
            >
              Crear cuenta gratis
              <TrendingUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Right side content component
const RightSideContent = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    {
      icon: Clock,
      title: "Reservas Instantáneas",
      description: "Reserva tu mesa favorita en segundos, sin esperas ni complicaciones.",
      color: "from-amber-400 to-orange-500"
    },
    {
      icon: Star,
      title: "Experiencias Premium",
      description: "Accede a los mejores restaurantes y experiencias gastronómicas únicas.",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: Heart,
      title: "Momentos Especiales",
      description: "Crea recuerdos inolvidables en cada visita con nuestras recomendaciones personalizadas.",
      color: "from-pink-400 to-red-500"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [features.length]);

  const stats = [
    { number: "1,200+", label: "Restaurantes", icon: ChefHat },
    { number: "4.9/5", label: "Calificación", icon: Star },
    { number: "50,000+", label: "Usuarios Felices", icon: Users }
  ];

  return (
    <div className="h-full flex flex-col justify-center p-8 lg:p-12">
      <div className="max-w-2xl mx-auto text-center space-y-12">
        
        {/* Main heading */}
        <div className="space-y-6">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-600 bg-clip-text text-transparent block">
              Descubre
            </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block">
              Sabores
            </span>
            <span className="text-gray-800 block">
              Únicos
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
            Tu próxima aventura gastronómica comienza aquí. Conecta con los mejores restaurantes y vive experiencias inolvidables.
          </p>
        </div>

        {/* Animated feature showcase */}
        <div className="relative">
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-2xl">
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "transition-all duration-500",
                  index === currentFeature ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute inset-0 p-8"
                )}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl bg-gradient-to-r flex items-center justify-center shadow-xl",
                    feature.color
                  )}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
            
            {/* Progress indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeature(index)}
                  className={cn(
                    "transition-all duration-300",
                    index === currentFeature 
                      ? "w-8 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" 
                      : "w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group text-center space-y-3 hover:scale-110 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-amber-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-xl transition-shadow duration-300">
                <stat.icon className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.number}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-amber-50 to-blue-50 rounded-3xl p-8 border border-white/40">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            ¿Listo para comenzar?
          </h3>
          <p className="text-gray-600 mb-6">
            Únete a miles de usuarios que ya han descubierto su restaurante favorito
          </p>
          <div className="flex justify-center space-x-4">
            <div className="flex -space-x-2">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full border-2 border-white flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              <div className="font-semibold">+50,000 usuarios</div>
              <div>Se han unido este mes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Floating elements
const FloatingElements = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const foodEmojis = ['🍽️', '🥘', '🍷', '⭐', '🧡', '💙', '✨', '🎯', '🏆', '💫'];
    const newParticles = foodEmojis.map((emoji, i) => ({
      id: i,
      emoji,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.5,
      duration: 3 + Math.random() * 2,
      size: 1.5 + Math.random() * 1
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute opacity-10 animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            fontSize: `${particle.size}rem`
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
};

// Main component
const EnhancedLogin = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (formData) => {
    setLoading(true);
    
    // Simulación de llamada API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Login data:', formData);
    setLoading(false);
    alert('¡Bienvenido a Quovi! 🍽️✨');
  };

  return (
    <div className={cn(
      "min-h-screen relative overflow-hidden transition-all duration-1000",
      pageLoaded ? "opacity-100" : "opacity-0"
    )}>
      {/* Navbar */}
      <Navbar />

      {/* Fondo con gradientes mejorados */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-blue-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100/40 via-transparent to-blue-100/40" />
        
        {/* Efectos de luz animados */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-32 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute bottom-40 left-32 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        </div>

        {/* Patrón de puntos sutil */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Elementos flotantes */}
      <FloatingElements />

      {/* Layout principal mejorado */}
      <div className="relative z-10 flex flex-col xl:flex-row min-h-screen pt-16">
        
        {/* Panel izquierdo - Formulario */}
        <div className={cn(
          "xl:w-2/5 flex items-center justify-center p-6 lg:p-8 transition-all duration-1000",
          pageLoaded ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="w-full max-w-md relative">
            {/* Glassmorphism container mejorado */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-white/50 rounded-3xl" />
            <div className="relative z-10 p-8 lg:p-10">
              <EnhancedLoginForm onSubmit={handleLogin} loading={loading} />
            </div>
          </div>
        </div>

        {/* Panel derecho - Contenido mejorado */}
        <div className={cn(
          "xl:w-3/5 transition-all duration-1000",
          pageLoaded ? "translate-x-0" : "translate-x-full"
        )}>
          <RightSideContent />
        </div>
      </div>

      {/* Footer mejorado */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-white/90 backdrop-blur-xl rounded-full px-8 py-4 border border-white/50 shadow-2xl">
          <p className="text-gray-600 text-sm text-center flex items-center gap-2">
            © 2024 Quovi. Hecho con <Heart className="w-4 h-4 text-red-500 animate-pulse" /> para los amantes de la buena comida
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedLogin