import React, { useState } from 'react';
import axios from 'axios';

const Test = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  //Tone hương
  const [selectedTones, setSelectedTones] = useState([]);
  const [tones, setTones] = useState([]);
  //Mùa
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [seasons, setSeasons] = useState([]);
  //Thời gian
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [times, setTimes] = useState([]);
  //Độ lưu hương

  //Độ tuổi

  //Giới tính

  const fetchPerfumes = async () => {
    const response = await axios.get(
      `https://script.google.com/macros/s/AKfycbx-8ElY6WvrEwyShFPWK5qVsW5W7UO2GyGp_h0au9Dg0Cgzpcn3ya7w1dQyNXvnclDapg/exec?sheet=All`
    );
    const data = response.data;
    setPerfumes(data);
    extractTones(data); //Tone Hương
    extractSeasons(data); //Mùa
    extractTimes(data); //Thời gian
                        //Độ lưu hương
                        //Độ tuổi
                        //Giới tính
    setShowPopup(true);
  };

  //Tone Hương
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
      setSelectedTones((prevTones) =>
        prevTones.includes(tone)
          ? prevTones.filter((to) => to !== tone)
          : [...prevTones, tone]
      );
    };
    
  //Mùa
  const extractSeasons = (data) => {
    const allSeasons = new Set();
    data.forEach((perfume) => {
      if (perfume['Mùa1']) allSeasons.add(perfume['Mùa1']);
      if (perfume['Mùa2']) allSeasons.add(perfume['Mùa2']);
      if (perfume['Mùa3']) allSeasons.add(perfume['Mùa3']);
    });
    setSeasons([...allSeasons]);
  };

  const handleSeasonClick = (season) => {
    setSelectedSeasons((prevSeasons) =>
      prevSeasons.includes(season)
        ? prevSeasons.filter((s) => s !== season)
        : [...prevSeasons, season]
    );
  };

  //Thời gian
  const extractTimes = (data) => {
    const allTimes = new Set();
    data.forEach((perfume) => {
      if (perfume['Thời Gian1']) allTimes.add(perfume['Thời Gian1']);
      if (perfume['Thời Gian2']) allTimes.add(perfume['Thời Gian2']);
    });
    setTimes([...allTimes]);
  };

  const handleTimeClick = (time) => {
    setSelectedTimes((prevTimes) =>
      prevTimes.includes(time)
        ? prevTimes.filter((ti) => ti !== time)
        : [...prevTimes, time]
    );
  };

  //Độ lưu hương

  //Độ tuổi

  //Giới tính

  const handleDoneClick = () => {
    setShowPopup(false);
  };

  //Bộ lọc
  const filteredPerfumes = perfumes.filter((perfume) =>
    //Tone hương
    selectedTones.every((tone) =>
      [perfume['Tone Hương1'], perfume['Tone Hương2'], perfume['Tone Hương3']].includes(tone)
    ) &&
    //Mùa
    selectedSeasons.every((season) =>
      [perfume['Mùa1'], perfume['Mùa2'], perfume['Mùa3']].includes(season)
    ) &&
    //Thời gian
    selectedTimes.some((time) =>
      [perfume['Thời Gian1'], perfume['Thời Gian2']].includes(time)
    ) 
    //Độ lưu hương

    //Độ tuổi

    //Giới tính
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
              
              {/* Cột Tone Hương */}
              <div style={filterColumn}>
                <h3>Tone Hương</h3>
                {tones.map((tone) => (
                  <p
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
              
              {/* Cột Mùa */}
              <div style={filterColumn}>
                <h3>Mùa</h3>
                {seasons.map((season) => (
                  <p
                    onClick={() => handleSeasonClick(season)}
                    style={{
                      cursor: 'pointer',
                      color: selectedSeasons.includes(season) ? 'lightblue' : 'white',
                    }}
                  >
                    {season}
                  </p>
                ))}
              </div>

              {/* Cột Thời gian */}
              <div style={filterColumn}>
                <h3>Thời gian</h3>
                {times.map((time) => (
                  <p
                    onClick={() => handleTimeClick(time)}
                    style={{
                      cursor: 'pointer',
                      color: selectedTimes.includes(time) ? 'lightblue' : 'white',
                    }}
                  >
                    {time}
                  </p>
                ))}
              </div>

              {/* Cột Độ lưu hương*/}

              {/* Cột Độ tuổi*/}

              {/* Cột Giới tính*/}
            </div>
          </div>
        </div>
      )}

      {!showPopup && (
        <div>
          <h2>Filtered Perfumes:</h2>
          {filteredPerfumes.length > 0 && (
            filteredPerfumes.map((perfume) => (
              <div key={perfume.Tên}>
                <h3>{perfume.Tên}</h3>
                <p>Brand: {perfume.Brand}</p>
                <p>Năm: {perfume.Năm}</p>
                {perfume['Tone Hương1'] && <p>{perfume['Tone Hương1']}</p>}
                {perfume['Tone Hương2'] && <p>{perfume['Tone Hương2']}</p>}
                {perfume['Tone Hương3'] && <p>{perfume['Tone Hương3']}</p>}
              </div>
            ))
          )}
          {filteredPerfumes.length === 0 && <p>No perfumes match.</p>}
        </div>
      )}
    </div>
  );
};


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
  height: '70vh',
  overflowY: 'auto',
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
