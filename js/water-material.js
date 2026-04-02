AFRAME.registerShader('water-shader', {
  schema: {
    time: {type: 'time', is: 'uniform'},
    color: {type: 'color', is: 'uniform', default: '#0077ff'},
    opacity: {type: 'number', is: 'uniform', default: 0.6},
    waveSpeed: {type: 'number', is: 'uniform', default: 1.0},
    waveStrength: {type: 'number', is: 'uniform', default: 0.1}
  },

  vertexShader: `
    varying vec2 vUv;
    uniform float time;
    uniform float waveSpeed;
    uniform float waveStrength;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float wave = sin(pos.x * 2.0 + time * waveSpeed * 0.001) * 
                   cos(pos.y * 2.0 + time * waveSpeed * 0.001) * waveStrength;
      pos.z += wave;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,

  fragmentShader: `
    varying vec2 vUv;
    uniform vec3 color;
    uniform float opacity;
    uniform float time;

    void main() {
      float pulse = (sin(time * 0.002) + 1.0) * 0.1;
      vec3 finalColor = color + pulse;
      gl_FragColor = vec4(finalColor, opacity);
    }
  `
});
