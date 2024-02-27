// /Users/vincent/cell-tracker/example/node_modules/cell-tracker/dist/index.js
var U = function(Y, m, w, H) {
  return Y + "," + m + "," + w + "|" + H;
};
var $ = function(Y, m) {
  return Math.round(Y / m);
};
var R = 3;

class N {
  i;
  f;
  warningLimit = 50000;
  #Y = new Set;
  #m = [];
  constructor(Y, m) {
    this.initCall = Y, this.onRecycle = m;
  }
  create(...Y) {
    const m = this.#m.pop();
    if (m)
      return this.#Y.add(m), this.initCall(m, ...Y);
    const w = this.initCall(undefined, ...Y);
    return this.#Y.add(w), this.#H(), w;
  }
  recycle(Y) {
    this.#Y.delete(Y), this.#w(Y);
  }
  recycleAll() {
    for (let Y of this.#Y)
      this.#w(Y);
    this.#Y.clear();
  }
  clear() {
    this.#m.length = 0, this.#Y.clear();
  }
  countObjectsInExistence() {
    return this.#Y.size + this.#m.length;
  }
  #w(Y) {
    this.#m.push(Y), this.onRecycle?.(Y);
  }
  #H() {
    if (this.countObjectsInExistence() === this.warningLimit)
      console.warn("ObjectPool already created", this.#Y.size + this.#m.length, "in", this.constructor.name);
  }
}

class W extends N {
  constructor() {
    super((Y, m, w, H, J) => {
      const j = U(m, w, H, J), O = m * J, K = w * J, Q = H * J;
      if (!Y)
        return { pos: [m, w, H, J], worldPosition: [O, K, Q], tag: j };
      return Y.worldPosition[0] = O, Y.worldPosition[1] = K, Y.worldPosition[2] = Q, Y.pos[0] = m, Y.pos[1] = w, Y.pos[2] = H, Y.pos[3] = J, Y.tag = j, Y;
    });
  }
  createFromPos(Y, m) {
    const w = $(Y[0], m), H = $(Y[1], m), J = $(Y[2], m);
    return this.create(w, H, J, m);
  }
}

class M {
  #Y = new Set;
  add(Y) {
    this.#Y.add(Y);
  }
  remove(Y) {
    this.#Y.delete(Y);
  }
  trackCell(Y) {
    let m = false;
    return this.#Y.forEach((w) => {
      if (w.trackCell(Y))
        m = true;
    }), m;
  }
  untrackCells(Y) {
    this.#Y.forEach((m) => {
      m.untrackCells(Y);
    });
  }
}

class u {
  i;
  f;
  warningLimit = 50000;
  #Y = new Set;
  #m = [];
  constructor(Y, m) {
    this.initCall = Y, this.onRecycle = m;
  }
  create(...Y) {
    const m = this.#m.pop();
    if (m)
      return this.#Y.add(m), this.initCall(m, ...Y);
    const w = this.initCall(undefined, ...Y);
    return this.#Y.add(w), this.#H(), w;
  }
  recycle(Y) {
    this.#Y.delete(Y), this.#w(Y);
  }
  recycleAll() {
    for (let Y of this.#Y)
      this.#w(Y);
    this.#Y.clear();
  }
  clear() {
    this.#m.length = 0, this.#Y.clear();
  }
  countObjectsInExistence() {
    return this.#Y.size + this.#m.length;
  }
  #w(Y) {
    this.#m.push(Y), this.onRecycle?.(Y);
  }
  #H() {
    if (this.countObjectsInExistence() === this.warningLimit)
      console.warn("ObjectPool already created", this.#Y.size + this.#m.length, "in", this.constructor.name);
  }
}

class X {
  F;
  #Y;
  #m;
  #w = new Map;
  constructor(Y, m = new G) {
    this.pool = m, this.#Y = { value: Y }, this.#m = { value: Y }, this.#Y.next = this.#m, this.#m.prev = this.#Y;
  }
  clear() {
    while (this.#J(this.#Y.next))
      ;
  }
  get size() {
    return this.#w.size;
  }
  contains(Y) {
    return this.#w.has(Y);
  }
  pushTop(Y) {
    this.#Q(this.#K(Y));
  }
  pushBottom(Y) {
    this.#W(this.#K(Y));
  }
  moveToTop(Y) {
    const m = this.#w.get(Y);
    if (m)
      return this.#H(m), this.#Q(m), true;
    return false;
  }
  moveToBottom(Y) {
    const m = this.#w.get(Y);
    if (m)
      return this.#H(m), this.#W(m), true;
    return false;
  }
  popBottom() {
    return this.#J(this.#Y.next);
  }
  popTop() {
    return this.#J(this.#m.prev);
  }
  #H(Y) {
    if (Y === this.#m || Y === this.#Y)
      return false;
    if (Y.prev && Y.next)
      Y.prev.next = Y.next, Y.next.prev = Y.prev;
    return Y.prev = Y.next = undefined, true;
  }
  #K(Y) {
    const m = this.pool.create(Y);
    return this.#w.set(Y, m), m;
  }
  #J(Y) {
    if (!this.#H(Y))
      return;
    return this.pool.recycle(Y), this.#w.delete(Y.value), Y.value;
  }
  #Q(Y) {
    const m = this.#m.prev, w = Y;
    w.prev = m, w.next = this.#m, m.next = this.#m.prev = w;
  }
  #W(Y) {
    const m = this.#Y.next, w = Y;
    w.next = m, w.prev = this.#Y, m.prev = this.#Y.next = w;
  }
}

