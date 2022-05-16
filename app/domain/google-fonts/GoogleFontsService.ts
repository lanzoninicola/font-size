import { DEFAULT_GOOGLE_FONT, GOOGLE_WEBFONTS_API_URL } from "./constants";
import {
  DefaultGoogleWebFontResponse,
  GoogleWebFontResponse,
} from "./interfaces";

export default class GoogleFontsService {
  constructor() {}

  async findAll(): Promise<
    GoogleWebFontResponse | DefaultGoogleWebFontResponse
  > {
    try {
      const response: GoogleWebFontResponse = await (
        await fetch(
          `${GOOGLE_WEBFONTS_API_URL}&key=${process.env.GOOGLE_FONTS_API_KEY}`
        )
      ).json();

      return response;
    } catch (e) {
      return {
        kind: "",
        items: [DEFAULT_GOOGLE_FONT],
      };
    }
  }
}
