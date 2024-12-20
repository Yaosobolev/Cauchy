export const euler = (
  T: number,
  t0: number,
  tau: number,
  u0: number,
  f: (t: number, u: number) => number
) => {
  const n = (T - t0) / tau;
  const u: number[] = [u0];
  const t: number[] = [t0];

  for (let i = 0; i < n; i++) {
    u[i + 1] = u[i] + tau * f(t[i], u[i]);
    t[i + 1] = t[i] + tau;
  }
  return u;
};

export const predictorCorrector = (
  T: number,
  t0: number,
  tau: number,
  u0: number,
  f: (t: number, u: number) => number
) => {
  const n = (T - t0) / tau;
  const u: number[] = [u0];
  const t: number[] = [t0];

  for (let i = 0; i < n; i++) {
    u[i + 1 / 2] = u[i] + (tau / 2) * f(t[i], u[i]);
    t[i + 1 / 2] = t[i] + tau / 2;
    u[i + 1] = u[i] + tau * f(t[i + 1 / 2], u[i + 1 / 2]);
    t[i + 1] = t[i] + tau;
  }

  const totalU: number[] = [u0];
  const totalT: number[] = [];

  for (let i = 0; i < n; i++) {
    const uHalf = u[i] + (tau / 2) * f(t[i], u[i]);
    const tHalf = t[i] + tau / 2;
    const uNext = u[i] + tau * f(tHalf, uHalf);
    const tNext = t[i] + tau;

    totalU.push(uNext);
    totalT.push(tNext);
  }

  return totalU;
};

export const rungeKuttaThird = (
  T: number,
  t0: number,
  tau: number,
  u0: number,
  f: (t: number, u: number) => number
) => {
  const n = (T - t0) / tau;
  const u: number[] = [u0];
  const t: number[] = [t0];

  for (let i = 0; i < n; i++) {
    const k1 = f(t[i], u[i]);
    const k2 = f(t[i] + tau / 2, u[i] + (tau * k1) / 2);
    const k3 = f(t[i] + tau, u[i] - tau * k1 + 2 * tau * k2);
    u[i + 1] = u[i] + (tau / 6) * (k1 + 4 * k2 + k3);
    t[i + 1] = t[i] + tau;
  }
  return u;
};
export const rungeKuttaFourth = (
  T: number,
  t0: number,
  tau: number,
  u0: number,
  f: (t: number, u: number) => number
) => {
  const n = (T - t0) / tau;
  const u: number[] = [u0];
  const t: number[] = [t0];

  for (let i = 0; i < n; i++) {
    const k1 = f(t[i], u[i]);
    const k2 = f(t[i] + tau / 2, u[i] + (tau * k1) / 2);
    const k3 = f(t[i] + tau / 2, u[i] + (tau / 2) * k2);
    const k4 = f(t[i] + tau, u[i] + tau * k3);
    u[i + 1] = u[i] + (tau / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    t[i + 1] = t[i] + tau;
  }
  return u;
};
export const precise = (
  T: number,
  t0: number,
  tau: number,
  u0: number,
  f: (t: number) => number
) => {
  const n = (T - t0) / tau;
  const u: number[] = [];
  const t: number[] = [];

  t[0] = t0; // Начальное значение t
  u[0] = u0; // Начальное значение u

  for (let i = 1; i <= n; i++) {
    t[i] = t[i - 1] + tau; // Следующее значение t
    u[i] = f(t[i]); // Точное решение в новой точке t[i]
  }
  return u;
};

export const checkConvergence = (
  u1: number[][], // Значения функции из первого метода
  t: number[] // Общая сетка значений t
  //   maxIterations: number
) => {
  const maxDifferences: number[] = [];

  t.map((item, index) => {
    const differences: number[] = [];
    let maxDifference = 0;

    if (index < t.length - 1) {
      for (let i = 0; i < u1[index].length - 1; i++) {
        const diff = Math.abs(u1[index][i] - u1[index + 1][i]);
        differences.push(diff);
        if (diff > maxDifference) {
          maxDifference = diff;
        }
      }
      maxDifferences.push(maxDifference);
    }
  });

  return maxDifferences;
};
export const checkError = (
  u1: number[][], // Значения функции из первого метода
  t: number[], // Общая сетка значений t
  precise: number[][]
) => {
  const maxDifferences: number[] = [];

  t.map((item, index) => {
    const differences: number[] = [];
    let maxDifference = 0;

    for (let i = 0; i < u1[index].length - 1; i++) {
      const diff = Math.abs(u1[index][i] - precise[index][i]);
      differences.push(diff);
      if (diff > maxDifference) {
        maxDifference = diff;
      }
    }
    maxDifferences.push(maxDifference);
  });

  return maxDifferences;
};
