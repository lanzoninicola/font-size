import { YesVizDeviceInfo } from "./interfaces";

export default class YesVizService {
  URL = "https://yesviz.com/viewport/";
  infoMapping = {
    type: 1,
    name: 2,
    viewportSize: 3,
    screenSize: 4,
    devicePixelRatio: 5,
    ppi: 6,
    cssPpi: 7,
  };

  htmlDoc: Document | null = null;

  constructor() {
    this.init();
  }

  async init() {
    const htmlText = await this.getWebsiteTextContent();
    this.htmlDoc = this.parseTextContent(htmlText);
  }

  private async getWebsiteTextContent() {
    const { URL } = this;

    const response = await fetch(URL);
    const html = await response.text();

    return html;
  }

  private parseTextContent(html: string) {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
  }

  getDevices() {
    const { infoMapping } = this;

    const d = document;

    const viewportTable = d.querySelector(`#viewport-table`);

    const dataset: YesVizDeviceInfo[] = [];

    if (viewportTable) {
      // get all the rows
      const rows = viewportTable.querySelectorAll(`tbody tr`);

      rows.forEach((row) => {
        // @ts-ignore
        const type: YesVizDeviceType = row
          .querySelector(`td:nth-child(${infoMapping.type})`)
          .textContent.replace(/\s+/g, ``);
        // @ts-ignore
        const name = row
          .querySelector(`td:nth-child(${infoMapping.name})`)
          .textContent.replace(/\s+/g, ` `)
          .trim();
        // @ts-ignore
        const viewportSize = row
          .querySelector(`td:nth-child(${infoMapping.viewportSize})`)
          .textContent.replace(" x ", `|`);

        const vwWdith = viewportSize.split(`|`)[0];
        const vhHeight = viewportSize.split(`|`)[1];
        // @ts-ignore
        const screenSize = row.querySelector(
          `td:nth-child(${infoMapping.screenSize})`
        ).textContent;
        // @ts-ignore
        const devicePixelRatio = row.querySelector(
          `td:nth-child(${infoMapping.devicePixelRatio})`
        ).textContent;
        // @ts-ignore
        const ppi = row.querySelector(
          `td:nth-child(${infoMapping.ppi})`
        ).textContent;
        // @ts-ignore
        const cssPpi = row.querySelector(
          `td:nth-child(${infoMapping.cssPpi})`
        ).textContent;

        const device: YesVizDeviceInfo = {
          type,
          name,
          viewportSize: {
            width: vwWdith,
            height: vhHeight,
          },
          screenSize: screenSize || "",
          devicePixelRatio: devicePixelRatio || "",
          ppi: ppi || "",
          cssPpi: cssPpi || "",
        };

        dataset.push(device);
      });

      return dataset;
    }
  }

  // getDeviceType(tableRow: Element | null): YesVizDeviceType {

  //   if (tableRow) {

  //     const typeElement = tableRow.querySelector(`td:nth-child(${this.infoMapping.type})`)

  //     if (typeElement) {
  //       const type = typeElement.textContent.replace(/\s+/g, ``);
  //     }

  //     return type as YesVizDeviceType;
  //   }

  //   return YesVizDeviceType.unknown;
  // }

  // }
}
