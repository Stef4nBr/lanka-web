import { useEffect, useRef, useState } from 'react';
import { Canvas, FabricImage, Circle, FabricText, Control, util } from 'fabric';

// SVG icons as data URLs
const deleteIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

const cloneIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.0' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 55.699 55.699' width='100px' height='100px' xml:space='preserve'%3E%3Cpath style='fill:%23010002;' d='M51.51,18.001c-0.006-0.085-0.022-0.167-0.05-0.248c-0.012-0.034-0.02-0.067-0.035-0.1 c-0.049-0.106-0.109-0.206-0.194-0.291v-0.001l0,0c0,0-0.001-0.001-0.001-0.002L34.161,0.293c-0.086-0.087-0.188-0.148-0.295-0.197 c-0.027-0.013-0.057-0.02-0.086-0.03c-0.086-0.029-0.174-0.048-0.265-0.053C33.494,0.011,33.475,0,33.453,0H22.177 c-3.678,0-6.669,2.992-6.669,6.67v1.674h-4.663c-3.678,0-6.67,2.992-6.67,6.67V49.03c0,3.678,2.992,6.669,6.67,6.669h22.677 c3.677,0,6.669-2.991,6.669-6.669v-1.675h4.664c3.678,0,6.669-2.991,6.669-6.669V18.069C51.524,18.045,51.512,18.025,51.51,18.001z M34.454,3.414l13.655,13.655h-8.985c-2.575,0-4.67-2.095-4.67-4.67V3.414z M38.191,49.029c0,2.574-2.095,4.669-4.669,4.669H10.845 c-2.575,0-4.67-2.095-4.67-4.669V15.014c0-2.575,2.095-4.67,4.67-4.67h5.663h4.614v10.399c0,3.678,2.991,6.669,6.668,6.669h10.4 v18.942L38.191,49.029L38.191,49.029z M36.777,25.412h-8.986c-2.574,0-4.668-2.094-4.668-4.669v-8.985L36.777,25.412z M44.855,45.355h-4.664V26.412c0-0.023-0.012-0.044-0.014-0.067c-0.006-0.085-0.021-0.167-0.049-0.249 c-0.012-0.033-0.021-0.066-0.036-0.1c-0.048-0.105-0.109-0.205-0.194-0.29l0,0l0,0c0-0.001-0.001-0.002-0.001-0.002L22.829,8.637 c-0.087-0.086-0.188-0.147-0.295-0.196c-0.029-0.013-0.058-0.021-0.088-0.031c-0.086-0.03-0.172-0.048-0.263-0.053 c-0.021-0.002-0.04-0.013-0.062-0.013h-4.614V6.67c0-2.575,2.095-4.67,4.669-4.67h10.277v10.4c0,3.678,2.992,6.67,6.67,6.67h10.399 v21.616C49.524,43.26,47.429,45.355,44.855,45.355z'/%3E%3C/svg%3E%0A";

const colorChangeIcon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234CAF50'%3E%3Ccircle cx='12' cy='12' r='10' fill='%234CAF50' stroke='white' stroke-width='2'/%3E%3Ctext x='12' y='16' font-size='12' font-weight='bold' text-anchor='middle' fill='white'%3E2x%3C/text%3E%3C/svg%3E";

// 8 base colors for circle cycling
const baseColors = [
  '#FF0000', // Red
  '#FFA500', // Orange
  '#FFFF00', // Yellow
  '#00FF00', // Green
  '#00FFFF', // Cyan
  '#0000FF', // Blue
  '#FF00FF', // Magenta
  '#000000', // Black
];

// Sample images - you can add your own images in /public/static/images/
const imageLibrary = [
  { id: 1, name: 'Chair', type: 'image', url: '/static/images/chair.png', thumbnail: '/static/images/chair.png' },
  { id: 2, name: 'Black Chair', type: 'image', url: '/static/images/chair_black.png', thumbnail: '/static/images/chair_black.png' },
  { id: 3, name: 'Circle Table', type: 'image', url: '/static/images/table_circle.png', thumbnail: '/static/images/table_circle.png' },
  { id: 4, name: 'Rectangle Table', type: 'image', url: '/static/images/table_rectangle.png', thumbnail: '/static/images/table_rectangle.png' },
  { id: 5, name: 'Square Table', type: 'image', url: '/static/images/table_square.png', thumbnail: '/static/images/table_square.png' },
  { id: 6, name: 'Occupied', type: 'shape', shape: 'circle', color: '#FF0000' },
  { id: 7, name: 'Add Name tag', type: 'text' },
  { id: 8, name: 'Door', type: 'image', url: '/static/images/door.png', thumbnail: '/static/images/door.png' },
  { id: 9, name: 'Double Door', type: 'image', url: '/static/images/double_door.png', thumbnail: '/static/images/double_door.png' }
];

