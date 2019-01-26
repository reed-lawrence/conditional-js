var conditional = function() {
  const materialColors = ['#ef5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5',
    '#29B6F6', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726',
    '#FF7043', '#8D6E63', '#BDBDBD', '#78909C'
  ];

  const previouslyGenerated = new Array();

  function hex(c) {
    const s = '0123456789abcdef';

    let i = parseInt(c, 10);
    if (i === 0 || isNaN(c)) {
      return '00';
    }
    i = Math.round(Math.min(Math.max(0, i), 255));
    return s.charAt((i - i % 16) / 16) + s.charAt(i % 16);
  }

  /* Convert an RGB triplet to a hex string */
  function convertToHex(rgb) {
    return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
  }

  /* Remove '#' in color hex string */
  function trim(s) {
    return (s.charAt(0) === '#') ? s.substring(1, 7) : s;
  }

  function convertToRGB(hex) {
    const color = [];
    color[0] = parseInt((trim(hex)).substring(0, 2), 16);
    color[1] = parseInt((trim(hex)).substring(2, 4), 16);
    color[2] = parseInt((trim(hex)).substring(4, 6), 16);
    return color;
  }

  function generateTwoWayGradient(colorEnd, colorStart, colorCount) {

    // The beginning of your gradient
    const start = convertToRGB(colorStart);

    // The end of your gradient
    const end = convertToRGB(colorEnd);

    // The number of colors to compute
    const len = colorCount;

    // Alpha blending amount
    let alpha = 0.0;

    const saida = [];

    for (let i = 0; i < len; i++) {
      const c = [];
      alpha += (1.0 / len);

      c[0] = start[0] * alpha + (1 - alpha) * end[0];
      c[1] = start[1] * alpha + (1 - alpha) * end[1];
      c[2] = start[2] * alpha + (1 - alpha) * end[2];

      saida.push('#' + convertToHex(c));

    }
    return saida;
  }

  function generateThreeWayGradient(colorStart, colorMiddle, colorEnd, colorCount) {
    
    // Divide by two because the two way gradient creates a color list of the full length passed to it
    const _colorCount = colorCount / 2;

    const ar1 = generateTwoWayGradient(colorStart, colorMiddle, _colorCount);
    const ar2 = generateTwoWayGradient(colorMiddle, colorEnd, _colorCount);

    const output = [];

    for (let i = 0; i < ar1.length; i++) {
      output.push(ar1[i]);
    }

    ar2.splice(0, 1);
    for (let i = 0; i < ar2.length; i++) {
      output.push(ar2[i]);
    }
    return output;
  }

  function getConditionalValueColor(value, min, max, colorArray) {
    console.log('getConditionalValueColor called');
    const step = (max - min) / colorArray.length;
    let cIndex = 0;
    for (let i = min; i < max; i += step) {
      if (i === min) {
        if (value <= i + step) {
          return colorArray[cIndex];
        }
      } else if (i === max - step) {
        if (value >= max - step) {
          return colorArray[cIndex];
        }
      } else {
        if (value > i && value < i + step) {
          return colorArray[cIndex];
        } else if (value === i) {
          return colorArray[cIndex];
        }
      }
      cIndex++;
    }
  }

  function getRandomMaterialDesignColor() {

    // clean the array
    if (previouslyGenerated.length === materialColors.length) {
      previouslyGenerated = [];
    }


    for (let i = 0; i < materialColors.length; i++) {
      const randomIndex = Math.floor(Math.random() * materialColors.length);
      const chosenColor = materialColors[randomIndex];

      // ensure the color hasn't been picked recently
      if (previouslyGenerated.indexOf(chosenColor, 0) === -1) {
        return chosenColor;
      }
    }
  }

  return {
    getRandomMaterialDesignColor: getRandomMaterialDesignColor,
    getConditionalValueColor: getConditionalValueColor,
    generateThreeWayGradient: generateThreeWayGradient,
    generateTwoWayGradient: generateTwoWayGradient
  }
}

module.exports = exports = conditional();