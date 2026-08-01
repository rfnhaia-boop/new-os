import { spawn } from "child_process";

const HERMES_HOST = "root@72.62.107.199";
const SESSION_NAME = "newos-command-center";
const TIMEOUT_MS = 45_000;

// Quando o NEW OS roda na própria VPS do Hermes (HERMES_MODE=local no .env),
// fala com ele direto via processo local — sem SSH, sem rede, sem esse ponto de falha.
const LOCAL_MODE = process.env.HERMES_MODE === "local";

/**
 * Envia um prompt pro Hermes Agent e retorna a resposta em texto.
 * O prompt vai pelo stdin (não interpolado em string de comando) pra evitar injeção de shell.
 * Mantém memória de conversa entre chamadas via --continue (mesma sessão nomeada).
 * Tem timeout duro — se travar, mata o processo e falha rápido em vez de deixar pendurado.
 */
export async function askHermes(prompt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const command = LOCAL_MODE ? "bash" : "ssh";
    const args = LOCAL_MODE
      ? ["-c", `PROMPT="$(cat)"; hermes -z "$PROMPT" --continue ${SESSION_NAME}`]
      : [
          "-o",
          "ConnectTimeout=10",
          "-o",
          "BatchMode=yes",
          HERMES_HOST,
          `bash -c 'PROMPT="$(cat)"; hermes -z "$PROMPT" --continue ${SESSION_NAME}'`,
        ];

    const proc = spawn(command, args);

    let stdout = "";
    let stderr = "";
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      proc.kill("SIGKILL");
      reject(new Error("O Hermes demorou demais pra responder (timeout de 45s) — tente de novo."));
    }, TIMEOUT_MS);

    proc.stdout.on("data", (chunk) => (stdout += chunk.toString()));
    proc.stderr.on("data", (chunk) => (stderr += chunk.toString()));

    proc.on("error", (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      reject(err);
    });

    proc.on("close", (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (code !== 0) {
        reject(new Error(stderr.trim() || `hermes saiu com código ${code}`));
        return;
      }
      resolve(stdout.trim());
    });

    proc.stdin.write(prompt);
    proc.stdin.end();
  });
}
