import React from 'react';

interface UserButtonProps {
  userName: string;
  onSignOut: () => void;
  showName?: boolean;
}

const UserButton: React.FC<UserButtonProps> = ({ userName, onSignOut, showName = false }) => {
  return (
    <div>
      {showName && <span>{userName}</span>}
      <button onClick={onSignOut}>Sign Out</button>
    </div>
  );
};

const App = () => {
  const handleSignOut = () => {
    console.log('User signed out');
  };

  return (
    <div>
      <h1>Welcome to the App</h1>
      <UserButton userName="John Doe" onSignOut={handleSignOut} showName={true} />
    </div>
  );
};

export default App;
