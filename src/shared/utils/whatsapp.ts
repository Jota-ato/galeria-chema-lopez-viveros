export const generateWhatsappMessageLink = (text: string) =>
  `https://wa.me/${process.env.ARTIST_PHONE}?text=${encodeURIComponent(text)}`;
