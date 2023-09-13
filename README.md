# 完成品
![](./sketch/complete.png)

# 使用技術、ライブラリ及びその他ツール
- React
- TypeScript
- TailwindCSS
- prettier
- ESlint
- zustand
- react-query
## 選定理由
- 元々、Next.js(TypeScript)で課題作成を行おうと思っていましたが、今回の課題はSPAだったので、React(TypeScript)で行いました。

# レートリミッターについて
- 今回バックエンド側でレート制限がされていないと考えれられます（もしかしたら今回の課題のメインテーマ？）。そのため、webサーバの過負荷対策が行われていないので、その場合のフロントエンド側のベストプラクティスとしては、APIのcacheを行うことだと考えました。
なので、react-queryを用いてcache化を行いました。
```
  return useQuery<ContentType[], Error>({
    queryKey: ['contents'],
    queryFn: getContents,
    staleTime: Infinity,
  })
```
また、Next.jsの場合はSWRを用いて、cache化を行うこともできます。

## では、レートリミッターを置くとしたらどこにおくか？
2点あると思います。

- middlewareとして置く
  
![](./sketch/画面(middle).png)

- backend側で実装する
  
![](./sketch/画面(back).png)

[draw.ioで作成]

## バックエンド（Nest.js）でのレートリミッター実装方法について
nest.jsではシンプルな記述でレートリミッターを設けることができる。
```
$ npm i --save @nestjs/throttler
```
```
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,// 仮
      limit: 10,// 仮
    }),
  ],
})
export class AppModule {}
```

# 開発ログ
- 2023/09/09
  全体の仕様の理解、技術選定
  ....1h
- 2023/09/11
  swaggerやpostmanを使用し、apiの確認、
  及び実装
  ....3h
- 2023/09/12
  機能実装
  ....2h
- 2023/09/13
  レイアウト調整及びドキュメント作成
  ....1h
<!-- - 2023/09/14
  リファクタリング及びドキュメント調整
  ....1h -->
  <!-- 合計　8h -->

