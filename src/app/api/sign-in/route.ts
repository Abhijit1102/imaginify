// pages/api/sign-in.ts
import { connectToDatabase } from "@/lib/database/moongoose";
import User from "@/lib/database/models/user.model";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    await connectToDatabase();
    try {
        const { email, password } = await request.json();

        const user = await User.findOne({ email });
        if (!user) {
            return new Response(JSON.stringify({
                success: false,
                message: "User not found"
            }), { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new Response(JSON.stringify({
                success: false,
                message: "Invalid credentials"
            }), { status: 401 });
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Login successful",
            user: { username: user.username, email: user.email }
        }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({
            success: false,
            message: "Error signing in. Please try again."
        }), { status: 500 });
    }
}
