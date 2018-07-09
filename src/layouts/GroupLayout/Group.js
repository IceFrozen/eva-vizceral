/**
 *
 */
import _ from 'lodash';

class Group {
    constructor (groupId,startPoinx,width,height,offset) {
      this.groupId = groupId
      this.groupSplitIndex = 0      //分组在屏幕是上的位置
      this.groupSplitIn = 0       //每个分组中从上到下 第几个
      this.startPoinx = startPoinx
      this.height  = height
      this.width = width
      this.nodes = []
      this.offset = offset
      this.connections = []
    }

    getGroupId () {
      return this.groupId
    }

    getNodeByName (name) {
      return this.nodes.find((node)=>node.name === name)
    } 

    getStartPoint() {
      return this.startPoinx
    }

    getWidth () {
      return this.width
    }

    getHeight() {
      return this.height
    }
    
    setNodes (nodes) {
      for(let i =0 ;i < nodes.length; i++){
        this.nodes.push(nodes[i])
      }
      return this
    }
    setGroupIndex (chunkIndex,groupIndex) {
      this.groupSplitIndex = chunkIndex
      this.groupSplitIn = groupIndex
      return this
    }
    setConnections (connections) {
      for(let i =0 ;i < connections.length; i++){
        this.connections.push(connections[i])
      }
      return this
    }
    /*
      找出相关联的链接
    */
    getRelativeConnection () {
      return this.connections.filter((connection)=> {
                let targetName = connection.target.name
                let sourceName = connection.source.name
                const node = this.nodes.find((node)=> {
                return targetName == node.name || sourceName == node.name
              })
              return !!node
            })
    }
    // 获得单节点
    getSingleNodes () {
      return  this.nodes.filter((node)=>!node.connected)
    }
    // 找到进入节点 (废弃 如果有环 则该方法不能用)
    getEntryNodes () {
      const relativeConn = this.getRelativeConnection()
      return this.nodes.filter((node)=>{
          if(!node.connected) {
            return false
          }
          return !!!relativeConn.find((conn)=>conn.target.name == node.name)
      })
    }
    /**
        获取位置

    */
    getPositions () {
      //判断长度
      const nodeMap = {}
      const rankLinks = this.getRankLinkLevel()
      const withdLength = Math.max(this.getHeight(),this.getWidth())
      let stepLength_w = withdLength / rankLinks.length
      let heightLength = Math.min(this.getHeight(),this.getWidth())
      const offset = 200
      for(let i = 0 ; i < rankLinks.length;i++) {
        const ranklink = rankLinks[i]
        let stepLength_h = heightLength / ranklink.length
        let offsetY = 0
        if(i > 0 && rankLinks[i].length == rankLinks[i-1].length){
          offsetY = stepLength_h/3 
        }
        for(let j = 0 ; j < ranklink.length;j++) {
          const node = ranklink[j]
          if(i%2 ==0) {
            offsetY = -offsetY
          }
          const position = {x:0,y:0}
          if(this.getWidth() > this.getHeight()){
            position.x = (this.getStartPoint().x + stepLength_w * i) + stepLength_w/2
            position.y = this.getStartPoint().y - ((stepLength_h * (j + 1)) - stepLength_h/2) + offsetY
            if(position.y > this.getStartPoint().y) {
              position.y  = this.getStartPoint().y -  60
            }
          }else{
            position.y = (this.getStartPoint().y - stepLength_w * i) - stepLength_w/2
            position.x = this.getStartPoint().x + ((stepLength_h * (j + 1) - stepLength_h/2)) + offsetY
            if(position.y > this.getStartPoint().y) {
              position.y  = this.getStartPoint().y -  60
            }
          }
          nodeMap[node.name] = position
        }
      }
      return nodeMap
    }
    getRankLinkLevel () {
      let resultFinal = []
      const dfs = (nodename,top) =>{
        if(!top) {
          top = [nodename]
        }
        let connections = this.getRelativeConnection()
        let result = connections
            .filter((conn)=>conn.source.name == nodename)
            .map((conn)=>conn.target.name)
            .filter((name)=>top.indexOf(name)<0)
        
        for(let i = 0;i< result.length;i++) {
          let resultTop = _.cloneDeep(top)
          if(resultTop.indexOf(result[i]) >= 0) {
            continue;
          }
          resultTop.push(result[i])
          dfs(result[i],resultTop)
        }
        if(result.length === 0) {
          resultFinal.push(top)
        }
      }
      _.each(this.nodes, node=> dfs(node.name));
      resultFinal.sort(function (item1,item2) {
        return item1.length<item2.length
      })
      for(let i = 0 ; i < resultFinal.length;i++) {
        const nodenames = resultFinal[i]
        for(let j = 0 ; j < nodenames.length;j++) {
          const nodename = nodenames[j]
          const node = this.getNodeByName(nodename)
          if(!node) continue;
          if(node.rank === undefined) {
              node.rank = 0
          }
          if(node.rank < j+1) {
            node.rank = (j+1)
          }
        }
      }

     const rankLinks = []
      _.forEach(this.nodes,node => {
          const index = node.rank - 1
          if(!_.isArray(rankLinks[index])){
            rankLinks[index] = []
          }
          rankLinks[index].push(node)
      })
      return _.compact(rankLinks)
    }
    /**
      重新平均分配节点
    */
    sortNodes () {}
    layoutPosition () {
      const positions = this.getPositions()
      this.nodes
      .filter(node=>positions[node.name])
      .forEach((node)=>{
        node.filtered = false  //确保未连接点 显示
        node.updatePosition(positions[node.name])
      })

    }
    /*
      最后调整
    */
    adjust () {}
}

export default Group;
