const parseEnv = () => {
  const envs = process.env;
  const entries = Object.entries(envs);

  console.log(
    entries
      .filter((env) => env[0].startsWith("RSS_"))
      .map((env) => `${env[0]}=${env[1]};`)
      .join(" ")
  );
};

parseEnv();