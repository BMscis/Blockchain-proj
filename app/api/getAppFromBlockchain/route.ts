'use server';
import getAppFromBlockChain, {
  MemberStates,
} from '@/app/service/getAppFromBlockchain';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  const appID: number | null = await request.json();
  if (!appID) {
    return NextResponse.json({
      error: 'Missing appID',
      status: 404,
    });
  }
  try {
    const memberStates: MemberStates = JSON.parse(
      await getAppFromBlockChain(appID)
    );
    return NextResponse.json(memberStates);
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 404,
    });
  }
}
