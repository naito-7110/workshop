const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const rootDir = '.'
const outputDir = 'slides'

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}

// ルートディレクトリのフォルダ一覧取得
const entries = fs.readdirSync(rootDir)

for (const entry of entries) {
  const folderPath = path.join(rootDir, entry)
  if (fs.statSync(folderPath).isDirectory()) {
    const folderMatch = entry.match(/^(\d+)\./)
    if (!folderMatch) continue
    const folderNumber = folderMatch[1]

    // そのフォルダ内のファイル一覧
    const files = fs.readdirSync(folderPath)

    for (const file of files) {
      const fileMatch = file.match(/^(.+)\.slide\.md$/)
      if (fileMatch) {
        // ファイルのフルパス
        const slidePath = path.join(folderPath, file)
        const slideTitle = fileMatch[1].replace(/\s+/g, '_')

        // PDFファイル名にフォルダの番号を使うので、フォルダ番号 + スライドタイトルで出力
        const slidePdf = path.join(outputDir, `${folderNumber}_${slideTitle}.pdf`)

        execSync(`npx marp "${slidePath}" --pdf --output "${slidePdf}"`, { stdio: 'inherit' })
      }
    }
  }
}

// PDF一覧用の index.html 自動生成
const pdfFiles = fs.readdirSync(outputDir).filter(f => f.endsWith('.pdf'))

const htmlContent = `
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8" />
<title>Slides Index</title>
</head>
<body>
<h1>登壇スライド</h1>
<ul>
${pdfFiles.map(f => `<li><a href="./${f}">${f}</a></li>`).join('\n')}
</ul>
</body>
</html>
`

fs.writeFileSync(path.join(outputDir, 'index.html'), htmlContent)
