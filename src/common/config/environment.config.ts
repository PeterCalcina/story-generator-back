export interface EnvironmentConfig {
  supabase: {
    url: string;
    serviceRoleKey: string;
  };
  gemini: {
    apiUrl: string;
    apiKey: string;
  };
}

export const getEnvironmentConfig = (): EnvironmentConfig => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSRKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const geminiApiUrl = process.env.GEMINI_API_URL;
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!supabaseUrl || !supabaseSRKey || !geminiApiUrl || !geminiApiKey) {
    throw new Error('Faltan variables de entorno requeridas');
  }

  return {
    supabase: {
      url: supabaseUrl,
      serviceRoleKey: supabaseSRKey,
    },
    gemini: {
      apiUrl: geminiApiUrl,
      apiKey: geminiApiKey,
    },
  };
}; 