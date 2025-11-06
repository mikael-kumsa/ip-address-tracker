import React, { useState, useEffect } from 'react';
import './App.css';
import IPInfo from './components/IPInfo';
import SearchBar from './components/SearchBar';
import Map from './components/Map';

function App() {
  const [ipData, setIpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch IP data
  const fetchIPData = async (ipAddress = '') => {
    setLoading(true);
    setError(null);
    
    try {
      // Get the IP to search for
      let ipToSearch = ipAddress;
      
      // If no IP provided, get user's own IP
      if (!ipAddress) {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipResult = await ipResponse.json();
        ipToSearch = ipResult.ip;
      }

      console.log('Fetching data for IP:', ipToSearch);

      // Use a simple, reliable API
      const geoResponse = await fetch(`https://ipapi.co/${ipToSearch}/json/`);
      
      if (!geoResponse.ok) {
        throw new Error('API request failed');
      }
      
      const geoData = await geoResponse.json();

      // Check if API returned an error
      if (geoData.error) {
        throw new Error(geoData.reason || 'Location data not found');
      }

      // Set the data
      setIpData({
        ip: geoData.ip,
        city: geoData.city,
        country: geoData.country_name,
        region: geoData.region,
        timezone: geoData.timezone,
        isp: geoData.org,
        lat: geoData.latitude,
        lon: geoData.longitude
      });

    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch data. Using demo information.');
      
      // Use demo data with the IP we were trying to search for
      // Note: We use ipAddress here instead of ipToSearch to avoid scope issues
      const demoIp = ipAddress || '8.8.8.8';
      
      setIpData({
        ip: demoIp,
        city: demoIp === '8.8.8.8' ? 'Mountain View' : 'New York',
        country: 'United States',
        region: demoIp === '8.8.8.8' ? 'California' : 'New York',
        timezone: 'UTC-05:00',
        isp: demoIp === '8.8.8.8' ? 'Google LLC' : 'Example ISP',
        lat: demoIp === '8.8.8.8' ? 37.4056 : 40.7128,
        lon: demoIp === '8.8.8.8' ? -122.0775 : -74.0060
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's own IP when component loads
  useEffect(() => {
    fetchIPData();
  }, []);

  // Handle search from SearchBar component
  const handleSearch = (ip) => {
    fetchIPData(ip);
  };

  return (
  <div className="App">
    <header className="App-header">
      <h1>IP Address Tracker</h1>
      <p>Find any IP address location on the map</p>
    </header>
    
    <main className="App-main">
      <SearchBar onSearch={handleSearch} />
      
      {loading && <div className="loading">Loading IP data</div>}
      
      {error && (
        <div className="error">
          {error}
        </div>
      )}
      
      {ipData && !loading && (
        <>
          <IPInfo data={ipData} />
          <Map location={ipData} />
          <div className="demo-note">
            💡 <strong>Pro Tip:</strong> Try searching for <strong>8.8.8.8</strong> (Google) or <strong>1.1.1.1</strong> (Cloudflare)
          </div>
        </>
      )}
    </main>
  </div>
);
}

export default App;