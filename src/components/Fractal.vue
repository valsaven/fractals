<template>
  <div class="fractal">
    <h1>The Tree</h1>
    <div class="generate-form">
      <label for="fLength">Length</label>
      <input type="number" id="fLength" name="fLength" v-model="length" @change="generate">
      <label for="fAngle">Angle</label>
      <input type="number" id="fAngle" name="fAngle" v-model="angle" @change="generate" step="0.1">
      <label for="fScale">Scale</label>
      <input type="number" id="fScale" name="fScale" v-model="scale" @change="generate" step="0.01">
      <button @click="generate">Generate</button>
    </div>
    <div id="canvas-container">
      <canvas id="fCanvas" width="900" height="600"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Fractal',
  props: {
    msg: String,
  },
  mounted() {
    this.generate();
  },
  data() {
    return {
      length: 90,
      angle: 0.5,
      scale: 0.75,
    };
  },
  methods: {
    generate() {
      const canvas = document.getElementById('fCanvas');
      const context = canvas.getContext('2d');

      function clearCanvas(context, canvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        const w = canvas.width;
        canvas.width = 1;
        canvas.width = w;
        context.save();
      }

      clearCanvas(context, canvas);
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

      context.translate(document.getElementById('fCanvas').clientWidth / 2, 0);
      branch(this.length, this.angle, this.scale);
    },
  },
};
</script>

<style scoped>
.fractal {
  display: flex;
  flex-direction: column;
}

.generate-form {
  display: flex;
  justify-content: center;
}

#canvas-container {
  width: 100%;
  text-align: center;
}

#fCanvas {
  display: inline;
}
</style>
