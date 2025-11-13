import React, { useState } from 'react';
import { Github } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleGithubLogin = async () => {
    setLoading(true);
    // Redirect to GitHub OAuth
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=https://sylcroad.com&scope=user:email`;
    window.location.href = githubAuthUrl;
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-2">
            SylcRoad
          </h1>
          <p className="text-gray-400">
            Sign in to manage your campaigns
          </p>
        </div>

        {/* GitHub Login */}
        <Button
          variant="primary"
          className="w-full"
          icon={Github}
          onClick={handleGithubLogin}
          disabled={loading}
        >
          {loading ? 'Redirecting...' : 'Sign in with GitHub'}
        </Button>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-400">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </Card>
    </div>
  );
};

export default Login;

