export function getWishlist(): string[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("wishlist") || "[]");
}

export function addToWishlist(productId: string) {
  let wishlist = getWishlist();

  // Ensure we only store the ID as a string
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
}

export function removeFromWishlist(productId: string) {
  const wishlist = getWishlist().filter((id) => id !== productId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

export function isProductWishlisted(productId: string): boolean {
  return getWishlist().includes(productId);
}