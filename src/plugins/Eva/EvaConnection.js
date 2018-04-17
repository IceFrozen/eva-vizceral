/*
  EvaRgion 对象

*/

import EventEmitter from 'events'
// import EvaDataNode  from "./EvaDataNode"
import EvaNotices  from "./EvaNotices"
import _ from 'lodash'

class EvaConnection extends EventEmitter {
  constructor (source,target,metadata) {
    super();
    this.source = source
    this.target =  target
    this.metrics = metadata?metadata:{}
    this._tag = []          // 链接标签类
    this.notices = []
    this.id = source + '-' + target
  }
  getId () {
    return this.id
  }
  createNotices (title,severity,link) {
    let evaNotice = new EvaNotices(title,severity,link)
    this.notices.push(evaNotice)
    this.emit("modify","createNotices",this,evaNotice)
    return this
  }
  showNotices () {
    // 显示问题
    
  }
  clearNotics () {
    // TODO remove all listen
    this.notices = []
    this.notices.every( n => n.removeAllListeners())
    this.emit("modify","clearNotics",this)
    return this
  }
  getNotices () {
    return this.notices
  }
  getFormatData () {
    let notices = this.notices.map(m => m.getFormatData())
    return {
      source:this.source,
      target:this.target,
      metrics:this.metrics,
      notices:notices
    }
  }
  setHightLight() {
    return this
  }
  setDetail (key,value) {
    value = _.toNumber(value)
    if(!_.isNumber(value)) {
      throw new Error("value must be number tyle")
    }
    // TODO 验证
    this.metrics[key] = value
    this.emit("modify","setDetail",this,key,value)
    return this
  }
  setDetails (metrics) {
    for(let key in metrics) {
      this.setDetail(key,metrics[key])
    }
    return this
  }
}

export default EvaConnection;
