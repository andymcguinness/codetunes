import { executeQuery } from "@datocms/cda-client";

export async function GET() {
  const query =  `{
    allPlaylists {
      coverImage {
        blurhash
        customData
        url
      }
      songs {
        artist
        attribution
        song {
          url
        }
        title
      }
      description
      genre
      title
    }
  }`;

  const data : any = await executeQuery(query, {
    token: `${process.env.DATOCMS_API_KEY}`,
    variables: {
      limit: 10
    }
  });
 
  return Response.json({ data })
}