export default class DevicesService {
  // const url = "https://yesviz.com/viewport/";
  // // return json();
  // const response = await fetch(url);
  // const html = await response.text();
  // const parser = new DOMParser();
  // const doc = parser.parseFromString(html, "text/html");
  // console.log(doc);
  // return null;

  getDevices() {
    const d = document;

    const viewportTable = d.querySelector(`#viewport-table`);

    const dataset = [];

    const infoMapping = {
      type: 1,
      name: 2,
      viewportSize: 3,
      screenSize: 4,
      devicePixelRatio: 5,
      ppi: 6,
      cssPpi: 7,
    };

    if (viewportTable) {
      // get all the rows
      const rows = viewportTable.querySelectorAll(`tbody tr`);

      rows.forEach((row) => {
        const type = row
          .querySelector(`td:nth-child(${infoMapping.type})`)
          .textContent.replace(/\s+/g, ``);
        const name = row
          .querySelector(`td:nth-child(${infoMapping.name})`)
          .textContent.replace(/\s+/g, ` `)
          .trim();
        const viewportSize = row
          .querySelector(`td:nth-child(${infoMapping.viewportSize})`)
          .textContent.replace(" x ", `|`);

        const vwWdith = viewportSize.split(`|`)[0];
        const vhHeight = viewportSize.split(`|`)[1];
        const screenSize = row.querySelector(
          `td:nth-child(${infoMapping.screenSize})`
        ).textContent;
        const devicePixelRatio = row.querySelector(
          `td:nth-child(${infoMapping.devicePixelRatio})`
        ).textContent;
        const ppi = row.querySelector(
          `td:nth-child(${infoMapping.ppi})`
        ).textContent;
        const cssPpi = row.querySelector(
          `td:nth-child(${infoMapping.cssPpi})`
        ).textContent;

        const device = {
          type,
          name,
          viewportSize: {
            width: vwWdith,
            height: vhHeight,
          },
          screenSize,
          devicePixelRatio,
          ppi,
          cssPpi,
        };

        dataset.push(device);
      });

      console.log(JSON.stringify(dataset));
    }
  }
}
