// !! CURRENTLY UNUSED !!

import React from 'react';
import { StaticCanvas, FabricText } from 'fabric';

const canvas = new StaticCanvas();
const helloWorld = new FabricText('Hello world!');

canvas.add(helloWorld);
canvas.centerObject(helloWorld);

function Fabric(): React.ReactElement {
  return (
    <div
      className="fabric-canvas-container"
      style={{
        border: "1px solid #121111ff",
        borderRadius: "8px",
        padding: "20px",
        background: "linear-gradient(135deg, #e7dadaff 40%, #cfcfcf 70%, #b0c4de 100%)",
        boxShadow:
          "0 8px 32px 0 rgba(31, 38, 135, 0.15), 0 1.5px 8px 0 rgba(80, 80, 80, 0.08)",
        transition: "box-shadow 0.2s",
        marginTop: "20px",
      }}
    >
      <canvas id="fabricCanvas" width="800" height="600"></canvas>
    </div>
  );
}

export default Fabric;
