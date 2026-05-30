export const DEFAULT_QR_VALUE = "";

function getAppBaseUrl() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
}

function cleanValue(value) {
  return String(value || "").trim();
}

function encodeTextToBase64Url(value) {
  const cleanedValue = cleanValue(value);

  return btoa(unescape(encodeURIComponent(cleanedValue)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export function isEmail(value) {
  const cleanedValue = cleanValue(value);

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanedValue);
}

export function isHttpUrl(value) {
  const cleanedValue = cleanValue(value);

  return /^https?:\/\/[^\s]+$/i.test(cleanedValue);
}

export function isDomain(value) {
  const cleanedValue = cleanValue(value);

  if (!cleanedValue || cleanedValue.includes(" ") || isEmail(cleanedValue)) {
    return false;
  }

  return /^(www\.)?[a-z0-9-]+(\.[a-z0-9-]+)+([/?#].*)?$/i.test(cleanedValue);
}

export function createWebsiteUrl(value) {
  const cleanedValue = cleanValue(value);

  if (isHttpUrl(cleanedValue)) {
    return cleanedValue;
  }

  return `https://${cleanedValue}`;
}

export function isPhoneNumber(value) {
  const cleanedValue = cleanValue(value).replace(/[\s\-().]/g, "");

  return /^(\+62|62|0)8\d{7,13}$/.test(cleanedValue);
}

export function normalizeWhatsAppNumber(value) {
  const cleanedValue = cleanValue(value).replace(/[\s\-().]/g, "");

  if (cleanedValue.startsWith("+62")) {
    return cleanedValue.replace("+", "");
  }

  if (cleanedValue.startsWith("62")) {
    return cleanedValue;
  }

  if (cleanedValue.startsWith("0")) {
    return `62${cleanedValue.slice(1)}`;
  }

  return cleanedValue;
}

export function createGmailUrl(email) {
  const cleanedEmail = cleanValue(email);

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    cleanedEmail,
  )}`;
}

export function createWhatsAppUrl(phoneNumber, message = "") {
  const whatsappNumber = normalizeWhatsAppNumber(phoneNumber);
  const cleanedMessage = cleanValue(message);

  if (cleanedMessage) {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      cleanedMessage,
    )}`;
  }

  return `https://wa.me/${whatsappNumber}`;
}

export function createPhoneCallUrl(phoneNumber) {
  const cleanedPhoneNumber = cleanValue(phoneNumber).replace(/[\s\-().]/g, "");

  return `tel:${cleanedPhoneNumber}`;
}

export function createSmsUrl(phoneNumber, message = "") {
  const cleanedPhoneNumber = cleanValue(phoneNumber).replace(/[\s\-().]/g, "");
  const cleanedMessage = cleanValue(message);

  if (cleanedMessage) {
    return `sms:${cleanedPhoneNumber}?body=${encodeURIComponent(
      cleanedMessage,
    )}`;
  }

  return `sms:${cleanedPhoneNumber}`;
}

export function createWifiQrValue({
  ssid,
  password = "",
  encryption = "WPA",
  hidden = false,
}) {
  const cleanedSsid = cleanValue(ssid);
  const cleanedPassword = cleanValue(password);
  const cleanedEncryption = cleanValue(encryption).toUpperCase() || "WPA";

  if (!cleanedSsid) {
    return DEFAULT_QR_VALUE;
  }

  return `WIFI:T:${cleanedEncryption};S:${escapeWifiValue(
    cleanedSsid,
  )};P:${escapeWifiValue(cleanedPassword)};H:${hidden ? "true" : "false"};;`;
}

function escapeWifiValue(value) {
  return cleanValue(value).replace(/([\\;,:"])/g, "\\$1");
}

export function createTextPageUrl(text) {
  const cleanedText = cleanValue(text);
  const appBaseUrl = getAppBaseUrl();

  if (!cleanedText) {
    return DEFAULT_QR_VALUE;
  }

  const encodedText = encodeTextToBase64Url(cleanedText);

  return `${appBaseUrl}/?qrData=${encodedText}`;
}

export function parseCommandInput(value) {
  const cleanedValue = cleanValue(value);

  if (!cleanedValue.includes(":")) {
    return {
      type: "",
      payload: cleanedValue,
      message: "",
    };
  }

  const [rawType, ...restParts] = cleanedValue.split(":");
  const type = rawType.trim().toLowerCase();
  const restValue = restParts.join(":").trim();

  if (!type || !restValue) {
    return {
      type: "",
      payload: cleanedValue,
      message: "",
    };
  }

  const [payload, ...messageParts] = restValue.split("|");

  return {
    type,
    payload: cleanValue(payload),
    message: cleanValue(messageParts.join("|")),
  };
}

export function createQrTarget(value) {
  const trimmedValue = cleanValue(value);

  if (!trimmedValue) {
    return DEFAULT_QR_VALUE;
  }

  const command = parseCommandInput(trimmedValue);

  if (command.type === "url" || command.type === "link") {
    return createWebsiteUrl(command.payload);
  }

  if (command.type === "email" || command.type === "gmail") {
    return isEmail(command.payload)
      ? createGmailUrl(command.payload)
      : DEFAULT_QR_VALUE;
  }

  if (command.type === "wa" || command.type === "whatsapp") {
    return isPhoneNumber(command.payload)
      ? createWhatsAppUrl(command.payload, command.message)
      : DEFAULT_QR_VALUE;
  }

  if (command.type === "tel" || command.type === "phone") {
    return isPhoneNumber(command.payload)
      ? createPhoneCallUrl(command.payload)
      : DEFAULT_QR_VALUE;
  }

  if (command.type === "sms") {
    return isPhoneNumber(command.payload)
      ? createSmsUrl(command.payload, command.message)
      : DEFAULT_QR_VALUE;
  }

  if (command.type === "text") {
    return createTextPageUrl(command.payload);
  }

  if (isHttpUrl(trimmedValue)) {
    return trimmedValue;
  }

  if (isDomain(trimmedValue)) {
    return createWebsiteUrl(trimmedValue);
  }

  if (isEmail(trimmedValue)) {
    return createGmailUrl(trimmedValue);
  }

  if (isPhoneNumber(trimmedValue)) {
    return createWhatsAppUrl(trimmedValue);
  }

  return createTextPageUrl(trimmedValue);
}

export function getQrType(value) {
  const trimmedValue = cleanValue(value);

  if (!trimmedValue) {
    return "Waiting Input";
  }

  const command = parseCommandInput(trimmedValue);

  if (command.type === "url" || command.type === "link") return "Website URL";
  if (command.type === "email" || command.type === "gmail") return "Gmail";
  if (command.type === "wa" || command.type === "whatsapp") return "WhatsApp";
  if (command.type === "tel" || command.type === "phone") return "Phone Call";
  if (command.type === "sms") return "SMS";
  if (command.type === "text") return "Text Page";

  if (isHttpUrl(trimmedValue) || isDomain(trimmedValue)) return "Website URL";
  if (isEmail(trimmedValue)) return "Gmail";
  if (isPhoneNumber(trimmedValue)) return "WhatsApp";

  return "Text Page";
}
