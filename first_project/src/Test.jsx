import React, { useState } from 'react';
import axios from 'axios';

const Test = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [selectedTones, setSelectedTones] = useState([]);
  const [tones, setTones] = useState([]);

  const fetchPerfumes = async () => {
    const response = await axios.get(`https://script.google.com/macros/s/AKfycbx-8ElY6WvrEwyShFPWK5qVsW5W7UO2GyGp_h0au9Dg0Cgzpcn3ya7w1dQyNXvnclDapg/exec?sheet=Allstar`);
    const data = response.data;
    setPerfumes(data);
    extractTones(data);
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

  const handleToneClick = (tone) => {
    setSelectedTones((prevTones) => prevTones.includes(tone)
        ? prevTones.filter(t => t !== tone)
        : [...prevTones, tone]
    );
  };

  const filteredPerfumes = perfumes.filter((perfume) =>
    selectedTones.every(tone =>
      [perfume['Tone Hương1'], perfume['Tone Hương2'], perfume['Tone Hương3']].includes(tone)
    )
  );

  return (
    <div>
      <h1>Perfume Filter</h1>
      <button onClick={fetchPerfumes}>Click to start</button>

      <div>
        <h2>Select Scent Tones:</h2>
        <div>
          {tones.map((tone) => (<button onClick={() => handleToneClick(tone)} style={{ backgroundColor: selectedTones.includes(tone) ? 'lightblue' : 'black' }}>{tone}</button>))}
        </div>
      </div>

      <div>
        
          {filteredPerfumes.map((perfume) => (
            <div>
              <h3>{perfume.Tên}</h3>
              <p>Brand: {perfume.Brand}</p>
              {perfume['Tone Hương1'] && <p>{perfume['Tone Hương1']}</p>}
              {perfume['Tone Hương2'] && <p>{perfume['Tone Hương2']}</p>}
              {perfume['Tone Hương3'] && <p>{perfume['Tone Hương3']}</p>}
            </div>
          ))}

      </div>
    </div>
  );
};

export default Test;
