import { useState } from 'react';
import './App.css';

function App() {
  const [places, setPlaces] = useState([
    { 
      name: 'Cool Beans Coffee Co.', 
      category: 'Cafe', 
      description: 'A cozy spot near UofSC campus, perfect for studying.',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80'
    },
    { 
      name: 'Riverfront Park', 
      category: 'Park', 
      description: 'Beautiful trails along the Congaree River.',
      image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=400&q=80'
    },
    { 
      name: 'Motor Supply Co. Bistro', 
      category: 'Restaurant', 
      description: 'Farm-to-table dining in the historic Congaree Vista.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80'
    },
    { 
      name: 'Transmission Arcade', 
      category: 'Bar', 
      description: 'Retro arcade games, great food, and craft drinks on Main St.',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80'
    }
  ]);

  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Cafe');
  const [newDesc, setNewDesc] = useState('');

  const [mapQuery, setMapQuery] = useState('Columbia, SC');

  const handleAddPlace = (e) => {
    e.preventDefault();
    if (newName.trim() === '') return;

    const newPlace = { 
      name: newName, 
      category: newCategory,
      description: newDesc,
      image: `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80&random=${Math.random()}`
    };
    
    setPlaces([newPlace, ...places]);
    setNewName('');
    setNewDesc('');
  };

  const handleShowOnMap = (placeName) => {
    setMapQuery(`${placeName}, Columbia, SC`);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Localfye: Columbia Explorer</h1>
        <p>Discover and share the hidden gems of Columbia, SC.</p>
      </header>

      <div className="main-content">
        <div className="left-panel">
          
          <div className="add-form-card">
            <h3>Add a New Local Gem</h3>
            <p className="form-subtitle">Know a great place in Columbia? Share it below!</p>
            
            <form onSubmit={handleAddPlace} className="discovery-form">
              <div className="form-group">
                <label>Spot Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Soda City Market" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Category</label>
                <select 
                  value={newCategory} 
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  <option value="Cafe">Cafe</option>
                  <option value="Park">Park</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Bar">Bar</option>
                  <option value="Scenic Spot">Scenic Spot</option>
                </select>
              </div>

              <div className="form-group">
                <label>Short Description</label>
                <textarea 
                  placeholder="What makes this place special?" 
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows="3"
                  required
                ></textarea>
              </div>

              <button type="submit" className="add-btn">Submit Discovery</button>
            </form>
          </div>

          <div className="places-grid">
            {places.map((place, index) => (
              <div key={index} className="place-card">
                <img src={place.image} alt={place.name} className="place-image" />
                <div className="place-info">
                  <span className={`badge ${place.category.toLowerCase().replace(' ', '-')}`}>
                    {place.category}
                  </span>
                  <h2>{place.name}</h2>
                  <p>{place.description}</p>
                  <button 
                    className="map-btn"
                    onClick={() => handleShowOnMap(place.name)}
                  >
                    📍 View on Map
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="right-panel">
          <div className="map-container">
            <h3>Interactive Map</h3>
            <p>Showing: <strong>{mapQuery}</strong></p>
            <iframe
              title="Google Map"
              width="100%"
              height="600"
              style={{ border: 0, borderRadius: '12px' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;