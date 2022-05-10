import GoogleFontsMockService from "./GoogleFontsMockService";
import GoogleFontsService from "./GoogleFontsService";
import {
  DefaultGoogleWebFontResponse,
  FontFamily,
  GoogleWebFontResponse,
} from "./interfaces";

export default class GoogleFontsServiceProxy {
  async findAll(): Promise<FontFamily[]> {
    if (process.env.NODE_ENV === "development") {
      const googleFontsMockService = new GoogleFontsMockService();
      const googleFontsMock: GoogleWebFontResponse =
        await googleFontsMockService.findAll();

      return this.mapResponse(googleFontsMock);
    }

    const googleFontsService = new GoogleFontsService();
    const googleFonts: GoogleWebFontResponse | DefaultGoogleWebFontResponse =
      await googleFontsService.findAll();
    return this.mapResponse(googleFonts);
  }

  mapResponse(
    response: GoogleWebFontResponse | DefaultGoogleWebFontResponse
  ): FontFamily[] {
    const { items } = response;

    return items.map((item) => {
      const variants = this.mapFontsVariants(item.variants);

      return {
        category: item.category,
        family: item.family,
        variants: variants,
      };
    });
  }

  mapFontsVariants(fontVariants: string[]): string[] {
    // exclude variants that contains the word italic
    const variants = fontVariants.filter(
      (variant) => !variant.includes("italic")
    );

    // replace regular with "400"
    const variantsWith400 = variants.map((variant) => {
      if (variant === "regular") {
        return "400";
      }
      return variant;
    });

    return variantsWith400;
  }
}
