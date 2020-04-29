/**
 * 测试
 * @author Philip
 */
import React, { PureComponent } from 'react'

export default class Test extends PureComponent {
    render () {
        console.log(' ======= >')
        return <p>{this.props.a.b}</p>
    }
}
