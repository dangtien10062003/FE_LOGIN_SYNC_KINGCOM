import { useEffect, useState } from 'react';
import { appConfig } from './config/appConfig.js';
import LoginScreen from './pages/login/LoginScreen.jsx';
import { getCurrentUser, login } from './services/backendApi.js';

function buildAdminUrl(token) {
  if (!token) return appConfig.adminUrl;

  const url = new URL(appConfig.adminUrl);
  url.hash = `auth_token=${encodeURIComponent(token)}`;
  return url.toString();
}

function consumeLogoutSignalFromHash() {
  const hash = window.location.hash.replace(/^#/, '');
  const params = new URLSearchParams(hash);

  if (params.get('logout') !== '1') return;

  window.localStorage.removeItem(appConfig.authTokenStorageKey);
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
}

function LoadingScreen({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#eef8f7] px-4 text-sm font-semibold text-[#007f7b]">
      <div className="rounded-2xl border border-[#007f7b]/10 bg-white px-5 py-4 shadow-lg shadow-[#007f7b]/10">
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [auth, setAuth] = useState({ loading: true, authEnabled: false, authenticated: false, username: null });
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    consumeLogoutSignalFromHash();

    getCurrentUser()
      .then((result) => setAuth({ loading: false, ...result }))
      .catch(() => setAuth({ loading: false, authEnabled: true, authenticated: false, username: null }));
  }, []);

  useEffect(() => {
    if (!auth.loading && (!auth.authEnabled || auth.authenticated)) {
      window.location.replace(buildAdminUrl(window.localStorage.getItem(appConfig.authTokenStorageKey)));
    }
  }, [auth]);

  const handleLogin = async ({ username, password }) => {
    setLoginError('');
    try {
      const result = await login({ username, password });
      if (result.token) window.localStorage.setItem(appConfig.authTokenStorageKey, result.token);
      setAuth({ loading: false, authEnabled: result.authEnabled !== false, authenticated: true, username: result.username || username });
      window.location.assign(buildAdminUrl(result.token));
    } catch (error) {
      setLoginError(error.response?.data?.message || error.response?.data?.title || 'Đăng nhập thất bại.');
    }
  };

  if (auth.loading) {
    return <LoadingScreen>Đang kiểm tra phiên đăng nhập...</LoadingScreen>;
  }

  if (auth.authEnabled && !auth.authenticated) {
    return <LoginScreen error={loginError} onLogin={handleLogin} />;
  }

  return <LoadingScreen>Đang chuyển sang UI admin...</LoadingScreen>;
}
