import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Applications from './components/Applications'
import Teams from './components/Teams'
import Components from './components/Components'
import Dashboards from './components/Dashboards'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('applications');

  const renderPage = () => {
    switch (activePage) {
      case 'applications':
        return <Applications />;
      case 'teams':
        return <Teams />;
      case 'components':
        return <Components />;
      case 'dashboards':
        return <Dashboards />;
      default:
        return <Applications />;
    }
  };

  return (
    <div className="App">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
