// !! CURRENTLY UNUSED !!

import React from 'react';
import { StaticCanvas, FabricText } from 'fabric';

const canvas = new StaticCanvas();
const helloWorld = new FabricText('Hello world!');

canvas.add(helloWorld);
canvas.centerObject(helloWorld);



function Fabric(): React.ReactElement {
  return (
    <div className="Fabric">

        <canvas id="fabricCanvas" width="800" height="600">


        </canvas>
    </div>
  );
}

export default Fabric;
