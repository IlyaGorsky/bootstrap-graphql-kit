import type { RawClientSideBasePluginConfig } from '@graphql-codegen/visitor-plugin-common';

export interface BootStrapRawConfig extends RawClientSideBasePluginConfig {
    /**
     * import fetchFnName import '../somePath'
     * @string
     * 
     * import { fetchFnName } import '../somePath'
     * { keyImport: path }
     * @object
     */
    fetcherImport: string;
}