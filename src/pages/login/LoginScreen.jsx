import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';
import { useState } from 'react';
import kingcomLogo from '../../assets/kingcom-logo.svg';

export default function LoginScreen({ error, onLogin }) {
  const [username, setUsername] = useState(() => window.localStorage.getItem('kingcom.rememberedLogin') || '');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(() => Boolean(window.localStorage.getItem('kingcom.rememberedLogin')));
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      if (rememberMe) {
        window.localStorage.setItem('kingcom.rememberedLogin', username.trim());
      } else {
        window.localStorage.removeItem('kingcom.rememberedLogin');
      }
      await onLogin({ username, password });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#eef8f7] text-slate-900">
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#009f98]/20 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#007f7b]/15 blur-3xl" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-2xl shadow-[#007f7b]/15 lg:grid-cols-[0.95fr_1.05fr]">
          <aside className="relative hidden min-h-[620px] bg-[#007f7b] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.14),transparent_32%)]" />
            <div className="relative">
              <div className="flex items-center gap-4">
                <img src={kingcomLogo} alt="Kingcom Vietnam" className="h-16 w-16 rounded-2xl bg-white/10 object-cover shadow-lg" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Kingcom Vietnam</p>
                  <h1 className="mt-1 text-2xl font-bold">Inventory Sync</h1>
                </div>
              </div>

              <div className="mt-16">
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/60">Admin Portal</p>
                <h2 className="mt-4 max-w-sm text-4xl font-semibold leading-tight">
                  Đồng bộ tồn kho Haravan chính xác và an toàn.
                </h2>
                <p className="mt-5 max-w-md text-base leading-7 text-white/75">
                  Đăng nhập để kiểm tra tồn HCM, HN, đối chiếu SKU và thực hiện đồng bộ theo quyền được cấp.
                </p>
              </div>
            </div>

            <div className="relative grid gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">Bảo mật nội bộ</p>
                    <p className="text-sm text-white/65">Phiên đăng nhập được xác thực qua BE API.</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <form onSubmit={handleSubmit} className="flex min-h-[620px] flex-col justify-center px-5 py-8 sm:px-10 lg:px-14">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8 flex items-center gap-4 lg:hidden">
                <img src={kingcomLogo} alt="Kingcom Vietnam" className="h-14 w-14 rounded-2xl object-cover shadow-md shadow-[#007f7b]/20" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#007f7b]">Kingcom Vietnam</p>
                  <p className="text-lg font-bold text-slate-900">Inventory Sync</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#007f7b]/15 bg-[#007f7b]/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#007f7b]">
                  <LockKeyhole className="h-3.5 w-3.5" />
                  Secure Login
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-950">Đăng nhập</h1>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Dùng tài khoản nội bộ để truy cập hệ thống đồng bộ tồn kho Kingcom.
                </p>
              </div>

              {error && (
                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              <label className="mb-4 block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Email hoặc tài khoản</span>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-11 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#007f7b] focus:bg-white focus:ring-4 focus:ring-[#007f7b]/10"
                    autoComplete="username"
                    placeholder="admin@company.com"
                  />
                </div>
              </label>

              <label className="mb-4 block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Mật khẩu</span>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-11 pr-12 text-sm font-medium text-slate-900 outline-none transition focus:border-[#007f7b] focus:bg-white focus:ring-4 focus:ring-[#007f7b]/10"
                    autoComplete="current-password"
                    placeholder="Nhập mật khẩu"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-200/70 hover:text-slate-800"
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>

              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#007f7b] focus:ring-[#007f7b]"
                  />
                  Ghi nhớ tài khoản
                </label>
                <span className="text-xs font-medium text-slate-400">Kingcom Admin</span>
              </div>

              <button
                type="submit"
                disabled={submitting || !username.trim() || !password}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#007f7b] px-5 text-sm font-bold text-white shadow-lg shadow-[#007f7b]/25 transition hover:bg-[#006d69] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                {!submitting && <ArrowRight className="h-4 w-4" />}
              </button>

              <p className="mt-6 text-center text-xs text-slate-400">
                © {new Date().getFullYear()} Kingcom Vietnam. Internal use only.
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
