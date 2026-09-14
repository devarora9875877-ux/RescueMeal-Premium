import React from 'react';

const LiveMap = () => {
  // SVG path matching the visual curve
  const routePath = "M 20 90 C 80 90, 120 30, 180 50 C 230 65, 270 30, 300 20";

  return (
    <div className="dash-map-container floating-delay-1">
      <div className="map-base">
        {/* The curved glowing route */}
        <svg viewBox="0 0 320 120" className="route-svg">
          {/* Faint dashed background path */}
          <path d={routePath} className="route-bg" />
          {/* Active solid path that draws itself */}
          <path d={routePath} className="route-active" />
        </svg>

        {/* CSS Motion Path Elements */}
        <div className="route-entity truck-icon" style={{ '--path': `path("${routePath}")` }}>
          🚚
        </div>
        <div className="route-entity glowing-dot" style={{ '--path': `path("${routePath}")`, animationDelay: '1.5s' }} />
        <div className="route-entity glowing-dot" style={{ '--path': `path("${routePath}")`, animationDelay: '3s' }} />

        {/* Location Pins */}
        <div className="map-pin pin-restaurant">
          <span className="pin-pulse"></span>
          🏪
        </div>
        <div className="map-pin pin-ngo">
          <span className="pin-pulse"></span>
          ❤️
        </div>
      </div>
    </div>
  );
};

export default LiveMap;