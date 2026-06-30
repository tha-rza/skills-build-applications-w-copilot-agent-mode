const normalizeCodespaceName = (value) => {
  if (typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  const normalized = trimmed.toLowerCase();
  if (normalized === 'undefined' || normalized === 'null') {
    return '';
  }

  return trimmed;
};

export const getCodespaceApiHost = () => {
  const codespaceName = normalizeCodespaceName(import.meta.env.VITE_CODESPACE_NAME);
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
};

export const getApiUrl = (resourceName) => `${getCodespaceApiHost()}/api/${resourceName}/`;

export const normalizeResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }
  if (payload && payload.data) {
    return payload.data;
  }
  return payload ?? [];
};
