export class ObjectUtils {
  public static isNullOrUndefined(obj: any): boolean {
    return obj === 'null' || obj === null || obj === undefined;
  }

  public static extractFormData(entry: any, entryJsonKey: string, ...fileKeys: string[]): FormData {
    const formData = new FormData();

    formData.append(entryJsonKey, new Blob([ObjectUtils.orderedToString(entry, ...fileKeys)], {type: 'application/json'}));

    fileKeys.forEach(fileKey => {
      const files = entry[fileKey];
      if (files && Array.isArray(files)) {
        files.forEach(fileItem => {
          formData.append(fileKey, fileItem);
        });
      } else if (files) {
        formData.append(fileKey, files);
      }
    });

    return formData;
  }

  public static orderedToString(object: any, ...excludeKeys: string[]): string {
    if (object instanceof File) {
      const file = {
        lastModified: object.lastModified,
        name: object.name,
        size: object.size,
        type: object.type
      };
      return JSON.stringify(file);
    }

    if (typeof object !== 'object' || object === null) {
      return JSON.stringify(object);
    }

    if (Array.isArray(object)) {
      return '[' + object.map(obj => ObjectUtils.orderedToString(obj, ...excludeKeys)).sort().join(',') + ']';
    }

    if (object instanceof Map) {
      return this.orderedToString(Array.from(object));
    }

    return '{' +
      Object.entries(object)
        .filter(([key, value]) => !excludeKeys.includes(key))
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .map(([key, value]) => '"' + key + '"' + ':' + ObjectUtils.orderedToString(value, ...excludeKeys))
        .join(',')
      + '}';
  }
}
