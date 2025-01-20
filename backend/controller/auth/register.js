const bcrypt = require("bcryptjs");
const supabase = require("../../models/supaBase/supaBaseClient");
const validator = require("validator");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate inputs
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    // Check if the user already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("id") // Only fetch the ID to minimize data retrieval
      .eq("email", email)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error checking for existing user:", fetchError);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password: hashedPassword,
        },
      ])
      .select("id") // Only return the ID of the new user
      .single();

    if (insertError) {
      console.error("Error inserting new user:", insertError);
      return res.status(500).json({ message: "Internal server error" });
    }

    // Respond to the client
    res.status(201).json({
      message: "User created successfully",
      userId: newUser.id,
    });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = signUp;
