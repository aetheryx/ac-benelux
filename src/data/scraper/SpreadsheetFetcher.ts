import * as GoogleSheets from '@googleapis/sheets';

export class SpreadsheetFetcher {
  private spreadsheetID: string;
  private authFile: string;
  private client: GoogleSheets.sheets_v4.Sheets;

  constructor(spreadsheetID: string, authFile: string) {
    this.spreadsheetID = spreadsheetID;
    this.authFile = authFile;
  }

  public async init() {
    const googleAuth = new GoogleSheets.auth.GoogleAuth({
      keyFilename: this.authFile,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    this.client = GoogleSheets.sheets({
      version: 'v4',
      auth: await googleAuth.getClient(),
    });
  }

  public async fetch(range: string): Promise<{ header: string[]; values: string[][] }> {
    const sheetData = await this.client.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetID,
      range,
      dateTimeRenderOption: 'FORMATTED_STRING',
      valueRenderOption: 'FORMULA',
    });

    return {
      header: sheetData.data.values.shift(),
      values: sheetData.data.values,
    };
  }
}

