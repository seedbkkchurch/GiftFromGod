import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';

const STORAGE_KEY = 'taskForGod_state';

const defaultState = {
  todoChecked: Array(7).fill(false),
  todoText: Array(7).fill(''),
  honorSelected: -1,
  honorText: Array(7).fill(''),
};

export const TaskForGod: React.FC = () => {
  const captureRef = useRef<HTMLDivElement>(null);

  const [todoChecked, setTodoChecked] = useState<boolean[]>(defaultState.todoChecked);
  const [todoText, setTodoText] = useState<string[]>(defaultState.todoText);
  const [honorSelected, setHonorSelected] = useState<number>(defaultState.honorSelected);
  const [honorText, setHonorText] = useState<string[]>(defaultState.honorText);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setTodoChecked(parsed.todoChecked ?? defaultState.todoChecked);
      setTodoText(parsed.todoText ?? defaultState.todoText);
      setHonorSelected(parsed.honorSelected ?? defaultState.honorSelected);
      setHonorText(parsed.honorText ?? defaultState.honorText);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ todoChecked, todoText, honorSelected, honorText }));
  }, [todoChecked, todoText, honorSelected, honorText]);

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
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  id={`todo-${i}`}
                  checked={todoChecked[i]}
                  onChange={e => {
                    const next = [...todoChecked];
                    next[i] = e.target.checked;
                    setTodoChecked(next);
                  }}
                />
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id={`todo-input-${i}`}
                  value={todoText[i]}
                  onChange={e => {
                    const next = [...todoText];
                    next[i] = e.target.value;
                    setTodoText(next);
                  }}
                />
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
                <input
                  className="form-check-input me-2"
                  type="radio"
                  name="honor"
                  id={`honor-${i}`}
                  checked={honorSelected === i}
                  onChange={() => setHonorSelected(i)}
                />
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id={`honor-input-${i}`}
                  value={honorText[i]}
                  onChange={e => {
                    const next = [...honorText];
                    next[i] = e.target.value;
                    setHonorText(next);
                  }}
                />
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