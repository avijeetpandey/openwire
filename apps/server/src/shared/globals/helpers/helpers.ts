export class Helpers {
  static firstLetterUppercase(str: string): string {
    const valueString = str.toLocaleLowerCase();
    return valueString
      .split(' ')
      .map((value: string) => `${value.charAt(0).toUpperCase()}${value.slice(1).toLocaleLowerCase()}`)
      .join(' ');
  }

  static lowercase(str: string): string {
    return str.toLocaleLowerCase();
  }

  static generateRandomIntegers(integerLength: number): number {
    const characters = '0123456789';
    let result = '';
    const characterLength = characters.length;

    for (let i = 0; i < integerLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * characterLength));
    }

    return parseInt(result, 10);
  }
}