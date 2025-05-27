import React from "react";
import "./sharingan.css"; // CSS dosyasını ayrıca eklemen gerekiyor

function SharinganBackground() {
  return (
    <div className="sharingan-container">
      <div className="box">
        <div className="eye-box left-eye">
          <div className="eye circle sharingan1to2">
            <div className="eyeball center">
              <div className="circle"></div>
              <div className="circle center"></div>
              <div className="sp"><span className="center">,</span></div>
              <div className="sp"><span className="center">,</span></div>
              <div className="sp"><span className="center">,</span></div>
            </div>
          </div>
        </div>
        <div className="eye-box">
          <div className="eye circle sharingan1to2">
            <div className="eyeball center">
              <div className="circle"></div>
              <div className="circle center"></div>
              <div className="sp"><span className="center">,</span></div>
              <div className="sp"><span className="center">,</span></div>
              <div className="sp"><span className="center">,</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharinganBackground;
