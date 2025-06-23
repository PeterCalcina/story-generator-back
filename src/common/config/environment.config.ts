export interface EnvironmentConfig {
  supabase: {
    url: string;
    serviceRoleKey: string;
  };
  gemini: {
    apiKey: string;
  };
}

export const getEnvironmentConfig = (): EnvironmentConfig => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSRKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!supabaseUrl || !supabaseSRKey || !geminiApiKey) {
    throw new Error('Faltan variables de entorno requeridas');
  }

  return {
    supabase: {
      url: supabaseUrl,
      serviceRoleKey: supabaseSRKey,
    },
    gemini: {
      apiKey: geminiApiKey,
    },
  };
};
