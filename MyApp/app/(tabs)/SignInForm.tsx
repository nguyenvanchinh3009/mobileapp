import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn, Chrome, Apple } from "lucide-react";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Đăng nhập:", { email, password });
      alert("Welcome to Game Hub! 🎮");
    }
  };

  return (
    <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8 lg:p-12 relative z-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 rounded-full mb-6 shadow-lg shadow-cyan-500/30">
            <span className="text-sm text-white">🎁 Tặng 1000 coins khi đăng ký</span>
          </div>
          <h2 className="mb-3 text-white">Đăng nhập vào Game Hub</h2>
          <p className="text-gray-400">
            Chưa có tài khoản?{" "}
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Tạo tài khoản miễn phí
            </a>
          </p>
        </div>

        {/* Quick Login Options */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button className="flex items-center justify-center gap-2 px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500/50 hover:bg-slate-800 transition-all group">
            <Chrome className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl hover:border-purple-500/50 hover:bg-slate-800 transition-all group">
            <Apple className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Apple</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-slate-950 text-gray-500">hoặc với email</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-gray-300">
              Email
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-12 pr-4 py-3.5 bg-slate-900 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-white placeholder:text-gray-600 ${
                  errors.email ? "border-red-500" : "border-slate-800 hover:border-slate-700"
                }`}
                placeholder="your@email.com"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-gray-300">
              Mật khẩu
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-12 pr-12 py-3.5 bg-slate-900 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-white placeholder:text-gray-600 ${
                  errors.password ? "border-red-500" : "border-slate-800 hover:border-slate-700"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-400">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 text-cyan-600 bg-slate-900 border-slate-700 rounded focus:ring-cyan-500"
              />
              <span className="ml-2 text-sm text-gray-400 group-hover:text-gray-300">Ghi nhớ tôi</span>
            </label>
            <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
              Quên mật khẩu?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl hover:from-cyan-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 flex items-center justify-center gap-2 group"
          >
            <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span className="text-lg">Đăng nhập</span>
          </button>
        </form>

        {/* Featured Games Quick Access */}
        <div className="mt-10 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-5">
          <h3 className="text-sm mb-3 text-gray-400">Đang hot 🔥</h3>
          <div className="flex gap-3">
            <div className="flex-1 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg p-3 text-center cursor-pointer hover:scale-105 transition-transform">
              <div className="text-2xl mb-1">🎮</div>
              <div className="text-xs text-white">Battle</div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg p-3 text-center cursor-pointer hover:scale-105 transition-transform">
              <div className="text-2xl mb-1">🏰</div>
              <div className="text-xs text-white">Strategy</div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-3 text-center cursor-pointer hover:scale-105 transition-transform">
              <div className="text-2xl mb-1">⚔️</div>
              <div className="text-xs text-white">RPG</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-600">
            Bằng việc đăng nhập, bạn đồng ý với{" "}
            <a href="#" className="text-cyan-400 hover:text-cyan-300">Điều khoản dịch vụ</a>
          </p>
        </div>
      </div>
    </div>
  );
}
