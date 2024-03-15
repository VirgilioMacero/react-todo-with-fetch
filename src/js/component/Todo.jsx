import React from "react";

export default function Todo(props) {
  const { key, text, id, onDelete, state, onChangeState } = props;

  return (
    <div className="card col" key={id} style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">To Do Item</h5>
        <p className="card-text">{text}</p>
        <div className="d-flex justify-content-between">
          <button
            style={{ borderRadius: "5px" }}
            onClick={() => onDelete(id)}
            className="card-link"
          >
            ❌
          </button>
          <button
            style={{ borderRadius: "5px" }}
            onClick={() => onChangeState(id)}
          >
            {!state ? "⛔" : "✅"}
          </button>
        </div>
      </div>
    </div>
  );
}
