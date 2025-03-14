import User from "../models/User.js";
import { getGoogleTokens, getGoogleUserInfo } from "../utils/googleAuth.js";

export const handleGoogleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    
    // Exchange authorization code for tokens
    const tokens = await getGoogleTokens(code);
    const { id_token } = tokens;
    
    if (!id_token) {
      return res.status(400).json({ error: "Failed to get id token" });
    }
    
    // Get user info from token
    const userInfo = await getGoogleUserInfo(id_token);
    const { email, name } = userInfo;
    
    if (!email) {
      return res.status(400).json({ error: "Failed to get user email" });
    }
    
    // Find or create user
    let user = await User.findOne({ email }).select("-password");
    if (!user) {
      user = await User.create({ email, name });
    }
    
    // Generate JWT
    const token = user.generateToken();
    
    // Return user and token
    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Google auth callback error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};
