import React from 'react';

interface SignedOutProps {
  children: React.ReactNode;
}

const SignedOut: React.FC<SignedOutProps> = ({ children }) => {
  
  const isUserSignedIn = false; 

  if (isUserSignedIn) {
    return null;
  }

  return <>{children}</>;
};

export default SignedOut;
