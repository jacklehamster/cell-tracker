// /Users/vincent/cell-tracker/example/node_modules/cell-tracker/dist/index.js
var I = function(Y, m, w, H) {
  return Y + "," + m + "," + w + "|" + H;
};
var Q = function(Y, m) {
  return Math.round(Y / m);
};
class X {
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

class j extends X {
  constructor() {
    super((Y, m, w, H, J) => {
      const W = I(m, w, H, J), $ = m * J, K = w * J, M = H * J;
      if (!Y)
        return { pos: [m, w, H, J], worldPosition: [$, K, M], tag: W };
      return Y.worldPosition[0] = $, Y.worldPosition[1] = K, Y.worldPosition[2] = M, Y.pos[0] = m, Y.pos[1] = w, Y.pos[2] = H, Y.pos[3] = J, Y.tag = W, Y;
    });
  }
  createFromPos(Y, m) {
    const w = Q(Y[0], m), H = Q(Y[1], m), J = Q(Y[2], m);
    return this.create(w, H, J, m);
  }
}

class P {
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

class R {
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

class Z {
  F;
  #Y;
  #m;
  #w = new Map;
  constructor(Y, m = new U) {
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
    this.#M(this.#K(Y));
  }
  pushBottom(Y) {
    this.#Q(this.#K(Y));
  }
  moveToTop(Y) {
    const m = this.#w.get(Y);
    if (m)
      return this.#H(m), this.#M(m), true;
    return false;
  }
  moveToBottom(Y) {
    const m = this.#w.get(Y);
    if (m)
      return this.#H(m), this.#Q(m), true;
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
  #M(Y) {
    const m = this.#m.prev, w = Y;
    w.prev = m, w.next = this.#m, m.next = this.#m.prev = w;
  }
  #Q(Y) {
    const m = this.#Y.next, w = Y;
    w.next = m, w.prev = this.#Y, m.prev = this.#Y.next = w;
  }
}

class U extends R {
  constructor() {
    super((Y, m) => {
      if (!Y)
        return { value: m };
      return Y.value = m, Y.prev = undefined, Y.next = undefined, Y;
    });
  }
}
var N = [3, 3, 3];

class _ {
  cellTags = new Z("");
  cellTrack;
  cellPool = new j;
  range;
  base;
  cellLimit;
  cellSize;
  _trimmedTags = new Set;
  constructor({ cellTrack: Y }, { range: m, cellLimit: w, cellSize: H = 1 } = {}) {
    this.range = [m?.[0] ?? N[0], m?.[1] ?? N[1], m?.[2] ?? N[2]], this.base = this.range.map((J) => Math.ceil(-J / 2)), this.cellLimit = Math.max(0, w ?? 10), this.cellSize = H ?? 1, this.cellTrack = Y;
  }
  visitCell(Y) {
    this.#Y(Y), this.#w();
  }
  #Y(Y) {
    const { range: m, base: w } = this, { pos: H } = Y, J = H[0] + w[0], W = H[1] + w[1], $ = H[2] + w[2];
    for (let K = 0;K < m[0]; K++)
      for (let M = 0;M < m[2]; M++)
        for (let O = 0;O < m[1]; O++)
          this.#m(this.cellPool.create(J + M, W + O, $ + K, this.cellSize));
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

class V {
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
export {
  P as CellTrackers
};
