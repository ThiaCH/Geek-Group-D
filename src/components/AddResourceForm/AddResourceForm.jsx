import { useState, useEffect } from "react";

export default function AddResourceForm() {
  const [resourceUrl, setResourceUrl] = useState([]);
  const [newResource, setNewResource] = useState({ website: '', url: '' });
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ website: '', url: '' });

  useEffect(() => {
    fetch('/api/resources/resources')
      .then(response => response.json())
      .then(data => setResourceUrl(data))
      .catch(error => console.error('Error fetching resources:', error));
  }, []);

  const handleAdd = async (event) => {
    event.preventDefault();
    if (!newResource.website || !newResource.url) return;

    try {
      const response = await fetch('/api/resources/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResource)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResourceUrl(prevUrls => [...prevUrls, data]);
      setNewResource({ website: '', url: '' }); // Clear form
    } catch (error) {
      console.error('Failed to add resource:', error);
      alert(`Add resource failed! Error: ${error.message}`);
    }
  };

  const handleEditClick = (resource) => {
    setEditingId(resource._id);
    setEditFormData({ website: resource.website, url: resource.url });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`/api/resources/resources/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedResource = await response.json();
      setResourceUrl(prev => prev.map(url => url._id === id ? updatedResource : url));
      setEditingId(null);
    } catch (error) {
      console.error('Failed to update resource:', error);
      alert(`Update resource failed! Error: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewResource({ ...newResource, [name]: value });
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/resources/resources/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setResourceUrl(prev => prev.filter(url => url._id !== id));
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to delete resource:', error);
    }
  };

  return (
    <>
      <div className="main-resource-container"> 
        <table>
          <thead>
            <tr>
              <th>Delete</th>
              <th>Website</th>
              <th>URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resourceUrl.map((url, index) => (
              <tr key={url._id || index }>
                {editingId === url._id ? (
                  <>
                    <td>
                      <button onClick={() => handleUpdate(url._id)}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </td>
                    <td>
                      <input 
                        type="text" 
                        name="website" 
                        value={editFormData.website} 
                        onChange={handleEditFormChange}
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        name="url" 
                        value={editFormData.url} 
                        onChange={handleEditFormChange}
                      />
                    </td>
                    <td></td>
                  </>
                ) : (
                  <>
                    <td><button onClick={() => handleDelete(url._id)}>Delete</button></td>
                    <td>{url.website}</td>
                    <td><a href={url.url} target="_blank" rel="noopener noreferrer">{url.url}</a></td>
                    <td><button onClick={() => handleEditClick(url)}>Edit</button></td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <hr/>

      <div className="add-resource-container">
        <form onSubmit={handleAdd}>
          <input 
            className="add-resource-website" 
            type="text" 
            name="website" 
            placeholder="Name of Website" 
            value={newResource.website} 
            onChange={handleChange}>
          </input>
          <br/>
          <input 
            className="add-resource-url" 
            type="text" 
            name="url" 
            placeholder="URL Link" 
            value={newResource.url} 
            onChange={handleChange}>   
          </input>
          
          <button className="add-resource-submit" type="submit">Add New Resource</button>
        </form>
      </div>
    </>
  );
}
