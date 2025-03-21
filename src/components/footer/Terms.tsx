import {
  Title,
  Divider,
  Space,
  Container,
  Text,
  List,
  ListItem,
} from '@mantine/core';
import Link from 'next/link';

export default function Terms() {
  return (
    <Container my="md">
      <Title size={'h2'} ta={'center'}>
        <Text inherit>利用規約</Text>
      </Title>
      <Space h={20} />
      <Text>
        この利用規約（以下、「本規約」といいます。）は、Tsundokuの管理者（以下、「当方」といいます。）がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
      </Text>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>第1条（適用）</Text>
      </Title>
      <Divider my={'sm'} />
      <List type="ordered">
        <ListItem>
          本規約は、ユーザーと当方との間の本サービスの利用に関わる一切の関係に適用されるものとします。
        </ListItem>
        <ListItem>
          当方は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
        </ListItem>
        <ListItem>
          本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。
        </ListItem>
      </List>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>第2条（利用登録）</Text>
      </Title>
      <Divider my={'sm'} />
      <List type="ordered">
        <ListItem>
          本サービスにおいては、登録希望者が本規約に同意の上、当方の定める方法によって利用登録を申請し、当方がこれを承認することによって、利用登録が完了するものとします。
        </ListItem>
        <ListItem>
          当方は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
          <List type="ordered">
            <ListItem>利用登録の申請に際して虚偽の事項を届け出た場合</ListItem>
            <ListItem>
              本規約に違反したことがある者からの申請である場合
            </ListItem>
            <ListItem>
              その他、当方が利用登録を相当でないと判断した場合
            </ListItem>
          </List>
        </ListItem>
      </List>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>第3条（ユーザーIDおよびパスワードの管理）</Text>
      </Title>
      <Divider my={'sm'} />
      <List type="ordered">
        <ListItem>
          ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
        </ListItem>
        <ListItem>
          ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。当方は、ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのユーザーIDを登録しているユーザー自身による利用とみなします。
        </ListItem>
        <ListItem>
          ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は、当方に故意又は重大な過失がある場合を除き、当方は一切の責任を負わないものとします。
        </ListItem>
      </List>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>第4条（禁止事項）</Text>
      </Title>
      <Divider my={'sm'} />
      <Text>
        ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
      </Text>
      <List type="ordered">
        <ListItem>法令または公序良俗に違反する行為</ListItem>
        <ListItem>犯罪行為に関連する行為</ListItem>
        <ListItem>
          当方、本サービスの他のユーザー、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
        </ListItem>
        <ListItem>本サービスの運営を妨害するおそれのある行為</ListItem>
        <ListItem>
          他のユーザーに関する個人情報等を収集または蓄積する行為
        </ListItem>
        <ListItem>不正アクセスをし、またはこれを試みる行為</ListItem>
        <ListItem>他のユーザーに成りすます行為</ListItem>
        <ListItem>
          本サービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
        </ListItem>
        <ListItem>
          当方、本サービスの他のユーザーまたは第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為
        </ListItem>
        <ListItem>
          以下の表現を含み、または含むと当方が判断する内容を本サービス上に投稿し、または送信する行為
          <List type="ordered">
            <ListItem>過度に暴力的な表現</ListItem>
            <ListItem>露骨な性的表現</ListItem>
            <ListItem>
              人種、国籍、信条、性別、社会的身分、門地等による差別につながる表現
            </ListItem>
            <ListItem>
              自殺、自傷行為、薬物乱用を誘引または助長する表現
            </ListItem>
            <ListItem>
              その他反社会的な内容を含み他人に不快感を与える表現
            </ListItem>
          </List>
        </ListItem>
        <ListItem>宗教活動または宗教団体への勧誘行為</ListItem>
        <ListItem>その他、当方が不適切であると判断する行為</ListItem>
      </List>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>第5条（本サービスの提供の停止等）</Text>
      </Title>
      <Divider my={'sm'} />
      <List type="ordered">
        <ListItem>
          当方は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
          <List type="ordered">
            <ListItem>
              本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
            </ListItem>
            <ListItem>
              地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
            </ListItem>
            <ListItem>
              コンピュータまたは通信回線等が事故により停止した場合
            </ListItem>
            <ListItem>
              その他、当方が本サービスの提供が困難と判断した場合
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          当方は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
        </ListItem>
      </List>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>第6条（利用制限および登録抹消）</Text>
      </Title>
      <Divider my={'sm'} />
      <List type="ordered">
        <ListItem>
          当方は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。
          <List type="ordered">
            <ListItem>本規約のいずれかの条項に違反した場合</ListItem>
            <ListItem>登録事項に虚偽の事実があることが判明した場合</ListItem>
            <ListItem>当方からの連絡に対し、一定期間返答がない場合</ListItem>
            <ListItem>
              本サービスについて、最終の利用から一定期間利用がない場合
            </ListItem>
            <ListItem>
              その他、当方が本サービスの利用を適当でないと判断した場合
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          当方は、本条に基づき当方が行った行為によりユーザーに生じた損害について、一切の責任を負いません。
        </ListItem>
      </List>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>第7条（退会）</Text>
      </Title>
      <Divider my={'sm'} />
      <Text>
        ユーザーは、当方の定める退会手続により、本サービスから退会できるものとします。
      </Text>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>第8条（保証の否認および免責事項）</Text>
      </Title>
      <Divider my={'sm'} />
      <List type="ordered">
        <ListItem>
          当方は、本サービスに事実上または法律上の瑕疵(安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。)がないことを明示的にも黙示的にも保証しておりません。当方は、ユーザーに対して、かかる瑕疵を除去して本サービスを提供する義務を負いません。
        </ListItem>
        <ListItem>
          当方は、本サービスに起因してユーザーに生じたあらゆる損害について、当方の故意又は重過失による場合を除き、一切の責任を負いません。
        </ListItem>
        <ListItem>
          当方は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
        </ListItem>
      </List>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>第9条（サービス内容の変更等）</Text>
      </Title>
      <Divider my={'sm'} />
      <Text>
        当方は、ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。
      </Text>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>第10条（利用規約の変更）</Text>
      </Title>
      <Divider my={'sm'} />
      <List type="ordered">
        <ListItem>
          当方は以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。
          <List type="ordered">
            <ListItem>
              本規約の変更がユーザーの一般の利益に適合するとき
            </ListItem>
            <ListItem>
              本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          当方はユーザーに対し、前項による本規約の変更にあたり、事前に本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知します。
        </ListItem>
      </List>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>第11条（個人情報の取り扱い）</Text>
      </Title>
      <Divider my={'sm'} />
      <Text>
        当方は、本サービスの利用によって取得する個人情報については、
        <Link href={'/privacy'}>当方プライバシーポリシー</Link>
        に従い適切に取り扱うものとします。
      </Text>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>第12条（通知または連絡）</Text>
      </Title>
      <Divider my={'sm'} />
      <Text>
        ユーザーと当方との間の通知または連絡は，当方の定める方法によって行うものとします。当方は、ユーザーから、当方が別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザーへ到達したものとみなします。
      </Text>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>第13条（権利義務の譲渡の禁止）</Text>
      </Title>
      <Divider my={'sm'} />
      <Text>
        ユーザーは、当方の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
      </Text>
      <Space h={30} />
      <Title size={'h3'}>
        <Text inherit>第14条（準拠法・裁判管轄）</Text>
      </Title>
      <Divider my={'sm'} />
      <List type="ordered">
        <ListItem>本規約の解釈にあたっては、日本法を準拠法とします。</ListItem>
        <ListItem>
          本サービスに関して紛争が生じた場合には、当方の所在地を管轄する裁判所を専属的合意管轄とします。
        </ListItem>
      </List>
      <Space h={30} />
      <Text>以上</Text>
      <Text>2024年7月12日制定</Text>
    </Container>
  );
}
