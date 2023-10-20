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
  salt: Uint8Array | ArrayBuffer | ArrayBufferLike,
  password: string,
  iterations: number,
  keyLength: number,
  digest: string,
  algorithm: string,
) => {
  const passwordBuffer = Buffer.from(password, "utf-8");

  const pwHash = await crypto.subtle.digest("SHA-256", passwordBuffer);

  const importedKey = await crypto.subtle.importKey(
    "raw",
    pwHash,
    algorithm,
    false,
    ["deriveBits"],
  );

  const params = {
    name: algorithm,
    hash: digest,
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
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const hashIteration = 27500;
  const keyLength = 256;
  const digest = "SHA-256";
  const type = "PBKDF2";
  const algorithm = type + ";" + digest;

  var derivation = await getDerivation(
    salt,
    password,
    hashIteration,
    keyLength,
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
  const type = pass.credentialsData.algorithm.split(";")[0];
  const digest = pass.credentialsData.algorithm.split(";")[1];

  const saltArray = Array.from(atob(pass.secretData.salt)).map((char) =>
    char.charCodeAt(0),
  );
  const salt = Uint8Array.from(saltArray);

  const passArray = atob(pass.secretData.value);

  return await verifyCredential(
    input,
    salt,
    passArray,
    pass.credentialsData.hashIteration,
    passArray.length,
    digest,
    type,
  );
};

export const verifyCredential = async (
  input: string,
  salt: ArrayBuffer | ArrayBufferLike,
  hash: string,
  iterations: number,
  hashBytes: number,
  digest: string,
  type: string,
) => {
  var derivation = await getDerivation(
    salt,
    input,
    iterations,
    hashBytes,
    digest,
    type,
  );

  var compareHash = String.fromCharCode(...new Uint8Array(derivation));

  return hash == compareHash;
};
