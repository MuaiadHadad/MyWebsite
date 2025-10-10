// app/api/presign/route.ts
import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const endpoint = process.env.MINIO_ENDPOINT!;
const bucket = process.env.MINIO_BUCKET!;
const region = process.env.MINIO_REGION || "us-east-1";
const forcePathStyle = (process.env.MINIO_FORCE_PATH_STYLE || "true") === "true";

const s3 = new S3Client({
    region,
    endpoint,
    forcePathStyle,
    credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY || "",
        secretAccessKey: process.env.MINIO_SECRET_KEY || "",
    },
});

export async function GET(req: NextRequest) {
    try {
        const key = req.nextUrl.searchParams.get("key");
        if (!key) {
            return NextResponse.json({ error: "missing key" }, { status: 400 });
        }

        // nomes com espaços/(), vírgulas, etc. — aceita “raw” ou encoded
        const objectKey = decodeURIComponent(key);

        const cmd = new GetObjectCommand({ Bucket: bucket, Key: objectKey });
        const url = await getSignedUrl(s3, cmd, { expiresIn: 60 * 60 }); // 1 hora

        return NextResponse.json({ url });
    } catch (err) {
        console.error("presign error:", err);
        return NextResponse.json({ error: "presign_failed" }, { status: 500 });
    }
}
