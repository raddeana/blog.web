import React from 'react'
import Loadable from 'react-loadable'

// 通用的过场组件
function loadingComponent () {
    return <div>loading</div>
}

export default function (loader, loading = loadingComponent) {
    return Loadable({
        loader,
        loading
    });
}