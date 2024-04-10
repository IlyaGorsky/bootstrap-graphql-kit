import fs from 'node:fs'
import path from 'node:path'

export function walkSync(
    currentDirPath: string,
    callback: (filePath: string, stat: fs.Stats) => void
) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        const filePath = path.join(currentDirPath, name)
        const stat = fs.statSync(filePath)
        if (stat.isFile()) {
            callback(filePath, stat)
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback)
        }
    })
}
