import { compact } from 'lodash';

/**
 * Parses new-line delimited JSON
 */
class NDJSONHelper {
  public static parse = (sourceText: string): object[] => {
    const lines = sourceText.split(/\n/);

    const result = compact(lines.map((line) => {
      if (line === '') {
        return;
      }

      return JSON.parse(line);
    }));

    return result;
  }
}

export default NDJSONHelper;
