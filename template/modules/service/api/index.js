import {Repository} from './repository'
import {VERSION, DEEPEXI_CLOUD, DEEPEXI_CLOUD_TENANT} from './serviceList'

export const login = new Repository(`/${DEEPEXI_CLOUD}/${VERSION}/login`)

export const userInfo = new Repository(`/${DEEPEXI_CLOUD}/${VERSION}/token`)

export const menus = new Repository(`/${DEEPEXI_CLOUD_TENANT}/${VERSION}/menus`)
