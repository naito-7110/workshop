# フロントエンド開発に関して

## 環境構築

このプロジェクトは pnpm の 10.11.0 で動作しています。

```sh
$ npm install -g pnpm@10.11.0
```

## 使い方

pnpm-workspace と turbo を利用した monorepo 構成です。  
プロジェクト内のすべてを build する場合

```sh
$ pnpm build
```

それぞれを build する場合

```sh
$ cd <ビルド対象のディレクトリ>
$ cd pnpm build
```
