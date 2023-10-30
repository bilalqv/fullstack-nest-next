import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse(
            JSON.stringify({ error: "Unauthorized", status: 'fail', message: 'Unauthorized' }),
            { status: 401 }
        )
    }

    return NextResponse.json({
        authenticated: !!session,
        session,
    });
}