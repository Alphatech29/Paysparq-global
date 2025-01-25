const bcrypt = require("bcryptjs");
const supabase = require("../../models/supaBase/supaBaseClient");
const validator = require("validator");

const signUp = async (req, res) => {
  try {
    const { fullname, email, username, password, country, phone_number } = req.body;

    // Validate inputs
    if (!fullname || !email || !username || !password || !country || !phone_number) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Check for duplicates (email, username, phone_number)
    const { data: existingUser, error: fetchError } = await supabase
      .from("p_users")
      .select("uid")  
      .or(`email.eq.${email},username.eq.${username},phone_number.eq.${phone_number}`)
      .maybeSingle();

    if (fetchError) {
      console.error("Error checking for existing user:", fetchError);
      return res.status(500).json({ message: "Error checking for existing user" });
    }

    if (existingUser) {
      return res.status(409).json({ message: "User with provided details already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    console.log(newUser);
    const { data: newUser, error: insertError } = await supabase
      .from("p_users")
      .insert([
        {
          fullname,
          email,
          username,
          country,
          phone_number,
          password: hashedPassword,
        },
      ])
      .select("uid")
      .single();

    if (insertError) {
      console.error("Error inserting new user:", insertError);
      return res.status(500).json({ message: "Error inserting new user" });
    }

    // Respond to the client
    res.status(201).json({
      message: "User created successfully",
      userId: newUser.uid,  
    });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = signUp;
