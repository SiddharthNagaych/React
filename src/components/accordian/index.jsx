import data from "./data";
import React, { useState } from 'react';
import './index.css'

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(id) {
    setSelected(id === selected ? null : id);
  }

  function handleMutipleSelection(id) {
    let cpyMultiple = [...multiple];
    const findIndexOfId = cpyMultiple.indexOf(id);

    if (findIndexOfId === -1) {
      cpyMultiple.push(id);  // Add if not already selected
    } else {
      cpyMultiple.splice(findIndexOfId, 1);  // Remove by index
    }

    setMultiple(cpyMultiple);
  }

  return (
    <div className="acc-wrapper">
      <div className="accordion">
        <button 
          onClick={() => setEnableMultiSelection(!enableMultiSelection)} 
          className="accordion-wrapper button"
        >
          {enableMultiSelection ? 'Disable Multi Selection' : 'Enable Multi Selection'}
        </button>

        {data && data.length > 0 ? (
          data.map(dataItem => (
            <div className="item" key={dataItem.id}>
              <div 
                onClick={() => (
                  enableMultiSelection 
                  ? handleMutipleSelection(dataItem.id)
                  : handleSingleSelection(dataItem.id)
                )} 
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              
              <div className="">
                {enableMultiSelection ? (
                  multiple.includes(dataItem.id) && (
                    <div className="acc-content">
                      {dataItem.answer}
                    </div>
                  )
                ) : (
                  selected === dataItem.id && (
                    <div className="acc-content">
                      {dataItem.answer}
                    </div>
                  )
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No data is present</div>
        )}
      </div>
    </div>
  );
}
