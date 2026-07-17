import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import type { OAuthCredentials, OAuthLoginCallbacks } from "@earendil-works/pi-ai";

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

      async login(callbacks: OAuthLoginCallbacks): Promise<OAuthCredentials> {
        const key = await callbacks.onPrompt({
          message: "Enter your api.rizzgpt.me API key:",
        });
        return {
          refresh: key,
          access: key,
          expires: Date.now() + 100 * 365 * 24 * 60 * 60 * 1000, // 100 years
        };
      },

      async refreshToken(credentials: OAuthCredentials): Promise<OAuthCredentials> {
        return credentials; // API keys don't expire
      },

      getApiKey(credentials: OAuthCredentials): string {
        return credentials.access;
      },
    },
    models: [
      { id: "Gemma-Test", contextWindow: 216000, maxTokens: 16384 },
      { id: "LFM2-24B-A2B-Q4_K_M", contextWindow: 128000, maxTokens: 16384 },
      { id: "LFM2.5-VL-1.6B-Q8_0", contextWindow: 128000, maxTokens: 16384 },
      { id: "LiquidAI/LFM2-24B-A2B-GGUF:Q4_K_M", contextWindow: 128000, maxTokens: 16384 },
      {
        id: "LiquidAI/LFM2.5-VL-1.6B-GGUF:Q8_0",
        contextWindow: 128000,
        maxTokens: 16384,
        input: ["text", "image"],
      },
      { id: "Nemotron-3-Nano-30B-A3B-Q4_K_S", contextWindow: 524288, maxTokens: 16384 },
      { id: "Nemotron-3-Nano-30B-A3B-Q4_K_S-fast", contextWindow: 50000, maxTokens: 16384 },
      { id: "Nemotron-3-Nano-30B-A3B-Q4_K_S-full", contextWindow: 1048576, maxTokens: 16384 },
      { id: "Nemotron-3-Nano-30B-A3B-Q4_K_S-medium", contextWindow: 524288, maxTokens: 16384 },
      { id: "Qwen3.5-4B-q8_0-MTP", contextWindow: 128000, maxTokens: 16384 },
      { id: "Qwen3.5-9B-MTP-Q4_K_M", contextWindow: 128000, maxTokens: 16384 },
      { id: "Qwen3.5-9B-Q4_K_M", contextWindow: 128000, maxTokens: 16384 },
      { id: "Qwen3.6-27B-Q4_K_S", contextWindow: 262144, maxTokens: 16384 },
      {
        id: "Qwen3.6-27B-Q4_K_S-fast",
        contextWindow: 50000,
        maxTokens: 16384,
        input: ["text", "image"],
      },
      { id: "Qwen3.6-27B-Q4_K_S-full", contextWindow: 262144, maxTokens: 16384 },
      { id: "Qwen3.6-27B-Q4_K_S-medium", contextWindow: 100000, maxTokens: 16384 },
      {
        id: "Qwen3.6-27B-Q4_K_S-vision",
        contextWindow: 128000,
        maxTokens: 16384,
        input: ["text", "image"],
      },
      { id: "Qwen3.6-35B-A3B-UD-Q4_K_S", contextWindow: 262144, maxTokens: 16384 },
      {
        id: "Qwen3.6-35B-A3B-UD-Q4_K_S-fast",
        contextWindow: 50000,
        maxTokens: 16384,
        input: ["text", "image"],
      },
      { id: "Qwen3.6-35B-A3B-UD-Q4_K_S-full", contextWindow: 262144, maxTokens: 16384 },
      { id: "Qwen3.6-35B-A3B-UD-Q4_K_S-medium", contextWindow: 100000, maxTokens: 16384 },
      {
        id: "Qwen3.6-35B-A3B-UD-Q4_K_S-vision",
        contextWindow: 128000,
        maxTokens: 16384,
        input: ["text", "image"],
      },
      { id: "adriabama06/Qwen3.5-4B-q8_0-am17an-MTP:Q8_0", contextWindow: 128000, maxTokens: 16384 },
      { id: "bartowski/nvidia_Nemotron-Cascade-2-30B-A3B-GGUF:Q4_K_S", contextWindow: 128000, maxTokens: 16384 },
      {
        id: "gemma-4-12b-it-Q4_K_M",
        contextWindow: 262144,
        maxTokens: 16384,
        input: ["text", "image"],
      },
      {
        id: "gemma-4-26B-A4B-it-Q4_K_M",
        contextWindow: 262144,
        maxTokens: 16384,
        input: ["text", "image"],
      },
      {
        id: "gemma-4-26B-A4B-it-Q4_K_M-fast",
        contextWindow: 50000,
        maxTokens: 16384,
        input: ["text", "image"],
      },
      {
        id: "gemma-4-26B-A4B-it-Q4_K_M-full",
        contextWindow: 262144,
        maxTokens: 16384,
        input: ["text", "image"],
      },
      {
        id: "gemma-4-26B-A4B-it-Q4_K_M-medium",
        contextWindow: 100000,
        maxTokens: 16384,
        input: ["text", "image"],
      },
      {
        id: "gemma-4-26B-A4B-it-Q4_K_M-vision",
        contextWindow: 128000,
        maxTokens: 16384,
        input: ["text", "image"],
      },
      { id: "gemma-4-26B-A4B-it-q4", contextWindow: 128000, maxTokens: 16384 },
      {
        id: "gemma-4-26B-A4B-it-q4-vision",
        contextWindow: 128000,
        maxTokens: 16384,
        input: ["text", "image"],
      },
      { id: "gemma-4-31B-it-Q4_K_S", contextWindow: 262144, maxTokens: 16384 },
      {
        id: "gemma-4-31B-it-Q4_K_S-fast",
        contextWindow: 50000,
        maxTokens: 16384,
        input: ["text", "image"],
      },
      { id: "gemma-4-31B-it-Q4_K_S-full", contextWindow: 262144, maxTokens: 16384 },
      { id: "gemma-4-31B-it-Q4_K_S-medium", contextWindow: 100000, maxTokens: 16384 },
      {
        id: "gemma-4-31B-it-Q4_K_S-vision",
        contextWindow: 128000,
        maxTokens: 16384,
        input: ["text", "image"],
      },
      {
        id: "gemma-4-E4B-it-Q4_K_M",
        contextWindow: 131072,
        maxTokens: 16384,
        input: ["text", "image"],
      },
      { id: "gpt-oss-20b-Q4_K_M", contextWindow: 4096, maxTokens: 4096 },
      { id: "gpt-oss-20b-mxfp4", contextWindow: 128000, maxTokens: 16384 },
      { id: "lmstudio-community/gemma-4-E4B-it-GGUF:Q4_K_M", contextWindow: 128000, maxTokens: 16384 },
      { id: "unsloth/Nemotron-3-Nano-30B-A3B-GGUF:Q4_K_S", contextWindow: 128000, maxTokens: 16384 },
      { id: "unsloth/Qwen3.6-27B-GGUF:Q4_K_M", contextWindow: 128000, maxTokens: 16384 },
      { id: "unsloth/gpt-oss-20b-GGUF:Q4_K_M", contextWindow: 128000, maxTokens: 16384 },
    ],
  });
}
