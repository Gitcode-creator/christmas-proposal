/**
 * User-specific Local Storage Partition Utility
 */

export function getUserWishHistoryKey(userId: string | number): string {
  return `wishHistory_${userId}`;
}

export function getUserFavoritesKey(userId: string | number): string {
  return `wishFavorites_${userId}`;
}

export function getUserProfileKey(userId: string | number): string {
  return `profile_${userId}`;
}

/**
 * Removes all partitioned files belonging to a specific user ID
 * to prevent orphaned storage leaks on account deletion.
 */
export function clearUserData(userId: string | number): void {
  localStorage.removeItem(getUserWishHistoryKey(userId));
  localStorage.removeItem(getUserFavoritesKey(userId));
  localStorage.removeItem(getUserProfileKey(userId));
}
