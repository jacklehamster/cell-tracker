// /Users/vincent/cell-tracker/example/node_modules/cell-tracker/dist/index.js
var B = function(m, H, J, K) {
  const Q = N(m, H, J, K), $ = m * K, w = H * K, R = J * K;
  return { pos: [m, H, J, K], worldPosition: [$, w, R], tag: Q };
};
var Z = function(m, H, J, K, Q) {
  const $ = N(H, J, K, Q), w = H * Q, R = J * Q, O = K * Q;
  return m.worldPosition[0] = w, m.worldPosition[1] = R, m.worldPosition[2] = O, m.pos[0] = H, m.pos[1] = J, m.pos[2] = K, m.pos[3] = Q, m.tag = $, m;
};
var N = function(m, H, J, K) {
  return m + "," + H + "," + J + "|" + K;
};
var V = function(m, H) {
  return Math.round(m / H);
};
var I = 3;

class U {
  i;
  f;
  warningLimit = 50000;
  #m = new Set;
  #H = [];
  constructor(m, H) {
    this.initCall = m, this.onRecycle = H;
  }
  create(...m) {
    const H = this.#H.pop();
    if (H)
      return this.#m.add(H), this.initCall(H, ...m);
    const J = this.initCall(undefined, ...m);
    return this.#m.add(J), this.#K(), J;
  }
  recycle(m) {
    this.#m.delete(m), this.#J(m);
  }
  recycleAll() {
    for (let m of this.#m)
      this.#J(m);
    this.#m.clear();
  }
  clear() {
    this.#H.length = 0, this.#m.clear();
  }
  countObjectsInExistence() {
    return this.#m.size + this.#H.length;
  }
  #J(m) {
    this.#H.push(m), this.onRecycle?.(m);
  }
  #K() {
    if (this.countObjectsInExistence() === this.warningLimit)
      console.warn("ObjectPool already created", this.#m.size + this.#H.length, "in", this.constructor.name);
  }
}

class W extends U {
  constructor() {
    super((m, H, J, K, Q) => {
      return !m ? B(H, J, K, Q) : Z(m, H, J, K, Q);
    });
  }
  createFromPos(m, H) {
    const J = V(m[0], H), K = V(m[1], H), Q = V(m[2], H);
    return this.create(J, K, Q, H);
  }
}

class M {
  #m = new Set;
  add(m) {
    this.#m.add(m);
  }
  remove(m) {
    this.#m.delete(m);
  }
  trackCell(m) {
    let H = false;
    return this.#m.forEach((J) => {
      if (J.trackCell(m))
        H = true;
    }), H;
  }
  untrackCells(m) {
    this.#m.forEach((H) => {
      H.untrackCells(m);
    });
  }
}

class P {
  i;
  f;
  warningLimit = 50000;
  #m = new Set;
  #H = [];
  constructor(m, H) {
    this.initCall = m, this.onRecycle = H;
  }
  create(...m) {
    const H = this.#H.pop();
    if (H)
      return this.#m.add(H), this.initCall(H, ...m);
    const J = this.initCall(undefined, ...m);
    return this.#m.add(J), this.#K(), J;
  }
  recycle(m) {
    this.#m.delete(m), this.#J(m);
  }
  recycleAll() {
    for (let m of this.#m)
      this.#J(m);
    this.#m.clear();
  }
  clear() {
    this.#H.length = 0, this.#m.clear();
  }
  countObjectsInExistence() {
    return this.#m.size + this.#H.length;
  }
  #J(m) {
    this.#H.push(m), this.onRecycle?.(m);
  }
  #K() {
    if (this.countObjectsInExistence() === this.warningLimit)
      console.warn("ObjectPool already created", this.#m.size + this.#H.length, "in", this.constructor.name);
  }
}

class j {
  F;
  #m;
  #H;
  #J = new Map;
  constructor(m, H = new b) {
    this.pool = H, this.#m = { value: m }, this.#H = { value: m }, this.#m.next = this.#H, this.#H.prev = this.#m;
  }
  clear() {
    while (this.#Q(this.#m.next))
      ;
  }
  get size() {
    return this.#J.size;
  }
  contains(m) {
    return this.#J.has(m);
  }
  pushTop(m) {
    this.#W(this.#R(m));
  }
  pushBottom(m) {
    this.#$(this.#R(m));
  }
  moveToTop(m) {
    const H = this.#J.get(m);
    if (H)
      return this.#K(H), this.#W(H), true;
    return false;
  }
  moveToBottom(m) {
    const H = this.#J.get(m);
    if (H)
      return this.#K(H), this.#$(H), true;
    return false;
  }
  popBottom() {
    return this.#Q(this.#m.next);
  }
  popTop() {
    return this.#Q(this.#H.prev);
  }
  #K(m) {
    if (m === this.#H || m === this.#m)
      return false;
    if (m.prev && m.next)
      m.prev.next = m.next, m.next.prev = m.prev;
    return m.prev = m.next = undefined, true;
  }
  #R(m) {
    const H = this.pool.create(m);
    return this.#J.set(m, H), H;
  }
  #Q(m) {
    if (!this.#K(m))
      return;
    return this.pool.recycle(m), this.#J.delete(m.value), m.value;
  }
  #W(m) {
    const H = this.#H.prev, J = m;
    J.prev = H, J.next = this.#H, H.next = this.#H.prev = J;
  }
  #$(m) {
    const H = this.#m.next, J = m;
    J.next = H, J.prev = this.#m, H.prev = this.#m.next = J;
  }
}

