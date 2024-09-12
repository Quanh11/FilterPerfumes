import React, { useState } from 'react';
import axios from 'axios';

const Test = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [selectedTones, setSelectedTones] = useState([]);
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [tones, setTones] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const fetchPerfumes = async () => {
    const response = await axios.get(
      `https://script.google.com/macros/s/AKfycbx-8ElY6WvrEwyShFPWK5qVsW5W7UO2GyGp_h0au9Dg0Cgzpcn3ya7w1dQyNXvnclDapg/exec?sheet=All`
    );
    const data = response.data;
    setPerfumes(data);
    extractTones(data);
    extractSeasons(data); // Added to extract seasons
    setShowPopup(true); // Show popup after fetching perfumes
  };

  const extractTones = (data) => {
    const allTones = new Set();
    data.forEach((perfume) => {
      if (perfume['Tone Hương1']) allTones.add(perfume['Tone Hương1']);
      if (perfume['Tone Hương2']) allTones.add(perfume['Tone Hương2']);
      if (perfume['Tone Hương3']) allTones.add(perfume['Tone Hương3']);
    });
    setTones([...allTones]);
  };

  const extractSeasons = (data) => {
    const allSeasons = new Set(); // Fixed variable name
    data.forEach((perfume) => {
      if (perfume['Mùa1']) allSeasons.add(perfume['Mùa1']);
      if (perfume['Mùa2']) allSeasons.add(perfume['Mùa2']);
      if (perfume['Mùa3']) allSeasons.add(perfume['Mùa3']);
    });
    setSeasons([...allSeasons]);
  };

  const handleToneClick = (tone) => {
    setSelectedTones((prevTones) =>
      prevTones.includes(tone)
        ? prevTones.filter((t) => t !== tone)
        : [...prevTones, tone]
    );
  };

  const handleSeasonsClick = (season) => {
    setSelectedSeasons((prevSeasons) =>
      prevSeasons.includes(season)
        ? prevSeasons.filter((s) => s !== season)
        : [...prevSeasons, season]
    );
  };

  const handleDoneClick = () => {
    setShowPopup(false); // Close the popup after choosing tones
  };

  const filteredPerfumes = perfumes.filter((perfume) =>
    selectedTones.every((tone) =>
      [perfume['Tone Hương1'], perfume['Tone Hương2'], perfume['Tone Hương3']].includes(tone)
    ) &&
    selectedSeasons.every((season) =>
      [perfume['Mùa1'], perfume['Mùa2'], perfume['Mùa3']].includes(season)
    )
  );

  return (
    <div>
      <h1>Perfume Filter</h1>
      <button onClick={fetchPerfumes}>Click to start</button>

      {showPopup && (
        <div style={popupStyles}>
          <div style={popupContentStyles}>
            <div style={popupHeader}>
              <h2>Bộ lọc</h2>
              <button onClick={handleDoneClick} style={closeButtonStyle}>X</button>
            </div>
            <div style={filterCategoryContainer}>
              {/* First Column - Tones */}
              <div style={filterColumn}>
                <h3>Tone Hương</h3>
                {tones.map((tone) => (
                  <p
                    key={tone}
                    onClick={() => handleToneClick(tone)}
                    style={{
                      cursor: 'pointer',
                      color: selectedTones.includes(tone) ? 'lightblue' : 'white',
                    }}
                  >
                    {tone}
                  </p>
                ))}
              </div>
              {/* Second Column - Seasons */}
              <div style={filterColumn}>
                <h3>Mùa</h3>
                {seasons.map((season) => (
                  <p
                    key={season}
                    onClick={() => handleSeasonsClick(season)} // Fixed handler
                    style={{
                      cursor: 'pointer',
                      color: selectedSeasons.includes(season) ? 'lightblue' : 'white',
                    }}
                  >
                    {season}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {!showPopup && (
        <div>
          <h2>Filtered Perfumes:</h2>
          {filteredPerfumes.length > 0 ? (
            filteredPerfumes.map((perfume) => (
              <div key={perfume.Tên}>
                <h3>{perfume.Tên}</h3>
                <p>Brand: {perfume.Brand}</p>
                {perfume['Tone Hương1'] && <p>{perfume['Tone Hương1']}</p>}
                {perfume['Tone Hương2'] && <p>{perfume['Tone Hương2']}</p>}
                {perfume['Tone Hương3'] && <p>{perfume['Tone Hương3']}</p>}
              </div>
            ))
          ) : (
            <p>No perfumes match the selected tones.</p>
          )}
        </div>
      )}
    </div>
  );
};

// Styles to match the popup in the image
const popupStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const popupContentStyles = {
  backgroundColor: '#181818',
  color: 'white',
  padding: '20px',
  borderRadius: '10px',
  width: '80%',
  maxWidth: '800px',
  height: '70vh', // Set fixed height
  overflowY: 'auto', // Enable vertical scrolling
  position: 'relative',
};

const popupHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: '20px',
  cursor: 'pointer',
};

const filterCategoryContainer = {
  display: 'flex',
  justifyContent: 'space-between',
};

const filterColumn = {
  width: '18%',
  textAlign: 'left',
};

export default Test;