class G extends u {
  constructor() {
    super((Y, m) => {
      if (!Y)
        return { value: m };
      return Y.value = m, Y.prev = undefined, Y.next = undefined, Y;
    });
  }
}
var Z = [3, 3, 3];

class I {
  cellTags = new X("");
  cellTrack;
  cellPool = new W;
  range;
  base;
  cellLimit;
  cellSize;
  _trimmedTags = new Set;
  constructor({ cellTrack: Y }, { range: m, cellLimit: w, cellSize: H = 1 } = {}) {
    this.range = [m?.[0] ?? Z[0], m?.[1] ?? Z[1], m?.[2] ?? Z[2]], this.base = this.range.map((J) => Math.ceil(-J / 2)), this.cellLimit = Math.max(0, w ?? 10), this.cellSize = H ?? 1, this.cellTrack = Y;
  }
  onCell(Y) {
    this.#Y(Y), this.#w();
  }
  #Y(Y) {
    const { range: m, base: w } = this, { pos: H } = Y, J = H[0] + w[0], j = H[1] + w[1], O = H[2] + w[2];
    for (let K = 0;K < m[0]; K++)
      for (let Q = 0;Q < m[2]; Q++)
        for (let V = 0;V < m[1]; V++)
          this.#m(this.cellPool.create(J + Q, j + V, O + K, this.cellSize));
    this.cellPool.clear();
  }
  #m(Y) {
    if (!this.cellTags.contains(Y.tag)) {
      if (this.cellTrack.trackCell(Y))
        this.cellTags.pushTop(Y.tag);
    } else
      this.cellTags.moveToTop(Y.tag);
  }
  #w() {
    while (this.cellTags.size > this.cellLimit) {
      const Y = this.cellTags.popBottom();
      if (Y)
        this._trimmedTags.add(Y);
      else
        break;
    }
    if (this._trimmedTags.size)
      this.cellTrack.untrackCells(this._trimmedTags), this._trimmedTags.clear();
  }
  deactivate() {
    this.cellTags.clear();
  }
}

class B {
  #Y;
  #m;
  constructor({ boundary: Y, tracker: m }) {
    this.#Y = Y, this.#m = m;
  }
  trackCell(Y) {
    if (!this.#Y.include(Y))
      return false;
    return this.#m.trackCell(Y);
  }
  untrackCells(Y) {
    this.#m.untrackCells(Y);
  }
}
class A {
  #Y = new Set;
  positionMatrix;
  previousCell;
  listener = { onChange: () => this.#w(this.positionMatrix) };
  #m = new W;
  constructor({ positionMatrix: Y }, m) {
    const w = m?.cellSize ?? 1;
    this.previousCell = this.#m.create(Number.NaN, Number.NaN, Number.NaN, w), this.positionMatrix = Y;
  }
  addListener(Y) {
    return this.#Y.add(Y), this;
  }
  removeListener(Y) {
    this.#Y.delete(Y);
  }
  #w(Y) {
    let m = this.#m.createFromPos(Y.position, this.previousCell.pos[R]);
    if (this.previousCell.pos[0] !== m.pos[0] || this.previousCell.pos[1] !== m.pos[1] || this.previousCell.pos[2] !== m.pos[2]) {
      for (let H of this.#Y)
        H.onCell(m, this.previousCell);
      const w = this.previousCell;
      this.previousCell = m, m = w;
    }
    this.#m.recycle(m);
  }
  activate() {
    this.positionMatrix.addChangeListener(this.listener), this.previousCell.pos[0] = Number.NaN, this.previousCell.pos[1] = Number.NaN, this.previousCell.pos[2] = Number.NaN, this.#w(this.positionMatrix);
  }
  deactivate() {
    this.positionMatrix.removeChangeListener(this.listener);
  }
}
export {
  M as CellTrackers
};
