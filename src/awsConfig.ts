import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
      credentials: {
        accessKeyId: "y55a478fd7a840911ae3a69f9fcab98da",
        secretAccessKey:
          "092e1916864bec5688db30c7a0ae51650ae54f6e4339b922da6f0bed9b6ceb98"
      },
      endpoint: "https://lxvierdlpaxfozxgpnre.supabase.co/storage/v1/s3",
      region: "ap-southeast-1",
      forcePathStyle: true
    });
    