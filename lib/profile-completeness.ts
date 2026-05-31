type ProfileUser = {
  name?: string | null;
  phone?: string | null;
  addressLine1?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
};

export function getMissingProfileFields(user: ProfileUser) {
  const missing: string[] = [];

  if (!user.name) missing.push("name");
  if (!user.phone) missing.push("phone number");
  if (!user.addressLine1) missing.push("address");
  if (!user.city) missing.push("city");
  if (!user.state) missing.push("state");
  if (!user.postalCode) missing.push("ZIP / postal code");

  return missing;
}

export function isProfileComplete(user: ProfileUser) {
  return getMissingProfileFields(user).length === 0;
}