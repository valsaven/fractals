// Generates a fractal tree on the canvas based on input values.
function generate() {
  const canvas = document.querySelector('.fractal__canvas');
  const context = canvas.getContext('2d');

  // Retrieving values from input fields
  const length = parseFloat(document.getElementById('fLength').value) || 90;
  const angle = parseFloat(document.getElementById('fAngle').value) || 0.5;
  const scale = parseFloat(document.getElementById('fScale').value) || 0.75;

  const branchColor = getComputedStyle(document.documentElement).getPropertyValue('--branch-color').trim();

  /**
   * Clears the canvas by resetting its width and height.
   *
   * @param context - The 2D rendering context of the canvas.
   * @param canvas - The canvas element to be cleared.
   */
  function clearCanvas(context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
    context.save();
  }

  clearCanvas(context, canvas);

  /**
   * Recursively draws a branch of the fractal tree.
   *
   * @param length - The length of the current branch.
   * @param angle - The angle at which the branch is drawn.
   * @param scale - The scaling factor for the next branch.
   */
  function branch(length, angle, scale) {
    context.fillRect(0, 0, 1, length);

    const minLength = 8;

    if (length < minLength) {
      return;
    }

    context.save();
    context.translate(0, length);
    context.rotate(-angle);
    branch(length * scale, angle, scale);

    context.rotate(2 * angle);
    branch(length * scale, angle, scale);

    context.restore();
  }

  // Initial position at the center of the canvas horizontally
  context.translate(canvas.clientWidth / 2, 0);
  context.fillStyle = branchColor;

  branch(length, angle, scale);
}

window.onload = function() {
  // Add auto height and auto width for canvas
  const canvas = document.querySelector('.fractal__canvas');
  canvas.width = window.innerWidth > 640 ? 640 : window.innerWidth;
  canvas.height = window.innerHeight > 480 ? 480 : window.innerHeight;
  generate();
};

document.getElementById('fLength').addEventListener('change', generate);
document.getElementById('fAngle').addEventListener('change', generate);
document.getElementById('fScale').addEventListener('change', generate);