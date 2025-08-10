import { useState } from 'react';

interface Application {
  id: string;
  name: string;
  description: string;
  contact: string;
}

interface ApplicationsProps {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
}

export default function Applications({ applications, setApplications }: ApplicationsProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contact: ''
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.description.trim() && formData.contact.trim()) {
      const newApplication: Application = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        contact: formData.contact.trim()
      };
      
      setApplications(prev => [...prev, newApplication]);
      setFormData({ name: '', description: '', contact: '' });
      setIsAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', contact: '' });
    setIsAdding(false);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Applications Management</h1>
        <p>Manage your application inventory and contact information</p>
        <button 
          className="btn btn-primary"
          onClick={() => setIsAdding(true)}
        >
          Add New Application
        </button>
      </div>

      {isAdding && (
        <div className="add-form-container">
          <h2>Add New Application</h2>
          <form onSubmit={handleSubmit} className="add-form">
            <div className="form-group">
              <label htmlFor="name">Application Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter application name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Enter application description"
                rows={3}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contact">Contact *</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
                placeholder="Enter contact information"
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Add Application
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="applications-list">
        <h2>Applications ({applications.length})</h2>
        {applications.length === 0 ? (
          <p className="no-applications">No applications added yet. Click "Add New Application" to get started.</p>
        ) : (
          <div className="applications-table-container">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Application Name</th>
                  <th>Description</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id} className="application-row">
                    <td className="app-name">{app.name}</td>
                    <td className="app-description">{app.description}</td>
                    <td className="app-contact">{app.contact}</td>
                    <td className="app-actions">
                      <button 
                        className="btn btn-danger btn-small"
                        onClick={() => handleDelete(app.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
