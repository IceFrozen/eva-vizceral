import EvaNotices from './EvaNotices';
import EventEmitter from 'events';
import _ from 'lodash';
/**
  EvaConnection
   * @constructor
   * @param {string} source 源节点name
   * @param {string} target 目的节点name
   * @param {object} metadata 私有数据
*/
class EvaConnection extends EventEmitter {

  constructor (source, target, metadata={}) {
    super();
    this.source = source;
    this.target = target;
    this.metrics = metadata || {};
    this.class = "normal"
    this._tag = [];          // 链接标签类
    this.notices = [];
    this.id = `${source}-${target}`;
    this.region = undefined
  }
  getId () {
    return this.id;
  }
  /**
   * 创建通知 可创建多个
   *
   * @param {string} title 通知名称
   * @param {number} severity 通知级别 支持 0 1 2 3 >3则不显示图标
   * @param {string} link 通知是否可以链接
   * @return {EvaConnection}
   */
  createNotices (title, severity, link) {
    const evaNotice = new EvaNotices(title, severity, link);
    this.notices.push(evaNotice);
    this.emit('modify', 'createNotices', this, evaNotice);
    return this;
  }
  showNotices () {
  }
  /**
   * 清空全部通知
   */
  clearNotics () {
    // TODO remove all listen
    this.notices = [];
    this.notices.every(n => n.removeAllListeners());
    this.emit('modify', 'clearNotics', this);
    return this;
  }
  getNotices () {
    return this.notices;
  }
  getFormatData () {
    const notices = this.notices.map(m => m.getFormatData());
    return {
      source: this.source,
      target: this.target,
      metrics: this.metrics,
      notices: notices,
      class:this.class,
      region:this.region
    };
  }
  setHightLight () {
    return this;
  }
  setRegionData (regionData) {
    this.region = regionData
    this.class = "region"
  }
  setDetail (key, value) {
    value = _.toNumber(value);
    if (!_.isNumber(value)) {
      throw new Error('value must be number tyle');
    }
    // TODO 验证
    this.metrics[key] = value;
    this.emit('modify', 'setDetail', this, key, value);
    return this;
  }
  setDetails (metrics) {
    for (const key in metrics) {
      this.setDetail(key, metrics[key]);
    }
    return this;
  }
}

export default EvaConnection;
