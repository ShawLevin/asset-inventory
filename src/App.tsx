import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Applications from './components/Applications'
import Teams from './components/Teams'
import Components from './components/Components'
import Dashboards from './components/Dashboards'
import './App.css'

interface Application {
  id: string;
  name: string;
  description: string;
  contact: string;
}

function App() {
  const [activePage, setActivePage] = useState('applications');
  const [applications, setApplications] = useState<Application[]>([]);

  const renderPage = () => {
    switch (activePage) {
      case 'applications':
        return <Applications applications={applications} setApplications={setApplications} />;
      case 'teams':
        return <Teams />;
      case 'components':
        return <Components applications={applications} />;
      case 'dashboards':
        return <Dashboards />;
      default:
        return <Applications applications={applications} setApplications={setApplications} />;
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
