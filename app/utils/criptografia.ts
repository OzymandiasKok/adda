import bcrypt from 'bcryptjs'

export async function verifyPassword(
  senhaDigitada: string,
  senhaCriptografada: string,
) {
  console.log(senhaDigitada, senhaCriptografada)
  const corresponde = await bcrypt.compare(senhaDigitada, senhaCriptografada)

  return corresponde
}
