import { useState } from "react";

export default function AddResourceForm () {

  //* Test Sample Only; To be remove later
  //* Actual Version have to fetch from Data 
  const [resourceUrl, setResourceUrl] = useState([
    { id: '1', website: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/' },
    { id: '2', website: 'React JS', url: 'https://legacy.reactjs.org/' },
    { id: '3', website: 'Code Wars', url: 'https://www.codewars.com/' },
  ]);

  

  const [newResource,  setNewResource] = useState({ id: '', website: '', url: '' })

  const handleAdd = (event) => {
    event.preventDefault();
    if (!newResource.id || !newResource.website || !newResource.url) return;
    setResourceUrl([...resourceUrl, {...newResource }]);
    setNewResource({ id: '', website: '', url: '' }); // Reset form
}
  
  const handleChange = (event) => {
    const { name, value } = event.target
    setNewResource({ ...newResource, [name]: value })
  }

  const handleDelete = (id) => {
    const newResourceUrl = resourceUrl.filter(url => url.id !== id);
    setResourceUrl(newResourceUrl);
  };


  return (
    <>
      <div className="main-resource-container"> 
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>website</th>
              <th>URL</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {resourceUrl.map(url => (
              <tr key={url.id}>
                <td>{url.id}</td>
                <td>{url.website}</td>
                <td>
                  <a href={url.url} target="_blank" rel="noopener">{url.url}</a>
                </td>
                <td>
                  {/* WIP -> Edit Button */}
                  <button>Edit</button> 
                  <button onClick={() => handleDelete(url.id)}>Delete</button>
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
            className="add-resource-id" 
            type="text" 
            name="id" 
            placeholder="ID" 
            value={newResource.id} 
            onChange={handleChange}>
          </input>
          <br/>
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