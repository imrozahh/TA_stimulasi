import React, { useState, useEffect } from 'react';

export function Login({ onLogin }) {
  const [email, setEmail] = useState('educator@school.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  // Generate random 5-character alphanumeric captcha
  const generateNewCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput('');
    setCaptchaError('');
  };

  useEffect(() => {
    generateNewCaptcha();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      setCaptchaError('Kode captcha tidak cocok. Silakan coba lagi.');
      generateNewCaptcha();
      return;
    }

    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-0 overflow-hidden bg-[#f9f9ff] font-['Poppins',sans-serif]">
      {/* Main Layout Container */}
      <div className="flex w-full max-w-[1440px] h-full md:h-screen bg-[#f9f9ff] overflow-hidden shadow-2xl md:shadow-none">

        {/* Left Side: Educational Illustration & Branding */}
        <div className="hidden md:flex relative w-1/2 flex-col justify-center items-center bg-[#2c72d9] p-12 overflow-hidden">

          <div className="relative z-10 text-center flex flex-col items-center">
            <div className="mb-8 animate-float">
              <img
                className="w-80 h-80 object-contain"
                alt="3D educational blocks and glowing stars illustration"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDatYC3ny7quZapN1UrycSgR65FyO3iAlcxcCaT0xZnykxRRiWu7QpIWjwC7JqzYEUQ-AOFZV53KcWqGuf_41fNSP6y8a-HT6WEJEj4M4BoCtx5JXJu0Ahj_JMjVQW63a1eZbqdVssVeEJV0JD7k01-UTJzziqCQtOg5tvQwozs3QfJVtlqsrxbWK_0LbggdoUSmjUX6hQGEWdskzjKo6rYma6F23J0XgG7D0znWjverOMrXODnkXjT8V6NOaqgjWcvjxjfO_uPL3Lx"
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#fefcff] mb-4 tracking-tight leading-tight">
              Nurturing Potential
            </h1>

            <p className="text-base text-[#d7e2ff] max-w-md opacity-90 leading-relaxed">
              Advanced analytics and personalized growth tracking for the next generation of learners.
            </p>

            {/* Status Badge Preview */}
            <div className="mt-8 flex gap-4">
              <div className="bg-[#8bf7cd]/20 backdrop-blur-md px-6 py-2 rounded-full flex items-center gap-2 border border-[#8bf7cd]/30">
                <span className="material-symbols-outlined text-[#8bf7cd] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                <span className="text-xs text-[#8bf7cd] uppercase tracking-wider font-semibold">
                  Predictive Insights
                </span>
              </div>
            </div>
          </div>

          {/* Absolute decorative glow elements */}
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#0059ba]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#006c50]/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Right Side: Minimalist Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-6 sm:p-8 md:p-12 relative overflow-y-auto">

          {/* Mobile Header (Visible only on small screens) */}
          <div className="md:hidden flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-[#0059ba] rounded-xl flex items-center justify-center mb-2 shadow-lg shadow-[#0059ba]/20">
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
            </div>
            <h2 className="text-2xl text-[#0059ba] font-bold">B-Star</h2>
          </div>

          <div className="w-full max-w-[400px]">
            {/* Form Header */}
            <div className="mb-6 hidden md:block">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-10 h-10 bg-[#0059ba] rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                </div>
                <span className="text-3xl text-[#0059ba] font-bold tracking-tight">B-Star</span>
              </div>
              <p className="text-xs text-[#727784] font-medium uppercase tracking-widest mt-1">
                Academic Growth Prediction System
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#111c2d] mb-1">Welcome Back</h2>
              <p className="text-sm text-[#424753]">Enter your credentials to access the educator dashboard.</p>
            </div>

            {/* Login Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#424753] ml-1" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#727784]">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@school.edu"
                    className="w-full pl-10 pr-4 py-3 bg-[#f0f3ff] border border-[#c2c6d5] rounded-xl focus:ring-2 focus:ring-[#0059ba]/20 focus:border-[#0059ba] outline-none transition-all text-sm text-[#111c2d] placeholder:text-[#727784]/60"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-semibold text-[#424753]" htmlFor="password">
                    Password
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Demo: Gunakan password apa saja untuk masuk'); }} className="text-xs text-[#0059ba] hover:underline transition-all font-medium">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#727784]">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-[#f0f3ff] border border-[#c2c6d5] rounded-xl focus:ring-2 focus:ring-[#0059ba]/20 focus:border-[#0059ba] outline-none transition-all text-sm text-[#111c2d] placeholder:text-[#727784]/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#727784] hover:text-[#0059ba] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Security Verification / Captcha */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-semibold text-[#424753]" htmlFor="captcha">
                    Security Verification
                  </label>
                  <span className="text-[11px] text-[#727784]">Enter code below</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Captcha Display Box */}
                  <div className="relative flex-1 h-12 bg-gradient-to-r from-[#dee8ff] via-[#e7eeff] to-[#f0f3ff] border border-[#c2c6d5] rounded-xl flex items-center justify-center select-none overflow-hidden tracking-widest font-mono font-bold text-lg text-[#0059ba] shadow-inner">
                    {/* Noise & distortion lines */}
                    <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#0059ba_1px,transparent_1px)] [background-size:8px_8px]" />
                    <div className="absolute w-full h-[1.5px] bg-[#0059ba]/30 rotate-2 pointer-events-none" />
                    <div className="absolute w-full h-[1.5px] bg-[#006c50]/30 -rotate-2 pointer-events-none" />

                    {/* Skewed characters */}
                    <span className="relative z-10 flex gap-2 font-black italic tracking-widest text-[#0059ba] text-xl drop-shadow-xs">
                      {captchaCode.split('').map((char, index) => (
                        <span
                          key={index}
                          style={{
                            transform: `rotate(${((index % 3) - 1) * 6}deg) translateY(${((index % 2) - 0.5) * 3}px)`,
                            display: 'inline-block'
                          }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  </div>

                  {/* Refresh Button */}
                  <button
                    type="button"
                    onClick={generateNewCaptcha}
                    title="Generate new captcha code"
                    className="h-12 w-12 rounded-xl bg-[#f0f3ff] hover:bg-[#dee8ff] border border-[#c2c6d5] text-[#0059ba] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  >
                    <span className="material-symbols-outlined text-[22px]">refresh</span>
                  </button>
                </div>

                {/* Captcha Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#727784]">
                    <span className="material-symbols-outlined text-[20px]">verified_user</span>
                  </div>
                  <input
                    id="captcha"
                    type="text"
                    required
                    value={captchaInput}
                    onChange={(e) => {
                      setCaptchaInput(e.target.value.toUpperCase());
                      setCaptchaError('');
                    }}
                    placeholder="Enter 5-character code"
                    maxLength={5}
                    className={`w-full pl-10 pr-4 py-2.5 bg-[#f0f3ff] border rounded-xl focus:ring-2 focus:ring-[#0059ba]/20 focus:border-[#0059ba] outline-none transition-all text-sm font-mono tracking-widest text-[#111c2d] placeholder:text-[#727784]/60 placeholder:font-sans placeholder:tracking-normal ${
                      captchaError ? 'border-[#ba1a1a] bg-[#ffdad6]/20' : 'border-[#c2c6d5]'
                    }`}
                  />
                </div>

                {captchaError && (
                  <p className="text-[11px] text-[#ba1a1a] px-1 font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    {captchaError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#0059ba] hover:bg-[#004492] text-white font-semibold text-base py-3 rounded-xl shadow-lg shadow-[#0059ba]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Sign In</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </form>

            {/* Footer / Alternative Login */}
            <div className="mt-8">
              {/* Optional footer notes */}
            </div>
          </div>

          {/* Footer Legal */}
          <div className="mt-8 text-center">
            <p className="text-[11px] text-[#727784]">
              © {new Date().getFullYear()} B-Star ECD Systems. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
