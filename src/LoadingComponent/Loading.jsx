import React from "react";

export default function Loading() {
  return (
    <>
      <div
        className="position-absolute bg-black d-flex justify-content-center align-items-center opacity-25"
        style={{ inset: 0 }}
      >
        <div
          className="spinner-border text-primary"
          style={{ width: 10 + "rem", height: 10 + "rem" }}
          role="status"
        ></div>
      </div>
    </>
  );
}
