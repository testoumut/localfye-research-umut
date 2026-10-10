import { useState } from 'react'
import './App.css'

const MOCK_GEMS = [
  { id: 1, name: "The Quiet Bean", category: "Cafe", swagScore: 92, desc: "A cozy underground coffee shop away from the tourist traps." },
  { id: 2, name: "Sunset Hill", category: "Park", swagScore: 88, desc: "Best hidden view of the city skyline, zero crowds." },
  { id: 3, name: "Mama's Kitchen", category: "Restaurant", swagScore: 95, desc: "Authentic local food, no English menu, pure vibes." },
  { id: 4, name: "Neon Alley", category: "Bar", swagScore: 85, desc: "Speakeasy with great drinks and a vintage arcade." }
];

function App() {
  const [filter, setFilter] = useState('All');
  const [selectedGem, setSelectedGem] = useState(null);

  const filteredGems = filter === 'All' 
    ? MOCK_GEMS 
    : MOCK_GEMS.filter(gem => gem.category === filter);

  return (
    <div className="app-container">
      <h1>Localfye: Hidden Gem Explorer</h1>
      <p>Filter by category to discover authentic local spots.</p>

      <div className="filters">
        {['All', 'Cafe', 'Park', 'Restaurant', 'Bar'].map(cat => (
          <button 
            key={cat} 
            className={filter === cat ? 'active' : ''}
            onClick={() => { setFilter(cat); setSelectedGem(null); }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="gem-list">
        {filteredGems.map(gem => (
          <div key={gem.id} className="gem-card" onClick={() => setSelectedGem(gem)}>
            <h3>{gem.name}</h3>
            <span className="category-tag">{gem.category}</span>
          </div>
        ))}
      </div>

      {selectedGem && (
        <div className="gem-details">
          <h2>{selectedGem.name} Details</h2>
          <p><strong>Swag Score:</strong> 🔥 {selectedGem.swagScore}/100</p>
          <p><strong>Vibe:</strong> {selectedGem.desc}</p>
          <button onClick={() => setSelectedGem(null)}>Close</button>
        </div>
      )}
    </div>
  )
}

export default App