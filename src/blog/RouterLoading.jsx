/**
 * 路由加载提示
 * @author Philip
 */
import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import './RouterLoading.less'

function RouterLoading () {
    // componentDidMount && componentDidUpdate
    useEffect(() => {
        console.log(' first load ')
    })

    return '正在加载'
}

export default withRouter(RouterLoading)
