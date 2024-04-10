import fs from 'node:fs'
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const cacheDirsPath = `${__dirname}/cacheDirs.json`

const cache = () => {
    const isExists = () => fs.existsSync(cacheDirsPath);
    const write = async (dirs: string[]) => {
        try {
            await fs.promises.writeFile(
                cacheDirsPath,
                JSON.stringify(dirs, null, 2),
                'utf8'
            )
            console.log('Write path cacheDirs.json success')
        } catch (e) {
            console.log('Write path cacheDirs.json failed', e)
        }
    }
    const clean = async () => { 
            try {
                const dirs = JSON.parse(
                    await fs.promises.readFile(cacheDirsPath, 'utf8')
                )
                for await (const dir of dirs) {
                    if (fs.existsSync(dir)) {
                        await fs.promises.rmdir(dir, { recursive: true })
                    }
                    console.log('Clean dirs success')
                }
            } catch (e) {
                console.error('Parse cacheDirs.json failed', e)
            }
            return
    }
    const get = async () => {
        if (isExists()) {
            const cache = await fs.promises.readFile(cacheDirsPath, 'utf-8')
            return JSON.parse(cache);
        }
        return [];
    }
    

    return {
        get,
        write,
        clean,
        isExists,
    }
}

export default cache;