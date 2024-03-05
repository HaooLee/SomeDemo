const fs = require('node:fs');
const config = require('./ivf/assets/config.json');
const chapterInfo = [
  {
    chapterId: 0,
    chapterName: '序章',
    startVideoName: '10000.mp4',
  },
  {
    chapterId: 1,
    chapterName: '第一章',
    startVideoName: '10101.mp4',
  }, {
    chapterId: 2,
    chapterName: '第二章',
    startVideoName: '10201.mp4',
  }, {
    chapterId: 3,
    chapterName: '第三章',
    startVideoName: '10301.mp4',
  }, {
    chapterId: 4,
    chapterName: '第四章',
    startVideoName: '10401.mp4',
  }, {
    chapterId: 5,
    chapterName: '第五章',
    startVideoName: '10501.mp4',
  }, {
    chapterId: 6,
    chapterName: '第六章',
    startVideoName: '10601_1.mp4',
  }, {
    chapterId: 7,
    chapterName: '第七章',
    startVideoName: '10607.mp4',
  },
  {
    chapterId: 8,
    chapterName: '第八章',
    startVideoName: '10801.mp4',
  }, {
    chapterId: 9,
    chapterName: '第九章',
    startVideoName: '10902_03.mp4',
  }, {
    chapterId: 10,
    chapterName: '第十章',
    startVideoName: '11001.mp4',
  }
];


const {resource, scene} = config;
const startScene = scene.find(i => i.sceneID === "global");
const startVideoId = startScene.action.preload?.params.preloads[0];
// const original = resource.video[startVideoId].original
const branches = [];

getFlowConfig(21421);
// getFlowConfig(startVideoId)


function getOriginalNameByVid(vid) {
  return resource.video[vid].original;
}

function getFlowConfig(startVideoId) {
  if (branches.findIndex(i => i.vid === startVideoId) !== -1) {
    return;
  }
  const currentScene = scene.find(i => i.vvids.includes(startVideoId));
  const nextVideos = currentScene.action.preload?.params.preloads;

  branches.push({
    id: getOriginalNameByVid(startVideoId),
    vid: startVideoId,
    // sceneId: currentScene.sceneID,
    next: (nextVideos || []).map(i => ({
      id: getOriginalNameByVid(i),
      // vid: i
    }))
  });

  if (nextVideos) {
    nextVideos.forEach((vid) => {
      getFlowConfig(vid);
    });
  }
}

// 把branches里id重复项的next合并 并把next里id与当前branch id相同的删除
for (let i = 0; i < branches.length; i++) {
  const branch = branches[i];
  const idx = branches.findLastIndex(i => i.id === branch.id);
  if (idx !== i) {
    branch.next = [...branches[idx].next, ...branch.next];
    branches.splice(idx, 1);
    i--;
  }
  branch.next = branch.next.filter(i => i.id !== branch.id);
}

const chapterData = {};
chapterInfo.forEach((chapter) => {
  chapterData[chapter.chapterId] = {nodes: [], edges: []};
  dfs(
    chapter.startVideoName,
    // 传入每一个章节的起始视频名数组 作为停止节点 因为有可能某个章节结尾接的是两个不同章节 例如 8==>9 8==>10
    chapterInfo.filter(i => i.startVideoName !== chapter.startVideoName).map(i => i.startVideoName),
    chapterData[chapter.chapterId]);
});

function dfs(nodeId, stopIds, out) {
  const startNode = branches.find((i) => i.id === nodeId);
  if (!startNode.visited && startNode.next) {
    out.nodes.push({
      id: nodeId,
      label: nodeId
    });
    // 如果下一个节点存在停止节点 则不再递归
    if (startNode.next.some(i => stopIds.includes(i.id))) {
      return;
    }
    startNode.next.forEach((next) => {
      out.edges.push({
        source: nodeId,
        target: next.id
      });
    });
    startNode.visited = true;
    startNode.next.forEach((next) => {
      dfs(next.id, stopIds, out);
    });
  }
}


fs.writeFileSync('./chapterData.json', JSON.stringify(chapterData, null, 4));
fs.writeFileSync('./flow.json', JSON.stringify(branches, null, 4));
// fs.writeFileSync('./data.json', JSON.stringify(data, null, 4))


// test代码
// const obj = {}
// branches.forEach((branch)=>{
//   if(!obj[branch.id]){
//     obj[branch.id] = [branch]
//   }else {
//     obj[branch.id].push(branch)
//   }
// })
// Object.values(obj).forEach((branch)=>{
//   if(branch.length > 1){
//     console.log(branch)
//   }
// })

