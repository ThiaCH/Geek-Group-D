import { useState, useEffect } from "react";

export default function AddResourceForm () {

  //* Test Sample Only; To be remove later
  // const [resourceUrl, setResourceUrl] = useState([
  //   { website: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/' },
  //   { website: 'React JS', url: 'https://legacy.reactjs.org/' },
  //   { website: 'Code Wars', url: 'https://www.codewars.com/' },
  // ]);

  const [resourceUrl, setResourceUrl] = useState([]);
  const [newResource,  setNewResource] = useState({ website: '', url: '' })
  
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
      setNewResource({ website: '', url: '' });
      console.log(data)
    } catch (error) {
      console.error('Failed to add resource:', error);
      alert(`Add resource failed! Error: ${error.message}`);
    }
};


const handleDelete = async (id) => {
  try {
    const response = await fetch(`/api/resources/resources/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setResourceUrl(resourceUrl.filter(url => url._id !== id));
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to delete resource:', error);
  }
};


  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewResource({ ...newResource, [name]: value });
  };

  return (
    <>
      <div className="main-resource-container"> 
        <table>
          <thead>
            <tr>
              <th>Delete</th>
              <th>website</th>
              <th>URL</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {resourceUrl.map((url, index) => (
              <tr key={url._id || index}>
                <td>
                  <button onClick={() => handleDelete(url._id)}>Delete</button>
                </td>
                <td>{url.website}</td>
                <td>
                  <a href={url.url} target="_blank" rel="noopener noreferrer">{url.url}</a> 
                </td>
                <td>
                  <button>Edit</button> 
                </td>
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
            placeholder="Url Link" 
            value={newResource.url} 
            onChange={handleChange}>   
          </input>
          
          <button className="add-resource-submit" type="submit">Add New Resource</button>
        </form>
      </div>
    </>
  )
}