import classes from './HeaderTabs.module.css';
import { Affix } from '@mantine/core';
import UserMenu from './UserMenu';
import { auth } from '#auth';
import Image from 'next/image';
import { Container } from '@mantine/core';

export async function Header() {
  const session = await auth();

  return (
    <Affix position={{ top: 0, left: 0, right: 0 }}>
      <header className={classes.header}>
        <Container size="md" className={classes.inner}>
          <Image src="Mantine logo.svg" alt="仮のロゴ" width={28} height={28} />
          {/* 前半でuserが存在してるのは確認してるため、name!と非nullアサーションを使用してundefinedではないことを確定させてる */}
          {session?.user && (
            <UserMenu name={session.user.name!} image={session.user.image!} />
          )}
        </Container>
      </header>
    </Affix>
  );
}
