#!/usr/bin/env node

import path from 'node:path'
import cache from './cache.js'

async function hookCleanBeforeWriteFile(args: string[]) {
    const { get, write } = cache();
    const [, , , ...paths] = args
    const dirs = [
        ...new Set(
            paths.map((p) => path.relative('./', path.resolve(p, '..')))
        ),
    ]
    const data = await get();

    if (data.toString() === dirs.toString()) {
        return;
    }

    await write(dirs);
}

export default hookCleanBeforeWriteFile(process.argv)
