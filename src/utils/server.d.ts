export const DEFAULT_QR_VALUE: string;

export type CommandInput = {
  type: string;
  payload: string;
  message: string;
};

export type WifiQrPayload = {
  ssid: string;
  password?: string;
  encryption?: string;
  hidden?: boolean;
};

export function isEmail(value: unknown): boolean;

export function isHttpUrl(value: unknown): boolean;

export function isDomain(value: unknown): boolean;

export function createWebsiteUrl(value: unknown): string;

export function isPhoneNumber(value: unknown): boolean;

export function normalizeWhatsAppNumber(value: unknown): string;

export function createGmailUrl(email: unknown): string;

export function createWhatsAppUrl(
  phoneNumber: unknown,
  message?: unknown,
): string;

export function createPhoneCallUrl(phoneNumber: unknown): string;

export function createSmsUrl(phoneNumber: unknown, message?: unknown): string;

export function createWifiQrValue(payload: WifiQrPayload): string;

export function createTextPageUrl(text: unknown): string;

export function parseCommandInput(value: unknown): CommandInput;

export function createQrTarget(value: unknown): string;

export function getQrType(value: unknown): string;
