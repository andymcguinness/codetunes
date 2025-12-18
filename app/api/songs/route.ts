import { executeQuery } from "@datocms/cda-client";

export async function POST(request : Request) {
  const { title } = await request.json();

  const query = `query MyQuery {
    playlist(filter: {title: {eq: "${title}"}}) {
      title
      coverImage {
        blurhash
        customData
        url
      }
      description
      genre
      songs {
        artist
        attribution
        title
        song {
          url
        }
      }
    }
  }`;

  const data: any = await executeQuery(query, {
    token: `${process.env.DATOCMS_API_KEY}`,
    variables: {
      limit: 10
    }
  });
 
  return Response.json({ data })
}