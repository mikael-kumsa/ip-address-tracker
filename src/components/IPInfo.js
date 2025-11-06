import React from 'react';
import './IPInfo.css';

const IPInfo = ({ data }) => {
  if (!data) return null;

  return (
    <div className="ip-info">
      <div className="info-card">
        <h3>IP Address</h3>
        <p>{data.ip}</p>
      </div>
      <div className="info-card">
        <h3>Location</h3>
        <p>{data.city}, {data.region}, {data.country}</p>
      </div>
      <div className="info-card">
        <h3>Timezone</h3>
        <p>{data.timezone}</p>
      </div>
      <div className="info-card">
        <h3>ISP</h3>
        <p>{data.isp}</p>
      </div>
    </div>
  );
};

export default IPInfo;