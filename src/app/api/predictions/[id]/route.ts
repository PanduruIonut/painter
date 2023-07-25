import { NextResponse } from "next/server";

export async function GET(req, res) {
    const id = req.url.match(/\/predictions\/(.+)/)[1]

    const response = await fetch(
        "https://api.replicate.com/v1/predictions/" + id,
        {
            headers: {
                Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
                "Content-Type": "application/json",
            },
        }
    );
    if (response.status !== 200) {
        let error = await response.json();
        res.statusCode = 500;
        return NextResponse.json(error.detail, { status: 500 });
    }

    const prediction = await response.json();
    return NextResponse.json(prediction, { status: 200 });
}