interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface Vector2 {
  x: number;
  y: number;
}

/**
 * Calculate the value on a line given two points and the current x value.
 *
 * @param {number} y2 - The y coordinate of the second point
 * @param {number} y1 - The y coordinate of the first point
 * @param {number} x2 - The x coordinate of the second point
 * @param {number} x1 - The x coordinate of the first point
 * @param {number} currentVal - The current x value to calculate the corresponding y value for
 * @return {number} The calculated y value based on the input parameters
 */
const LineEq = (y2: number, y1: number, x2: number, x1: number, currentVal: number): number => {
  const m: number = (y2 - y1) / (x2 - x1);
  const b: number = y1 - m * x1;
  return m * currentVal + b;
};

/**
 * Maps a value from one range to another using linear interpolation.
 *
 * @param {number} x - The value to be mapped.
 * @param {number} a - The lower bound of the input range.
 * @param {number} b - The upper bound of the input range.
 * @param {number} c - The lower bound of the output range.
 * @param {number} d - The upper bound of the output range.
 * @return {number} The mapped value.
 */
const MathMap = (x: number, a: number, b: number, c: number, d: number): number => {
  return parseFloat((((x - a) * (d - c)) / (b - a) + c).toFixed(3));
};

const MathMapVector3 = (point: number, a: number, b: number, c: Vector3, d: Vector3): Vector3 => {
  return {
    x: MathMap(point, a, b, c.x, d.x),
    y: MathMap(point, a, b, c.y, d.y),
    z: MathMap(point, a, b, c.z, d.z),
  };
};

/**
 * Linearly interpolates between two numbers.
 *
 * @param {number} a - the start value
 * @param {number} b - the end value
 * @param {number} n - the interpolation factor
 * @return {number} the interpolated value
 */
const MathLerp = (a: number, b: number, n: number): number => {
  return parseFloat(((1 - n) * a + n * b).toFixed(3));
};

/**
 * Generates a random float number between the specified minimum and maximum values.
 *
 * @param {number} min - the minimum value for the random number
 * @param {number} max - the maximum value for the random number
 * @return {number} the generated random float number
 */
const RandomFloat = (min: number, max: number): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

/**
 * Clamps a number within the specified range.
 *
 * @param {number} num - The number to clamp.
 * @param {number} min - The minimum value in the range.
 * @param {number} max - The maximum value in the range.
 * @return {number} The clamped number within the specified range.
 */
export const MathClamp = (num: number, min: number, max: number): number =>
  Math.min(Math.max(num, min), max);

/**
 * Calculates the new coordinates of a point based on a given radius and current position.
 *
 * @param {number} r - The radius of the circle.
 * @param {Vector2} { x, y } - The current position of the point.
 * @return {Vector2} The new coordinates after moving the point by the specified radius.
 */
const MathAround = (r: number, { x, y }: Vector2): Vector2 => {
  const z = Math.sqrt(Math.pow(y, 2) + Math.pow(x, 2));
  const sin = y / z;
  const cos = x / z;

  return {
    x: cos * r,
    y: sin * r,
  };
};

const Radians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

/**
 * Calculates the rotation angle in degrees based on the given x and y coordinates.
 *
 * @param {number} x - The x coordinate
 * @param {number} y - The y coordinate
 * @return {number} The rotation angle in degrees
 */
export const rotationDeg = (x: number, y: number): number => {
  return (Math.atan(y / x) * 180) / Math.PI;
};

/**
 * Calculates the distance between two points in a 2D plane.
 *
 * @param {number} x1 - x-coordinate of the first point
 * @param {number} y1 - y-coordinate of the first point
 * @param {number} x2 - x-coordinate of the second point
 * @param {number} y2 - y-coordinate of the second point
 * @return {number} the distance between the two points
 */
const Distance = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

interface IGetOffsetThreeJs {
  left: number;
  top: number;
  width: number;
  height: number;
  winSize: Vector2;
}

/**
 * Generate offset for ThreeJs element based on input parameters.
 *
 * @param {IGetOffsetThreeJs} left - The left position
 * @param {IGetOffsetThreeJs} top - The top position
 * @param {IGetOffsetThreeJs} width - The width of the element
 * @param {IGetOffsetThreeJs} height - The height of the element
 * @param {IGetOffsetThreeJs} winSize - The window size
 * @return {Vector2} The calculated offset as a Vector2 object
 */
const GetOffsetThreeJs = ({ left, top, width, height, winSize }: IGetOffsetThreeJs): Vector2 => {
  return {
    x: left - winSize.x / 2 + width / 2,
    y: -top + winSize.y / 2 - height / 2,
  };
};

//
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shuffleArray = (array: any[]): any[] => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

export const randBool = (): boolean => {
  const a = new Uint8Array(1);
  crypto.getRandomValues(a);
  return a[0] > 127;
};

export const getRandomInt = (min: number, max: number): number => {
  const min_ = Math.ceil(min);
  const max_ = Math.floor(max);
  return Math.floor(Math.random() * (max_ - min_) + min_); // The maximum is exclusive and the minimum is inclusive
};

export const randomValueRangeInt = (hash: number, minVal: number, maxVal: number): number => {
  return minVal + (hash % (maxVal - minVal + 1));
};

export const randomValueIndexArrayInt = (hash: number, lenArray: number): number => {
  return hash % lenArray;
};

export const cyrb128 = (str: string): number[] => {
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
};

function sfc32(_a: number, _b: number, _c: number, _d: number): number {
  let a = _a;
  let b = _b;
  let c = _c;
  let d = _d;

  a >>>= 0;
  b >>>= 0;
  c >>>= 0;
  d >>>= 0;
  let t = (a + b) | 0;
  a = b ^ (b >>> 9);
  b = (c + (c << 3)) | 0;
  c = (c << 21) | (c >>> 11);
  d = (d + 1) | 0;
  t = (t + d) | 0;
  c = (c + t) | 0;
  return (t >>> 0) / 4294967296;
}

// return random value from [l -> r]
export const consistentRand = (seed: string | number, l: number, r: number): number => {
  const sfc = cyrb128(seed.toString());
  const rand = sfc32(sfc[0], sfc[1], sfc[2], sfc[3]);
  return l + rand * (r - l);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRandomItem = (listP: any[], seed: string): number => {
  const pref = [];
  for (const x of listP) pref.push(x);
  for (let i = 1; i < listP.length; i++) {
    pref[i] += pref[i - 1];
  }
  for (let i = 0; i < pref.length; i++) pref[i] /= pref[pref.length - 1];
  // get random value from 0->1
  const rand = consistentRand(seed, 0, 1);
  for (let i = 0; i < pref.length; i++) {
    if (rand < pref[i]) return i;
  }
  return -1;
};

export const randBoolSeed = (seed: number): boolean => {
  return Boolean(seed > 0.5);
};

export {
  Distance,
  GetOffsetThreeJs,
  LineEq,
  MathAround,
  MathLerp,
  MathMap,
  MathMapVector3,
  Radians,
  RandomFloat,
};

export const calcThreSholdViewPort = (
  threshold: number,
  el: HTMLDivElement
): number | undefined => {
  if (!el) return;
  const elHeight = el?.getBoundingClientRect().height;
  let th = threshold;

  if (elHeight > window.innerHeight * threshold) {
    th = (window.innerHeight * threshold) / elHeight;
  }
  return th;
};
