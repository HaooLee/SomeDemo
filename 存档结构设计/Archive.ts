type Route = {
  chapters?:Array<string>,
  majors?:Array<string>,
  blocks?:Array<string>
}

type Major = {
  id:string,
  path:Array<string>,
}

type Block = {
  id:string,
  lastRoute:Route,
}

type ChapterMap = {
  [chapterId:string]:Array<string>
}

type MajorMap = {
  [majorId:string]:Major
}

type BlockMap = {
  [blockId:string]:Array<Block>
}

type Path = Array<string>;

export class Archive {
  version: string;
  timestamp: number;
  checksum: string;
  currentNode: string;
  currentRoute: Route;
  chapterMap: ChapterMap;
  majorMap: MajorMap;
  blockMap: BlockMap;
}

export class ArchiveManager {
  archive: Archive;

  constructor(archive: Archive) {
    this.archive = archive;
  }

  static diffArchive(archive1: Archive, archive2: Archive): any {

  }

  getChapter(chapterId: string): Array<string> {
    return this.archive.chapterMap[chapterId];
  }

  getMajor(majorId: string): Major {
    return this.archive.majorMap[majorId];
  }

  getBlock(blockId: string): Array<Block> {
    return this.archive.blockMap[blockId];
  }

  hasBlock(blockId: string): boolean {
    return Object.hasOwn(this.archive.blockMap, blockId);
  }

  getRoute(route: Route): Path {
    let path: Path = [];
    if (route.chapters) {
      path = path.concat(route.chapters.map(chapterId => this.getChapter(chapterId).map(majorId => this.getMajor(majorId).path)).flat(Infinity) as string[]);
    }
    if (route.majors) {
      path = path.concat(route.majors.map(majorId => this.getMajor(majorId).path).flat(Infinity) as string[]);
    }
    if (route.blocks) {
      path = path.concat(route.blocks);
    }
    return path;
  }



}