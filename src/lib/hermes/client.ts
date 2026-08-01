import { spawn } from "child_process";

const HERMES_HOST = "root@72.62.107.199";
const SESSION_NAME = "newos-command-center";
const TIMEOUT_MS = 45_000;

/**
 * Envia um prompt pro Hermes Agent rodando na VPS e retorna a resposta em texto.
 * O prompt vai pelo stdin do SSH (não interpolado em string de comando) pra evitar injeção de shell.
 * Mantém memória de conversa entre chamadas via --continue (mesma sessão nomeada).
 * Tem timeout duro — se travar (rede, VPS, hermes preso), mata o processo e falha rápido
 * em vez de deixar a chamada pendurada pra sempre.
 */
export async function askHermes(prompt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const ssh = spawn("ssh", [
      "-o",
      "ConnectTimeout=10",
      "-o",
      "BatchMode=yes",
      HERMES_HOST,
      `bash -c 'PROMPT="$(cat)"; hermes -z "$PROMPT" --continue ${SESSION_NAME}'`,
    ]);

    let stdout = "";
    let stderr = "";
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      ssh.kill("SIGKILL");
      reject(new Error("O Hermes demorou demais pra responder (timeout de 45s) — tente de novo."));
    }, TIMEOUT_MS);

    ssh.stdout.on("data", (chunk) => (stdout += chunk.toString()));
    ssh.stderr.on("data", (chunk) => (stderr += chunk.toString()));

    ssh.on("error", (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      reject(err);
    });

    ssh.on("close", (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (code !== 0) {
        reject(new Error(stderr.trim() || `hermes saiu com código ${code}`));
        return;
      }
      resolve(stdout.trim());
    });

    ssh.stdin.write(prompt);
    ssh.stdin.end();
  });
}
