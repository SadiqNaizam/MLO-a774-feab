import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  // FormLabel, // Uncomment if explicit FormLabels are preferred over placeholders for accessibility
} from '@/components/ui/form';

// Define the schema for form validation using Zod
const loginFormSchema = z.object({
  username: z.string().min(1, { message: 'Username is required.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

// Infer the type for form values from the schema
type LoginFormValues = z.infer<typeof loginFormSchema>;

// Define the props interface for the LoginForm component
interface LoginFormProps {
  className?: string;
  onLoginSuccess?: (data: LoginFormValues) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ className, onLoginSuccess }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Initialize react-hook-form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // Handle form submission
  const onSubmit = React.useCallback(
    async (data: LoginFormValues) => {
      setIsLoading(true);
      console.log('Login form submitted:', data);

      // Simulate an API call
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
        if (onLoginSuccess) {
          onLoginSuccess(data);
        }
        // form.reset(); // Optionally reset form on success
        // Consider using a toast notification for feedback, e.g., from 'sonner'
        // import { toast } from 'sonner';
        // toast.success('Login Successful!');
      } catch (error) {
        console.error('Login failed:', error);
        // toast.error('Login Failed. Please check your credentials.');
      } finally {
        setIsLoading(false);
      }
    },
    [onLoginSuccess, /*form*/] // Include 'form' if form.reset() or other form methods are used inside
  );

  return (
    <Card
      className={cn(
        'w-full max-w-sm',
        'bg-card text-card-foreground rounded-md shadow-md',
        className
      )}
    >
      <CardHeader>
        {/* Title for the login form, styled as per the image */}
        <CardTitle className="text-3xl font-bold text-card-foreground">
          Log in
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Username</FormLabel> */}
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Username"
                      {...field}
                      className="bg-card border-input text-card-foreground placeholder:text-muted-foreground h-10 px-3 py-2 text-sm"
                      aria-label="Username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Password</FormLabel> */}
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="bg-card border-input text-card-foreground placeholder:text-muted-foreground h-10 px-3 py-2 text-sm"
                      aria-label="Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 text-sm font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
            
            {/* Link for users who need to sign up */}
            <div className="text-center pt-2"> {/* Added pt-2 for a bit of space above this link, aligning with image gap */} 
              <p className="text-sm text-muted-foreground">
                or,{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm text-primary hover:text-primary/90 font-medium"
                  onClick={() => console.log('Navigate to Sign Up page')}
                  type="button" // Important for non-submit buttons within a form
                >
                  sign up
                </Button>
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
      {/* No CardFooter is used as the sign-up link is part of the form flow in CardContent */}
    </Card>
  );
};

export default LoginForm;
