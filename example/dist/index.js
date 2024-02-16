// /Users/vincent/cell-tracker/example/node_modules/cell-tracker/dist/index.js
var N = function(m, M, Y, w) {
  return m + "," + M + "," + Y + "|" + w;
};
class j {
  i;
  f;
  warningLimit = 50000;
  #m = new Set;
  #M = [];
  constructor(m, M) {
    this.initCall = m, this.onRecycle = M;
  }
  create(...m) {
    const M = this.#M.pop();
    if (M)
      return this.#m.add(M), this.initCall(M, ...m);
    const Y = this.initCall(undefined, ...m);
    return this.#m.add(Y), this.#w(), Y;
  }
  recycle(m) {
    this.#m.delete(m), this.#Y(m);
  }
  recycleAll() {
    for (let m of this.#m)
      this.#Y(m);
    this.#m.clear();
  }
  clear() {
    this.#M.length = 0, this.#m.clear();
  }
  countObjectsInExistence() {
    return this.#m.size + this.#M.length;
  }
  #Y(m) {
    this.#M.push(m), this.onRecycle?.(m);
  }
  #w() {
    if (this.countObjectsInExistence() === this.warningLimit)
      console.warn("ObjectPool already created", this.#m.size + this.#M.length, "in", this.constructor.name);
  }
}

class K extends j {
  constructor() {
    super((m, M, Y, w, H) => {
      const J = N(M, Y, w, H);
      if (!m)
        return { pos: [M, Y, w, H], tag: J };
      return m.pos[0] = M, m.pos[1] = Y, m.pos[2] = w, m.pos[3] = H, m.tag = J, m;
    });
  }
  createFromPos(m, M) {
    const Y = Math.round(m[0] / M), w = Math.round(m[1] / M), H = Math.round(m[2] / M);
    return this.create(Y, w, H, M);
  }
}

class V {
  #m = new Set;
  add(m) {
    this.#m.add(m);
  }
  remove(m) {
    this.#m.delete(m);
  }
  trackCell(m) {
    let M = false;
    return this.#m.forEach((Y) => {
      if (Y.trackCell(m))
        M = true;
    }), M;
  }
  untrackCells(m) {
    this.#m.forEach((M) => {
      M.untrackCells(m);
    });
  }
}

class I {
  i;
  f;
  warningLimit = 50000;
  #m = new Set;
  #M = [];
  constructor(m, M) {
    this.initCall = m, this.onRecycle = M;
  }
  create(...m) {
    const M = this.#M.pop();
    if (M)
      return this.#m.add(M), this.initCall(M, ...m);
    const Y = this.initCall(undefined, ...m);
    return this.#m.add(Y), this.#w(), Y;
  }
  recycle(m) {
    this.#m.delete(m), this.#Y(m);
  }
  recycleAll() {
    for (let m of this.#m)
      this.#Y(m);
    this.#m.clear();
  }
  clear() {
    this.#M.length = 0, this.#m.clear();
  }
  countObjectsInExistence() {
    return this.#m.size + this.#M.length;
  }
  #Y(m) {
    this.#M.push(m), this.onRecycle?.(m);
  }
  #w() {
    if (this.countObjectsInExistence() === this.warningLimit)
      console.warn("ObjectPool already created", this.#m.size + this.#M.length, "in", this.constructor.name);
  }
}

class O {
  F;
  #m;
  #M;
  #Y = new Map;
  constructor(m, M = new P) {
    this.pool = M, this.#m = { value: m }, this.#M = { value: m }, this.#m.next = this.#M, this.#M.prev = this.#m;
  }
  clear() {
    while (this.#H(this.#m.next))
      ;
  }
  get size() {
    return this.#Y.size;
  }
  contains(m) {
    return this.#Y.has(m);
  }
  pushTop(m) {
    this.#K(this.#J(m));
  }
  pushBottom(m) {
    this.#Q(this.#J(m));
  }
  moveToTop(m) {
    const M = this.#Y.get(m);
    if (M)
      return this.#w(M), this.#K(M), true;
    return false;
  }
  moveToBottom(m) {
    const M = this.#Y.get(m);
    if (M)
      return this.#w(M), this.#Q(M), true;
    return false;
  }
  popBottom() {
    return this.#H(this.#m.next);
  }
  popTop() {
    return this.#H(this.#M.prev);
  }
  #w(m) {
    if (m === this.#M || m === this.#m)
      return false;
    if (m.prev && m.next)
      m.prev.next = m.next, m.next.prev = m.prev;
    return m.prev = m.next = undefined, true;
  }
  #J(m) {
    const M = this.pool.create(m);
    return this.#Y.set(m, M), M;
  }
  #H(m) {
    if (!this.#w(m))
      return;
    return this.pool.recycle(m), this.#Y.delete(m.value), m.value;
  }
  #K(m) {
    const M = this.#M.prev, Y = m;
    Y.prev = M, Y.next = this.#M, M.next = this.#M.prev = Y;
  }
  #Q(m) {
    const M = this.#m.next, Y = m;
    Y.next = M, Y.prev = this.#m, M.prev = this.#m.next = Y;
  }
}

class P extends I {
  constructor() {
    super((m, M) => {
      if (!m)
        return { value: M };
      return m.value = M, m.prev = undefined, m.next = undefined, m;
    });
  }
}
var X = [3, 3, 3];

class R {
  cellTags = new O("");
  cellTrack;
  cellPool = new K;
  range;
  base;
  cellLimit;
  cellSize;
  _trimmedTags = new Set;
  constructor({ cellTrack: m }, { range: M, cellLimit: Y, cellSize: w = 1 } = {}) {
    this.range = [M?.[0] ?? X[0], M?.[1] ?? X[1], M?.[2] ?? X[2]], this.base = this.range.map((H) => Math.ceil(-H / 2)), this.cellLimit = Math.max(0, Y ?? 10), this.cellSize = w ?? 1, this.cellTrack = m;
  }
  visitCell(m) {
    this.#m(m), this.#Y();
  }
  #m(m) {
    const { range: M, base: Y } = this, { pos: w } = m, H = w[0] + Y[0], J = w[1] + Y[1], _ = w[2] + Y[2];
    for (let Q = 0;Q < M[0]; Q++)
      for (let W = 0;W < M[2]; W++)
        for (let $ = 0;$ < M[1]; $++)
          this.#M(this.cellPool.create(H + W, J + $, _ + Q, this.cellSize));
    this.cellPool.clear();
  }
  #M(m) {
    if (!this.cellTags.contains(m.tag)) {
      if (this.cellTrack.trackCell(m))
        this.cellTags.pushTop(m.tag);
    } else
      this.cellTags.moveToTop(m.tag);
  }
  #Y() {
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

class Z {
  #m;
  #M;
  constructor({ boundary: m, tracker: M }) {
    this.#m = m, this.#M = M;
  }
  trackCell(m) {
    if (!this.#m.include(m))
      return false;
    return this.#M.trackCell(m);
  }
  untrackCells(m) {
    this.#M.untrackCells(m);
  }
}
export {
  V as CellTrackers
};
