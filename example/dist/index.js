// /Users/vincent/cell-tracker/example/node_modules/cell-tracker/dist/index.js
var P = function(m, Y, w, H) {
  return m + "," + Y + "," + w + "|" + H;
};
var Q = function(m, Y) {
  return Math.round(m / Y);
};
class V {
  i;
  f;
  warningLimit = 50000;
  #m = new Set;
  #Y = [];
  constructor(m, Y) {
    this.initCall = m, this.onRecycle = Y;
  }
  create(...m) {
    const Y = this.#Y.pop();
    if (Y)
      return this.#m.add(Y), this.initCall(Y, ...m);
    const w = this.initCall(undefined, ...m);
    return this.#m.add(w), this.#H(), w;
  }
  recycle(m) {
    this.#m.delete(m), this.#w(m);
  }
  recycleAll() {
    for (let m of this.#m)
      this.#w(m);
    this.#m.clear();
  }
  clear() {
    this.#Y.length = 0, this.#m.clear();
  }
  countObjectsInExistence() {
    return this.#m.size + this.#Y.length;
  }
  #w(m) {
    this.#Y.push(m), this.onRecycle?.(m);
  }
  #H() {
    if (this.countObjectsInExistence() === this.warningLimit)
      console.warn("ObjectPool already created", this.#m.size + this.#Y.length, "in", this.constructor.name);
  }
}

class j extends V {
  constructor() {
    super((m, Y, w, H, J) => {
      const W = P(Y, w, H, J), $ = Y * J, K = w * J, M = H * J;
      if (!m)
        return { pos: [Y, w, H, J], worldPosition: [$, K, M], tag: W };
      return m.worldPosition[0] = $, m.worldPosition[1] = K, m.worldPosition[2] = M, m.pos[0] = Y, m.pos[1] = w, m.pos[2] = H, m.pos[3] = J, m.tag = W, m;
    });
  }
  createFromPos(m, Y) {
    const w = Q(m[0], Y), H = Q(m[1], Y), J = Q(m[2], Y);
    return this.create(w, H, J, Y);
  }
}

class I {
  #m = new Set;
  add(m) {
    this.#m.add(m);
  }
  remove(m) {
    this.#m.delete(m);
  }
  trackCell(m) {
    let Y = false;
    return this.#m.forEach((w) => {
      if (w.trackCell(m))
        Y = true;
    }), Y;
  }
  untrackCells(m) {
    this.#m.forEach((Y) => {
      Y.untrackCells(m);
    });
  }
}

class R {
  i;
  f;
  warningLimit = 50000;
  #m = new Set;
  #Y = [];
  constructor(m, Y) {
    this.initCall = m, this.onRecycle = Y;
  }
  create(...m) {
    const Y = this.#Y.pop();
    if (Y)
      return this.#m.add(Y), this.initCall(Y, ...m);
    const w = this.initCall(undefined, ...m);
    return this.#m.add(w), this.#H(), w;
  }
  recycle(m) {
    this.#m.delete(m), this.#w(m);
  }
  recycleAll() {
    for (let m of this.#m)
      this.#w(m);
    this.#m.clear();
  }
  clear() {
    this.#Y.length = 0, this.#m.clear();
  }
  countObjectsInExistence() {
    return this.#m.size + this.#Y.length;
  }
  #w(m) {
    this.#Y.push(m), this.onRecycle?.(m);
  }
  #H() {
    if (this.countObjectsInExistence() === this.warningLimit)
      console.warn("ObjectPool already created", this.#m.size + this.#Y.length, "in", this.constructor.name);
  }
}

class X {
  F;
  #m;
  #Y;
  #w = new Map;
  constructor(m, Y = new U) {
    this.pool = Y, this.#m = { value: m }, this.#Y = { value: m }, this.#m.next = this.#Y, this.#Y.prev = this.#m;
  }
  clear() {
    while (this.#J(this.#m.next))
      ;
  }
  get size() {
    return this.#w.size;
  }
  contains(m) {
    return this.#w.has(m);
  }
  pushTop(m) {
    this.#M(this.#K(m));
  }
  pushBottom(m) {
    this.#Q(this.#K(m));
  }
  moveToTop(m) {
    const Y = this.#w.get(m);
    if (Y)
      return this.#H(Y), this.#M(Y), true;
    return false;
  }
  moveToBottom(m) {
    const Y = this.#w.get(m);
    if (Y)
      return this.#H(Y), this.#Q(Y), true;
    return false;
  }
  popBottom() {
    return this.#J(this.#m.next);
  }
  popTop() {
    return this.#J(this.#Y.prev);
  }
  #H(m) {
    if (m === this.#Y || m === this.#m)
      return false;
    if (m.prev && m.next)
      m.prev.next = m.next, m.next.prev = m.prev;
    return m.prev = m.next = undefined, true;
  }
  #K(m) {
    const Y = this.pool.create(m);
    return this.#w.set(m, Y), Y;
  }
  #J(m) {
    if (!this.#H(m))
      return;
    return this.pool.recycle(m), this.#w.delete(m.value), m.value;
  }
  #M(m) {
    const Y = this.#Y.prev, w = m;
    w.prev = Y, w.next = this.#Y, Y.next = this.#Y.prev = w;
  }
  #Q(m) {
    const Y = this.#m.next, w = m;
    w.next = Y, w.prev = this.#m, Y.prev = this.#m.next = w;
  }
}

class U extends R {
  constructor() {
    super((m, Y) => {
      if (!m)
        return { value: Y };
      return m.value = Y, m.prev = undefined, m.next = undefined, m;
    });
  }
}
var Z = [3, 3, 3];

class _ {
  cellTags = new X("");
  cellTrack;
  cellPool = new j;
  range;
  base;
  cellLimit;
  cellSize;
  _trimmedTags = new Set;
  constructor({ cellTrack: m }, { range: Y, cellLimit: w, cellSize: H = 1 } = {}) {
    this.range = [Y?.[0] ?? Z[0], Y?.[1] ?? Z[1], Y?.[2] ?? Z[2]], this.base = this.range.map((J) => Math.ceil(-J / 2)), this.cellLimit = Math.max(0, w ?? 10), this.cellSize = H ?? 1, this.cellTrack = m;
  }
  onCell(m) {
    this.#m(m), this.#w();
  }
  #m(m) {
    const { range: Y, base: w } = this, { pos: H } = m, J = H[0] + w[0], W = H[1] + w[1], $ = H[2] + w[2];
    for (let K = 0;K < Y[0]; K++)
      for (let M = 0;M < Y[2]; M++)
        for (let O = 0;O < Y[1]; O++)
          this.#Y(this.cellPool.create(J + M, W + O, $ + K, this.cellSize));
    this.cellPool.clear();
  }
  #Y(m) {
    if (!this.cellTags.contains(m.tag)) {
      if (this.cellTrack.trackCell(m))
        this.cellTags.pushTop(m.tag);
    } else
      this.cellTags.moveToTop(m.tag);
  }
  #w() {
    while (this.cellTags.size > this.cellLimit) {
      const m = this.cellTags.popBottom();
      if (m)
        this._trimmedTags.add(m);
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

class N {
  #m;
  #Y;
  constructor({ boundary: m, tracker: Y }) {
    this.#m = m, this.#Y = Y;
  }
  trackCell(m) {
    if (!this.#m.include(m))
      return false;
    return this.#Y.trackCell(m);
  }
  untrackCells(m) {
    this.#Y.untrackCells(m);
  }
}
export {
  I as CellTrackers
};
