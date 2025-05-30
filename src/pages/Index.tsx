import React, { useCallback } from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import LoginForm from '@/components/Login/LoginForm';

// Define the type for login form data. This mirrors the LoginFormValues 
// type implicitly defined within LoginForm.tsx through its Zod schema.
interface LoginFormData {
  username: string;
  password: string;
}

/**
 * LoginPage serves as the main entry point for user authentication.
 * It utilizes MainAppLayout for overall page structure and centers the LoginForm component.
 */
const LoginPage: React.FC = () => {
  /**
   * Callback function triggered upon successful login attempt from the LoginForm component.
   * @param data - The login form data containing username and password.
   */
  const handleLoginSuccess = useCallback((data: LoginFormData) => {
    console.log('Login successful on page level:', data);
    // In a real-world application, this is where you would typically:
    // 1. Set authentication tokens (e.g., in localStorage or context).
    // 2. Update global application state to reflect logged-in status.
    // 3. Redirect the user to a protected area of the application (e.g., a dashboard).
    // Example: navigate('/dashboard'); (if using react-router-dom)
  }, []); // Empty dependency array as this callback doesn't rely on component's state or props.

  return (
    <MainAppLayout>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </MainAppLayout>
  );
};

export default LoginPage;
