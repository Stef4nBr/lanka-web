import { StaticCanvas, FabricText } from 'fabric';

const canvas = new StaticCanvas();
const helloWorld = new FabricText('Hello world!');
canvas.add(helloWorld);
canvas.centerObject(helloWorld);

function FabricTest() {
  return (
    <div className="App">
      <div style={{height:"100px"}}></div>
    </div>
  );
}

export default FabricTest;
