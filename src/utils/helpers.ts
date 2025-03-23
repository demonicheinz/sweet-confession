/**
 * Formats a phone number by removing non-digit characters
 * @param phoneNumber Phone number to format
 * @returns Formatted phone number with only digits
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/\D/g, "");
};

/**
 * Creates a WhatsApp URL with the given phone number and message
 * @param phoneNumber Phone number to message (will be formatted)
 * @param message Message to send (will be encoded)
 * @returns WhatsApp URL
 */
export const createWhatsAppUrl = (phoneNumber: string, message: string): string => {
  const formattedPhone = formatPhoneNumber(phoneNumber);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
};

/**
 * Opens a URL in a new tab
 * @param url URL to open
 */
export const openInNewTab = (url: string): void => {
  window.open(url, "_blank");
};

/**
 * Generates a random message from a list of messages
 * @param messages Array of messages to choose from
 * @returns Random message from the array
 */
export const getRandomMessage = (messages: string[]): string => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

/**
 * Delays execution for the specified time
 * @param ms Time to delay in milliseconds
 * @returns Promise that resolves after the specified time
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
