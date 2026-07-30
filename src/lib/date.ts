/**
 * Data simulada global para o sistema NEW OS.
 * Usada para testes visuais de itens atrasados, prazos e métricas do dashboard
 * sem depender da data real do relógio do usuário (garantindo estabilidade dos mocks).
 */
export const SIMULATED_NOW = new Date("2026-07-20T00:00:00.000Z");

export function getSimulatedNow(): Date {
  return SIMULATED_NOW;
}
