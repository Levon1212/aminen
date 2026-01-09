export const decodeHtml = (html: string | null | undefined) => {
  if (!html || typeof html !== "string") return "";
  
  let decoded: string = html;
  
  if (typeof window === "undefined") {
    // Robust server-side decoding using regex
    const entities: { [key: string]: string } = {
      "&quot;": '"',
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&#39;": "'",
      "&apos;": "'",
      "&nbsp;": " ",
      "&copy;": "©",
      "&reg;": "®",
      "&deg;": "°",
      "&plusmn;": "±",
      "&para;": "¶",
      "&middot;": "·",
      "&cedil;": "¸",
      "&ordm;": "º",
      "&raquo;": "»",
      "&frac14;": "¼",
      "&frac12;": "½",
      "&frac34;": "¾",
      "&iquest;": "¿",
    };

    // First pass
    decoded = decoded.replace(/&[a-z0-9#]+;/gi, (match) => {
      if (entities[match.toLowerCase()]) {
        return entities[match.toLowerCase()];
      }
      if (match.startsWith("&#x")) {
        return String.fromCharCode(parseInt(match.substring(3), 16));
      }
      if (match.startsWith("&#")) {
        return String.fromCharCode(parseInt(match.substring(2), 10));
      }
      return match;
    });

    // Check for double encoding (common in some CMS/APIs)
    if (decoded.includes("&lt;") || decoded.includes("&gt;") || decoded.includes("&amp;")) {
      decoded = decoded.replace(/&[a-z0-9#]+;/gi, (match) => {
        if (entities[match.toLowerCase()]) {
          return entities[match.toLowerCase()];
        }
        if (match.startsWith("&#x")) {
          return String.fromCharCode(parseInt(match.substring(3), 16));
        }
        if (match.startsWith("&#")) {
          return String.fromCharCode(parseInt(match.substring(2), 10));
        }
        return match;
      });
    }
  } else {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    decoded = txt.value;
    
    // Client-side double decoding check
    if (decoded.includes("&lt;") || decoded.includes("&gt;") || decoded.includes("&amp;")) {
      txt.innerHTML = decoded;
      decoded = txt.value;
    }
  }
  
  return decoded;
};
