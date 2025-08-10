import { useState } from 'react';

interface Application {
  id: string;
  name: string;
  description: string;
  contact: string;
}

interface Component {
  id: string;
  name: string;
  type: string;
  details: string;
  application: string;
}

interface ComponentsProps {
  applications: Application[];
}

export default function Components({ applications }: ComponentsProps) {
  const [components, setComponents] = useState<Component[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    details: '',
    application: ''
  });
  const [isAdding, setIsAdding] = useState(false);

  const componentTypes = [
    { value: 'UI', label: 'UI' },
    { value: 'database', label: 'Database' },
    { value: 'compute', label: 'Compute' },
    { value: 'storage', label: 'Storage' },
    { value: 'data-pipeline', label: 'Data Pipeline' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.type && formData.application) {
      const newComponent: Component = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        type: formData.type,
        details: formData.details.trim(),
        application: formData.application
      };
      
      setComponents(prev => [...prev, newComponent]);
      setFormData({ name: '', type: '', details: '', application: '' });
      setIsAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
  };

  const resetForm = () => {
    setFormData({ name: '', type: '', details: '', application: '' });
    setIsAdding(false);
  };

  const getTypeLabel = (typeValue: string) => {
    const type = componentTypes.find(t => t.value === typeValue);
    return type ? type.label : typeValue;
  };

  const getApplicationName = (applicationId: string) => {
    const app = applications.find(a => a.id === applicationId);
    return app ? app.name : 'Unknown Application';
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Components Management</h1>
        <p>Manage system components and infrastructure</p>
        <button 
          className="btn btn-primary"
          onClick={() => setIsAdding(true)}
        >
          Add New Component
        </button>
      </div>

      {isAdding && (
        <div className="add-form-container">
          <h2>Add New Component</h2>
          <form onSubmit={handleSubmit} className="add-form">
            <div className="form-group">
              <label htmlFor="name">Component Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter component name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="application">Application *</label>
              <select
                id="application"
                name="application"
                value={formData.application}
                onChange={handleInputChange}
                required
                className="form-select"
              >
                <option value="">Select an application</option>
                {applications.map(app => (
                  <option key={app.id} value={app.id}>
                    {app.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="type">Component Type *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="form-select"
              >
                <option value="">Select component type</option>
                {componentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="details">Details (Optional)</label>
              <textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                placeholder="Enter component details, description, or notes"
                rows={3}
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Add Component
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

      <div className="components-list">
        <h2>Components ({components.length})</h2>
        {components.length === 0 ? (
          <p className="no-components">No components added yet. Click "Add New Component" to get started.</p>
        ) : (
          <div className="components-table-container">
            <table className="components-table">
              <thead>
                <tr>
                  <th>Component Name</th>
                  <th>Application</th>
                  <th>Type</th>
                  <th>Details</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {components.map(comp => (
                  <tr key={comp.id} className="component-row">
                    <td className="comp-name">{comp.name}</td>
                    <td className="comp-application">{getApplicationName(comp.application)}</td>
                    <td className="comp-type">
                      <span className={`type-badge type-${comp.type}`}>
                        {getTypeLabel(comp.type)}
                      </span>
                    </td>
                    <td className="comp-details">
                      {comp.details || <span className="no-details">No details provided</span>}
                    </td>
                    <td className="comp-actions">
                      <button 
                        className="btn btn-danger btn-small"
                        onClick={() => handleDelete(comp.id)}
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
