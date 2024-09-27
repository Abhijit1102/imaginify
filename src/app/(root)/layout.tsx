import React from 'react'
import Sidebar from '@/components/shared/Sidebar';
import ModileNav from '@/components/shared/ModileNav';
const Layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <main className="root">
      <Sidebar />
      <ModileNav/>
        <div className='root-container'>
            <div className='wrapper'>
            {children}
            </div>
        </div>
    </main>

  )
}

export default Layout;
