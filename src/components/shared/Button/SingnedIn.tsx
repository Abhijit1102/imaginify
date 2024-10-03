import React from 'react';

interface SignedInProps {
  children: React.ReactNode;
}

const SignedIn: React.FC<SignedInProps> = ({ children }) => {
  const isUserSignedIn = true; 
  if (!isUserSignedIn) {
    return null;
  }

  return <>{children}</>;
};

export default SignedIn;
