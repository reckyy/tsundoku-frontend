import {
  Title,
  Divider,
  Space,
  Anchor,
  Container,
  Text,
  List,
  ListItem,
} from '@mantine/core';

export default function Privacy() {
  return (
    <Container my="md">
      <Title size={'h2'} ta={'center'}>
        <Text inherit>プライバシーポリシー</Text>
      </Title>
      <Space h={20} />
      <Text>
        Tsundoku（以下、「当方」といいます。）は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）におけるユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
      </Text>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>お客様から取得する情報</Text>
      </Title>
      <Divider my={'sm'} />
      <Text>当方は、お客様から以下の情報を取得します。</Text>
      <List withPadding>
        <ListItem>氏名(ニックネームやペンネームも含む)</ListItem>
        <ListItem>メールアドレス</ListItem>
        <ListItem>写真や動画</ListItem>
        <ListItem>
          外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報
        </ListItem>
        <ListItem>Cookie(クッキー)を用いて生成された識別情報</ListItem>
        <ListItem>
          OSが生成するID、端末の種類、端末識別子等のOSや端末に関する情報
        </ListItem>
        <ListItem>
          本サービスの滞在時間、入力履歴、購買履歴等の本サービスにおけるお客様の行動履歴
        </ListItem>
        <ListItem>
          本サービスの起動時間、入力履歴、購買履歴等の本サービスの利用履歴
        </ListItem>
      </List>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>お客様の情報を利用する目的</Text>
      </Title>
      <Divider my={'sm'} />
      <Text>
        当方は、お客様から取得した情報を、以下の目的のために利用します。
      </Text>
      <List withPadding>
        <ListItem>
          本サービスに関する登録の受付、お客様の本人確認、認証のため
        </ListItem>
        <ListItem>お客様の本サービスの利用履歴を管理するため</ListItem>
        <ListItem>
          本サービスにおけるお客様の行動履歴を分析し、本サービスの維持改善に役立てるため
        </ListItem>
        <ListItem>本サービスに関するご案内をするため</ListItem>
        <ListItem>お客様からのお問い合わせに対応するため</ListItem>
        <ListItem>当方の規約や法令に違反する行為に対応するため</ListItem>
        <ListItem>
          本サービスの変更、提供中止、終了、契約解除をご連絡するため
        </ListItem>
        <ListItem>当方規約の変更等を通知するため</ListItem>
        <ListItem>
          以上の他、本サービスの提供、維持、保護及び改善のため
        </ListItem>
      </List>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>安全管理のために講じた措置</Text>
      </Title>
      <Divider my={'sm'} />
      <Text>
        当方が、お客様から取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡をいただきましたら、法令の定めに従い個別にご回答させていただきます。
      </Text>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>第三者提供</Text>
      </Title>
      <Divider my={'sm'} />
      <Text>
        当方は、お客様から取得する情報のうち、個人データ（個人情報保護法第２条第６項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。
        但し、次の場合は除きます。
      </Text>
      <List withPadding>
        <ListItem>個人データの取扱いを外部に委託する場合</ListItem>
        <ListItem>当方や本サービスが買収された場合</ListItem>
        <ListItem>
          事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
        </ListItem>
        <ListItem>
          その他、法律によって合法的に第三者提供が許されている場合
        </ListItem>
      </List>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>アクセス解析ツール</Text>
      </Title>
      <Divider my={'sm'} />
      <Text>
        当方は、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくは
        <Anchor
          href="https://marketingplatform.google.com/about/analytics/terms/jp/"
          target="_blank"
          rel="noreferrer"
        >
          こちら
        </Anchor>
        からご確認ください。
      </Text>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>プライバシーポリシーの変更</Text>
      </Title>
      <Divider my={'sm'} />
      <Text>
        当方は、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
      </Text>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>お問い合わせ</Text>
      </Title>
      <Divider my={'sm'} />
      <Text>
        お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、以下のお問い合わせフォームにご連絡ください。
      </Text>
      <Text>
        <Anchor href="https://forms.gle/1eFj51KwQCQLR6vd8">
          お問い合わせフォーム
        </Anchor>
      </Text>
      <Space h={20} />
      <Text>以上</Text>
      <Text>2024年7月12日制定</Text>
    </Container>
  );
}
