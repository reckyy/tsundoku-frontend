import { Metadata } from 'next';
import UserPageContent from '@/components/pageContent/UserPageContent';
import { axiosInstance } from '@/lib/axios';
import { auth } from '@/auth';

type Props = {
  params: { id: string };
};

async function fetchUserData(id: string) {
  try {
    const res = await axiosInstance.get(`/users/${id}`);
    return res.data;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  const data = await fetchUserData(id);

  if (!data) {
    return {
      title: 'ユーザーが見つかりません | Tsundoku',
      description: '指定されたユーザーは存在しません。',
    };
  }

  const userName = data.name;
  const description = `${userName}の読書記録ページです。`;

  return {
    title: `${userName}のページ | Tsundoku`,
    description,
    openGraph: {
      title: `${userName}のページ | Tsundoku`,
      description,
      url: `https://tsundoku.tech/users/${id}`,
      images: [
        {
          url: 'https://tsundoku.tech/ogp.png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${userName}のページ | Tsundoku`,
      description,
      images: [
        {
          url: 'https://tsundoku.tech/ogp.png',
        },
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = params;

  const userData = await fetchUserData(id);
  const session = await auth();
  const isCurrentUser = String(session?.user?.id) === id;

  if (!userData) {
    return <>ユーザーが見つかりませんでした。</>;
  }

  return (
    <UserPageContent
      userData={userData}
      id={id}
      isCurrentUser={isCurrentUser}
    />
  );
}
