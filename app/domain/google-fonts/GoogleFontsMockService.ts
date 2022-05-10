import googleFonts from "./data/google-fonts.json";
import { GoogleWebFontResponse } from "./interfaces";

export default class GoogleFontsMockService {
  findAll(): Promise<GoogleWebFontResponse> {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        const { kind, items } = googleFonts;

        const googleFontsParsed = items.map((item) => {
          return {
            family: item.family,
            variants: item.variants,
            subsets: item.subsets,
            category: item.category,
            version: item.version,
            lastModified: item.lastModified,
            kind: item.kind,
          };
        });

        resolve({ kind, items: googleFontsParsed });
      }, 1000);
    });
  }
}
