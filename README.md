# llama.cpp Provider for pi

Custom provider that registers llama.cpp models in pi. Ships with OAuth `/login` support for easy API key setup.

## Install

```bash
pi install git:github.com/YOUR_USER/llamacpp-provider
```

## Setup

### Option A: `/login` (recommended)

Just run `/login llamacpp` in pi — it'll prompt for your API key and store it securely.

### Option B: Environment variables

```bash
export LLAMACPP_BASE_URL="https://api.rizzgpt.me/v1"   # default, change for local
export LLAMACPP_API_KEY="your-key"                      # only needed if skipping /login
```

Default `LLAMACPP_BASE_URL` is `https://api.rizzgpt.me/v1`. Override it for a local llama.cpp server:

```bash
export LLAMACPP_BASE_URL="http://localhost:8080/v1"
export LLAMACPP_API_KEY="llama.cpp"
```

## Models

~50 pre-configured models: Qwen, Gemma, Nemotron, LFM, GPT-OSS — with context windows and vision support where applicable.
