export const getCodespaceApiHost = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName && codespaceName.trim()) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
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
