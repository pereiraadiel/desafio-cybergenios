import * as bcrypt from 'bcrypt';

const hash = (password: string) => bcrypt.hash(password, 10);

const isMatch = (password: string, hash: string) =>
  bcrypt.compare(password, hash);

export { hash, isMatch };
