import EventEmitter from 'events';
import EvaConnection from './EvaConnection';

class EvaNotices extends EventEmitter {
  constructor (title, severity, link) {
    super();
    this.title = title;
    this.severity = severity;
    this.link = link;
  }
  setBeloginConnection (connection) {
    if (!(connection instanceof EvaConnection)) {
      throw new Error('the connection must EvaConnection class ');
    }
    this.connection = connection;
  }

  getFormatData () {
    return {
      title: this.title,
      severity: this.severity,
      link: this.link
    };
  }
}

export default EvaNotices;