class b extends P {
  constructor() {
    super((m, H) => {
      if (!m)
        return { value: H };
      return m.value = H, m.prev = undefined, m.next = undefined, m;
    });
  }
}
var G = [3, 3, 3];

class A {
  cellTags = new j("");
  cellTrack;
  cellPool = new W;
  range;
  base;
  cellLimit;
  cellSize;
  _trimmedTags = new Set;
  constructor({ cellTrack: m }, { range: H, cellLimit: J, cellSize: K = 1 } = {}) {
    this.range = [H?.[0] ?? G[0], H?.[1] ?? G[1], H?.[2] ?? G[2]], this.base = this.range.map((Q) => Math.ceil(-Q / 2)), this.cellLimit = Math.max(0, J ?? 10), this.cellSize = K ?? 1, this.cellTrack = m;
  }
  onCell(m) {
    this.#m(m), this.#J();
  }
  #m(m) {
    const { range: H, base: J } = this, { pos: K } = m, Q = K[0] + J[0], $ = K[1] + J[1], w = K[2] + J[2];
    for (let R = 0;R < H[0]; R++)
      for (let O = 0;O < H[2]; O++)
        for (let Y = 0;Y < H[1]; Y++)
          this.#H(this.cellPool.create(Q + O, $ + Y, w + R, this.cellSize));
    this.cellPool.clear();
  }
  #H(m) {
    if (!this.cellTags.contains(m.tag)) {
      if (this.cellTrack.trackCell(m))
        this.cellTags.pushTop(m.tag);
    } else
      this.cellTags.moveToTop(m.tag);
  }
  #J() {
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

class _ {
  #m;
  #H;
  constructor({ boundary: m, tracker: H }) {
    this.#m = m, this.#H = H;
  }
  trackCell(m) {
    if (!this.#m.include(m))
      return false;
    return this.#H.trackCell(m);
  }
  untrackCells(m) {
    this.#H.untrackCells(m);
  }
}
class L {
  #m;
  #H = new Set;
  #J;
  #K = new W;
  #R = { onChange: () => this.#Q(this.#J) };
  constructor({ positionMatrix: m }, H) {
    const J = H?.cellSize ?? 1;
    this.#m = this.#K.create(Number.NaN, Number.NaN, Number.NaN, J), this.#J = m;
  }
  addListener(m) {
    return this.#H.add(m), this;
  }
  removeListener(m) {
    this.#H.delete(m);
  }
  #Q(m) {
    let H = this.#K.createFromPos(m.position, this.#m.pos[I]);
    if (this.#m.pos[0] !== H.pos[0] || this.#m.pos[1] !== H.pos[1] || this.#m.pos[2] !== H.pos[2]) {
      for (let K of this.#H)
        K.onCell(H, this.#m);
      const J = this.#m;
      this.#m = H, H = J;
    }
    this.#K.recycle(H);
  }
  activate() {
    this.#m.pos[0] = Number.NaN, this.#m.pos[1] = Number.NaN, this.#m.pos[2] = Number.NaN, this.#J.addChangeListener(this.#R), this.#Q(this.#J);
  }
  deactivate() {
    this.#J.removeChangeListener(this.#R);
  }
}
var X = function(m, H) {
  if (m) {
    const J = m.length.valueOf();
    for (let K = 0;K < J; K++)
      H(m.at(K), K);
  }
};

class E {
  #m = {};
  constructor({ triggers: m }) {
    if (m)
      X(m, (H) => this.addTrigger(H));
  }
  addTrigger(m) {
    if (m)
      X(m.cells, (H) => {
        if (H)
          (this.#m[H.tag] ?? (this.#m[H.tag] = [])).push(m);
      });
  }
  removeTrigger(m) {
    if (m)
      X(m.cells, (H) => {
        if (H) {
          const J = this.#m[H.tag]?.filter((K) => K === m);
          if (J)
            if (J.length)
              this.#m[H.tag] = J;
            else
              delete this.#m[H.tag];
        }
      });
  }
  trackCell(m) {
    const H = this.#m[m.tag];
    if (H)
      for (let J of H)
        J.activate();
    return false;
  }
  untrackCells(m) {
    for (let H of m) {
      const J = this.#m[H];
      if (J)
        for (let K of J)
          K.deactivate();
    }
  }
}
export {
  M as CellTrackers
};
