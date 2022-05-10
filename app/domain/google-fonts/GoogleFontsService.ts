import { DEFAULT_FONT_FAMILY } from "./constants";
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
          `https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=${process.env.GOOGLE_FONTS_API_KEY}`
        )
      ).json();

      return response;
    } catch (e) {
      return {
        kind: "",
        items: [DEFAULT_FONT_FAMILY],
      };
    }
  }
}
