// !! CURRENTLY UNUSED !!


import { StaticCanvas, FabricText } from 'fabric';

const canvas = new StaticCanvas();
const helloWorld = new FabricText('Hello world!');


canvas.add(helloWorld);
canvas.centerObject(helloWorld);

function FabricTest() {
  return (
    <div className="Fabric">
    </div>
  );
}

export default FabricTest;
