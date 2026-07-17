import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const zeroCost = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 };

type ModelDef = {
  id: string;
  ctx: number;
  max: number;
  img?: boolean;
};

const models: ModelDef[] = [
  { id: "Gemma-Test", ctx: 216000, max: 16384 },
  { id: "LFM2-24B-A2B-Q4_K_M", ctx: 128000, max: 16384 },
  { id: "LFM2.5-VL-1.6B-Q8_0", ctx: 128000, max: 16384 },
  { id: "LiquidAI/LFM2-24B-A2B-GGUF:Q4_K_M", ctx: 128000, max: 16384 },
  { id: "LiquidAI/LFM2.5-VL-1.6B-GGUF:Q8_0", ctx: 128000, max: 16384, img: true },
  { id: "Nemotron-3-Nano-30B-A3B-Q4_K_S", ctx: 524288, max: 16384 },
  { id: "Nemotron-3-Nano-30B-A3B-Q4_K_S-fast", ctx: 50000, max: 16384 },
  { id: "Nemotron-3-Nano-30B-A3B-Q4_K_S-full", ctx: 1048576, max: 16384 },
  { id: "Nemotron-3-Nano-30B-A3B-Q4_K_S-medium", ctx: 524288, max: 16384 },
  { id: "Qwen3.5-4B-q8_0-MTP", ctx: 128000, max: 16384 },
  { id: "Qwen3.5-9B-MTP-Q4_K_M", ctx: 128000, max: 16384 },
  { id: "Qwen3.5-9B-Q4_K_M", ctx: 128000, max: 16384 },
  { id: "Qwen3.6-27B-Q4_K_S", ctx: 262144, max: 16384 },
  { id: "Qwen3.6-27B-Q4_K_S-fast", ctx: 50000, max: 16384, img: true },
  { id: "Qwen3.6-27B-Q4_K_S-full", ctx: 262144, max: 16384 },
  { id: "Qwen3.6-27B-Q4_K_S-medium", ctx: 100000, max: 16384 },
  { id: "Qwen3.6-27B-Q4_K_S-vision", ctx: 128000, max: 16384, img: true },
  { id: "Qwen3.6-35B-A3B-UD-Q4_K_S", ctx: 262144, max: 16384 },
  { id: "Qwen3.6-35B-A3B-UD-Q4_K_S-fast", ctx: 50000, max: 16384, img: true },
  { id: "Qwen3.6-35B-A3B-UD-Q4_K_S-full", ctx: 262144, max: 16384 },
  { id: "Qwen3.6-35B-A3B-UD-Q4_K_S-medium", ctx: 100000, max: 16384 },
  { id: "Qwen3.6-35B-A3B-UD-Q4_K_S-vision", ctx: 128000, max: 16384, img: true },
  { id: "adriabama06/Qwen3.5-4B-q8_0-am17an-MTP:Q8_0", ctx: 128000, max: 16384 },
  { id: "bartowski/nvidia_Nemotron-Cascade-2-30B-A3B-GGUF:Q4_K_S", ctx: 128000, max: 16384 },
  { id: "gemma-4-12b-it-Q4_K_M", ctx: 262144, max: 16384, img: true },
  { id: "gemma-4-26B-A4B-it-Q4_K_M", ctx: 262144, max: 16384, img: true },
  { id: "gemma-4-26B-A4B-it-Q4_K_M-fast", ctx: 50000, max: 16384, img: true },
  { id: "gemma-4-26B-A4B-it-Q4_K_M-full", ctx: 262144, max: 16384, img: true },
  { id: "gemma-4-26B-A4B-it-Q4_K_M-medium", ctx: 100000, max: 16384, img: true },
  { id: "gemma-4-26B-A4B-it-Q4_K_M-vision", ctx: 128000, max: 16384, img: true },
  { id: "gemma-4-26B-A4B-it-q4", ctx: 128000, max: 16384 },
  { id: "gemma-4-26B-A4B-it-q4-vision", ctx: 128000, max: 16384, img: true },
  { id: "gemma-4-31B-it-Q4_K_S", ctx: 262144, max: 16384 },
  { id: "gemma-4-31B-it-Q4_K_S-fast", ctx: 50000, max: 16384, img: true },
  { id: "gemma-4-31B-it-Q4_K_S-full", ctx: 262144, max: 16384 },
  { id: "gemma-4-31B-it-Q4_K_S-medium", ctx: 100000, max: 16384 },
  { id: "gemma-4-31B-it-Q4_K_S-vision", ctx: 128000, max: 16384, img: true },
  { id: "gemma-4-E4B-it-Q4_K_M", ctx: 131072, max: 16384, img: true },
  { id: "gpt-oss-20b-Q4_K_M", ctx: 4096, max: 4096 },
  { id: "gpt-oss-20b-mxfp4", ctx: 128000, max: 16384 },
  { id: "lmstudio-community/gemma-4-E4B-it-GGUF:Q4_K_M", ctx: 128000, max: 16384 },
  { id: "unsloth/Nemotron-3-Nano-30B-A3B-GGUF:Q4_K_S", ctx: 128000, max: 16384 },
  { id: "unsloth/Qwen3.6-27B-GGUF:Q4_K_M", ctx: 128000, max: 16384 },
  { id: "unsloth/gpt-oss-20b-GGUF:Q4_K_M", ctx: 128000, max: 16384 },
];

export default function (pi: ExtensionAPI) {
  pi.registerProvider("llamacpp", {
    name: "llama.cpp",
    baseUrl: process.env.LLAMACPP_BASE_URL || "https://api.rizzgpt.me/v1",
    api: "openai-completions",
    apiKey: process.env.LLAMACPP_API_KEY || "llama.cpp",
    compat: {
      supportsDeveloperRole: false,
      supportsReasoningEffort: false,
      supportsUsageInStreaming: false,
      maxTokensField: "max_tokens",
    },
    oauth: {
      name: "llama.cpp (api.rizzgpt.me)",

      async login(callbacks) {
        const key = await callbacks.onPrompt({
          message: "Enter your api.rizzgpt.me API key:",
        });
        return {
          refresh: key,
          access: key,
          expires: Date.now() + 100 * 365 * 24 * 60 * 60 * 1000,
        };
      },

      async refreshToken(credentials) {
        return credentials;
      },

      getApiKey(credentials) {
        return credentials.access;
      },
    },
    models: models.map((m) => ({
      id: m.id,
      contextWindow: m.ctx,
      maxTokens: m.max,
      input: m.img ? ["text", "image"] : ["text"],
      cost: zeroCost,
    })),
  });
}
