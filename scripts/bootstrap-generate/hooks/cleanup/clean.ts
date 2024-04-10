#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

import cache from './cache.js'

import type { Types } from '@graphql-codegen/plugin-helpers'

export default (async () => {
    const { clean, isExists } = cache()

    if (isExists()) {
        clean()
        return
    }
    
    const context = await (await import('@graphql-codegen/cli')).loadContext();
    const { generates } = context.getConfig();    
    
    const nearOperationFile = Object.entries(generates).filter(
        ([, config]) => !Array.isArray(config) && config.preset === 'near-operation-file-preset'
        )[0] as [string, Types.ConfiguredOutput];
        
    if (nearOperationFile) {
        const { walkSync } = await import('./walk.js')
        const [src, { presetConfig }] = nearOperationFile
        walkSync(src, async (_path) => {
            if (path.basename(_path).includes(presetConfig!.extension)) {
                const dir = path.dirname(path.resolve(_path))
                await fs.promises.rm(dir, { recursive: true })
            }
        })
    }
})()
