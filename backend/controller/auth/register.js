const bcrypt = require("bcryptjs");
const supabase = require("../../models/supaBase/supaBaseClient");
const validator = require("validator");

const signUp = async (req, res) => {
  try {
    const { fullname, email, username, password, country, phone } = req.body;

    // Validate inputs
    if (!fullname || !email || !username || !password || !country || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Check if the user already exists by email or username
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("id")
      .or(`email.eq.${email},username.eq.${username}`)
      .maybeSingle(); 

    if (fetchError) {
      console.error("Error checking for existing user:", fetchError);
      return res.status(500).json({ message: "Error checking for existing user" });
    }

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Log before inserting
    console.log("Inserting new user data:", {
      fullname,
      email,
      username,
      country,
      phone,
      password: hashedPassword,
    });

    // Insert the new user
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          fullname,
          email,
          username,
          country,
          phone,
          password: hashedPassword,
        },
      ])
      .select("id")
      .single();

    if (insertError) {
      console.error("Error inserting new user:", insertError);
      return res.status(500).json({ message: "Error inserting new user" });
    }

    console.log("New user created with ID:", newUser.id);

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
