import { connectToDatabase } from "@/lib/database/moongoose";
import User from "@/lib/database/models/user.model";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    await connectToDatabase();
    try {
        const { username, email, password } = await request.json();

        const existingUserVerifiedByUsername = await User.findOne({ username });
        if (existingUserVerifiedByUsername) {
            return new Response(JSON.stringify({
                success: false,
                message: "Username already exists",
            }), { status: 409 });
        }

        const existingUserVerifiedByEmail = await User.findOne({ email });
        if (existingUserVerifiedByEmail) {
            return new Response(JSON.stringify({
                success: false,
                message: "Email already exists",
            }), { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        return new Response(JSON.stringify({
            success: true,
            message: "User created successfully",
            user: newUser
        }), { status: 201 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({
            success: false,
            message: "Error signing up. Please try again.",
        }), { status: 500 });
    }
}