function FabricTest({ authenticated = false, loginUser, editMode = false }) {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fabricContent, setFabricContentFromCookie] = useState(null
    || window.localStorage.getItem("fabric-editor-content"));
  const token = localStorage.getItem("jwtToken");

  // Reusable flag for edit permissions - define once at component level
  const canEdit = authenticated && editMode;

  // Fullscreen handlers
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      canvasContainerRef.current?.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    // Determine canvas size based on fullscreen mode
    const canvasWidth = isFullscreen ? 1400 : (editMode ? 800 : 1000);
    const canvasHeight = isFullscreen ? 900 : 600;

    // Initialize fabric canvas
    let canvas = new Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: '#ffffff',
      selection: canEdit // Allow selection only if authenticated and in edit mode
    });

    fabricCanvasRef.current = canvas;

    // Disable all interactions if not in edit mode
    if (!canEdit) {
      canvas.selection = false;
      canvas.skipTargetFind = true; // Prevents finding targets on mouse events
    }

    // Create image elements for control icons
    const deleteImg = document.createElement('img');
    deleteImg.src = deleteIcon;

    const cloneImg = document.createElement('img');
    cloneImg.src = cloneIcon;

    const colorChangeImg = document.createElement('img');
    colorChangeImg.src = colorChangeIcon;

    // Helper functions
    function deleteObject(_eventData, transform) {
      const canvas = transform.target.canvas;
      canvas.remove(transform.target);
      canvas.requestRenderAll();
    }

    function cloneObject(_eventData, transform) {
      const canvas = transform.target.canvas;
      transform.target.clone().then((cloned) => {
        cloned.set({
          left: cloned.left + 10,
          top: cloned.top + 10
        });
        if (canEdit) {
          cloned.controls.deleteControl = transform.target.controls.deleteControl;
          cloned.controls.cloneControl = transform.target.controls.cloneControl;
        }
        canvas.add(cloned);
      });
    }

    function renderIcon(icon) {
      return function (ctx, left, top, _styleOverride, fabricObject) {
        const size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(icon, -size / 2, -size / 2, size, size);
        ctx.restore();
      };
    }

    // Helper function to add custom controls
    function addCustomControls(obj) {
      if (canEdit) {
        obj.controls.deleteControl = new Control({
          x: 0.5,
          y: -0.5,
          offsetY: -16,
          offsetX: 16,
          cursorStyle: 'pointer',
          mouseUpHandler: deleteObject,
          render: renderIcon(deleteImg),
          cornerSize: 24,
        });

        obj.controls.cloneControl = new Control({
          x: -0.5,
          y: -0.5,
          offsetY: -16,
          offsetX: -16,
          cursorStyle: 'pointer',
          mouseUpHandler: cloneObject,
          render: renderIcon(cloneImg),
          cornerSize: 24,
        });

        // Add color change control only for circles
        if (obj.type === 'circle') {
          obj.controls.colorChangeControl = new Control({
            x: 0,
            y: -0.5,
            offsetY: -16,
            cursorStyle: 'pointer',
            mouseUpHandler: () => { }, // No action on mouseUp, handled by dblclick
            render: renderIcon(colorChangeImg),
            cornerSize: 24,
          });

          // Store current color index if not exists
          if (!obj.colorIndex) {
            const currentColorIndex = baseColors.indexOf(obj.fill);
            obj.colorIndex = currentColorIndex >= 0 ? currentColorIndex : 0;
          }
        }
      }
    }

    // Load canvas content from localStorage if exists
    if (fabricContent) {

      const parsedContent = typeof fabricContent === 'string'
        ? JSON.parse(fabricContent)
        : fabricContent;

      canvas.loadFromJSON(parsedContent).then(() => {
        // Re-attach custom controls to all loaded objects
        canvas.getObjects().forEach((obj) => {
          // Update object properties based on current edit permissions
          obj.set({
            selectable: canEdit,
            evented: canEdit,
            hasControls: canEdit,
            lockMovementX: !canEdit,
            lockMovementY: !canEdit,
            lockRotation: !canEdit,
            lockScalingX: !canEdit,
            lockScalingY: !canEdit,
          });

          // Restore colorIndex for circles
          if (obj.type === 'circle' && obj.fill) {
            const colorIndex = baseColors.indexOf(obj.fill);
            obj.colorIndex = colorIndex >= 0 ? colorIndex : 0;
          }
          addCustomControls(obj);
        });
        canvas.renderAll();
        console.log('Canvas loaded from localStorage');
      }).catch((err) => {
        console.error('Error loading canvas:', err);
      });

    }

    // Add event listeners to save canvas on changes
    const saveCanvas = () => {
      if (loginUser && token && editMode) {
        const json = canvas.toJSON();
        const jsonString = JSON.stringify(json);
        setFabricContentFromCookie(jsonString);
        window.localStorage.setItem("fabric-editor-content", jsonString);
        console.log('Canvas saved to localStorage');
      }
    };

    // Save on object modifications
    canvas.on('object:modified', saveCanvas);
    canvas.on('object:added', saveCanvas);
    canvas.on('object:removed', saveCanvas);

    // Add double-click event to change circle colors
    canvas.on('mouse:dblclick', (event) => {
      if (canEdit && event.target && event.target.type === 'circle') {
        const circle = event.target;
        // Get current color index or initialize it
        const currentIndex = circle.colorIndex || 0;
        // Cycle to next color
        const nextIndex = (currentIndex + 1) % baseColors.length;
        circle.colorIndex = nextIndex;
        circle.set('fill', baseColors[nextIndex]);
        canvas.renderAll();
        saveCanvas(); // Save after color change
        console.log(`Circle color changed to ${baseColors[nextIndex]}`);
      }
    });

    // Store function to add images
    fabricCanvasRef.current.addImageToCanvas = (imageUrl) => {
      if (!canEdit) {
        alert('Please sign in and enter edit mode to add images');
        return;
      }

      FabricImage.fromURL(imageUrl).then((img) => {
        img.set({
          left: 100,
          top: 100,
          scaleX: 0.5,
          scaleY: 0.5,
          selectable: canEdit,
          evented: canEdit,
          hasControls: canEdit,
          lockMovementX: !canEdit,
          lockMovementY: !canEdit,
          lockRotation: !canEdit,
          lockScalingX: !canEdit,
          lockScalingY: !canEdit,
        });

        addCustomControls(img);
        canvas.add(img);
        if (canEdit) {
          canvas.setActiveObject(img);
        }
        canvas.renderAll();
      });
    };

    // Store function to add shapes (circle)
    fabricCanvasRef.current.addShapeToCanvas = (shape, color) => {
      if (!canEdit) {
        alert('Please sign in and enter edit mode to add shapes');
        return;
      }

      let fabricShape;
      if (shape === 'circle') {
        // Find color index in base colors
        const colorIndex = baseColors.indexOf(color);

        fabricShape = new Circle({
          left: 100,
          top: 100,
          radius: 25,
          fill: color,
          selectable: canEdit,
          evented: canEdit,
          hasControls: canEdit,
          lockMovementX: !canEdit,
          lockMovementY: !canEdit,
          lockRotation: !canEdit,
          lockScalingX: !canEdit,
          lockScalingY: !canEdit,
        });

        // Store the color index for cycling
        fabricShape.colorIndex = colorIndex >= 0 ? colorIndex : 0;
      }

      if (fabricShape) {
        addCustomControls(fabricShape);
        canvas.add(fabricShape);
        if (canEdit) {
          canvas.setActiveObject(fabricShape);
        }
        canvas.renderAll();
      }
    };

    // Store function to add text
    fabricCanvasRef.current.addTextToCanvas = (textContent) => {
      if (!canEdit) {
        alert('Please sign in and enter edit mode to add text');
        return;
      }

      const text = new FabricText(textContent, {
        left: 100,
        top: 100,
        fontSize: 24,
        fill: '#000000',
        fontFamily: 'Arial',
        selectable: canEdit,
        evented: canEdit,
        hasControls: canEdit,
        lockMovementX: !canEdit,
        lockMovementY: !canEdit,
        lockRotation: !canEdit,
        lockScalingX: !canEdit,
        lockScalingY: !canEdit,
      });

      addCustomControls(text);
      canvas.add(text);
      if (canEdit) {
        canvas.setActiveObject(text);
      }
      canvas.renderAll();
    };

    // Cleanup
    return () => {
      canvas.dispose();
    };
  }, [authenticated, editMode, fabricContent, isFullscreen]);

  const handleItemClick = (item) => {
    if (!canEdit) {
      alert('Please sign in and enter edit mode to add items');
      return;
    }

    setSelectedImage(item.id);

    if (item.type === 'image') {
      if (fabricCanvasRef.current && fabricCanvasRef.current.addImageToCanvas) {
        fabricCanvasRef.current.addImageToCanvas(item.url);
      }
    } else if (item.type === 'shape') {
      if (fabricCanvasRef.current && fabricCanvasRef.current.addShapeToCanvas) {
        fabricCanvasRef.current.addShapeToCanvas(item.shape, item.color);
      }
    } else if (item.type === 'text') {
      const textContent = prompt('Enter text:', 'Your text here');
      if (textContent && fabricCanvasRef.current && fabricCanvasRef.current.addTextToCanvas) {
        fabricCanvasRef.current.addTextToCanvas(textContent);
      }
    }
  };

  return (
    <div className="Fabric" style={{}}>
      <h1 style={{ margin: '20px' }}>Sitting order</h1>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Sidebar with image library - only show in edit mode */}
        {editMode && (
          <div
            style={{
              minWidth: '40px',
              width: '120px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: '#f9f9f9',
              maxHeight: '600px',
              overflowY: 'auto',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ fontSize: '18px', marginTop: 0, marginBottom: '15px', fontWeight: 'bold' }}>Item Library</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {imageLibrary.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  style={{
                    cursor: canEdit ? 'pointer' : 'not-allowed',
                    padding: '12px',
                    border: selectedImage === item.id ? '3px solid #4CAF50' : '2px solid #e0e0e0',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    opacity: canEdit ? 1 : 0.6,
                    minHeight: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: selectedImage === item.id ? '0 4px 8px rgba(76, 175, 80, 0.3)' : '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    if (canEdit) {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {item.type === 'image' && (
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '4px',
                        display: 'block'
                      }}
                    />
                  )}
                  {item.type === 'shape' && item.shape === 'circle' && (
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: item.color,
                        margin: '0 auto'
                      }}
                    />
                  )}
                  {item.type === 'text' && (
                    <div
                      style={{
                        fontSize: '40px',
                        fontWeight: 'bold',
                        color: '#333'
                      }}
                    >
                      T
                    </div>
                  )}
                  <p style={{
                    fontSize: '13px',
                    margin: '8px 0 0 0',
                    color: '#333',
                    fontWeight: '500'
                  }}>
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Canvas area */}
        <div 
          ref={canvasContainerRef}
          style={{ 
            flex: 1, 
            maxWidth: editMode ? '800px' : '1000px',
            position: 'relative',
            backgroundColor: isFullscreen ? '#e9e9e9ff' : 'transparent',
            padding: isFullscreen ? '20px' : '0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Fullscreen button */}
          <button
            onClick={toggleFullscreen}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 1000,
              padding: '10px 15px',
              backgroundColor: isFullscreen ? '#ff4444' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
            }}
          >
            {isFullscreen ? '✕ Exit Fullscreen' : '⛶'}
          </button>

          <canvas ref={canvasRef} style={{ border: '2px solid #333', borderRadius: '4px', width: '100%', maxWidth: '100%' }} />
          <p style={{ marginTop: '10px', fontSize: '14px', color: isFullscreen ? '#ccc' : '#666' }}>
            {canEdit
              ? 'Click on an item in the sidebar to add it to the canvas. Images, shapes, and text can be dragged, resized, and rotated. Use the controls to delete or clone.'
              : 'Sign in to add and edit items on the canvas.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}

export default FabricTest;
