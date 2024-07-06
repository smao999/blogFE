import React, {memo, useEffect, useState} from 'react'
import MacDocker from "@/components/Docker";


const Category = memo(() => {

  useEffect(
    () => {
      const gl = (document.getElementById("webgl") as HTMLCanvasElement).getContext('webgl2');
      if(!gl) return;

      const VSHADER_SOURCE = `
        void main() {
          gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
          gl_PointSize = 20.0;
        }
      `
      const FSHADER_SOURCE = `
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
      `
      const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
      gl.shaderSource(vertexShader, VSHADER_SOURCE);
      gl.shaderSource(fragmentShader, FSHADER_SOURCE);
      gl.compileShader(vertexShader);
      gl.compileShader(fragmentShader);
      // program
      let program = gl.createProgram() as WebGLProgram;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.useProgram(program);

      gl.clearColor(0, 0, 1.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.drawArrays(gl.POINTS, 0 ,1)
    },
    []
  )
  
  return (
    <div>
      {/*<MacDocker/>*/}
      <canvas id="webgl" style={{height: '500px', width: '500px'}}>'请升级浏览器'</canvas>
    </div>
  )
})

export default Category