interface ValidationURLResponse {
  isValid: boolean;
  errorMessage: string;
}

export default function validateURL(url: string): ValidationURLResponse {
  const result: ValidationURLResponse = {
    isValid: false,
    errorMessage: "",
  };

  if (
    url.includes("<script") ||
    url.includes("</script>") ||
    url.includes("<style>" || url.includes("</style>"))
  ) {
    result.isValid = false;
    result.errorMessage = "URL cannot contain script tags or style tags";
  }

  if (url.includes("<") || url.includes(">")) {
    result.isValid = false;
    result.errorMessage = "URL cannot contain invalid characters";
  }

  /** STASHED FOR FUTURE USE

    // check if the url contains an IP ADDRESS
    const partMatched = previewUrl.match(/(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/g);
    console.log("partMatched", partMatched);

    if (false) {
      // if is not a private IP address, set is invalid to true and returns
      if (isPrivateIP(previewUrl) === false) {
        setIsInvalid(true);
        setUrlInvalidMessage(
          "Navigating to a public IP address is not allowed"
        );
        return;
      }
    }
 */
  // check if the url contains an IP address

  // if (previewUrl.startsWith("http://")) {
  //   nextState = previewUrl.replace(/^(http?:)?\/\//, "https://");
  // }

  return result;
}
