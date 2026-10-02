import { useAuthViewModel } from './useAuthViewModel'
import './AuthView.css'

function AuthView() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    mode,
    loading,
    error,
    handleSubmit,
    toggleMode,
  } = useAuthViewModel()

  const isLoginMode = mode === 'login'

  return (
    <main className="auth">
      <form
        className="auth__form"
        onSubmit={(event) => {
          event.preventDefault()
          void handleSubmit()
        }}
      >
        <h1 className="auth__heading">{isLoginMode ? 'Login' : 'Create Account'}</h1>

        <label className="auth__label" htmlFor="auth-email">
          Email
        </label>
        <input
          id="auth-email"
          className="auth__input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />

        <label className="auth__label" htmlFor="auth-password">
          Password
        </label>
        <input
          id="auth-password"
          className="auth__input"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete={isLoginMode ? 'current-password' : 'new-password'}
          minLength={6}
          required
        />

        {error && (
          <p className="auth__error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="auth__submit" disabled={loading}>
          {loading ? 'Please wait…' : isLoginMode ? 'Login' : 'Create Account'}
        </button>

        <button type="button" className="auth__toggle" onClick={toggleMode}>
          {isLoginMode ? 'Create an account' : 'Already have an account? Login'}
        </button>
      </form>
    </main>
  )
}

export default AuthView
