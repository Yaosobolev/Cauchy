export const tau = [0.1, 0.05, 0.025, 0.0125, 0.00625, 0.003125];

export const f1 = (t: number, u: number) => -1 * ((u + Math.sin(t)) / (1 + t));
export const t01 = 0;
export const T1 = 1;
export const u01 = 3.5;
export const fTotal1 = (t: number) => (2.5 + Math.cos(t)) / (1 + t);

// Тест
export const f2 = (t: number, u: number) =>
  (2 * t * u + 1) / (1 - Math.pow(t, 2));
export const t02 = 0;
export const T2 = 0.9;
export const u02 = 1;
export const fTotal2 = (t: number) => Math.pow(t, 2) + t + 1;
