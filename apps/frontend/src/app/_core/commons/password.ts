export class Password {
  static generate(length: number = 8): string {
    const charactersUppercase =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLowerCase = charactersUppercase.toLocaleLowerCase();
    const charactersNumbers = "0123456789";
    const charactersSpecialCharacters = '!@#$%^&*()_+{}[]|:"<>,.?/~`-=';

    const groups = [
      charactersLowerCase,
      charactersUppercase,
      charactersSpecialCharacters,
      charactersNumbers,
    ];

    const password = [];

    for (let i = 0; i < length; i++) {
      const grupo = groups[Math.floor(Math.random() * groups.length)];
      password.push(grupo[Math.floor(Math.random() * grupo.length)]);
    }

    return password.join("");
  }
}
