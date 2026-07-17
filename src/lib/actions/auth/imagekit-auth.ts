"use server";

import { requireAuth } from "@/lib/auth/guards";
import { imagekit } from "@/lib/imagekit";

export async function getImageKitAuth() {
  await requireAuth(); // Ensure only authenticated users can upload

  const authParams = imagekit.helper.getAuthenticationParameters();
  
  return {
    ...authParams,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  };
}
