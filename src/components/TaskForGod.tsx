import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

export const TaskForGod: React.FC = () => {
  const captureRef = useRef<HTMLDivElement>(null);

  const handleScreenshot = async () => {
    if (captureRef.current) {
      const canvas = await html2canvas(captureRef.current);
      const img = document.createElement('img');
      img.src = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = img.src;
      link.download = 'screenshot.png';
      link.click();
    }
  };

  return (
    <div>
      <div className="container" ref={captureRef}>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="d-flex align-items-center mb-2">
              <svg width="30" height="30" viewBox="0 0 100 100" className="me-2">
                <rect x="10" y="10" width="80" height="80" stroke="black" strokeWidth="4" fill="none" />
                <line x1="25" y1="30" x2="75" y2="30" stroke="black" strokeWidth="4" />
                <line x1="25" y1="50" x2="75" y2="50" stroke="black" strokeWidth="4" />
                <line x1="25" y1="70" x2="75" y2="70" stroke="black" strokeWidth="4" />
              </svg>
              <h4 className="m-0">รายการสิ่งที่ฉันต้องทำใน 7 วันที่จะมาถึง</h4>
            </div>
            {[...Array(7)].map((_, i) => (
              <div key={i} className="form-check d-flex align-items-center mb-2">
                <input className="form-check-input me-2" type="checkbox" id={`todo-${i}`} />
                <input type="text" className="form-control form-control-sm" id={`todo-input-${i}`} placeholder="" />
              </div>
            ))}
          </div>
          <div className="col-md-6 mb-4">
            <div className="d-flex align-items-center mb-2">
              <svg width="30" height="30" viewBox="0 0 100 100" className="me-2">
                <path d="M20 60 C 20 60, 50 20, 50 20 C 50 20, 80 60, 80 60" stroke="black" strokeWidth="4" fill="none" />
                <path d="M35 80 C 35 80, 50 60, 50 60 C 50 60, 65 80, 65 80" stroke="black" strokeWidth="4" fill="none" />
              </svg>
              <h4 className="m-0">การถวายเกียรติพระเจ้า</h4>
            </div>
            {[...Array(7)].map((_, i) => (
              <div key={i} className="form-check d-flex align-items-center mb-2">
                <input className="form-check-input me-2" type="radio" name="honor" id={`honor-${i}`} />
                <input type="text" className="form-control form-control-sm" id={`honor-input-${i}`} placeholder="" />
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleScreenshot} className="btn btn-primary mt-3">Capture Screenshot</button>

      </div>
    </div>
  );
};

export default TaskForGod;