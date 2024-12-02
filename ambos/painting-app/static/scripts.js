window.onload = () => {
  const canvas = document.getElementById('paintCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.8;

  let painting = false;
  let brushColor = '#000000';
  let brushSize = 5;

  const startPosition = (e) => {
    painting = true;
    draw(e);
  };

  const endPosition = () => {
    painting = false;
    ctx.beginPath();
  };

  const draw = (e) => {
    if (!painting) return;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  };

  // Event listeners for drawing
  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', endPosition);
  canvas.addEventListener('mousemove', draw);

  // Change brush color
  const colorPicker = document.getElementById('colorPicker');
  colorPicker.addEventListener('input', (e) => {
    brushColor = e.target.value;
  });

  // Change brush size
  const brushSizeInput = document.getElementById('brushSize');
  const brushSizeValue = document.getElementById('brushSizeValue');
  brushSizeInput.addEventListener('input', (e) => {
    brushSize = e.target.value;
    brushSizeValue.textContent = brushSize;
  });

  // Clear canvas
  const clearCanvasButton = document.getElementById('clearCanvas');
  clearCanvasButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // Save drawing
  const saveButton = document.getElementById('saveDrawing');
  saveButton.addEventListener('click', () => {
    const nameInput = document.getElementById('drawingName');
    const drawingName = nameInput.value.trim();

    if (!drawingName) {
      alert('Please enter a name for your drawing.');
      return;
    }

    const imageData = canvas.toDataURL();
    fetch('/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: drawingName,
        image: imageData,
      }),
    })
      .then((response) => response.json())
      .then((data) => alert(data.message))
      .catch((err) => console.error(err));
  });

  // Load drawing
  const loadButton = document.getElementById('loadDrawing');
  loadButton.addEventListener('click', () => {
    const nameInput = document.getElementById('drawingName');
    const drawingName = nameInput.value.trim();

    if (!drawingName) {
      alert('Please enter the name of the drawing to load.');
      return;
    }

    fetch(`/load/${drawingName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          const img = new Image();
          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          };
          img.src = data.image;
        }
      })
      .catch((err) => console.error(err));
  });
};
