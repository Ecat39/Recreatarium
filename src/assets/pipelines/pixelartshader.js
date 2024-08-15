const vertShader = `
precision mediump float;

// Input attributes
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

// Output varyings
varying vec2 vTextureCoord;

void main(void) {
    gl_Position = vec4(aVertexPosition, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}
`;

const fragShader= `
precision mediump float;

// Input textures
uniform sampler2D uMainSampler;

// Texture dimensions
uniform vec2 uResolution;
uniform vec2 uTextureSize;

// Pixel size
uniform float uPixelWidth;
uniform float uPixelHeight;

void main(void) {
    vec2 texCoord = gl_FragCoord.xy / uResolution;
    vec2 pixelCoord = floor(texCoord * uTextureSize);

    // Calculate the location within the texel
    vec2 locationWithinTexel = fract(texCoord * uTextureSize);

    // Calculate interpolation amount
    vec2 interpolationAmount = clamp(locationWithinTexel / vec2(uPixelWidth, uPixelHeight), 0.0, 0.5) +
                               clamp((locationWithinTexel - 1.0) / vec2(uPixelWidth, uPixelHeight) + 0.5, 0.0, 0.5);

    // Final texture coordinates
    vec2 finalTextureCoords = (pixelCoord + interpolationAmount) / uTextureSize;

    // Output the pixel color
    gl_FragColor = texture2D(uMainSampler, finalTextureCoords);
}
`;

export default class PixelArtShader extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline
{
    constructor (game)
    {
        super({
            game,
            renderTarget: true,
            vertShader,
            fragShader
        });
    }
}