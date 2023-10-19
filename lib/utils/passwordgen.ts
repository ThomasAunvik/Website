export interface Password {
  secretData: {
    value: string;
    salt: string;
  };
  credentialsData: {
    hashIteration: number;
    algorithm: string;
  };
}

const getDerivation = async (
  hash: string,
  salt: Uint32Array,
  password: string,
  iterations: number,
  keyLength: number,
  digest: string,
  algorithm: string,
) => {
  const textEncoder = new TextEncoder();
  const passwordBuffer = textEncoder.encode(password);

  const pwHash = await crypto.subtle.digest("SHA-256", passwordBuffer);

  const importedKey = await crypto.subtle.importKey(
    "raw",
    pwHash,
    digest,
    false,
    ["deriveBits"],
  );

  const params = {
    name: algorithm,
    hash: hash,
    salt: salt,
    iterations: iterations,
  };

  const derivation = await crypto.subtle.deriveBits(
    params,
    importedKey,
    keyLength * 8,
  );

  return derivation;
};

export const generateStoredPassword = async (password: string) => {
  const salt = crypto.getRandomValues(new Uint32Array(16));

  const hashIteration = 27500;
  const digest = "SHA-256";
  const type = "PBKDF2";
  const algorithm = type + "-" + digest;

  var derivation = await getDerivation(
    process.env.NEXTAUTH_SECRET ?? "rrandom",
    salt,
    password,
    hashIteration,
    8,
    digest,
    type,
  );

  var hashed = btoa(String.fromCharCode(...new Uint8Array(derivation)));
  var salt64 = btoa(String.fromCharCode(...salt));

  const data: Password = {
    secretData: {
      value: hashed,
      salt: salt64,
    },
    credentialsData: {
      algorithm: algorithm,
      hashIteration: hashIteration,
    },
  };
  return data;
};

export const verifyPassword = async (input: string, pass: Password) => {
  const type = pass.credentialsData.algorithm.split("-")[0];
  const digest = pass.credentialsData.algorithm.split("-")[1];

  const saltArray = Array.from(atob(pass.secretData.salt)).map((char) =>
    char.charCodeAt(0),
  );
  const salt = Uint32Array.from(saltArray);

  const passArray = atob(pass.secretData.value);

  return await verifyCredential(
    input,
    salt,
    passArray,
    pass.credentialsData.hashIteration,
    64,
    digest,
    type,
  );
};

export const verifyCredential = async (
  input: string,
  salt: Uint32Array,
  hash: string,
  iterations: number,
  hashBytes: number,
  digest: string,
  type: string,
) => {
  var derivation = await getDerivation(
    process.env.NEXTAUTH_SECRET ?? "rrandom",
    salt,
    input,
    iterations,
    8,
    digest,
    type,
  );

  var compareHash = String.fromCharCode(...new Uint8Array(derivation));

  return hash == compareHash;
};
