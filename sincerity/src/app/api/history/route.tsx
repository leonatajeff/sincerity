import {
  DynamoDBClient,
  GetItemCommand
} from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id: string | null = searchParams.get('id')
  const { Item } = await client.send(
    new GetItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        userid: { S: id ?? '' }
      },
      ProjectionExpression: 'docs'
    })
  );

  return Response.json({ Item });
}