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
- 今回バックエンド側でレート制限がされていないと考えれられます。そのため、webサーバの過負荷対策が行われていないので、その場合のフロントエンド側のベストプラクティスとしては、APIのcacheを行うことだと考えました。
なので、react-queryを用いてcache化を行いました。
```
  return useQuery<ContentType[], Error>({
    queryKey: ['contents'],
    queryFn: getContents,
    staleTime: Infinity,
    onError: (err : any) => {
        if (err.response.data.message) {
            console.log(err.response.data.message)
          } else {
            console.log(err.response.data)
          }
    }
  })
```
また、Next.jsの場合はSWRを用いて、cache化を行うこともできます。

## では、レートリミッターをどこにおくか？
2点あると思います。

- middlewareとして置く
  
![](./sketch/画面(middle).png)

- backend側で実装する
  
![](./sketch/画面(back).png)

[draw.ioで作成]

## バックエンド（Nest.js）でのレートリミッター実装方法について
シンプルな記述でレートリミッターを設けることができる。
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