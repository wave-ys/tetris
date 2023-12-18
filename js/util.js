export function intervalRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function colorRandom() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "#" + r.toString(16) + g.toString(16) + b.toString(16);
}
