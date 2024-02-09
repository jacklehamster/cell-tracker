// /Users/vincent/cell-tracker/example/node_modules/cell-tracker/dist/index.js
var Y = function(M, w, B, H) {
  return M + "," + w + "," + B + "|" + H;
};

class m {
  i;
  f;
  warningLimit = 50000;
  #M = new Set;
  #w = [];
  constructor(M, w) {
    this.initCall = M, this.onRecycle = w;
  }
  create(...M) {
    const w = this.#w.pop();
    if (w)
      return this.#M.add(w), this.initCall(w, ...M);
    const B = this.initCall(undefined, ...M);
    return this.#M.add(B), this.#H(), B;
  }
  recycle(M) {
    this.#M.delete(M), this.#B(M);
  }
  recycleAll() {
    for (let M of this.#M)
      this.#B(M);
    this.#M.clear();
  }
  clear() {
    this.#w.length = 0, this.#M.clear();
  }
  countObjectsInExistence() {
    return this.#M.size + this.#w.length;
  }
  #B(M) {
    this.#w.push(M), this.onRecycle?.(M);
  }
  #H() {
    if (this.countObjectsInExistence() === this.warningLimit)
      console.warn("ObjectPool already created", this.#M.size + this.#w.length, "in", this.constructor.name);
  }
}

class Q extends m {
  constructor() {
    super((M, w, B, H, J) => {
      const K = Y(w, B, H, J);
      if (!M)
        return { pos: [w, B, H, J], tag: K };
      return M.pos[0] = w, M.pos[1] = B, M.pos[2] = H, M.pos[3] = J, M.tag = K, M;
    });
  }
  createFromPos(M, w) {
    const B = Math.round(M[0] / w), H = Math.round(M[1] / w), J = Math.round(M[2] / w);
    return this.create(B, H, J, w);
  }
}

class Z {
  #M = new Set;
  add(M) {
    this.#M.add(M);
  }
  remove(M) {
    this.#M.delete(M);
  }
  trackCell(M) {
    let w = false;
    return this.#M.forEach((B) => {
      if (B.trackCell(M))
        w = true;
    }), w;
  }
  untrackCells(M) {
    this.#M.forEach((w) => {
      w.untrackCells(M);
    });
  }
}

class u {
  i;
  f;
  warningLimit = 50000;
  #M = new Set;
  #w = [];
  constructor(M, w) {
    this.initCall = M, this.onRecycle = w;
  }
  create(...M) {
    const w = this.#w.pop();
    if (w)
      return this.#M.add(w), this.initCall(w, ...M);
    const B = this.initCall(undefined, ...M);
    return this.#M.add(B), this.#H(), B;
  }
  recycle(M) {
    this.#M.delete(M), this.#B(M);
  }
  recycleAll() {
    for (let M of this.#M)
      this.#B(M);
    this.#M.clear();
  }
  clear() {
    this.#w.length = 0, this.#M.clear();
  }
  countObjectsInExistence() {
    return this.#M.size + this.#w.length;
  }
  #B(M) {
    this.#w.push(M), this.onRecycle?.(M);
  }
  #H() {
    if (this.countObjectsInExistence() === this.warningLimit)
      console.warn("ObjectPool already created", this.#M.size + this.#w.length, "in", this.constructor.name);
  }
}

class O {
  F;
  #M;
  #w;
  #B = new Map;
  constructor(M, w = new V) {
    this.pool = w, this.#M = { value: M }, this.#w = { value: M }, this.#M.next = this.#w, this.#w.prev = this.#M;
  }
  clear() {
    while (this.#J(this.#M.next))
      ;
  }
  get size() {
    return this.#B.size;
  }
  contains(M) {
    return this.#B.has(M);
  }
  pushTop(M) {
    this.#Q(this.#K(M));
  }
  pushBottom(M) {
    this.#W(this.#K(M));
  }
  moveToTop(M) {
    const w = this.#B.get(M);
    if (w)
      return this.#H(w), this.#Q(w), true;
    return false;
  }
  moveToBottom(M) {
    const w = this.#B.get(M);
    if (w)
      return this.#H(w), this.#W(w), true;
    return false;
  }
  popBottom() {
    return this.#J(this.#M.next);
  }
  popTop() {
    return this.#J(this.#w.prev);
  }
  #H(M) {
    if (M === this.#w || M === this.#M)
      return false;
    if (M.prev && M.next)
      M.prev.next = M.next, M.next.prev = M.prev;
    return M.prev = M.next = undefined, true;
  }
  #K(M) {
    const w = this.pool.create(M);
    return this.#B.set(M, w), w;
  }
  #J(M) {
    if (!this.#H(M))
      return;
    return this.pool.recycle(M), this.#B.delete(M.value), M.value;
  }
  #Q(M) {
    const w = this.#w.prev, B = M;
    B.prev = w, B.next = this.#w, w.next = this.#w.prev = B;
  }
  #W(M) {
    const w = this.#M.next, B = M;
    B.next = w, B.prev = this.#M, w.prev = this.#M.next = B;
  }
}

class V extends u {
  constructor() {
    super((M, w) => {
      if (!M)
        return { value: w };
      return M.value = w, M.prev = undefined, M.next = undefined, M;
    });
  }
}
var X = [3, 3, 3];

class I {
  cellTags = new O("");
  cellTrack;
  cellPool = new Q;
  range;
  base;
  cellLimit;
  cellSize;
  _trimmedTags = new Set;
  constructor({ cellTrack: M }, { range: w, cellLimit: B, cellSize: H = 1 } = {}) {
    this.range = [w?.[0] ?? X[0], w?.[1] ?? X[1], w?.[2] ?? X[2]], this.base = this.range.map((J) => Math.ceil(-J / 2)), this.cellLimit = Math.max(0, B ?? 10), this.cellSize = H ?? 1, this.cellTrack = M;
  }
  visitCell(M) {
    this.#M(M), this.#B();
  }
  #M(M) {
    const { range: w, base: B } = this, { pos: H } = M, J = H[0] + B[0], K = H[1] + B[1], N = H[2] + B[2];
    for (let W = 0;W < w[0]; W++)
      for (let $ = 0;$ < w[2]; $++)
        for (let j = 0;j < w[1]; j++)
          this.#w(this.cellPool.create(J + $, K + j, N + W, this.cellSize));
    this.cellPool.clear();
  }
  #w(M) {
    if (!this.cellTags.contains(M.tag)) {
      if (this.cellTrack.trackCell(M))
        this.cellTags.pushTop(M.tag);
    } else
      this.cellTags.moveToTop(M.tag);
  }
  #B() {
    while (this.cellTags.size > this.cellLimit) {
      const M = this.cellTags.popBottom();
      if (M)
        this._trimmedTags.add(M);
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
export {
  Z as CellTrackers
};
