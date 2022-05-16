export interface FontFamily {
  category: string;
  family: string;
  variants: string[];
}

export type DefaultGoogleFont = Omit<
  GoogleFont,
  "subsets" | "lastModified" | "version" | "kind"
>;

export interface GoogleFont {
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files?: Record<string, string>;
  category: string;
  kind: string;
}

export interface GoogleWebFontResponse {
  kind: string;
  items: GoogleFont[];
}

export interface DefaultGoogleWebFontResponse {
  kind: "";
  items: DefaultGoogleFont[];
}
