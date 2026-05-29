import { SignIn } from "@stackframe/stack";
import Link from "next/link";

export const dynamic = "force-dynamic";


export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 text-black [&_.text-center.mb-6_*]:!text-black">
        <div className="max-w-md w-full space-y-0">
            <SignIn />
            <Link href={"/"}>Go Back Home</Link>
        </div>
        </div>
    )
}
