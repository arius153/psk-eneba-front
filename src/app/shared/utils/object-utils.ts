export class ObjectUtils {
  public static isNullOrUndefined(obj: any): boolean {
    return obj === 'null' || obj === null || obj === undefined;
  }
}
