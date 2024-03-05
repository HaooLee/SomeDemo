
const crypto = require("crypto");
const fs = require('fs')
const zh_cn = {
    SCENE:{
      KITCHEN:"厨房",
      LOBBY: "门厅",
      CLINIC: "医务室",
      PLAYGROUND: "操场",
      CLASSROOM: "教室",
      OFFICE:"校长办公室"
    },
    TIPS:{
      QUIET:"暂时没动静",
      AGAIN:"是否重听此段?",
      OK:"确认",
      CANCEL:"取消",
      GUID_CLICK_TO_LISTEN: "点击进行监听",
      CLICK:"点击下方",
      LISTEN_AGAIN:"可以重听",
      QUICKLY_LISTEN: "监听按钮同时亮起了快听"
    },
    NEXT_CAPTION: "下一句"
  }
  const en = {
    SCENE:{
      KITCHEN:"Kitchen",
      LOBBY:"Lobby",
      CLINIC:"Clinic",
      PLAYGROUND: "Playground",
      CLASSROOM: "Classroom",
      OFFICE: "Office"
    },
    TIPS:{
      QUIET: "Nothing for now",
      AGAIN: "Listen to this part again?",
      OK:"ok",
      CANCEL:"cancel",
      GUID_CLICK_TO_LISTEN: "Click to listen",
      CLICK:"click",
      LISTEN_AGAIN:"listen again",
      QUICKLY_LISTEN: "Taps are available. Listen now!"
  
    },
    NEXT_CAPTION: "NEXT"
  }

  const data = [
    {
      morning: {
        scene: {
          kitchen: {
            caption: [
              {
                key: 0,
                showTimeRange: [77040, 104040],
                roleName: '环境音',
                text: [
                  {
                    value: '杂音',
                  },
                ],
              },
            ],
            captionEn: [
              {
                key: 0,
                showTimeRange: [77040, 104040],
                roleName: 'Ambient sound',
                text: [{ value: 'noise' }],
              },
            ],
            clickableTimeRange: [
              {
                startTimestamp: 77040,
                endTimestamp: 104040,
              },
            ],
            resource: {
              aid: 'day-0-morning-kitchen.mp3',
            },
          },
          lobby: {
            caption: [
              {
                key: 0,
                showTimeRange: [3760, 6840],
                roleName: '环境音',
                text: [
                  {
                    value: '脚步声',
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [7080, 11120],
                roleName: '校工甲',
                text: [
                  {
                    value: '回来！谁让你放下就走的？仔细摆好。',
                  },
                ],
              },
              {
                key: 2,
                showTimeRange: [11360, 14720],
                roleName: '校工乙',
                text: [
                  {
                    value: '这也没人看着啊，你表演给谁看呢？',
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [16480, 22280],
                roleName: '校工甲',
                text: [
                  {
                    value: '轻点挪，我这可不是演，这两盆花杨校长可在意着呢。',
                  },
                ],
              },
              {
                key: 4,
                showTimeRange: [22600, 26040],
                roleName: '校工乙',
                text: [
                  {
                    value: '不就两盆花嘛，明天搬到校长办公室不就行了。',
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [26200, 35240],
                roleName: '校工甲',
                text: [
                  {
                    value:
                      '他说今天放校长室门口，明天搬进去，那就得按他说的来。别以为他不在就能随便糊弄，他可什么都能知道。',
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [35420, 38720],
                roleName: '校工乙',
                text: [
                  {
                    value: '好好好。杨校长就是神仙行了吧？',
                  },
                ],
              },
              {
                key: 7,
                showTimeRange: [39720, 44240],
                roleName: '校工甲',
                text: [
                  {
                    value: '哎呀，为了你好，别心不在焉的，你记住杨校长的要求没有？',
                  },
                ],
              },
              {
                key: 8,
                showTimeRange: [44560, 47640],
                roleName: '校工乙',
                clue: 'i11',
                text: [
                  {
                    value: '今天放门口，',
                  },
                  {
                    isKey: true,
                    value: '明天搬进去',
                  },
                  {
                    value: '。',
                  },
                ],
              },
              {
                key: 9,
                showTimeRange: [47800, 53640],
                roleName: '校工甲',
                text: [
                  {
                    value: '这还差不多，实话告诉你，只有像我这样的，才能在学校里混下去。',
                  },
                ],
              },
              {
                key: 10,
                showTimeRange: [53960, 57800],
                roleName: '校工乙',
                text: [
                  {
                    value: '我不就抱怨一句嘛，把你吓的。',
                  },
                ],
              },
              {
                key: 11,
                showTimeRange: [58420, 59800],
                roleName: '校工甲',
                text: [
                  {
                    value: '隔墙有耳。',
                  },
                ],
              },
              {
                key: 12,
                showTimeRange: [61000, 62200],
                roleName: '校工乙',
                text: [
                  {
                    value: '得了吧你。',
                  },
                ],
              },
              {
                key: 13,
                showTimeRange: [63280, 66960],
                roleName: '校工甲',
                text: [
                  {
                    value: '哎呀，走了走了，赶紧搬到校长室门口就完事了。',
                  },
                ],
              },
              {
                key: 14,
                showTimeRange: [67280, 71440],
                roleName: '环境音',
                text: [
                  {
                    value: '搬东西的声音',
                  },
                ],
              },
            ],
            captionEn: [
              { key: 0, showTimeRange: [3760, 6840], roleName: 'Ambient sound', text: [{ value: 'Footsteps' }] },
              {
                key: 1,
                showTimeRange: [7080, 11120],
                roleName: 'School worker A',
                text: [{ value: 'Come back. Arrange them properly before you go？' }],
              },
              {
                key: 2,
                showTimeRange: [11360, 14720],
                roleName: 'School worker B',
                text: [{ value: 'No one is here. Quit your performance？' }],
              },
              {
                key: 3,
                showTimeRange: [16480, 22280],
                roleName: 'School worker A',
                text: [
                  { value: "Careful. It's not performance. Principal Yang really cares about these two flower pots." },
                ],
              },
              {
                key: 4,
                showTimeRange: [22600, 26040],
                roleName: 'School worker B',
                text: [{ value: "They're just flowers. You can put them in his office tomorrow." }],
              },
              {
                key: 5,
                showTimeRange: [26200, 35240],
                roleName: 'School worker A',
                text: [
                  {
                    value:
                      "He said the pots must be put outside his office today and moved in tomorrow, so we have to do exactly what he asked. He's not here, but that doesn't mean you can fool around. Nothing escapes him.",
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [35420, 38720],
                roleName: 'School worker B',
                text: [{ value: 'Alright, alright. Principal Yang is omniscient, okay?' }],
              },
              {
                key: 7,
                showTimeRange: [39720, 44240],
                roleName: 'School worker A',
                text: [{ value: "It's for your own good. Take it seriously. Do you remember his orders?" }],
              },
              {
                key: 8,
                showTimeRange: [44560, 47640],
                roleName: 'School worker B',
                clue: 'i11',
                text: [
                  { value: 'Put the pots outside his office today，' },
                  { isKey: true, value: 'moved in tomorrow' },
                  { value: '.' },
                ],
              },
              {
                key: 9,
                showTimeRange: [47800, 53640],
                roleName: 'School worker A',
                text: [{ value: 'Good. To be honest, you have to be someone like me to survive in this school.' }],
              },
              {
                key: 10,
                showTimeRange: [53960, 57800],
                roleName: 'School worker B',
                text: [{ value: "It's no big deal! Why are you so freaked out?" }],
              },
              {
                key: 11,
                showTimeRange: [58420, 59800],
                roleName: 'School worker A',
                text: [{ value: 'You never know who will be listening.' }],
              },
              { key: 12, showTimeRange: [61000, 62200], roleName: 'School worker B', text: [{ value: 'Come on.' }] },
              {
                key: 13,
                showTimeRange: [63280, 66960],
                roleName: 'School worker A',
                text: [{ value: "Just get them outside the principal's office." }],
              },
              {
                key: 14,
                showTimeRange: [67280, 71440],
                roleName: 'Ambient sound',
                text: [{ value: 'The sound of moving things' }],
              },
            ],
            clickableTimeRange: [
              {
                startTimestamp: 3760,
                endTimestamp: 71440,
              },
            ],
            resource: {
              aid: 'day-0-morning-lobby.mp3',
            },
          },
          clinic: {
            caption: [
              { key: 0, showTimeRange: [107680, 109320], roleName: '学生', text: [{ value: '米医生我走了。' }] },
              {
                key: 1,
                showTimeRange: [111440, 113760],
                roleName: '崔楠楠',
                text: [{ value: '米医生，我们今天什么安排？' }],
              },
              {
                key: 2,
                showTimeRange: [113880, 116320],
                roleName: '米医生',
                text: [{ value: '现在没什么了，你休息一下。' }],
              },
              {
                key: 3,
                showTimeRange: [116720, 119200],
                roleName: '崔楠楠',
                text: [{ value: '我不累。您让我做点什么吧。' }],
              },
              {
                key: 4,
                showTimeRange: [119480, 122320],
                roleName: '米医生',
                text: [{ value: '那上午就收拾一下医务室，打扫打扫。' }],
              },
              {
                key: 5,
                showTimeRange: [122440, 124520],
                roleName: '崔楠楠',
                text: [{ value: '好！我中午前会打扫好的。' }],
              },
              {
                key: 6,
                showTimeRange: [125120, 126560],
                roleName: '崔楠楠',
                text: [{ value: '那......下午......' }],
              },
              {
                key: 7,
                showTimeRange: [127240, 130200],
                roleName: '米医生',
                text: [{ value: '下午你也别过来了，李教官说要来找我。' }],
              },
              { key: 8, showTimeRange: [130360, 131440], roleName: '崔楠楠', text: [{ value: '嗯。明白了 。' }] },
              {
                key: 9,
                showTimeRange: [131560, 134640],
                roleName: '米医生',
                text: [{ value: '嗯，我出去一下，一会回来。' }],
              },
              {
                key: 10,
                showTimeRange: [135040, 136680],
                roleName: '米医生',
                text: [{ value: '你打扫完就可以回去了。' }],
              },
              {
                key: 11,
                showTimeRange: [136960, 138360],
                roleName: '崔楠楠',
                text: [{ value: '米医生再见。' }],
              },
              { key: 12, showTimeRange: [139080, 140080], roleName: '环境音', text: [{ value: '关门声。' }] },
              {
                key: 13,
                showTimeRange: [140640, 149880],
                roleName: '环境音',
                text: [{ value: '打扫声。' }],
              },
            ],
            captionEn: [
              { key: 0, showTimeRange: [107680, 109320], roleName: 'Student', text: [{ value: "Dr. Mi, I'm leaving." }] },
              {
                key: 1,
                showTimeRange: [111440, 113760],
                roleName: 'CUI Nannan',
                text: [{ value: 'Dr. Mi, what do we have today?' }],
              },
              {
                key: 2,
                showTimeRange: [113880, 116320],
                roleName: 'Dr. Mi',
                text: [{ value: 'Nothing for now. Have some rest.' }],
              },
              {
                key: 3,
                showTimeRange: [116720, 119200],
                roleName: 'CUI Nannan',
                text: [{ value: "I'm not tired. Is there anything I can do?" }],
              },
              {
                key: 4,
                showTimeRange: [119480, 122320],
                roleName: 'Dr. Mi',
                text: [{ value: 'OK. Clean the clinic in the morning.' }],
              },
              {
                key: 5,
                showTimeRange: [122440, 124520],
                roleName: 'CUI Nannan',
                text: [{ value: 'OK. I will finish by noon. ' }],
              },
              {
                key: 6,
                showTimeRange: [125120, 126560],
                roleName: 'CUI Nannan',
                text: [{ value: 'How about afternoon?' }],
              },
              {
                key: 7,
                showTimeRange: [127240, 130200],
                roleName: 'Dr. Mi',
                text: [{ value: "Don't come in the afternoon. I have to meet Officer Li." }],
              },
              { key: 8, showTimeRange: [130360, 131440], roleName: 'CUI Nannan', text: [{ value: 'I see.' }] },
              {
                key: 9,
                showTimeRange: [131560, 134640],
                roleName: 'Dr. Mi',
                text: [{ value: "I'll be back in a minute. " }],
              },
              {
                key: 10,
                showTimeRange: [135040, 136680],
                roleName: 'Dr. Mi',
                text: [{ value: 'You can go when you finish cleaning.' }],
              },
              { key: 11, showTimeRange: [136960, 138360], roleName: 'CUI Nannan', text: [{ value: 'See you, Dr. Mi.' }] },
              {
                key: 12,
                showTimeRange: [139080, 140080],
                roleName: 'Ambient sound',
                text: [{ value: 'Door closing sound.' }],
              },
              {
                key: 13,
                showTimeRange: [140640, 149880],
                roleName: 'Ambient sound',
                text: [{ value: 'The sound of cleaning.' }],
              },
            ],
            clickableTimeRange: [
              {
                startTimestamp: 107000,
                endTimestamp: 150000,
              },
            ],
            resource: {
              aid: 'day-0-morning-clinic.mp3',
            },
          },
        },
      },
      forenoon: {
        scene: {
          lobby: {
            caption: [
              { key: 0, showTimeRange: [2800, 4320], roleName: '学生', text: [{ value: '杨校长好，阿姨好。' }] },
              {
                key: 1,
                showTimeRange: [5840, 14400],
                roleName: '杨校长',
                text: [{ value: '吴菲妈妈，不用担心，孩子我仔细看了，肯定能给你治好，你放心。' }],
              },
              {
                key: 2,
                showTimeRange: [14800, 23840],
                roleName: '吴菲妈妈',
                text: [{ value: '太谢谢您了，要不是您，我们真不知道怎么办。你说她，好好的学不上，非去跳什么街舞。' }],
              },
              {
                key: 3,
                showTimeRange: [24440, 28160],
                roleName: '杨校长',
                text: [{ value: '跳舞什么的，本来没什么错。' }],
              },
              {
                key: 4,
                showTimeRange: [28800, 30760],
                roleName: '吴菲妈妈',
                text: [{ value: '您刚才不是说……' }],
              },
              {
                key: 5,
                showTimeRange: [30880, 36680],
                roleName: '杨校长',
                text: [{ value: '跳舞是一种爱好，本身没错，但是不该成为孩子逃避责任的借口。' }],
              },
              { key: 6, showTimeRange: [37400, 38280], roleName: '吴菲妈妈', text: [{ value: '哦哦。' }] },
              {
                key: 7,
                showTimeRange: [38480, 47120],
                roleName: '杨校长',
                text: [{ value: '吴菲这个年龄，她的责任是什么？是学习！是感恩！她是真想跳舞吗？' }],
              },
              {
                key: 8,
                showTimeRange: [47600, 53600],
                roleName: '杨校长',
                text: [{ value: '不~是，她是为了不学习，才找了这么个借口。' }],
              },
              { key: 9, showTimeRange: [54240, 55440], roleName: '吴菲妈妈', text: [{ value: '对对对！' }] },
              {
                key: 10,
                showTimeRange: [55600, 63000],
                roleName: '杨校长',
                text: [{ value: '可怜天下父母心，孩子在这个时期都有些叛逆，不理解咱家长的苦心。' }],
              },
              {
                key: 11,
                showTimeRange: [65200, 71640],
                roleName: '吴菲妈妈',
                clue: 'i13',
                text: [
                  { value: '' },
                  {
                    isKey: true,
                    value: '为了她我做什么都愿意。杨校长，这些是我的一点心意，麻烦您了。',
                  },
                  { value: '' },
                ],
              },
              {
                key: 12,
                showTimeRange: [72720, 84400],
                roleName: '杨校长',
                clue: 'i13',
                text: [
                  { value: '' },
                  {
                    isKey: true,
                    value: '哎，您这是干什么？不用不用，您已经交过学费了，您放心我一定会让吴菲改邪归正的。',
                  },
                  { value: '' },
                ],
              },
              {
                key: 13,
                showTimeRange: [84480, 92160],
                roleName: '吴菲妈妈',
                clue: 'i13',
                text: [
                  { value: '' },
                  {
                    isKey: true,
                    value: '您真是太好了，我怎么没早遇见您这样的好老师，好医生，谢谢，太谢谢了。',
                  },
                  { value: '' },
                ],
              },
              {
                key: 14,
                showTimeRange: [92320, 100040],
                roleName: '杨校长',
                text: [{ value: '哎您起来，别这样。您有什么话都可以跟我说，来，我陪您转转。' }],
              },
              { key: 15, showTimeRange: [100600, 102600], roleName: '吴菲妈妈', text: [{ value: '哎哎，好的好的。' }] },
              {
                key: 16,
                showTimeRange: [102720, 106760],
                roleName: '环境音',
                text: [{ value: '脚步声' }],
              },
            ],
            captionEn: [
              {
                key: 0,
                showTimeRange: [2800, 4320],
                roleName: 'Student',
                text: [{ value: 'Hello, Principal Yang. Hello, madam.' }],
              },
              {
                key: 1,
                showTimeRange: [5840, 14400],
                roleName: 'Principal Yang',
                text: [{ value: "Mrs. Wu, don't worry. I checked your kid. I assure you I can cure her." }],
              },
              {
                key: 2,
                showTimeRange: [14800, 23840],
                roleName: 'Mrs. Wu',
                text: [
                  {
                    value:
                      "Thank you so much. You're our only hope. We really don't know what to do with the kid. She should've focused on studying, but she's obsessed with some street dance nonsense.",
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [24440, 28160],
                roleName: 'Principal Yang',
                text: [{ value: "There's nothing wrong with dancing." }],
              },
              { key: 4, showTimeRange: [28800, 30760], roleName: 'Mrs. Wu', text: [{ value: 'But, you were saying……' }] },
              {
                key: 5,
                showTimeRange: [30880, 36680],
                roleName: 'Principal Yang',
                text: [
                  {
                    value:
                      "Dancing is perfectly healthy as a hobby, but the kid shouldn't use it as an excuse to escape from her responsibilities.",
                  },
                ],
              },
              { key: 6, showTimeRange: [37400, 38280], roleName: 'Mrs. Wu', text: [{ value: 'I see.' }] },
              {
                key: 7,
                showTimeRange: [38480, 47120],
                roleName: 'Principal Yang',
                text: [
                  {
                    value:
                      "At WU Fei's age, her responsibilities are studying and learning to be grateful. Does she really love dancing? ",
                  },
                ],
              },
              {
                key: 8,
                showTimeRange: [47600, 53600],
                roleName: 'Principal Yang',
                text: [{ value: "No. She's only using it as an excuse to avoid studying." }],
              },
              { key: 9, showTimeRange: [54240, 55440], roleName: 'Mrs. Wu', text: [{ value: "You're right." }] },
              {
                key: 10,
                showTimeRange: [55600, 63000],
                roleName: 'Principal Yang',
                text: [
                  {
                    value:
                      "Parents only want what's best for the kids, but teenagers all rebel. They don't understand that.",
                  },
                ],
              },
              {
                key: 11,
                showTimeRange: [65200, 71640],
                roleName: 'Mrs. Wu',
                clue: 'i13',
                text: [
                  { value: '' },
                  {
                    isKey: true,
                    value:
                      "I'm willing to do anything for my baby girl. Principal Yang, please cure her. Think this as a token of my gratitude.",
                  },
                  { value: '' },
                ],
              },
              {
                key: 12,
                showTimeRange: [72720, 84400],
                roleName: 'Principal Yang',
                clue: 'i13',
                text: [
                  { value: '' },
                  {
                    isKey: true,
                    value:
                      "You don't have to do this. You already paid the tuition fees. Don't worry. I will make WU Fei go straight.",
                  },
                  { value: '' },
                ],
              },
              {
                key: 13,
                showTimeRange: [84480, 92160],
                roleName: 'Mrs. Wu',
                clue: 'i13',
                text: [
                  { value: '' },
                  {
                    isKey: true,
                    value:
                      'You really are a savior. I wish I had met you earlier. You are a great teacher and doctor. Thank you so much.',
                  },
                  { value: '' },
                ],
              },
              {
                key: 14,
                showTimeRange: [92320, 100040],
                roleName: 'Principal Yang',
                text: [
                  {
                    value: "Please get up. It's my job. Feel free to tell me anything if you want. I'll show you around.",
                  },
                ],
              },
              { key: 15, showTimeRange: [100600, 102600], roleName: 'Mrs. Wu', text: [{ value: 'Thank you' }] },
              { key: 16, showTimeRange: [102720, 106760], roleName: 'Ambient sound', text: [{ value: 'Footsteps' }] },
            ],
            clickableTimeRange: [
              {
                startTimestamp: 1000,
                endTimestamp: 106190,
              },
            ],
            resource: {
              aid: 'day-0-forenoon-lobby.mp3',
            },
          },
          kitchen: {
            caption: [
              {
                key: 0,
                showTimeRange: [111960, 116280],
                roleName: '厨师甲',
                text: [{ value: '你说这杨校长怎么每天都吃这些大补的东西？他这是有病吧？' }],
              },
              { key: 1, showTimeRange: [116400, 117480], roleName: '厨师乙', text: [{ value: '你说呢？' }] },
              {
                key: 2,
                showTimeRange: [118000, 120560],
                roleName: '厨师甲',
                clue: 'i12',
                text: [{ value: '难道他' }, { isKey: true, value: '肾虚....' }, { value: '' }],
              },
              {
                key: 3,
                showTimeRange: [120800, 123600],
                roleName: '厨师乙',
                text: [{ value: '嘘。别说出来，这事可不能乱说。' }],
              },
              {
                key: 4,
                showTimeRange: [123680, 128720],
                roleName: '厨师甲',
                text: [{ value: '知道了知道了，我不说，不过他这八成就是肾虚，没跑的。' }],
              },
              {
                key: 5,
                showTimeRange: [128920, 135960],
                roleName: '厨师乙',
                text: [{ value: '累的累的，杨校长一定是教育孩子太累了，得吃这些好东西补补。' }],
              },
              {
                key: 6,
                showTimeRange: [136360, 139360],
                roleName: '厨师甲',
                text: [{ value: '哼，这种破理由也就骗骗他自己。' }],
              },
              { key: 7, showTimeRange: [140840, 141840], roleName: '厨师甲', text: [{ value: '有老鼠！' }] },
              {
                key: 8,
                showTimeRange: [142120, 149520],
                roleName: '环境音',
                text: [{ value: '惊叫声' }],
              },
            ],
            captionEn: [
              {
                key: 0,
                showTimeRange: [111960, 116280],
                roleName: 'Chef A',
                text: [{ value: "Principal Yang's diet seems excessively nutritious. He has a problem, doesn't he?" }],
              },
              { key: 1, showTimeRange: [116400, 117480], roleName: 'Chef B', text: [{ value: 'What do you think?' }] },
              {
                key: 2,
                showTimeRange: [118000, 120560],
                roleName: 'Chef A',
                clue: 'i12',
                text: [{ value: 'Maybe he is' }, { isKey: true, value: 'impotent....' }, { value: ' ' }],
              },
              {
                key: 3,
                showTimeRange: [120800, 123600],
                roleName: 'Chef B',
                text: [{ value: "Shush. You shouldn't say that." }],
              },
              {
                key: 4,
                showTimeRange: [123680, 128720],
                roleName: 'Chef A',
                text: [{ value: "OK, OK. I won't tell anyone, but I think he's definitely impotent." }],
              },
              {
                key: 5,
                showTimeRange: [128920, 135960],
                roleName: 'Chef B',
                text: [
                  {
                    value: "He's just too tired educating the students. It makes perfect sense he needs more nutrients.",
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [136360, 139360],
                roleName: 'Chef A',
                text: [{ value: 'Well, you can keep telling yourself that crap' }],
              },
              { key: 7, showTimeRange: [140840, 141840], roleName: 'Chef A', text: [{ value: 'Rat!' }] },
              { key: 8, showTimeRange: [142120, 149520], roleName: 'Ambient sound', text: [{ value: 'Exclamation' }] },
            ],
            clickableTimeRange: [
              {
                startTimestamp: 107000,
                endTimestamp: 149220,
              },
            ],
            resource: {
              aid: 'day-0-forenoon-kitchen.mp3',
            },
          },
        },
      },
      noon: {
        scene: {
          kitchen: {
            caption: [
              {
                key: 0,
                showTimeRange: [117120, 121600],
                roleName: '环境音',
                text: [
                  {
                    value: '杂音',
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [121680, 122680],
                roleName: '环境音',
                text: [
                  {
                    value: '喵(猫叫声)',
                  },
                ],
              },
              {
                key: 2,
                showTimeRange: [122920, 126120],
                roleName: '厨师甲',
                text: [
                  {
                    value: '哎，好家伙，这是要加餐啊？',
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [127520, 131080],
                roleName: '厨师乙',
                text: [
                  {
                    value: '你们家加餐你用猫肉啊？让它来抓老鼠。',
                  },
                ],
              },
              {
                key: 4,
                showTimeRange: [131720, 132880],
                roleName: '厨师甲',
                text: [
                  {
                    value: '哪弄的？',
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [133120, 138040],
                roleName: '厨师乙',
                text: [
                  {
                    value: '镇上，我看看它抓了好几只老鼠 。走你！',
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [139640, 140720],
                roleName: '厨师乙',
                text: [
                  {
                    value: '行了，该走了。',
                  },
                ],
              },
              {
                key: 7,
                showTimeRange: [140960, 142800],
                roleName: '厨师甲',
                text: [
                  {
                    value: '把门关上，下午回来看。',
                  },
                ],
              },
              {
                key: 8,
                showTimeRange: [144200, 145080],
                roleName: '环境音',
                text: [
                  {
                    value: '关门声',
                  },
                ],
              },
            ],
            captionEn: [
              { key: 0, showTimeRange: [107680, 109320], roleName: 'Student', text: [{ value: "Dr. Mi, I'm leaving." }] },
              {
                key: 1,
                showTimeRange: [111440, 113760],
                roleName: 'CUI Nannan',
                text: [{ value: 'Dr. Mi, what do we have today?' }],
              },
              {
                key: 2,
                showTimeRange: [113880, 116320],
                roleName: 'Dr. Mi',
                text: [{ value: 'Nothing for now. Have some rest.' }],
              },
              {
                key: 3,
                showTimeRange: [116720, 119200],
                roleName: 'CUI Nannan',
                text: [{ value: "I'm not tired. Is there anything I can do?" }],
              },
              {
                key: 4,
                showTimeRange: [119480, 122320],
                roleName: 'Dr. Mi',
                text: [{ value: 'OK. Clean the clinic in the morning.' }],
              },
              {
                key: 5,
                showTimeRange: [122440, 124520],
                roleName: 'CUI Nannan',
                text: [{ value: 'OK. I will finish by noon. ' }],
              },
              {
                key: 6,
                showTimeRange: [125120, 126560],
                roleName: 'CUI Nannan',
                text: [{ value: 'How about afternoon?' }],
              },
              {
                key: 7,
                showTimeRange: [127240, 130200],
                roleName: 'Dr. Mi',
                text: [{ value: "Don't come in the afternoon. I have to meet Officer Li." }],
              },
              { key: 8, showTimeRange: [130360, 131440], roleName: 'CUI Nannan', text: [{ value: 'I see.' }] },
              {
                key: 9,
                showTimeRange: [131560, 134640],
                roleName: 'Dr. Mi',
                text: [{ value: "I'll be back in a minute. " }],
              },
              {
                key: 10,
                showTimeRange: [135040, 136680],
                roleName: 'Dr. Mi',
                text: [{ value: 'You can go when you finish cleaning.' }],
              },
              { key: 11, showTimeRange: [136960, 138360], roleName: 'CUI Nannan', text: [{ value: 'See you, Dr. Mi.' }] },
              {
                key: 12,
                showTimeRange: [139080, 140080],
                roleName: 'Ambient sound',
                text: [{ value: 'Door closing sound.' }],
              },
              {
                key: 13,
                showTimeRange: [140640, 149880],
                roleName: 'Ambient sound',
                text: [{ value: 'The sound of cleaning.' }],
              },
            ],
            clickableTimeRange: [
              {
                startTimestamp: 117000,
                endTimestamp: 145600,
              },
            ],
            resource: {
              aid: 'day-0-noon-kitchen.mp3',
            },
          },
          lobby: {
            caption: [
              {
                key: 0,
                showTimeRange: [320, 4680],
                roleName: '环境音',
                text: [
                  {
                    value: '教官训练声',
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [4800, 9720],
                roleName: '教官甲',
                text: [
                  {
                    value: '哎，可太累了。也不知道这是惩罚学生还是惩罚我。',
                  },
                ],
              },
              {
                key: 2,
                showTimeRange: [10120, 17920],
                roleName: '教官乙',
                text: [
                  {
                    value: '谁让你下手那么狠的？打人的时候数你卖力，现在喊累？要不是我拦着我怕你能打死他。',
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [18560, 27600],
                roleName: '教官甲',
                text: [
                  {
                    value:
                      '我不对他狠一点，杨校长就要对我狠了。这些兔崽子真是不省心，乖乖听话不就完了嘛。弄的大家都不好过。',
                  },
                ],
              },
              {
                key: 4,
                showTimeRange: [28520, 31680],
                roleName: '教官乙',
                text: [
                  {
                    value: '我觉得呀，他们也不是故意的。',
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [31960, 36600],
                roleName: '教官甲',
                text: [
                  {
                    value: '你要是这么想，你在这就会越来越待不下去。',
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [37000, 54680],
                roleName: '教官甲',
                text: [
                  {
                    value:
                      '喂，你要是真想走我也不拦着你，但你别想那些有的没的我告诉你。而且你想想你来这是干什么的？是来挣钱的，不是逞英雄来的。况且就算你想走，杨校长可不一定……',
                  },
                ],
              },
              {
                key: 7,
                showTimeRange: [54720, 57920],
                roleName: '教官乙',
                text: [
                  {
                    value: '行了行了，我没想走，我还没挣够钱呢。',
                  },
                ],
              },
              {
                key: 8,
                showTimeRange: [58520, 64960],
                roleName: '教官甲',
                clue: 'i14',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '哎，这就对了！哎你说，杨校长到底是不是医生？',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 9,
                showTimeRange: [65720, 67920],
                roleName: '教官乙',
                clue: 'i14',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '不是医生他做这些干嘛？',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 10,
                showTimeRange: [68520, 72760],
                roleName: '教官甲',
                clue: 'i14',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '哎，万一就是喜欢折磨人，觉得爽呢？',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 11,
                showTimeRange: [73080, 76200],
                roleName: '教官乙',
                clue: 'i14',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '啊？那不，那不变态嘛？',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 12,
                showTimeRange: [76600, 79520],
                roleName: '教官甲',
                clue: 'i14',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '哎，你别说还真有可能。',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 13,
                showTimeRange: [79840, 84360],
                roleName: '教官乙',
                clue: 'i14',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '我可不觉得，我看着电击那玩意挺难受的。',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 14,
                showTimeRange: [84840, 92560],
                roleName: '教官甲',
                clue: 'i14',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '你觉着难受，杨校长可不一定。哎我听说，杨校长电人可享受了。',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 15,
                showTimeRange: [92840, 94960],
                roleName: '教官乙',
                text: [
                  {
                    value: '你都在哪听的呀？',
                  },
                ],
              },
              {
                key: 16,
                showTimeRange: [95440, 100400],
                roleName: '教官甲',
                text: [
                  {
                    value: '你记不记得那俩学生，一男一女那个。鬼哭狼嚎的那次。',
                  },
                ],
              },
              {
                key: 17,
                showTimeRange: [101680, 102960],
                roleName: '教官乙',
                text: [
                  {
                    value: '崔楠楠？张扬？',
                  },
                ],
              },
              {
                key: 18,
                showTimeRange: [103040, 112800],
                roleName: '教官甲',
                text: [
                  {
                    value: '对对对，就他俩，那次闹的可大了，结果你猜怎么着？我看见杨校长出来的时候，那一脸满足样儿。',
                  },
                ],
              },
              {
                key: 19,
                showTimeRange: [112960, 120440],
                roleName: '教官乙',
                text: [
                  {
                    value: '停，打住，不说这个了，跟咱也没关系，能挣这么多钱，闭着眼睛就得了，好吧。',
                  },
                ],
              },
              {
                key: 20,
                showTimeRange: [120520, 122400],
                roleName: '教官甲',
                text: [
                  {
                    value: '切，看把你吓的。',
                  },
                ],
              },
              {
                key: 21,
                showTimeRange: [122640, 124030],
                roleName: '教官乙',
                text: [
                  {
                    value: '哎，走了走了。',
                  },
                ],
              },
              {
                key: 22,
                showTimeRange: [124200, 126640],
                roleName: '环境音',
                text: [
                  {
                    value: '脚步声',
                  },
                ],
              },
            ],
            captionEn: [
              { key: 0, showTimeRange: [320, 4680], roleName: 'Ambient sound', text: [{ value: 'Training sound' }] },
              {
                key: 1,
                showTimeRange: [4800, 9720],
                roleName: 'Officer A',
                text: [{ value: "It's killing me. Is this to punish the students or me?" }],
              },
              {
                key: 2,
                showTimeRange: [10120, 17920],
                roleName: 'Officer B',
                text: [
                  {
                    value:
                      "You went too far. I didn't see you complaining while you were beating the students. You would've killed him if I hadn't stopped you.",
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [18560, 27600],
                roleName: 'Officer A',
                text: [
                  {
                    value:
                      "I can show mercy to these bastards, but Principal Yang certainly won't show mercy to me. They really are pain in the ass. They just have to make everyone suffer!",
                  },
                ],
              },
              {
                key: 4,
                showTimeRange: [28520, 31680],
                roleName: 'Officer B',
                text: [{ value: "I don't think they wanted it." }],
              },
              {
                key: 5,
                showTimeRange: [31960, 36600],
                roleName: 'Officer A',
                text: [
                  {
                    value: "If you really think so, it won't be long before you start to think about leaving this place.",
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [37000, 54680],
                roleName: 'Officer A',
                text: [
                  {
                    value:
                      "I won't stop you if you really want to go. But don't think too much. You are here to make money, not to be a hero. Even if you want to go, Principal Yang won't allow it...",
                  },
                ],
              },
              {
                key: 7,
                showTimeRange: [54720, 57920],
                roleName: 'Officer B',
                text: [{ value: "Enough. I don't want to go. Besides, I haven’t made enough money." }],
              },
              {
                key: 8,
                showTimeRange: [58520, 64960],
                roleName: 'Officer A',
                clue: 'i14',
                text: [
                  { value: '' },
                  {
                    isKey: true,
                    value: "That's what we're talking about. Do you think Principal Yang is a real doctor?",
                  },
                  { value: '' },
                ],
              },
              {
                key: 9,
                showTimeRange: [65720, 67920],
                roleName: 'Officer B',
                clue: 'i14',
                text: [
                  { value: '' },
                  { isKey: true, value: 'Of course he is. Otherwise, why would he do this?' },
                  { value: '' },
                ],
              },
              {
                key: 10,
                showTimeRange: [68520, 72760],
                roleName: 'Officer A',
                clue: 'i14',
                text: [{ value: '' }, { isKey: true, value: 'Maybe he just enjoys torturing people.' }, { value: '' }],
              },
              {
                key: 11,
                showTimeRange: [73080, 76200],
                roleName: 'Officer B',
                clue: 'i14',
                text: [{ value: '' }, { isKey: true, value: "That's kinda kinky?" }, { value: '' }],
              },
              {
                key: 12,
                showTimeRange: [76600, 79520],
                roleName: 'Officer A',
                clue: 'i14',
                text: [{ value: '' }, { isKey: true, value: "There's always the possibility." }, { value: '' }],
              },
              {
                key: 13,
                showTimeRange: [79840, 84360],
                roleName: 'Officer B',
                clue: 'i14',
                text: [
                  { value: '' },
                  { isKey: true, value: 'I never enjoy it. The electrotherapy stuff makes me sick.' },
                  { value: '' },
                ],
              },
              {
                key: 14,
                showTimeRange: [84840, 92560],
                roleName: 'Officer A',
                clue: 'i14',
                text: [
                  { value: '' },
                  {
                    isKey: true,
                    value: "Principal Yang doesn't feel that way. I heard that he actually takes pleasure in doing it.",
                  },
                  { value: '' },
                ],
              },
              { key: 15, showTimeRange: [92840, 94960], roleName: 'Officer B', text: [{ value: 'Who told you that?' }] },
              {
                key: 16,
                showTimeRange: [95440, 100400],
                roleName: 'Officer A',
                text: [{ value: 'Do you remember that time we heard two student screaming, a boy and a girl?' }],
              },
              {
                key: 17,
                showTimeRange: [101680, 102960],
                roleName: 'Officer B',
                text: [{ value: 'CUI Nannan and ZHANG Yang?' }],
              },
              {
                key: 18,
                showTimeRange: [103040, 112800],
                roleName: 'Officer A',
                text: [
                  {
                    value:
                      'Yes. That was a big time scene. Guess what? When Principal Yang came out of the room, his face was pure satisfaction.',
                  },
                ],
              },
              {
                key: 19,
                showTimeRange: [112960, 120440],
                roleName: 'Officer B',
                text: [
                  {
                    value:
                      "OK, stop there. It's none of our business. We get decent money, so we'd better keep our mouth shut.",
                  },
                ],
              },
              {
                key: 20,
                showTimeRange: [120520, 122400],
                roleName: 'Officer A',
                text: [{ value: "You really are afraid, aren't you? Let's go." }],
              },
              { key: 21, showTimeRange: [122640, 124030], roleName: 'Officer B', text: [{ value: " Let's go." }] },
              { key: 22, showTimeRange: [124200, 126640], roleName: 'Ambient sound', text: [{ value: 'Footsteps' }] },
            ],
            clickableTimeRange: [
              {
                startTimestamp: 0,
                endTimestamp: 127000,
              },
            ],
            resource: {
              aid: 'day-0-noon-lobby.mp3',
            },
          },
          clinic: {
            caption: [
              {
                key: 0,
                showTimeRange: [34880, 35640],
                roleName: '环境音',
                text: [
                  {
                    value: '开门声',
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [35960, 37480],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '米医生，我来了。',
                  },
                ],
              },
              {
                key: 2,
                showTimeRange: [38280, 38920],
                roleName: '环境音',
                text: [
                  {
                    value: '关门声',
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [41680, 48360],
                roleName: '米医生',
                text: [
                  {
                    value: '新到的药都在这，你帮我一起整理吧 ，顺带清点一下。',
                  },
                ],
              },
              {
                key: 4,
                showTimeRange: [50400, 51400],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '好。',
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [51600, 60210],
                roleName: '环境音',
                text: [
                  {
                    value: '整理药瓶声',
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [61120, 64200],
                roleName: '米医生',
                text: [
                  {
                    value: '退烧药的库存就这么多，都在这了。  ',
                  },
                ],
              },
              {
                key: 7,
                showTimeRange: [65200, 66210],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '嗯，都在这了。',
                  },
                ],
              },
              {
                key: 8,
                showTimeRange: [68400, 71360],
                roleName: '米医生',
                text: [
                  {
                    value: '好像，少了几瓶。  ',
                  },
                ],
              },
              {
                key: 9,
                showTimeRange: [72120, 75080],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '嗯，好像是。',
                  },
                ],
              },
              {
                key: 10,
                showTimeRange: [76600, 78720],
                roleName: '米医生',
                text: [
                  {
                    value: '之前是不是有些药清理掉了。',
                  },
                ],
              },
              {
                key: 11,
                showTimeRange: [79520, 80080],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '啊？',
                  },
                ],
              },
              {
                key: 12,
                showTimeRange: [81200, 86000],
                roleName: '米医生',
                text: [
                  {
                    value: '以后不要这么粗心，清理掉的药做好记录。',
                  },
                ],
              },
              {
                key: 13,
                showTimeRange: [87440, 88200],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '我。',
                  },
                ],
              },
              {
                key: 14,
                showTimeRange: [89520, 90600],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '是。',
                  },
                ],
              },
              {
                key: 15,
                showTimeRange: [91040, 92040],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '可是。',
                  },
                ],
              },
              {
                key: 16,
                showTimeRange: [92160, 95400],
                roleName: '米医生',
                text: [
                  {
                    value: '不然被杨校长看见了， 咱们还要挨骂呢。',
                  },
                ],
              },
              {
                key: 17,
                showTimeRange: [96840, 101440],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '嗯 ，我一定会注意的 ，谢谢米医生。',
                  },
                ],
              },
              {
                key: 18,
                showTimeRange: [102520, 105840],
                roleName: '米医生',
                text: [
                  {
                    value: '好了，一会儿还有人来，你先回去吧。',
                  },
                ],
              },
              {
                key: 19,
                showTimeRange: [106230, 108190],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '好，米医生再见。  ',
                  },
                ],
              },
              {
                key: 20,
                showTimeRange: [109640, 110560],
                roleName: '环境音',
                text: [
                  {
                    value: '开门声',
                  },
                ],
              },
              {
                key: 21,
                showTimeRange: [112050, 112240],
                roleName: '环境音',
                text: [
                  {
                    value: '关门声',
                  },
                ],
              },
            ],
            captionEn: [
              { key: 0, showTimeRange: [34880, 35640], roleName: 'Ambient sound', text: [{ value: 'Door Creaky' }] },
              { key: 1, showTimeRange: [35960, 37480], roleName: 'CUI Nannan', text: [{ value: "Dr. Mi, I'm here." }] },
              {
                key: 2,
                showTimeRange: [38280, 38920],
                roleName: 'Ambient sound',
                text: [{ value: 'Door closing sound' }],
              },
              {
                key: 3,
                showTimeRange: [41680, 48360],
                roleName: 'Dr. Mi',
                text: [{ value: 'The drugs are here. Help me to arrange and check.' }],
              },
              { key: 4, showTimeRange: [50400, 51400], roleName: 'CUI Nannan', text: [{ value: 'OK' }] },
              {
                key: 5,
                showTimeRange: [51600, 60210],
                roleName: 'Ambient sound',
                text: [{ value: 'Clean up the sound of medicine bottles' }],
              },
              {
                key: 6,
                showTimeRange: [61120, 64200],
                roleName: 'Dr. Mi',
                text: [{ value: 'These are all the antipyretics we have.  ' }],
              },
              { key: 7, showTimeRange: [65200, 66210], roleName: 'CUI Nannan', text: [{ value: 'They are all here.' }] },
              {
                key: 8,
                showTimeRange: [68400, 71360],
                roleName: 'Dr. Mi',
                text: [{ value: 'I think there are a few bottles short.  ' }],
              },
              { key: 9, showTimeRange: [72120, 75080], roleName: 'CUI Nannan', text: [{ value: 'Looks like it.' }] },
              {
                key: 10,
                showTimeRange: [76600, 78720],
                roleName: 'Dr. Mi',
                text: [{ value: 'Did you throw some expired drugs away?' }],
              },
              { key: 11, showTimeRange: [79520, 80080], roleName: 'CUI Nannan', text: [{ value: 'Ah？' }] },
              {
                key: 12,
                showTimeRange: [81200, 86000],
                roleName: 'Dr. Mi',
                text: [{ value: "Don't be so careless. Always keep a record of the drugs you throw away." }],
              },
              { key: 13, showTimeRange: [87440, 88200], roleName: 'CUI Nannan', text: [{ value: 'I... ' }] },
              { key: 14, showTimeRange: [89520, 90600], roleName: 'CUI Nannan', text: [{ value: 'Yes...' }] },
              { key: 15, showTimeRange: [91040, 92040], roleName: 'CUI Nannan', text: [{ value: 'But' }] },
              {
                key: 16,
                showTimeRange: [92160, 95400],
                roleName: 'Dr. Mi',
                text: [{ value: "If Principal Yang finds out, we'll be in trouble." }],
              },
              {
                key: 17,
                showTimeRange: [96840, 101440],
                roleName: 'CUI Nannan',
                text: [{ value: 'Yes, I will be more careful. Thank you, Dr. Mi' }],
              },
              { key: 18, showTimeRange: [102520, 105840], roleName: 'Dr. Mi', text: [{ value: 'OK. You can go now.' }] },
              {
                key: 19,
                showTimeRange: [106230, 108190],
                roleName: 'CUI Nannan',
                text: [{ value: 'See you, Dr. Mi  ' }],
              },
              { key: 20, showTimeRange: [109640, 110560], roleName: 'Ambient sound', text: [{ value: 'Door Creaky' }] },
              {
                key: 21,
                showTimeRange: [112050, 112240],
                roleName: 'Ambient sound',
                text: [{ value: 'Door closing sound' }],
              },
            ],
            clickableTimeRange: [
              {
                startTimestamp: 34000,
                endTimestamp: 113400,
              },
            ],
            resource: {
              aid: 'day-0-noon-clinic.mp3',
            },
          },
        },
      },
      afternoon: {
        scene: {
          kitchen: {
            caption: [
              {
                key: 0,
                showTimeRange: [3640, 5120],
                roleName: '厨师乙',
                text: [
                  {
                    value: '来看看效果怎么样。',
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [5880, 7240],
                roleName: '厨师甲',
                text: [
                  {
                    value: '我感觉这次有戏。',
                  },
                ],
              },
              {
                key: 2,
                showTimeRange: [8000, 11840],
                roleName: '厨师乙',
                text: [
                  {
                    value: '听这么热闹，肯定抓不少老鼠。哎，哎！我的锅！',
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [12720, 14840],
                roleName: '厨师乙',
                text: [
                  {
                    value: '好家伙，怎么全给砸了？',
                  },
                ],
              },
              {
                key: 4,
                showTimeRange: [15720, 21920],
                roleName: '厨师乙',
                text: [
                  {
                    value: '要是不抓十只老鼠，这锅算白瞎了我告诉你！找那姓杨的换口锅得多麻烦你知道吗！',
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [22000, 27760],
                roleName: '厨师甲',
                text: [
                  {
                    value: '别嚷嚷了，能抓住老鼠就不亏，哎，你看到猫了吗？',
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [28400, 28760],
                roleName: '厨师乙',
                text: [
                  {
                    value: '猫',
                  },
                ],
              },
              {
                key: 7,
                showTimeRange: [29240, 35400],
                roleName: '厨师乙',
                text: [
                  {
                    value: '哎，哎！在那！还抓什么老鼠？它被老鼠撵着跑呢！',
                  },
                ],
              },
            ],
            captionEn: [
              { key: 0, showTimeRange: [3640, 5120], roleName: 'Chef B', text: [{ value: 'Let me see how it went.' }] },
              {
                key: 1,
                showTimeRange: [5880, 7240],
                roleName: 'Chef A',
                text: [{ value: ' I have a good feeling about it.' }],
              },
              {
                key: 2,
                showTimeRange: [8000, 11840],
                roleName: 'Chef B',
                text: [{ value: 'Sounds it has caught quite a few rats. Oh, my wok!' }],
              },
              {
                key: 3,
                showTimeRange: [12720, 14840],
                roleName: 'Chef B',
                text: [{ value: 'What happened? They are all broken.' }],
              },
              {
                key: 4,
                showTimeRange: [15720, 21920],
                roleName: 'Chef B',
                text: [
                  {
                    value:
                      "My wok will be broken for nothing if your stupid cat can't even catch 10 rats.! Do you have any idea how difficult it is to get Yang to buy a new wok?",
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [22000, 27760],
                roleName: 'Chef A',
                text: [{ value: "Shut up. It's worth it as long as it catched some. Did you see the cat?" }],
              },
              { key: 6, showTimeRange: [28400, 28760], roleName: 'Chef B', text: [{ value: 'Cat?' }] },
              {
                key: 7,
                showTimeRange: [29240, 35400],
                roleName: 'Chef B',
                text: [{ value: "Over there. You can't count on it. It's being chased by a rat！" }],
              },
            ],
            clickableTimeRange: [
              {
                startTimestamp: 0,
                endTimestamp: 35800,
              },
            ],
            resource: {
              aid: 'day-0-afternoon-kitchen.mp3',
            },
          },
          lobby: {
            caption: [
              {
                key: 0,
                showTimeRange: [57480, 63640],
                roleName: '侯逸',
                text: [
                  {
                    value: '哟，这不是山娃嘛，怎么样啊，最近跟张扬混的不错呀。',
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [64360, 66000],
                roleName: '徐山娃',
                text: [
                  {
                    value: '侯哥，喝水。',
                  },
                ],
              },
              {
                key: 2,
                showTimeRange: [67000, 69520],
                roleName: '侯逸',
                text: [
                  {
                    value: '我不喝你的水，让开。',
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [69920, 70920],
                roleName: '徐山娃',
                text: [
                  {
                    value: '先别走。',
                  },
                ],
              },
              {
                key: 4,
                showTimeRange: [72080, 73080],
                roleName: '侯逸',
                text: [
                  {
                    value: '你拦我？',
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [74160, 79960],
                roleName: '徐山娃',
                text: [
                  {
                    value: '我是来找你说事的。你之前对我不错，所以我想邀请你干大事。',
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [81200, 84160],
                roleName: '侯逸',
                text: [
                  {
                    value: '大事，什么大事我听听。',
                  },
                ],
              },
              {
                key: 7,
                showTimeRange: [86120, 88760],
                roleName: '徐山娃',
                text: [
                  {
                    value: '我不能说，除非你加入我。',
                  },
                ],
              },
              {
                key: 8,
                showTimeRange: [88840, 96440],
                roleName: '侯逸',
                text: [
                  {
                    value: '哈，加入？你过家家呢？你信不信我反手弄你？',
                  },
                ],
              },
              {
                key: 9,
                showTimeRange: [97360, 105200],
                roleName: '徐山娃',
                text: [
                  {
                    value: '我信，不是，我是说我相信你的人，你保证过的事儿从来没有反悔过。',
                  },
                ],
              },
              {
                key: 10,
                showTimeRange: [105960, 120440],
                roleName: '侯逸',
                text: [
                  {
                    value:
                      '徐山娃，你有没有搞错啊？！这是我反不反悔的事儿吗？当初你做我的小弟，我对你没的说吧？现在你找了张扬那条狗，觉得自己很厉害了？想收我做小弟？',
                  },
                ],
              },
              {
                key: 11,
                showTimeRange: [120680, 127160],
                roleName: '徐山娃',
                text: [
                  {
                    value: '不是……哎呀你相信我，我们在做对的事，所以我才想邀请你加入。',
                  },
                ],
              },
              {
                key: 12,
                showTimeRange: [129000, 141600],
                roleName: '侯逸',
                text: [
                  {
                    value:
                      '真厉害啊，换了大哥还知道什么是对，什么是错？说的那么好听，还加入？你想死放过我好不好啊？山娃哥。',
                  },
                ],
              },
              {
                key: 13,
                showTimeRange: [142720, 143400],
                roleName: '徐山娃',
                text: [
                  {
                    value: '哎！',
                  },
                ],
              },
              {
                key: 14,
                showTimeRange: [145200, 149640],
                roleName: '徐山娃',
                text: [
                  {
                    value: '张扬，你听见了吧？那个，我现在就回去。',
                  },
                ],
              },
            ],
            captionEn: [
              {
                key: 0,
                showTimeRange: [57480, 63640],
                roleName: 'HOU Yi',
                text: [
                  { value: "Look who's here. Shanwa, I heard you've been having some fun with ZHANG Yang these days." },
                ],
              },
              {
                key: 1,
                showTimeRange: [64360, 66000],
                roleName: 'XU Shanwa',
                text: [{ value: 'Brother Hou, have some water.' }],
              },
              {
                key: 2,
                showTimeRange: [67000, 69520],
                roleName: 'HOU Yi',
                text: [{ value: "I don't want your water. Go away." }],
              },
              { key: 3, showTimeRange: [69920, 70920], roleName: 'XU Shanwa', text: [{ value: 'Wait.' }] },
              { key: 4, showTimeRange: [72080, 73080], roleName: 'HOU Yi', text: [{ value: 'Stay out of my way？' }] },
              {
                key: 5,
                showTimeRange: [74160, 79960],
                roleName: 'XU Shanwa',
                text: [
                  {
                    value:
                      "I have an offer for you. You've been nice to me, so I'm inviting you to work with me on something big.",
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [81200, 84160],
                roleName: 'HOU Yi',
                text: [{ value: 'Something big? Tell me about it.' }],
              },
              {
                key: 7,
                showTimeRange: [86120, 88760],
                roleName: 'XU Shanwa',
                text: [{ value: "I can't unless you agree to join me first." }],
              },
              {
                key: 8,
                showTimeRange: [88840, 96440],
                roleName: 'HOU Yi',
                text: [{ value: 'What? Are you kidding me? You know what will happen if you mess with me.' }],
              },
              {
                key: 9,
                showTimeRange: [97360, 105200],
                roleName: 'XU Shanwa',
                text: [{ value: "I'm not messing with you. I trust you. You are a man of your word." }],
              },
              {
                key: 10,
                showTimeRange: [105960, 120440],
                roleName: 'HOU Yi',
                text: [
                  {
                    value:
                      "Xu Shanwa, are you serious? Is it really about keeping a promise? Back when you were working for me, I believe I treated you well. Now you're ZHANG Yang's sidekick, and suddenly you think you're good enough to be my boss?",
                  },
                ],
              },
              {
                key: 11,
                showTimeRange: [120680, 127160],
                roleName: 'XU Shanwa',
                text: [
                  {
                    value:
                      "It's not like that. Please trust me. We're doing the right thing. That's why I want to invite you to come to our side.",
                  },
                ],
              },
              {
                key: 12,
                showTimeRange: [129000, 141600],
                roleName: 'HOU Yi',
                text: [
                  {
                    value:
                      "I'm impressed. Suddenly you can tell right from wrong now? Invite me to come to your side? Shanwa, I won't stop you if you're looking for troubles, but please leave me out.",
                  },
                ],
              },
              { key: 13, showTimeRange: [142720, 143400], roleName: 'XU Shanwa', text: [{ value: 'oops！' }] },
              {
                key: 14,
                showTimeRange: [145200, 149640],
                roleName: 'XU Shanwa',
                text: [{ value: "ZHANG Yang. You heard it. Ugh, I'm heading back now." }],
              },
            ],
            clickableTimeRange: [
              {
                startTimestamp: 56000,
                endTimestamp: 149220,
              },
            ],
            resource: {
              aid: 'day-0-afternoon-lobby.mp3',
            },
          },
          clinic: {
            caption: [
              {
                key: 0,
                showTimeRange: [40440, 43440],
                roleName: '米医生',
                text: [
                  {
                    value: '好了，有什么想说的说吧。',
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [44720, 46440],
                roleName: '李教官',
                text: [
                  {
                    value: '林琳是怎么死的？',
                  },
                ],
              },
              {
                key: 2,
                showTimeRange: [47640, 53120],
                roleName: '米医生',
                text: [
                  {
                    value: '杨校长不让我说，我是听你的还是听杨校长的？',
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [53200, 58640],
                roleName: '李教官',
                text: [
                  {
                    value: '看来你确实知道，我只问一件事，就不在这烦你了。',
                  },
                ],
              },
              {
                key: 4,
                showTimeRange: [59160, 60400],
                roleName: '米医生',
                text: [
                  {
                    value: '哼。',
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [61320, 62320],
                roleName: '米医生',
                text: [
                  {
                    value: '你问。',
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [62520, 67520],
                roleName: '李教官',
                text: [
                  {
                    value: '林琳，就是那个出事的学生，是不是意外？',
                  },
                ],
              },
              {
                key: 7,
                showTimeRange: [67960, 69480],
                roleName: '米医生',
                text: [
                  {
                    value: '我不记得了。',
                  },
                ],
              },
              {
                key: 8,
                showTimeRange: [69920, 79040],
                roleName: '李教官',
                text: [
                  {
                    value: '不好好说话是吗？相信我，你不会想多一个我这样的麻烦的  ，我可比那些问题学生，麻烦的多 。',
                  },
                ],
              },
              {
                key: 9,
                showTimeRange: [79680, 83080],
                roleName: '米医生',
                text: [
                  {
                    value: '你在威胁我 ，这也是杨校长教你的？',
                  },
                ],
              },
              {
                key: 10,
                showTimeRange: [83280, 85120],
                roleName: '李教官',
                text: [
                  {
                    value: '你再诽谤老师试试！',
                  },
                ],
              },
              {
                key: 11,
                showTimeRange: [85200, 86720],
                roleName: '米医生',
                text: [
                  {
                    value: '你到底想要干嘛！',
                  },
                ],
              },
              {
                key: 12,
                showTimeRange: [86840, 90280],
                roleName: '李教官',
                clue: 'i15',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '告诉我，林琳死的时候，老师怎么了？',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 13,
                showTimeRange: [93840, 98640],
                roleName: '米医生',
                clue: 'i15',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '他当时很愤怒，非常的愤怒。够了吗？',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 14,
                showTimeRange: [99280, 104640],
                roleName: '李教官',
                clue: 'i15',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '老师愤怒，说明林琳的事儿不是他想要的，对吧？',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 15,
                showTimeRange: [104840, 106200],
                roleName: '米医生',
                clue: 'i15',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '与我无关。',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 16,
                showTimeRange: [107880, 116200],
                roleName: '李教官',
                clue: 'i15',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '你放心，接下来我会帮助老师的，林琳这样的意外，不会再发生第二次了。',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 17,
                showTimeRange: [117240, 118240],
                roleName: '米医生',
                text: [
                  {
                    value: '你最好.....',
                  },
                ],
              },
              {
                key: 18,
                showTimeRange: [118760, 120320],
                roleName: '米医生',
                text: [
                  {
                    value: '说到做到。',
                  },
                ],
              },
              {
                key: 19,
                showTimeRange: [123240, 125960],
                roleName: '环境音',
                text: [
                  {
                    value: '脚步声',
                  },
                ],
              },
              {
                key: 20,
                showTimeRange: [126160, 126800],
                roleName: '环境音',
                text: [
                  {
                    value: '关门声',
                  },
                ],
              },
            ],
            captionEn: [
              {
                key: 0,
                showTimeRange: [40440, 43440],
                roleName: 'Dr. Mi',
                text: [{ value: 'If you have anything to say, say it now.' }],
              },
              {
                key: 1,
                showTimeRange: [44720, 46440],
                roleName: 'Officer Li',
                text: [{ value: 'How did Lin Lin die?' }],
              },
              {
                key: 2,
                showTimeRange: [47640, 53120],
                roleName: 'Dr. Mi',
                text: [{ value: "Principal Yang won't let me tell. Should I listen to him or you?" }],
              },
              {
                key: 3,
                showTimeRange: [53200, 58640],
                roleName: 'Officer Li',
                text: [{ value: 'So, you do know. Answer one more question, and I will leave you alone.' }],
              },
              { key: 4, showTimeRange: [59160, 60400], roleName: 'Dr. Mi', text: [{ value: 'humph.' }] },
              { key: 5, showTimeRange: [61320, 62320], roleName: 'Dr. Mi', text: [{ value: 'Go ahead.' }] },
              {
                key: 6,
                showTimeRange: [62520, 67520],
                roleName: 'Officer Li',
                text: [{ value: 'About Lin Lin, the student who killed herself, was it really an accident?' }],
              },
              { key: 7, showTimeRange: [67960, 69480], roleName: 'Dr. Mi', text: [{ value: "I don't remember." }] },
              {
                key: 8,
                showTimeRange: [69920, 79040],
                roleName: 'Officer Li',
                text: [
                  {
                    value:
                      "That's your attitude? Believe me, you wouldn't want to be my enemy. I'm more troublesome than those troubled teenagers.",
                  },
                ],
              },
              {
                key: 9,
                showTimeRange: [79680, 83080],
                roleName: 'Dr. Mi',
                text: [{ value: 'Are you threatening me? Did you learn that from Principal Yang?' }],
              },
              {
                key: 10,
                showTimeRange: [83280, 85120],
                roleName: 'Officer Li',
                text: [{ value: 'Are you slandering my teacher?' }],
              },
              { key: 11, showTimeRange: [85200, 86720], roleName: 'Dr. Mi', text: [{ value: 'What do you want?' }] },
              {
                key: 12,
                showTimeRange: [86840, 90280],
                roleName: 'Officer Li',
                clue: 'i15',
                text: [
                  { value: '' },
                  { isKey: true, value: "Tell me. What was his reaction toward Lin Lin's death?" },
                  { value: '' },
                ],
              },
              {
                key: 13,
                showTimeRange: [93840, 98640],
                roleName: 'Dr. Mi',
                clue: 'i15',
                text: [
                  { value: '' },
                  { isKey: true, value: 'He was angry. Heck, he was furious. Is that what you want to hear?' },
                  { value: '' },
                ],
              },
              {
                key: 14,
                showTimeRange: [99280, 104640],
                roleName: 'Officer Li',
                clue: 'i15',
                text: [
                  { value: '' },
                  { isKey: true, value: "He was angry，Which means he didn't want what happened to Lin Lin, right?" },
                  { value: '' },
                ],
              },
              {
                key: 15,
                showTimeRange: [104840, 106200],
                roleName: 'Dr. Mi',
                clue: 'i15',
                text: [{ value: '' }, { isKey: true, value: "I don't care." }, { value: '' }],
              },
              {
                key: 16,
                showTimeRange: [107880, 116200],
                roleName: 'Officer Li',
                clue: 'i15',
                text: [
                  { value: '' },
                  { isKey: true, value: "I will help my teacher. I won't let what happened to Lin Lin repeat itself." },
                  { value: '' },
                ],
              },
              { key: 17, showTimeRange: [117240, 118240], roleName: 'Dr. Mi', text: [{ value: "You'd better..." }] },
              { key: 18, showTimeRange: [118760, 120320], roleName: 'Dr. Mi', text: [{ value: ' be damn right' }] },
              { key: 19, showTimeRange: [123240, 125960], roleName: 'Ambient sound', text: [{ value: 'Footsteps' }] },
              {
                key: 20,
                showTimeRange: [126160, 126800],
                roleName: 'Ambient sound',
                text: [{ value: 'Door closing sound' }],
              },
            ],
            clickableTimeRange: [
              {
                startTimestamp: 39000,
                endTimestamp: 127000,
              },
            ],
            resource: {
              aid: 'day-0-afternoon-clinic.mp3',
            },
          },
        },
      },
    },
    {
      morning: {
        scene: {
          kitchen: {
            caption: [
              {
                key: 0,
                showTimeRange: [107440, 149440],
                roleName: '环境音',
                text: [
                  {
                    value: '杂音',
                  },
                ],
              },
            ],
            captionEn: [
              { key: 0, showTimeRange: [107440, 149440], roleName: 'Ambient sound', text: [{ value: 'noise' }] },
            ],
            clickableTimeRange: [
              {
                startTimestamp: 107440,
                endTimestamp: 149840,
              },
            ],
            resource: {
              aid: 'day-1-morning-kitchen.mp3',
            },
          },
          playground: {
            caption: [
              {
                key: 0,
                showTimeRange: [56200, 60440],
                roleName: '侯逸',
                text: [
                  {
                    value: '哎哟，对不起啊李教官，我没看见你。',
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [61160, 62640],
                roleName: '李教官',
                text: [
                  {
                    value: '走路小心点啊。',
                  },
                ],
              },
              {
                key: 2,
                showTimeRange: [63440, 64280],
                roleName: '侯逸',
                text: [
                  {
                    value: '啊，啊？',
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [65040, 66040],
                roleName: '侯逸',
                text: [
                  {
                    value: '您就走了？',
                  },
                ],
              },
              {
                key: 4,
                showTimeRange: [66440, 68120],
                roleName: '李教官',
                text: [
                  {
                    value: '嗯？你找我有事？',
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [68360, 71720],
                roleName: '侯逸',
                text: [
                  {
                    value: '不是，您不惩罚我？',
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [71800, 74800],
                roleName: '李教官',
                text: [
                  {
                    value: '我为什么惩罚你？就因为你故意撞我一下？',
                  },
                ],
              },
              {
                key: 7,
                showTimeRange: [76760, 87400],
                roleName: '侯逸',
                text: [
                  {
                    value: '呃对，呃不对，我不是故意的，我就……哎，我这书里怎么有钱呀！这是您的钱吧？',
                  },
                ],
              },
              {
                key: 8,
                showTimeRange: [88120, 90840],
                roleName: '李教官',
                text: [
                  {
                    value: '这不是你书里掉出来的钱吗？',
                  },
                ],
              },
              {
                key: 9,
                showTimeRange: [91760, 98000],
                roleName: '侯逸',
                text: [
                  {
                    value: '这个……书虽然是我的书，但这钱……不一定是我的钱。',
                  },
                ],
              },
              {
                key: 10,
                showTimeRange: [99000, 102120],
                roleName: '李教官',
                text: [
                  {
                    value: '怎么？还能是我的钱？',
                  },
                ],
              },
              {
                key: 11,
                showTimeRange: [102840, 104800],
                roleName: '侯逸',
                text: [
                  {
                    value: '好嘞。我这就还给你……',
                  },
                ],
              },
              {
                key: 12,
                showTimeRange: [104880, 105520],
                roleName: '李教官',
                text: [
                  {
                    value: '等等。',
                  },
                ],
              },
              {
                key: 13,
                showTimeRange: [105880, 108040],
                roleName: '侯逸',
                text: [
                  {
                    value: '唉唉唉！手，手。',
                  },
                ],
              },
              {
                key: 14,
                showTimeRange: [108400, 112200],
                roleName: '李教官',
                text: [
                  {
                    value: '别随随便便把手伸过来，我忍不住。',
                  },
                ],
              },
              {
                key: 15,
                showTimeRange: [112480, 116080],
                roleName: '侯逸',
                text: [
                  {
                    value: '疼疼疼......！',
                  },
                ],
              },
              {
                key: 16,
                showTimeRange: [116200, 121280],
                roleName: '李教官',
                text: [
                  {
                    value: '哼。把你手里的东西和你的手一起拿回去。',
                  },
                ],
              },
              {
                key: 17,
                showTimeRange: [121400, 123960],
                roleName: '侯逸',
                text: [
                  {
                    value: '好好好......您松手。',
                  },
                ],
              },
              {
                key: 18,
                showTimeRange: [124680, 132120],
                roleName: '李教官',
                text: [
                  {
                    value: '感恩学生手册第四章32条，行贿教官，静心室面壁7天。',
                  },
                ],
              },
              {
                key: 19,
                showTimeRange: [132240, 134080],
                roleName: '侯逸',
                text: [
                  {
                    value: '我没有啊，我怎么可能我……',
                  },
                ],
              },
              {
                key: 20,
                showTimeRange: [134160, 142600],
                roleName: '李教官',
                text: [
                  {
                    value: '我不吃这一套，但如果你喜欢搞这些有的没的，我倒是很乐意多给你来几脚。',
                  },
                ],
              },
              {
                key: 21,
                showTimeRange: [142680, 143400],
                roleName: '侯逸',
                text: [
                  {
                    value: '哎呦！',
                  },
                ],
              },
              {
                key: 22,
                showTimeRange: [143520, 144560],
                roleName: '侯逸',
                text: [
                  {
                    value: '我不是，哎呦！',
                  },
                ],
              },
              {
                key: 23,
                showTimeRange: [144960, 149920],
                roleName: '李教官',
                text: [
                  {
                    value: '再跟我犯浑，我见你一次踢你一次。',
                  },
                ],
              },
            ],
            captionEn: [
              {
                key: 0,
                showTimeRange: [56200, 60440],
                roleName: 'HOU Yi',
                text: [{ value: "Sorry,Officer Li. I didn't see you" }],
              },
              {
                key: 1,
                showTimeRange: [61160, 62640],
                roleName: 'Officer Li',
                text: [{ value: "Watch where you're going." }],
              },
              { key: 2, showTimeRange: [63440, 64280], roleName: 'HOU Yi', text: [{ value: 'Ah？' }] },
              { key: 3, showTimeRange: [65040, 66040], roleName: 'HOU Yi', text: [{ value: 'Are you just leaving?' }] },
              { key: 4, showTimeRange: [66440, 68120], roleName: 'Officer Li', text: [{ value: "Yeah. What's wrong?" }] },
              {
                key: 5,
                showTimeRange: [68360, 71720],
                roleName: 'HOU Yi',
                text: [{ value: "Aren't you going to punish me?" }],
              },
              {
                key: 6,
                showTimeRange: [72160, 77360],
                roleName: 'Officer Li',
                text: [{ value: 'Why would I do that? Just because you bumped into me on purpose?' }],
              },
              {
                key: 7,
                showTimeRange: [76760, 87400],
                roleName: 'HOU Yi',
                text: [
                  { value: "Sure. I mean, no. I didn't do it on purpose. Why is there money in my book? Is it yours?" },
                ],
              },
              {
                key: 8,
                showTimeRange: [88120, 90840],
                roleName: 'Officer Li',
                text: [{ value: "Wasn't it in your book?" }],
              },
              {
                key: 9,
                showTimeRange: [91760, 98000],
                roleName: 'HOU Yi',
                text: [{ value: 'Well, the book is mine, but the money doesn’t have to be mine.' }],
              },
              {
                key: 10,
                showTimeRange: [99000, 102120],
                roleName: 'Officer Li',
                text: [{ value: "What do you mean? Are you saying it's my money?" }],
              },
              {
                key: 11,
                showTimeRange: [102840, 104800],
                roleName: 'HOU Yi',
                text: [{ value: "OK. I'll give it back to the owner." }],
              },
              { key: 12, showTimeRange: [104880, 105520], roleName: 'Officer Li', text: [{ value: 'Wait.' }] },
              { key: 13, showTimeRange: [105880, 108040], roleName: 'HOU Yi', text: [{ value: 'Oh, my hand.' }] },
              {
                key: 14,
                showTimeRange: [108400, 112200],
                roleName: 'Officer Li',
                text: [{ value: "Don't give me your hand like that. I can't help." }],
              },
              { key: 15, showTimeRange: [112480, 116080], roleName: 'HOU Yi', text: [{ value: 'It hurts......！' }] },
              {
                key: 16,
                showTimeRange: [116200, 121280],
                roleName: 'Officer Li',
                text: [{ value: "Take what you're holding and your hand back." }],
              },
              {
                key: 17,
                showTimeRange: [121400, 123960],
                roleName: 'HOU Yi',
                text: [{ value: 'Yes, please let go of my hand.' }],
              },
              {
                key: 18,
                showTimeRange: [124680, 132120],
                roleName: 'Officer Li',
                text: [
                  {
                    value:
                      'According to clause 32 of Chapter 4 in the Gratitude Handbook, any student who attempts to bribe an officer will get seven days in the meditation room.',
                  },
                ],
              },
              { key: 19, showTimeRange: [132240, 134080], roleName: 'HOU Yi', text: [{ value: "But I didn't bribe……" }] },
              {
                key: 20,
                showTimeRange: [134160, 142600],
                roleName: 'Officer Li',
                text: [{ value: "Your gimmicks won't work on me. If you enjoy them, I'd be glad to kick you more." }],
              },
              { key: 21, showTimeRange: [142680, 143400], roleName: 'HOU Yi', text: [{ value: 'Ugh！' }] },
              { key: 22, showTimeRange: [143520, 144560], roleName: 'HOU Yi', text: [{ value: "I don't. Ugh!" }] },
              {
                key: 23,
                showTimeRange: [144960, 149920],
                roleName: 'Officer Li',
                text: [{ value: "Behave yourself. Otherwise I'll kick you every time I see you." }],
              },
            ],
            clickableTimeRange: [
              {
                startTimestamp: 55000,
                endTimestamp: 149920,
              },
            ],
            resource: {
              aid: 'day-1-morning-playground.mp3',
            },
          },
          clinic: {
            caption: [
              {
                key: 0,
                showTimeRange: [32760, 34240],
                roleName: '米医生',
                text: [
                  {
                    value: '咳。(清嗓子)',
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [35920, 42720],
                roleName: '米医生',
                text: [
                  {
                    value: '哼唱',
                  },
                ],
              },
              {
                key: 2,
                showTimeRange: [44600, 45640],
                roleName: '米医生',
                text: [
                  {
                    value: '咳。(清嗓子)',
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [47960, 54200],
                roleName: '米医生',
                text: [
                  {
                    value: '哼唱',
                  },
                ],
              },
            ],
            captionEn: [
              { key: 0, showTimeRange: [32760, 34240], roleName: 'Dr. Mi', text: [{ value: 'Cough. (clears throat)' }] },
              { key: 1, showTimeRange: [35920, 42720], roleName: 'Dr. Mi', text: [{ value: 'Humming.' }] },
              { key: 2, showTimeRange: [44600, 45640], roleName: 'Dr. Mi', text: [{ value: 'Cough. (clears throat)' }] },
              { key: 3, showTimeRange: [47960, 54200], roleName: 'Dr. Mi', text: [{ value: 'Humming.' }] },
            ],
            clickableTimeRange: [
              {
                startTimestamp: 32000,
                endTimestamp: 54240,
              },
            ],
            resource: {
              aid: 'day-1-morning-clinic.mp3',
            },
          },
          classroom: {
            caption: [
              {
                key: 0,
                showTimeRange: [1240, 3040],
                roleName: '环境音',
                text: [
                  {
                    value: '打扫声',
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [3120, 4180],
                roleName: '学生甲',
                text: [
                  {
                    value: '哎，哎，抱歉，抱歉，我来晚了。',
                  },
                ],
              },
              {
                key: 2,
                showTimeRange: [6640, 8480],
                roleName: '学生乙',
                text: [
                  {
                    value: '没事，我快打扫完了。',
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [9560, 12840],
                roleName: '学生甲',
                text: [
                  {
                    value: '如果杨校长要罚就让他罚我一个。',
                  },
                ],
              },
              {
                key: 4,
                showTimeRange: [14000, 17560],
                roleName: '学生乙',
                text: [
                  {
                    value: '谢谢啊，但是没用的，杨校长就是个变态。',
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [17680, 19720],
                roleName: '学生甲',
                text: [
                  {
                    value: '哎，可不要乱说啊。',
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [20040, 32440],
                roleName: '学生乙',
                clue: 'i16',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value:
                      '不是乱说，我进来之前听到我爸要把我送到这儿，我就提前查了一下，有这个学校毕业的学生说，杨校长就是变态。',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 7,
                showTimeRange: [33400, 39040],
                roleName: '学生甲',
                clue: 'i16',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '啊？那...那学生出去这么说，不等于他没被治好吗？',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 8,
                showTimeRange: [39240, 44440],
                roleName: '学生乙',
                clue: 'i16',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '就是说啊，他就是装的，装成被改造的样子才出去的  。',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 9,
                showTimeRange: [44560, 53240],
                roleName: '学生甲',
                clue: 'i16',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '啊？你...你可别跟别人这么说啊，你得说那些人都是在诽谤校长，不...不然你完了。',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 10,
                showTimeRange: [55800, 60400],
                roleName: '学生乙',
                text: [
                  {
                    value: '没事，我知道，你打扫吧，我歇会。',
                  },
                ],
              },
              {
                key: 11,
                showTimeRange: [60640, 63640],
                roleName: '学生甲',
                text: [
                  {
                    value: '好，好，你歇着，你歇着。剩下的我来。',
                  },
                ],
              },
              {
                key: 12,
                showTimeRange: [64240, 69880],
                roleName: '环境音',
                text: [
                  {
                    value: '打扫声',
                  },
                ],
              },
            ],
            captionEn: [
              { key: 0, showTimeRange: [1240, 3040], roleName: 'Ambient sound', text: [{ value: 'Sound of cleaning' }] },
              { key: 1, showTimeRange: [3120, 4180], roleName: 'Student A', text: [{ value: 'Sorry for being late.' }] },
              {
                key: 2,
                showTimeRange: [6640, 8480],
                roleName: 'Student B',
                text: [{ value: "It's fine. I'm almost finished here." }],
              },
              {
                key: 3,
                showTimeRange: [9560, 12840],
                roleName: 'Student A',
                text: [{ value: 'Principal Yang can take it all on me if he likes punishing people.' }],
              },
              {
                key: 4,
                showTimeRange: [14000, 17560],
                roleName: 'Student B',
                text: [{ value: "I appreciate that, but it won't work. He's a pure perv." }],
              },
              { key: 5, showTimeRange: [17680, 19720], roleName: 'Student A', text: [{ value: "Don't say that." }] },
              {
                key: 6,
                showTimeRange: [20040, 32440],
                roleName: 'Student B',
                clue: 'i16',
                text: [
                  { value: '' },
                  {
                    isKey: true,
                    value:
                      "That's true. I heard that my dad was going to send me here, so I looked this place up online. Some graduates said that the principal was a perv.",
                  },
                  { value: '' },
                ],
              },
              {
                key: 7,
                showTimeRange: [33400, 39040],
                roleName: 'Student A',
                clue: 'i16',
                text: [
                  { value: '' },
                  { isKey: true, value: 'Ah？if...if the student really said so, it means he is not cured' },
                  { value: '' },
                ],
              },
              {
                key: 8,
                showTimeRange: [39240, 44440],
                roleName: 'Student B',
                clue: 'i16',
                text: [
                  { value: '' },
                  { isKey: true, value: 'Yes, he faked it. He pretended to be cured so he could get out.' },
                  { value: '' },
                ],
              },
              {
                key: 9,
                showTimeRange: [44560, 53240],
                roleName: 'Student A',
                clue: 'i16',
                text: [
                  { value: '' },
                  {
                    isKey: true,
                    value:
                      "Ah？.don't say it to anyone else. You have to stick to it that those people were slandering the principal. Otherwise you'd be in trouble,",
                  },
                  { value: '' },
                ],
              },
              {
                key: 10,
                showTimeRange: [55800, 60400],
                roleName: 'Student B',
                text: [{ value: "I know. You can do the cleaning. I'll have some rest." }],
              },
              {
                key: 11,
                showTimeRange: [60640, 63640],
                roleName: 'Student A',
                text: [{ value: "Take your time. I'll take it from here" }],
              },
              {
                key: 12,
                showTimeRange: [64240, 69880],
                roleName: 'Ambient sound',
                text: [{ value: 'Sound of cleaning' }],
              },
            ],
            clickableTimeRange: [
              {
                startTimestamp: 0,
                endTimestamp: 69800,
              },
            ],
            resource: {
              aid: 'day-1-morning-classroom.mp3',
            },
          },
          office: {
            caption: [
              {
                key: 0,
                showTimeRange: [1080, 1640],
                roleName: '杨校长',
                text: [
                  {
                    value: '进。',
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [5280, 6960],
                roleName: '李教官',
                text: [
                  {
                    value: '老师，您找我？',
                  },
                ],
              },
              {
                key: 2,
                showTimeRange: [7920, 15040],
                roleName: '杨校长',
                text: [
                  {
                    value: '江弘文，校庆那天前后，就关到我的办公室里吧。',
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [15400, 16760],
                roleName: '李教官',
                text: [
                  {
                    value: '是，老师。',
                  },
                ],
              },
              {
                key: 4,
                showTimeRange: [17200, 23040],
                roleName: '杨校长',
                text: [
                  {
                    value: '去干你自己的事吧，一会儿有人要来，我还要准备准备。',
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [23880, 25040],
                roleName: '李教官',
                text: [
                  {
                    value: '老师再见。',
                  },
                ],
              },
            ],
            captionEn: [
              { key: 0, showTimeRange: [1080, 1640], roleName: 'Principal Yang', text: [{ value: 'Come in.' }] },
              {
                key: 1,
                showTimeRange: [5280, 6960],
                roleName: 'Officer Li',
                text: [{ value: 'Are you looking for me, sir?' }],
              },
              {
                key: 2,
                showTimeRange: [7920, 15040],
                roleName: 'Principal Yang',
                text: [{ value: 'Lock Jiang Hongwen in my office around the school anniversary event.' }],
              },
              { key: 3, showTimeRange: [15400, 16760], roleName: 'Officer Li', text: [{ value: 'Yes, sir.' }] },
              {
                key: 4,
                showTimeRange: [17200, 23040],
                roleName: 'Principal Yang',
                text: [{ value: 'Go and do your thing. I need to prepare for a meeting.' }],
              },
              { key: 5, showTimeRange: [23880, 25040], roleName: 'Officer Li', text: [{ value: 'Bye, sir.' }] },
            ],
            clickableTimeRange: [
              {
                startTimestamp: 0,
                endTimestamp: 29000,
              },
            ],
            resource: {
              aid: 'day-1-morning-office.mp3',
            },
          },
        },
      },
      forenoon: {
        scene: {
          kitchen: {
            caption: [
              {
                key: 0,
                showTimeRange: [9160, 18280],
                roleName: '环境音',
                text: [
                  {
                    value: '炒菜声',
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [21000, 21760],
                roleName: '厨师甲',
                text: [
                  {
                    value: '端菜！',
                  },
                ],
              },
              {
                key: 2,
                showTimeRange: [23320, 24640],
                roleName: '厨师甲',
                text: [
                  {
                    value: '开饭了！',
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [24840, 26400],
                roleName: '伙计',
                text: [
                  {
                    value: '哎，来了来了......',
                  },
                ],
              },
              {
                key: 4,
                showTimeRange: [27000, 30420],
                roleName: '厨师甲',
                text: [
                  {
                    value: '你一个伙计，每天吃饭倒是挺积极啊。',
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [30720, 35240],
                roleName: '伙计',
                text: [
                  {
                    value: '这话说的，我也没少干活啊。哟，今天菜还行啊。',
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [35360, 39600],
                roleName: '厨师甲',
                text: [
                  {
                    value: '哎，手往哪伸呢？那是杨校长的，拿旁边那个。',
                  },
                ],
              },
              {
                key: 7,
                showTimeRange: [42080, 47240],
                roleName: '伙计',
                text: [
                  {
                    value: '这是人吃的吗？这学生还没开饭呢，就不能让我们吃好点呀？',
                  },
                ],
              },
              {
                key: 8,
                showTimeRange: [47320, 50560],
                roleName: '厨师甲',
                text: [
                  {
                    value: '废什么话？我吃的和你一样，你当我愿意？哎，走走走。',
                  },
                ],
              },
              {
                key: 9,
                showTimeRange: [51080, 51480],
                roleName: '伙计',
                text: [
                  {
                    value: '哼！',
                  },
                ],
              },
              {
                key: 10,
                showTimeRange: [54840, 56080],
                roleName: '厨师甲',
                text: [
                  {
                    value: '下一个！',
                  },
                ],
              },
              {
                key: 11,
                showTimeRange: [56600, 60200],
                roleName: '厨师甲',
                text: [
                  {
                    value: '嘿，嘿，胡老师啊，今天来挺早，没课啊？',
                  },
                ],
              },
              {
                key: 12,
                showTimeRange: [60720, 62120],
                roleName: '职工',
                text: [
                  {
                    value: '师傅，我拿哪个？',
                  },
                ],
              },
              {
                key: 13,
                showTimeRange: [62240, 65280],
                roleName: '厨师甲',
                text: [
                  {
                    value: '呦，胡老师，您拿左边那份，哎呀，对不住啊。',
                  },
                ],
              },
              {
                key: 14,
                showTimeRange: [65400, 67200],
                roleName: '职工',
                text: [
                  {
                    value: '这……唉......',
                  },
                ],
              },
              {
                key: 15,
                showTimeRange: [67560, 70120],
                roleName: '职工',
                text: [
                  {
                    value: '我还以为来早点儿能吃点儿好的呢。',
                  },
                ],
              },
              {
                key: 16,
                showTimeRange: [70400, 75440],
                roleName: '厨师甲',
                text: [
                  {
                    value: '呵呵，您别生气，至少比学生吃的好不是？',
                  },
                ],
              },
              {
                key: 17,
                showTimeRange: [76240, 82190],
                roleName: '职工',
                text: [
                  {
                    value: '你还不如不告诉我呢，学生多苦啊。你看看，现在还有好多学生赶不上饭点儿。',
                  },
                ],
              },
              {
                key: 18,
                showTimeRange: [83040, 91240],
                roleName: '厨师甲',
                text: [
                  {
                    value: '哎，不是，胡老师，您瞧您这矫情劲儿，您要是不乐意啊，去拿自己这碗跟学生换，别跟我这儿嘀咕。',
                  },
                ],
              },
              {
                key: 19,
                showTimeRange: [91360, 99440],
                roleName: '职工',
                text: [
                  {
                    value: '你......我换我也只能换一个学生的，你说，他们交了那么多钱 ，你要不把这些菜，给学生们匀匀？',
                  },
                ],
              },
              {
                key: 20,
                showTimeRange: [100920, 104080],
                roleName: '厨师甲',
                text: [
                  {
                    value: '哪些呀？您说出来，您让我匀哪些菜？',
                  },
                ],
              },
              {
                key: 21,
                showTimeRange: [105080, 106480],
                roleName: '职工',
                text: [
                  {
                    value: '那个谁的菜。',
                  },
                ],
              },
              {
                key: 22,
                showTimeRange: [107560, 114400],
                roleName: '厨师甲',
                text: [
                  {
                    value: '您敢当好人，您倒是敢说出来啊 ，最后倒霉的不是你，好人全给你当了不是。  ',
                  },
                ],
              },
              {
                key: 23,
                showTimeRange: [114480, 117240],
                roleName: '职工',
                text: [
                  {
                    value: '哎...你这话说的就过分了啊。',
                  },
                ],
              },
              {
                key: 24,
                showTimeRange: [117440, 123240],
                roleName: '厨师甲',
                text: [
                  {
                    value: '别跟我这逗了，都还排着队呢，你安心吃自己那份饭去，没能力就别操心别人。',
                  },
                ],
              },
              {
                key: 25,
                showTimeRange: [124800, 125880],
                roleName: '厨师甲',
                text: [
                  {
                    value: '什么东西。',
                  },
                ],
              },
              {
                key: 26,
                showTimeRange: [126800, 127880],
                roleName: '厨师甲',
                text: [
                  {
                    value: '下一个！',
                  },
                ],
              },
            ],
            captionEn: [
              { key: 0, showTimeRange: [9160, 18280], roleName: 'Ambient sound', text: [{ value: 'Sound of cooking' }] },
              { key: 1, showTimeRange: [21000, 21760], roleName: 'Chef A', text: [{ value: 'Serve！' }] },
              { key: 2, showTimeRange: [23320, 24640], roleName: 'Chef A', text: [{ value: 'Time for meal！' }] },
              { key: 3, showTimeRange: [24840, 26400], roleName: 'Clerk', text: [{ value: 'Coming.' }] },
              {
                key: 4,
                showTimeRange: [27000, 30420],
                roleName: 'Chef A',
                text: [{ value: "You're never late for meal." }],
              },
              {
                key: 5,
                showTimeRange: [30720, 35240],
                roleName: 'Clerk',
                text: [{ value: "Oh, come on. I work hard to feed myself. Today's dishes look good." }],
              },
              {
                key: 6,
                showTimeRange: [35360, 39600],
                roleName: 'Chef A',
                text: [{ value: "Where are you reaching? That's Principal Yang's meal." }],
              },
              {
                key: 7,
                showTimeRange: [42080, 47240],
                roleName: 'Clerk',
                text: [{ value: "Is this even edible? We are not students. Can't we eat something decent?" }],
              },
              {
                key: 8,
                showTimeRange: [47320, 50560],
                roleName: 'Chef A',
                text: [{ value: "Don't complain. I'm having the same food as yours. Do you think I enjoy it? Just go." }],
              },
              { key: 9, showTimeRange: [51080, 51480], roleName: 'Clerk', text: [{ value: 'Pfft!' }] },
              { key: 10, showTimeRange: [54840, 56080], roleName: 'Chef A', text: [{ value: 'Next！' }] },
              {
                key: 11,
                showTimeRange: [56600, 60200],
                roleName: 'Chef A',
                text: [{ value: 'Hey, Mr. Hu. You came early. No more class?' }],
              },
              { key: 12, showTimeRange: [60720, 62120], roleName: 'Staff', text: [{ value: 'Sir, which one is mine?' }] },
              {
                key: 13,
                showTimeRange: [62240, 65280],
                roleName: 'Chef A',
                text: [{ value: "Mr. Hu, yours is on the left. I'm sorry." }],
              },
              { key: 14, showTimeRange: [65400, 67200], roleName: 'Staff', text: [{ value: 'Huh?.' }] },
              {
                key: 15,
                showTimeRange: [67560, 70120],
                roleName: 'Staff',
                text: [{ value: 'I was thinking maybe if I came early, there would be something better.' }],
              },
              {
                key: 16,
                showTimeRange: [70400, 75440],
                roleName: 'Chef A',
                text: [{ value: "Don't be upset. At least it's better than the students' food." }],
              },
              {
                key: 17,
                showTimeRange: [76240, 82190],
                roleName: 'Staff',
                text: [
                  {
                    value:
                      "You're not making me feel better. The students get the worst. Many of them miss the meal time.",
                  },
                ],
              },
              {
                key: 18,
                showTimeRange: [83040, 91240],
                roleName: 'Chef A',
                text: [
                  {
                    value:
                      "Mr. Hu, if you have a problem with that, you can give your food to a student. Don't complain to me.",
                  },
                ],
              },
              {
                key: 19,
                showTimeRange: [91360, 99440],
                roleName: 'Staff',
                text: [
                  {
                    value:
                      'You......If I do that, only one student gets to eat. They paid so much money. Could you take a portion of his food and give it to the students?',
                  },
                ],
              },
              {
                key: 20,
                showTimeRange: [100920, 104080],
                roleName: 'Chef A',
                text: [{ value: 'Whose food? Can you be more specific?' }],
              },
              {
                key: 21,
                showTimeRange: [105080, 106480],
                roleName: 'Staff',
                text: [{ value: "You know who I'm referring to." }],
              },
              {
                key: 22,
                showTimeRange: [107560, 114400],
                roleName: 'Chef A',
                text: [
                  {
                    value:
                      "If you really are a hero, why don't you just say the name? After all, you won't be responsible for that. You're acting so nice, aren't you?  ",
                  },
                ],
              },
              {
                key: 23,
                showTimeRange: [114480, 117240],
                roleName: 'Staff',
                text: [{ value: "You don't get to say that" }],
              },
              {
                key: 24,
                showTimeRange: [117440, 123240],
                roleName: 'Chef A',
                text: [
                  {
                    value:
                      "Come on, enough. They're still waiting behind you. Just eat your stuff and mind your own business, since you're not capable to worry about others.",
                  },
                ],
              },
              { key: 25, showTimeRange: [124800, 125880], roleName: 'Chef A', text: [{ value: 'Weirdo. ' }] },
              { key: 26, showTimeRange: [126800, 127880], roleName: 'Chef A', text: [{ value: 'Next！' }] },
            ],
            clickableTimeRange: [
              {
                startTimestamp: 9000,
                endTimestamp: 128440,
              },
            ],
            resource: {
              aid: 'day-1-forenoon-kitchen.mp3',
            },
          },
          playground: {
            caption: [
              {
                key: 0,
                showTimeRange: [2840, 3720],
                roleName: '女生',
                text: [
                  {
                    value: '教官好。',
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [4440, 5760],
                roleName: '教官甲',
                text: [
                  {
                    value: '哎，怎么样？',
                  },
                ],
              },
              {
                key: 2,
                showTimeRange: [6840, 10240],
                roleName: '教官乙',
                text: [
                  {
                    value: '小屁孩有什么好看的呀？成年了没有都不知道。',
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [10920, 13000],
                roleName: '教官乙',
                text: [
                  {
                    value: '你这毛病回国都得坐牢我跟你说。',
                  },
                ],
              },
              {
                key: 4,
                showTimeRange: [13640, 15040],
                roleName: '教官甲',
                text: [
                  {
                    value: '放什么屁呢。',
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [15480, 18920],
                roleName: '教官乙',
                text: [
                  {
                    value: '哎总之，我劝你少开女生的玩笑。昂。',
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [19920, 22480],
                roleName: '教官甲',
                text: [
                  {
                    value: '没看出来你这么正派呢？ ',
                  },
                ],
              },
              {
                key: 7,
                showTimeRange: [22880, 29160],
                roleName: '教官乙',
                clue: 'i18',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '正派啥啊，我是怕，那万一杨校长也喜欢呢？那你这不就是……',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 8,
                showTimeRange: [30240, 33680],
                roleName: '教官甲',
                clue: 'i18',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '哎，哎，你......别这么吓唬人啊。',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 9,
                showTimeRange: [34360, 40040],
                roleName: '教官乙',
                clue: 'i18',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '你就想啊，电击的时候那些学生都成啥样了，脑子都成浆糊了。',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 10,
                showTimeRange: [40760, 49120],
                roleName: '教官乙',
                clue: 'i18',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '这不是，想干啥都行吗？而且有时候你听那些惨叫声，就一次也没有？',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 11,
                showTimeRange: [49560, 60040],
                roleName: '教官甲',
                clue: 'i18',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '收收，这事，老刘跟我说过，杨校长的乐趣，在于当救世主，所以杨校长，他看不上这些小动作。',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 12,
                showTimeRange: [61360, 69000],
                roleName: '教官乙',
                text: [
                  {
                    value: '你说的有道理，唉，你说起老刘我突然想问，新来的这位李大姐什么来头？',
                  },
                ],
              },
              {
                key: 13,
                showTimeRange: [70240, 72840],
                roleName: '教官甲',
                text: [
                  {
                    value: '你没见过人，总见过她照片吧。',
                  },
                ],
              },
              {
                key: 14,
                showTimeRange: [73120, 74800],
                roleName: '教官甲',
                text: [
                  {
                    value: '我带你去，走。',
                  },
                ],
              },
            ],
            captionEn: [
              { key: 0, showTimeRange: [2840, 3720], roleName: 'Schoolgirl', text: [{ value: 'Hello, Officer.' }] },
              { key: 1, showTimeRange: [4440, 5760], roleName: 'Officer A', text: [{ value: 'What do you think?' }] },
              {
                key: 2,
                showTimeRange: [6840, 10240],
                roleName: 'Officer B',
                text: [{ value: "She's just a teenager. " }],
              },
              {
                key: 3,
                showTimeRange: [10920, 13000],
                roleName: 'Officer B',
                text: [{ value: "If you were back home, you'll end up in jail for such an interest." }],
              },
              { key: 4, showTimeRange: [13640, 15040], roleName: 'Officer A', text: [{ value: 'Don’t talk bullshit.' }] },
              {
                key: 5,
                showTimeRange: [15480, 18920],
                roleName: 'Officer B',
                text: [{ value: "I'm telling you, don't harass girls." }],
              },
              {
                key: 6,
                showTimeRange: [19920, 22480],
                roleName: 'Officer A',
                text: [{ value: "I didn't know you're so decent? " }],
              },
              {
                key: 7,
                showTimeRange: [22880, 29160],
                roleName: 'Officer B',
                clue: 'i18',
                text: [
                  { value: '' },
                  {
                    isKey: true,
                    value: "Decent my ass. I'm worried if Principal Yang likes her, you'd be stealing his love……",
                  },
                  { value: '' },
                ],
              },
              {
                key: 8,
                showTimeRange: [30240, 33680],
                roleName: 'Officer A',
                clue: 'i18',
                text: [{ value: '' }, { isKey: true, value: 'Don’t scare me.' }, { value: '' }],
              },
              {
                key: 9,
                showTimeRange: [34360, 40040],
                roleName: 'Officer B',
                clue: 'i18',
                text: [
                  { value: '' },
                  {
                    isKey: true,
                    value: "Think about it. The students' brains are totally messed up after the electrotherapy.",
                  },
                  { value: '' },
                ],
              },
              {
                key: 10,
                showTimeRange: [40760, 49120],
                roleName: 'Officer B',
                clue: 'i18',
                text: [
                  { value: '' },
                  {
                    isKey: true,
                    value:
                      ' You can do anything to them. Besides, sometimes the screaming was crazy. Something must have happened.',
                  },
                  { value: '' },
                ],
              },
              {
                key: 11,
                showTimeRange: [49560, 60040],
                roleName: 'Officer A',
                clue: 'i18',
                text: [
                  { value: '' },
                  {
                    isKey: true,
                    value:
                      "Stop there. Liu told me about that. Principal Yang is interested in being the savior. He thinks he's too good for such dirty tricks.",
                  },
                  { value: '' },
                ],
              },
              {
                key: 12,
                showTimeRange: [61360, 69000],
                roleName: 'Officer B',
                text: [
                  {
                    value:
                      "That makes sense. Since you mentioned Liu, I'm wondering what’s the story with this new lady Miss Li.",
                  },
                ],
              },
              {
                key: 13,
                showTimeRange: [70240, 72840],
                roleName: 'Officer A',
                text: [{ value: 'You must have seen a photo of her.' }],
              },
              { key: 14, showTimeRange: [73120, 74800], roleName: 'Officer A', text: [{ value: " I'll show you." }] },
            ],
            clickableTimeRange: [
              {
                startTimestamp: 0,
                endTimestamp: 77600,
              },
            ],
            resource: {
              aid: 'day-1-forenoon-playground.mp3',
            },
          },
          clinic: {
            caption: [
              { key: 0, showTimeRange: [56640, 57680], roleName: '环境音', text: [{ value: '敲门声' }] },
              {
                key: 1,
                showTimeRange: [58720, 60320],
                roleName: '侯逸',
                text: [{ value: '米医生，是我。' }],
              },
              { key: 2, showTimeRange: [60600, 62960], roleName: '米医生', text: [{ value: '侯逸？你怎么来了？' }] },
              {
                key: 3,
                showTimeRange: [63480, 66040],
                roleName: '侯逸',
                text: [{ value: '米医生，我疼，我疼。' }],
              },
              { key: 4, showTimeRange: [66640, 68120], roleName: '米医生', text: [{ value: '这挺少见的。' }] },
              {
                key: 5,
                showTimeRange: [68600, 70520],
                roleName: '侯逸',
                text: [{ value: '您别嘲笑我了，快给我弄弄吧。' }],
              },
              { key: 6, showTimeRange: [71320, 72600], roleName: '米医生', text: [{ value: '来趴下我看看。' }] },
              {
                key: 7,
                showTimeRange: [75640, 76640],
                roleName: '米医生',
                text: [{ value: '惹教官了？' }],
              },
              { key: 8, showTimeRange: [76720, 77720], roleName: '侯逸', text: [{ value: '你怎么知道？' }] },
              {
                key: 9,
                showTimeRange: [78280, 80840],
                roleName: '米医生',
                text: [{ value: '你身上这么大的脚印谁看不到啊。' }],
              },
              { key: 10, showTimeRange: [81680, 83160], roleName: '侯逸', text: [{ value: '这？这么狠啊！' }] },
              {
                key: 11,
                showTimeRange: [83520, 87960],
                roleName: '米医生',
                text: [{ value: '学生也不敢惹你啊，能把你打成这样的也没几个。' }],
              },
              { key: 12, showTimeRange: [88520, 91040], roleName: '侯逸', text: [{ value: '李教官下脚也太狠了。' }] },
              {
                key: 13,
                showTimeRange: [91160, 92160],
                roleName: '米医生',
                text: [{ value: '是她啊。' }],
              },
              { key: 14, showTimeRange: [92360, 93760], roleName: '侯逸', text: [{ value: '你，你也知道是吧。' }] },
              {
                key: 15,
                showTimeRange: [94680, 96800],
                roleName: '侯逸',
                text: [{ value: '哎，她是不是打了好多学生？' }],
              },
              { key: 16, showTimeRange: [97120, 98640], roleName: '米医生', text: [{ value: '她为什么这么打你？' }] },
              {
                key: 17,
                showTimeRange: [99120, 100320],
                roleName: '侯逸',
                text: [{ value: '一说就来气。' }],
              },
              {
                key: 18,
                showTimeRange: [101320, 118080],
                roleName: '侯逸',
                text: [
                  {
                    value:
                      '你说我，我怎么说，也算个优秀学生的一种吧。这新来的总教官，我就想着跟新来的教官处好关系，结果，她非但不领情，还说见一次打我一次。',
                  },
                ],
              },
              {
                key: 19,
                showTimeRange: [119520, 122400],
                roleName: '米医生',
                text: [{ value: '李教官可是当年最优秀的毕业生。' }],
              },
              {
                key: 20,
                showTimeRange: [123040, 126760],
                roleName: '侯逸',
                text: [{ value: '她在学校待过还下这么狠的手呢。' }],
              },
              {
                key: 21,
                showTimeRange: [127440, 129560],
                roleName: '米医生',
                text: [{ value: '你肯定是做了她看不上的事情。' }],
              },
              {
                key: 22,
                showTimeRange: [129640, 132840],
                roleName: '侯逸',
                text: [{ value: '我，我惹不起，我还躲不起么。' }],
              },
              {
                key: 23,
                showTimeRange: [133280, 137760],
                roleName: '米医生',
                text: [{ value: '行了，给你抹了消肿的药，回宿舍趴着吧。' }],
              },
              { key: 24, showTimeRange: [138360, 139920], roleName: '侯逸', text: [{ value: '我在这儿趴会吧。' }] },
              {
                key: 25,
                showTimeRange: [140160, 141160],
                roleName: '米医生',
                text: [{ value: '给我回去。' }],
              },
              { key: 26, showTimeRange: [141640, 143000], roleName: '侯逸', text: [{ value: '得得得......' }] },
              {
                key: 27,
                showTimeRange: [143120, 144280],
                roleName: '侯逸',
                text: [{ value: '我这就走。' }],
              },
              { key: 28, showTimeRange: [145480, 146600], roleName: '侯逸', text: [{ value: '谢谢啊，米医生。' }] },
              {
                key: 29,
                showTimeRange: [148520, 149520],
                roleName: '环境音',
                text: [{ value: '关门声' }],
              },
            ],
            captionEn: [
              {
                key: 0,
                showTimeRange: [56640, 57680],
                roleName: 'Ambient sound',
                text: [{ value: 'Knock on the door' }],
              },
              { key: 1, showTimeRange: [58720, 60320], roleName: 'HOU Yi', text: [{ value: "Dr. Mi, it's me." }] },
              {
                key: 2,
                showTimeRange: [60600, 62960],
                roleName: 'Dr. Mi',
                text: [{ value: 'What are you doing here, HOU Yi?' }],
              },
              { key: 3, showTimeRange: [63480, 66040], roleName: 'HOU Yi', text: [{ value: 'It hurts so bad.' }] },
              { key: 4, showTimeRange: [66640, 68120], roleName: 'Dr. Mi', text: [{ value: "That's rare." }] },
              {
                key: 5,
                showTimeRange: [68600, 70520],
                roleName: 'HOU Yi',
                text: [{ value: "Please don't mock me. Help me." }],
              },
              { key: 6, showTimeRange: [71320, 72600], roleName: 'Dr. Mi', text: [{ value: 'Lie down.' }] },
              {
                key: 7,
                showTimeRange: [75640, 76640],
                roleName: 'Dr. Mi',
                text: [{ value: 'Did you mess with the officerr?' }],
              },
              { key: 8, showTimeRange: [76720, 77720], roleName: 'HOU Yi', text: [{ value: 'How do you know？' }] },
              {
                key: 9,
                showTimeRange: [78280, 80840],
                roleName: 'Dr. Mi',
                text: [{ value: "I'm not blind. I can see the footprint on your body." }],
              },
              {
                key: 10,
                showTimeRange: [81680, 83160],
                roleName: 'HOU Yi',
                text: [{ value: "Footprint? She's horrible." }],
              },
              {
                key: 11,
                showTimeRange: [83520, 87960],
                roleName: 'Dr. Mi',
                text: [
                  {
                    value:
                      "No students will mess with you. There aren't so many people who are capable of doing this to you.",
                  },
                ],
              },
              {
                key: 12,
                showTimeRange: [88520, 91040],
                roleName: 'HOU Yi',
                text: [{ value: 'Officerr Li is the worst' }],
              },
              { key: 13, showTimeRange: [91160, 92160], roleName: 'Dr. Mi', text: [{ value: "Oh, it's her." }] },
              {
                key: 14,
                showTimeRange: [92360, 93760],
                roleName: 'HOU Yi',
                text: [{ value: 'You know about it, right? ' }],
              },
              {
                key: 15,
                showTimeRange: [94680, 96800],
                roleName: 'HOU Yi',
                text: [{ value: 'She must have a lot of victims.' }],
              },
              { key: 16, showTimeRange: [97120, 98640], roleName: 'Dr. Mi', text: [{ value: 'Why did she kick you?' }] },
              {
                key: 17,
                showTimeRange: [99120, 100320],
                roleName: 'HOU Yi',
                text: [{ value: "I think I'm among the good kids here. " }],
              },
              {
                key: 18,
                showTimeRange: [101320, 118080],
                roleName: 'HOU Yi',
                text: [
                  {
                    value:
                      "A new officerr came, so I figured I'd better try to get along with her. She didn't buy it, and even said she would kick me every time she saw me.",
                  },
                ],
              },
              {
                key: 19,
                showTimeRange: [119520, 122400],
                roleName: 'Dr. Mi',
                text: [{ value: 'Officerr Li was the best graduate.' }],
              },
              {
                key: 20,
                showTimeRange: [123040, 126760],
                roleName: 'HOU Yi',
                text: [{ value: 'My god. Why is she such a brute if she had been here herself?' }],
              },
              {
                key: 21,
                showTimeRange: [127440, 129560],
                roleName: 'Dr. Mi',
                text: [{ value: 'You must have done something that made her despise you.' }],
              },
              {
                key: 22,
                showTimeRange: [129640, 132840],
                roleName: 'HOU Yi',
                text: [{ value: "Guess I'd better stay out of her sight." }],
              },
              {
                key: 23,
                showTimeRange: [133280, 137760],
                roleName: 'Dr. Mi',
                text: [{ value: 'I gave you some ointment for the swelling. Go back to your dorm and have some rest.' }],
              },
              { key: 24, showTimeRange: [138360, 139920], roleName: 'HOU Yi', text: [{ value: 'I want to rest here.' }] },
              { key: 25, showTimeRange: [140160, 141160], roleName: 'Dr. Mi', text: [{ value: 'Go back.' }] },
              { key: 26, showTimeRange: [141640, 143000], roleName: 'HOU Yi', text: [{ value: 'Fine......' }] },
              { key: 27, showTimeRange: [143120, 144280], roleName: 'HOU Yi', text: [{ value: " I'll go." }] },
              { key: 28, showTimeRange: [145480, 146600], roleName: 'HOU Yi', text: [{ value: 'Thank you, Dr. Mi' }] },
              {
                key: 29,
                showTimeRange: [148520, 149520],
                roleName: 'Ambient sound',
                text: [{ value: 'Door closing sound' }],
              },
            ],
  
            clickableTimeRange: [
              {
                startTimestamp: 56480,
                endTimestamp: 149520,
              },
            ],
            resource: {
              aid: 'day-1-forenoon-clinic.mp3',
            },
          },
          classroom: {
            caption: [
              {
                key: 0,
                showTimeRange: [34080, 35120],
                roleName: '教官甲',
                text: [
                  {
                    value: '没长眼吗？',
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [35400, 37080],
                roleName: '学生',
                text: [
                  {
                    value: '教……教官。',
                  },
                ],
              },
              {
                key: 2,
                showTimeRange: [37360, 39920],
                roleName: '教官甲',
                text: [
                  {
                    value: '现在知道我是教官了？',
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [40280, 43120],
                roleName: '学生',
                text: [
                  {
                    value: '对不起教官，我不是故意不跟你打招呼的。',
                  },
                ],
              },
              {
                key: 4,
                showTimeRange: [43440, 46400],
                roleName: '教官甲',
                text: [
                  {
                    value: '你让我很没面子你知道吗？',
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [47280, 50800],
                roleName: '学生',
                text: [
                  {
                    value: '我......不是故意的，我就是走路没看见你。',
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [51120, 51480],
                roleName: '教官甲',
                text: [
                  {
                    value: '哼！',
                  },
                ],
              },
              {
                key: 7,
                showTimeRange: [52320, 54960],
                roleName: '教官甲',
                text: [
                  {
                    value: '走路不抬头是吧？',
                  },
                ],
              },
              {
                key: 8,
                showTimeRange: [55160, 56880],
                roleName: '教官甲',
                text: [
                  {
                    value: '没看见我是吧？',
                  },
                ],
              },
              {
                key: 9,
                showTimeRange: [57880, 59920],
                roleName: '学生',
                text: [
                  {
                    value: '我真的错了，教官。',
                  },
                ],
              },
              {
                key: 10,
                showTimeRange: [61480, 65000],
                roleName: '教官甲',
                text: [
                  {
                    value: '我今天就让你认识认识我……',
                  },
                ],
              },
              {
                key: 11,
                showTimeRange: [65360, 67920],
                roleName: '环境音',
                text: [
                  {
                    value: '抽打声',
                  },
                ],
              },
              {
                key: 12,
                showTimeRange: [68000, 74240],
                roleName: '教官乙',
                text: [
                  {
                    value: '哎，哎，老吴，差不多得了。快上课了他们，一会人都过来了。',
                  },
                ],
              },
              {
                key: 13,
                showTimeRange: [74720, 82840],
                roleName: '教官甲',
                text: [
                  {
                    value: '上课怎么啦！上课我不能打他？他们上这课有个屁用，还上课。',
                  },
                ],
              },
              {
                key: 14,
                showTimeRange: [85560, 86600],
                roleName: '教官乙',
                text: [
                  {
                    value: '那你随便吧。',
                  },
                ],
              },
              {
                key: 15,
                showTimeRange: [86880, 91800],
                roleName: '环境音',
                text: [
                  {
                    value: '抽打声',
                  },
                ],
              },
              {
                key: 16,
                showTimeRange: [93880, 96720],
                roleName: '教官甲',
                text: [
                  {
                    value: '你还认得他是什么身份吗？',
                  },
                ],
              },
              {
                key: 17,
                showTimeRange: [98360, 100920],
                roleName: '学生',
                text: [
                  {
                    value: '我知道...教官。',
                  },
                ],
              },
              {
                key: 18,
                showTimeRange: [101680, 106560],
                roleName: '教官乙',
                text: [
                  {
                    value: '哎呀，这学生不是这个班的，你先回教官宿舍。我处理他。',
                  },
                ],
              },
              {
                key: 19,
                showTimeRange: [106640, 107120],
                roleName: '教官甲',
                text: [
                  {
                    value: '哼。',
                  },
                ],
              },
              {
                key: 20,
                showTimeRange: [108640, 109600],
                roleName: '教官乙',
                text: [
                  {
                    value: '你跟我走吧。',
                  },
                ],
              },
              {
                key: 21,
                showTimeRange: [111440, 117120],
                roleName: '教官乙',
                text: [
                  {
                    value: '哎呀，他以前啊，不是这样。就是来了这以后吧……唉。',
                  },
                ],
              },
              {
                key: 22,
                showTimeRange: [119200, 120200],
                roleName: '学生',
                text: [
                  {
                    value: '我以前......',
                  },
                ],
              },
              {
                key: 23,
                showTimeRange: [125000, 121400],
                roleName: '学生',
                text: [
                  {
                    value: '也不是这样。',
                  },
                ],
              },
              {
                key: 24,
                showTimeRange: [121240, 122280],
                roleName: '教官乙',
                text: [
                  {
                    value: '唉。',
                  },
                ],
              },
            ],
            captionEn: [
              { key: 0, showTimeRange: [34080, 35120], roleName: 'Officer A', text: [{ value: 'Are you blind?' }] },
              { key: 1, showTimeRange: [35400, 37080], roleName: 'Student', text: [{ value: 'S... Sir' }] },
              {
                key: 2,
                showTimeRange: [37360, 39920],
                roleName: 'Officer A',
                text: [{ value: 'Now you know who I am?' }],
              },
              {
                key: 3,
                showTimeRange: [40280, 43120],
                roleName: 'Student',
                text: [{ value: "Sorry, sir. I didn't greet you because I didn't see you." }],
              },
              {
                key: 4,
                showTimeRange: [43440, 46400],
                roleName: 'Officer A',
                text: [{ value: 'You embarrassed me. Do you know that?' }],
              },
              {
                key: 5,
                showTimeRange: [47280, 50800],
                roleName: 'Student',
                text: [{ value: 'It was an accident. I didn’t see you coming' }],
              },
              { key: 6, showTimeRange: [51120, 51480], roleName: 'Officer A', text: [{ value: 'Pfft！' }] },
              {
                key: 7,
                showTimeRange: [52320, 54960],
                roleName: 'Officer A',
                text: [{ value: 'You like to keep your eyes on the road while walking, huh?' }],
              },
              {
                key: 8,
                showTimeRange: [55160, 56880],
                roleName: 'Officer A',
                text: [{ value: "You didn't see me, huh?" }],
              },
              { key: 9, showTimeRange: [57880, 59920], roleName: 'Student', text: [{ value: "I'm really sorry。" }] },
              {
                key: 10,
                showTimeRange: [61480, 65000],
                roleName: 'Officer A',
                text: [{ value: 'I will give you a good chance to see me today……' }],
              },
              {
                key: 11,
                showTimeRange: [65360, 67920],
                roleName: 'Ambient sound',
                text: [{ value: 'Sound of whipping' }],
              },
              {
                key: 12,
                showTimeRange: [68000, 74240],
                roleName: 'Officer B',
                text: [{ value: 'Enough. The class is about to begin. People are coming.' }],
              },
              {
                key: 13,
                showTimeRange: [74720, 82840],
                roleName: 'Officer A',
                text: [
                  {
                    value:
                      "So what? Are you saying I can't beat him just because the class is about to begin? Class can’t save these little punks!",
                  },
                ],
              },
              { key: 14, showTimeRange: [85560, 86600], roleName: 'Officer B', text: [{ value: "Fine. I don't care." }] },
              {
                key: 15,
                showTimeRange: [86880, 91800],
                roleName: 'Ambient sound',
                text: [{ value: 'Sound of whipping' }],
              },
              {
                key: 16,
                showTimeRange: [93880, 96720],
                roleName: 'Officer A',
                text: [{ value: 'Do you know who he is?' }],
              },
              {
                key: 17,
                showTimeRange: [98360, 100920],
                roleName: 'Student',
                text: [{ value: 'I know. He is an Officer' }],
              },
              {
                key: 18,
                showTimeRange: [101680, 106560],
                roleName: 'Officer B',
                text: [{ value: "This student isn't in this class. Go back to your room. I will deal with him。" }],
              },
              { key: 19, showTimeRange: [106640, 107120], roleName: 'Officer A', text: [{ value: 'Pfft.' }] },
              { key: 20, showTimeRange: [108640, 109600], roleName: 'Officer B', text: [{ value: 'Come with me. ' }] },
              {
                key: 21,
                showTimeRange: [111440, 117120],
                roleName: 'Officer B',
                text: [{ value: "He wasn't like this before. This place totally changed him." }],
              },
              { key: 22, showTimeRange: [119200, 120200], roleName: 'Student', text: [{ value: "I wasn't......" }] },
              { key: 23, showTimeRange: [125000, 121400], roleName: 'Student', text: [{ value: ' like this, either.' }] },
              { key: 24, showTimeRange: [121240, 122280], roleName: 'Officer B', text: [{ value: 'Alas。' }] },
            ],
  
            clickableTimeRange: [
              {
                startTimestamp: 31000,
                endTimestamp: 127000,
              },
            ],
            resource: {
              aid: 'day-1-forenoon-classroom.mp3',
            },
          },
          office: {
            caption: [
              {
                key: 0,
                showTimeRange: [520, 1160],
                roleName: '杨校长',
                text: [
                  {
                    value: '喂。',
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [2440, 3160],
                roleName: '杨校长',
                text: [
                  {
                    value: '喂。',
                  },
                ],
              },
              {
                key: 2,
                showTimeRange: [3240, 7680],
                roleName: '杨校长',
                text: [
                  {
                    value: '王代理啊，校庆后，来一趟学校吧。',
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [8320, 10800],
                roleName: '杨校长',
                text: [
                  {
                    value: '我要申请个新的专利。',
                  },
                ],
              },
              {
                key: 4,
                showTimeRange: [11760, 12760],
                roleName: '王代理',
                text: [
                  {
                    value: '什么专利呀？',
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [13400, 14360],
                roleName: '杨校长',
                text: [
                  {
                    value: '一种器械的。',
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [15200, 18760],
                roleName: '杨校长',
                text: [
                  {
                    value: '用来固定病人，方便治疗的。',
                  },
                ],
              },
              {
                key: 7,
                showTimeRange: [19160, 22280],
                roleName: '王代理',
                text: [
                  {
                    value: '哦......您写好专利申请书了吗？',
                  },
                ],
              },
              {
                key: 8,
                showTimeRange: [22960, 24480],
                roleName: '杨校长',
                text: [
                  {
                    value: '还没有写申请书。',
                  },
                ],
              },
              {
                key: 9,
                showTimeRange: [25480, 29080],
                roleName: '杨校长',
                text: [
                  {
                    value: '你们来写吧，我最近做新的实验有点忙。',
                  },
                ],
              },
              {
                key: 10,
                showTimeRange: [29680, 30200],
                roleName: '王代理',
                text: [
                  {
                    value: '哦。',
                  },
                ],
              },
              {
                key: 11,
                showTimeRange: [31000, 33680],
                roleName: '王代理',
                text: [
                  {
                    value: '哦，那好，我明后天呀，联系您。',
                  },
                ],
              },
              {
                key: 12,
                showTimeRange: [34040, 37320],
                roleName: '杨校长',
                text: [
                  {
                    value: '可以，校庆后我就有时间了。',
                  },
                ],
              },
              {
                key: 13,
                showTimeRange: [38800, 39760],
                roleName: '杨校长',
                text: [
                  {
                    value: '行。',
                  },
                ],
              },
              {
                key: 14,
                showTimeRange: [40400, 41440],
                roleName: '杨校长',
                text: [
                  {
                    value: '那我先挂了。',
                  },
                ],
              },
              {
                key: 15,
                showTimeRange: [41960, 43800],
                roleName: '杨校长',
                text: [
                  {
                    value: '我还要继续试验。',
                  },
                ],
              },
              {
                key: 16,
                showTimeRange: [44160, 45360],
                roleName: '杨校长',
                text: [
                  {
                    value: '哎.......',
                  },
                ],
              },
              {
                key: 17,
                showTimeRange: [46400, 46960],
                roleName: '杨校长',
                text: [
                  {
                    value: '拜拜。',
                  },
                ],
              },
              {
                key: 18,
                showTimeRange: [53640, 56360],
                roleName: '杨校长',
                text: [
                  {
                    value: '齐淼，你在这干嘛？',
                  },
                ],
              },
            ],
            captionEn: [
              { key: 0, showTimeRange: [520, 1160], roleName: 'Principal Yang', text: [{ value: 'Hello？' }] },
              { key: 1, showTimeRange: [2440, 3160], roleName: 'Principal Yang', text: [{ value: 'Hello！' }] },
              {
                key: 2,
                showTimeRange: [3240, 7680],
                roleName: 'Principal Yang',
                text: [{ value: "Wang, it's me. Come to the school after the anniversary." }],
              },
              {
                key: 3,
                showTimeRange: [8320, 10800],
                roleName: 'Principal Yang',
                text: [{ value: ' I need to apply for a patent.' }],
              },
              {
                key: 4,
                showTimeRange: [11760, 12760],
                roleName: 'Agent Wang',
                text: [{ value: 'What kind of patent?' }],
              },
              {
                key: 5,
                showTimeRange: [13400, 14360],
                roleName: 'Principal Yang',
                text: [{ value: 'A type of medical equipment' }],
              },
              {
                key: 6,
                showTimeRange: [15200, 18760],
                roleName: 'Principal Yang',
                text: [{ value: ' used for securing the patient during therapy.' }],
              },
              {
                key: 7,
                showTimeRange: [19160, 22280],
                roleName: 'Agent Wang',
                text: [{ value: 'Did you finish the application files?' }],
              },
              { key: 8, showTimeRange: [22960, 24480], roleName: 'Principal Yang', text: [{ value: 'Not yet. ' }] },
              {
                key: 9,
                showTimeRange: [25480, 29080],
                roleName: 'Principal Yang',
                text: [{ value: "You can do it. I've been busy doing experiments." }],
              },
              { key: 10, showTimeRange: [29680, 30200], roleName: 'Agent Wang', text: [{ value: 'OK.' }] },
              {
                key: 11,
                showTimeRange: [31000, 33680],
                roleName: 'Agent Wang',
                text: [{ value: " I'll call you later" }],
              },
              {
                key: 12,
                showTimeRange: [34040, 37320],
                roleName: 'Principal Yang',
                text: [{ value: 'OK. I’ll have time after the anniversary. ' }],
              },
              { key: 13, showTimeRange: [38800, 39760], roleName: 'Principal Yang', text: [{ value: 'OK.' }] },
              {
                key: 14,
                showTimeRange: [40400, 41440],
                roleName: 'Principal Yang',
                text: [{ value: " I'm hanging up." }],
              },
              {
                key: 15,
                showTimeRange: [41960, 43800],
                roleName: 'Principal Yang',
                text: [{ value: ' I have to continue the experiments. ' }],
              },
              { key: 16, showTimeRange: [44160, 45360], roleName: 'Principal Yang', text: [{ value: 'Yes. .......' }] },
              { key: 17, showTimeRange: [46400, 46960], roleName: 'Principal Yang', text: [{ value: 'Bye.' }] },
              {
                key: 18,
                showTimeRange: [53640, 56360],
                roleName: 'Principal Yang',
                text: [{ value: 'QI Miao, what are you doing here?' }],
              },
            ],
  
            clickableTimeRange: [
              {
                startTimestamp: 0,
                endTimestamp: 56800,
              },
            ],
            resource: {
              aid: 'day-1-forenoon-office.mp3',
            },
          },
        },
      },
      noon: {
        scene: {
          kitchen: {},
          playground: {
            caption: [
              { key: 0, showTimeRange: [64040, 65640], roleName: '齐淼', text: [{ value: '李教官，你找我。' }] },
              {
                key: 1,
                showTimeRange: [66240, 69640],
                roleName: '李教官',
                text: [{ value: '我在了解每个学生，来，坐。  ' }],
              },
              { key: 2, showTimeRange: [71440, 74120], roleName: '李教官', text: [{ value: '监察组组长齐淼。' }] },
              {
                key: 3,
                showTimeRange: [75200, 77120],
                roleName: '李教官',
                text: [{ value: '你是我最想了解的学生。  ' }],
              },
              { key: 4, showTimeRange: [77920, 79680], roleName: '齐淼', text: [{ value: '不，已经不是了。' }] },
              {
                key: 5,
                showTimeRange: [80800, 83840],
                roleName: '李教官',
                text: [{ value: '我刚来的时候，张扬还不是组长。  ' }],
              },
              { key: 6, showTimeRange: [84920, 85960], roleName: '齐淼', text: [{ value: '你想问什么？' }] },
              {
                key: 7,
                showTimeRange: [86880, 88680],
                roleName: '李教官',
                text: [{ value: '你是怎么被送进来的？' }],
              },
              {
                key: 8,
                showTimeRange: [89560, 91480],
                roleName: '齐淼',
                text: [{ value: '很简单，我不是个好孩子。 ' }],
              },
              {
                key: 9,
                showTimeRange: [92160, 93200],
                roleName: '李教官',
                text: [{ value: '你不是？' }],
              },
              { key: 10, showTimeRange: [93960, 95600], roleName: '李教官', text: [{ value: '那什么叫好孩子？' }] },
              {
                key: 11,
                showTimeRange: [95960, 96960],
                roleName: '齐淼',
                text: [{ value: '听话的。' }],
              },
              { key: 12, showTimeRange: [97880, 99680], roleName: '李教官', text: [{ value: '那你在这里是好孩子。' }] },
              {
                key: 13,
                showTimeRange: [99840, 101040],
                roleName: '齐淼',
                text: [{ value: '如果没有其他事情的话。' }],
              },
              {
                key: 14,
                showTimeRange: [101160, 102800],
                roleName: '李教官',
                text: [{ value: '你最近跟张扬走的挺近。' }],
              },
              {
                key: 15,
                showTimeRange: [103760, 104840],
                roleName: '齐淼',
                text: [{ value: '我，在监视他。' }],
              },
              {
                key: 16,
                showTimeRange: [105040, 107440],
                roleName: '李教官',
                text: [{ value: '因为他抢了你的监察组组长？' }],
              },
              {
                key: 17,
                showTimeRange: [108280, 113000],
                roleName: '齐淼',
                text: [{ value: '如果是他抢走的，我没怨言，但他那是偷，我看不起他。' }],
              },
              { key: 18, showTimeRange: [114080, 115480], roleName: '李教官', text: [{ value: '我也看不起他。' }] },
              {
                key: 19,
                showTimeRange: [116040, 119400],
                roleName: '齐淼',
                text: [{ value: '他可是很受杨校长的喜欢，我以为你也会。' }],
              },
              {
                key: 20,
                showTimeRange: [119720, 122160],
                roleName: '李教官',
                text: [{ value: '这就是我不喜欢他的地方。' }],
              },
              {
                key: 21,
                showTimeRange: [122520, 129240],
                roleName: '李教官',
                text: [{ value: '我看得出来，他在讨杨校长的欢心，像在解谜一样找杨校长的喜好。' }],
              },
              {
                key: 22,
                showTimeRange: [130560, 133640],
                roleName: '李教官',
                text: [{ value: '跟他相比，我更喜欢你。' }],
              },
              {
                key: 23,
                showTimeRange: [134000, 135040],
                roleName: '齐淼',
                text: [{ value: '我跟你不熟。' }],
              },
              {
                key: 24,
                showTimeRange: [136050, 139040],
                roleName: '李教官',
                text: [{ value: '我觉得你的性格，跟我很像。' }],
              },
              {
                key: 25,
                showTimeRange: [139680, 142920],
                roleName: '齐淼',
                text: [{ value: '我不讨杨校长的欢心，也不需要让你喜欢。' }],
              },
              { key: 26, showTimeRange: [144120, 144680], roleName: '李教官', text: [{ value: '很好。  ' }] },
              {
                key: 27,
                showTimeRange: [146320, 148240],
                roleName: '李教官',
                text: [{ value: '我很期待你毕业的那天。  ' }],
              },
            ],
            captionEn: [
              {
                key: 0,
                showTimeRange: [64040, 65640],
                roleName: 'QI Miao',
                text: [{ value: 'Officer Li, are you looking for me?' }],
              },
              {
                key: 1,
                showTimeRange: [66240, 69640],
                roleName: 'Officer Li',
                text: [{ value: "I'm trying to get to know every student. Take a seat.  " }],
              },
              {
                key: 2,
                showTimeRange: [71440, 74120],
                roleName: 'Officer Li',
                text: [{ value: 'QI Miao, the leader of the Supervision Team.' }],
              },
              {
                key: 3,
                showTimeRange: [75200, 77120],
                roleName: 'Officer Li',
                text: [{ value: " I'm most curious about you." }],
              },
              { key: 4, showTimeRange: [77920, 79680], roleName: 'QI Miao', text: [{ value: 'No, not anymore.' }] },
              {
                key: 5,
                showTimeRange: [80800, 83840],
                roleName: 'Officer Li',
                text: [{ value: "ZHANG Yang wasn't the leader when I got here.  " }],
              },
              {
                key: 6,
                showTimeRange: [84920, 85960],
                roleName: 'QI Miao',
                text: [{ value: 'What do you want to know?' }],
              },
              {
                key: 7,
                showTimeRange: [86880, 88680],
                roleName: 'Officer Li',
                text: [{ value: 'Why did you end up here?' }],
              },
              {
                key: 8,
                showTimeRange: [89560, 91480],
                roleName: 'QI Miao',
                text: [{ value: "Simple. I wasn't a good girl. " }],
              },
              { key: 9, showTimeRange: [92160, 93200], roleName: 'Officer Li', text: [{ value: "You weren't?" }] },
              {
                key: 10,
                showTimeRange: [93960, 95600],
                roleName: 'Officer Li',
                text: [{ value: ' Define what makes a good girl？' }],
              },
              { key: 11, showTimeRange: [95960, 96960], roleName: 'QI Miao', text: [{ value: 'Obedient.' }] },
              {
                key: 12,
                showTimeRange: [97880, 99680],
                roleName: 'Officer Li',
                text: [{ value: 'You are a good girl around here.' }],
              },
              {
                key: 13,
                showTimeRange: [99840, 101040],
                roleName: 'QI Miao',
                text: [{ value: "If there's nothing else." }],
              },
              {
                key: 14,
                showTimeRange: [101160, 102800],
                roleName: 'Officer Li',
                text: [{ value: "You've been getting pretty close to ZHANG Yang lately." }],
              },
              { key: 15, showTimeRange: [103760, 104840], roleName: 'QI Miao', text: [{ value: "I'm watching him." }] },
              {
                key: 16,
                showTimeRange: [105040, 107440],
                roleName: 'Officer Li',
                text: [{ value: 'Because he took your job？' }],
              },
              {
                key: 17,
                showTimeRange: [108280, 113000],
                roleName: 'QI Miao',
                text: [{ value: 'I don’t have a problem with that, but he stole it. I despise him.' }],
              },
              {
                key: 18,
                showTimeRange: [114080, 115480],
                roleName: 'Officer Li',
                text: [{ value: 'I feel the same way.' }],
              },
              {
                key: 19,
                showTimeRange: [116040, 119400],
                roleName: 'QI Miao',
                text: [{ value: 'Principal Yang likes him. I thought you liked him, too.' }],
              },
              {
                key: 20,
                showTimeRange: [119720, 122160],
                roleName: 'Officer Li',
                text: [{ value: "That's exactly why I don't like him." }],
              },
              {
                key: 21,
                showTimeRange: [122520, 129240],
                roleName: 'Officer Li',
                text: [
                  {
                    value:
                      " I can tell he's kissing Principal's Yang's ass, and he's trying hard to cater to the principal.",
                  },
                ],
              },
              {
                key: 22,
                showTimeRange: [130560, 133640],
                roleName: 'Officer Li',
                text: [{ value: ' I like you more.' }],
              },
              {
                key: 23,
                showTimeRange: [134000, 135040],
                roleName: 'QI Miao',
                text: [{ value: 'I don’t really know you.' }],
              },
              {
                key: 24,
                showTimeRange: [136050, 139040],
                roleName: 'Officer Li',
                text: [{ value: 'I think our personalities are quite similar.' }],
              },
              {
                key: 25,
                showTimeRange: [139680, 142920],
                roleName: 'QI Miao',
                text: [{ value: "I don't need Principal Yang or you to like me." }],
              },
              { key: 26, showTimeRange: [144120, 144680], roleName: 'Officer Li', text: [{ value: 'Good.' }] },
              {
                key: 27,
                showTimeRange: [146320, 148240],
                roleName: 'Officer Li',
                text: [{ value: ' I look forward to your graduation.' }],
              },
            ],
  
            clickableTimeRange: [
              {
                startTimestamp: 60000,
                endTimestamp: 149400,
              },
            ],
            resource: {
              aid: 'day-1-noon-playground.mp3',
            },
          },
          clinic: {
            caption: [
              {
                key: 0,
                showTimeRange: [70840, 72480],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '张扬，你在吗？',
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [73480, 76640],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '医务室里没有什么事儿，我打扫完就走了。',
                  },
                ],
              },
              {
                key: 2,
                showTimeRange: [76800, 78160],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '你听听别的地方吧。',
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [80000, 84040],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '张扬，这没事儿，你去其他地方听听吧。',
                  },
                ],
              },
              {
                key: 4,
                showTimeRange: [86600, 87600],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '张扬。  ',
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [88200, 95480],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '我不知道你刚才听见了吗？你要是在听的话我跟你说一下，这没事儿，你去其他地方听吧。',
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [97920, 98360],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '唉？',
                  },
                ],
              },
              {
                key: 7,
                showTimeRange: [99160, 100960],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '怎么没个对话的功能呀？',
                  },
                ],
              },
              {
                key: 8,
                showTimeRange: [105040, 105760],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '对！',
                  },
                ],
              },
              {
                key: 9,
                showTimeRange: [106120, 106720],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '对！',
                  },
                ],
              },
              {
                key: 10,
                showTimeRange: [107160, 108720],
                roleName: '崔楠楠',
                text: [
                  {
                    value: '如果能对话就暴露了。',
                  },
                ],
              },
            ],
            captionEn: [
              {
                key: 0,
                showTimeRange: [70840, 72480],
                roleName: 'CUI Nannan',
                text: [{ value: 'ZHANG Yang, are you there?' }],
              },
              {
                key: 1,
                showTimeRange: [73480, 76640],
                roleName: 'CUI Nannan',
                text: [{ value: 'There was nothing going on in the infirmary. I cleaned up and left.' }],
              },
              {
                key: 2,
                showTimeRange: [76800, 78160],
                roleName: 'CUI Nannan',
                text: [{ value: 'You go listen to some other place.' }],
              },
              {
                key: 3,
                showTimeRange: [80000, 84040],
                roleName: 'CUI Nannan',
                text: [{ value: "ZHANG Yang, there's nothing else here. Turn to somewhere else." }],
              },
              { key: 4, showTimeRange: [86600, 87600], roleName: 'CUI Nannan', text: [{ value: 'ZHANG Yang.  ' }] },
              {
                key: 5,
                showTimeRange: [88200, 95480],
                roleName: 'CUI Nannan',
                text: [
                  {
                    value:
                      "ZHANG Yang, I don’t know if you heard that. If you're there, I'm telling you there's nothing else here. You can turn to somewhere else.",
                  },
                ],
              },
              { key: 6, showTimeRange: [97920, 98360], roleName: 'CUI Nannan', text: [{ value: 'Oh?' }] },
              {
                key: 7,
                showTimeRange: [99160, 100960],
                roleName: 'CUI Nannan',
                text: [{ value: "Why doesn't this have comm function." }],
              },
              { key: 8, showTimeRange: [105040, 105760], roleName: 'CUI Nannan', text: [{ value: 'Oh！' }] },
              { key: 9, showTimeRange: [106120, 106720], roleName: 'CUI Nannan', text: [{ value: 'Right！' }] },
              {
                key: 10,
                showTimeRange: [107160, 108720],
                roleName: 'CUI Nannan',
                text: [{ value: "That way we'd be exposed." }],
              },
            ],
  
            clickableTimeRange: [
              {
                startTimestamp: 70000,
                endTimestamp: 109000,
              },
            ],
            resource: {
              aid: 'day-1-noon-clinic.mp3',
            },
          },
          classroom: {
            caption: [
              {
                key: 0,
                showTimeRange: [112880, 113880],
                roleName: '学生丙',
                text: [
                  {
                    value: '你不去吃饭？',
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [114000, 115120],
                roleName: '学生丁',
                text: [
                  {
                    value: '我不舒服。',
                  },
                ],
              },
              {
                key: 2,
                showTimeRange: [115760, 117080],
                roleName: '学生丙',
                text: [
                  {
                    value: '哪难受？',
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [117520, 119560],
                roleName: '学生丁',
                text: [
                  {
                    value: '你能不能让我安静会？',
                  },
                ],
              },
              {
                key: 4,
                showTimeRange: [119720, 122160],
                roleName: '学生丙',
                text: [
                  {
                    value: '对不起，对不起，我先去食堂了。',
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [123160, 125840],
                roleName: '学生丁',
                text: [
                  {
                    value: '杨校长叫我吃完饭去电击室。',
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [126040, 128480],
                roleName: '学生丙',
                text: [
                  {
                    value: '哎，那个，我教你一招。',
                  },
                ],
              },
              {
                key: 7,
                showTimeRange: [128800, 130200],
                roleName: '学生丙',
                text: [
                  {
                    value: '也许能帮到你。',
                  },
                ],
              },
              {
                key: 8,
                showTimeRange: [130480, 131120],
                roleName: '学生丁',
                text: [
                  {
                    value: '什么？',
                  },
                ],
              },
              {
                key: 9,
                showTimeRange: [131680, 134480],
                roleName: '学生丙',
                clue: 'i19',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '杨校长电你的时候，你别一上来就认错。',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 10,
                showTimeRange: [135200, 142360],
                roleName: '学生丙',
                clue: 'i19',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '得先不服不忿的喊两句，然后再假装自己被治疗了，很感激杨校长，这样，他就会相信你了。',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 11,
                showTimeRange: [142520, 144560],
                roleName: '学生丁',
                text: [
                  {
                    value: '哦，好，我试试。',
                  },
                ],
              },
              {
                key: 12,
                showTimeRange: [144840, 146360],
                roleName: '学生丙',
                text: [
                  {
                    value: '走，先吃饭去。',
                  },
                ],
              },
            ],
            captionEn: [
              {
                key: 0,
                showTimeRange: [112880, 113880],
                roleName: 'Student C',
                text: [{ value: "Aren't you going to eat?" }],
              },
              {
                key: 1,
                showTimeRange: [114000, 115120],
                roleName: 'Student D',
                text: [{ value: "I'm not feeling well." }],
              },
              {
                key: 2,
                showTimeRange: [115760, 117080],
                roleName: 'Student C',
                text: [{ value: "What's the matter？" }],
              },
              {
                key: 3,
                showTimeRange: [117520, 119560],
                roleName: 'Student D',
                text: [{ value: 'Can you just leave me alone?' }],
              },
              {
                key: 4,
                showTimeRange: [119720, 122160],
                roleName: 'Student C',
                text: [{ value: "Sorry. I'll go to the dining hall" }],
              },
              {
                key: 5,
                showTimeRange: [123160, 125840],
                roleName: 'Student D',
                text: [{ value: 'Principal Yang asked me to go to the electrotherapy room.' }],
              },
              {
                key: 6,
                showTimeRange: [126040, 128480],
                roleName: 'Student C',
                text: [{ value: ' I teach you new approach' }],
              },
              {
                key: 7,
                showTimeRange: [128800, 130200],
                roleName: 'Student C',
                text: [{ value: 'Maybe it can help you.' }],
              },
              { key: 8, showTimeRange: [130480, 131120], roleName: 'Student D', text: [{ value: 'What？' }] },
              {
                key: 9,
                showTimeRange: [131680, 134480],
                roleName: 'Student C',
                clue: 'i19',
                text: [
                  { value: '' },
                  { isKey: true, value: "When he does that thing, don't rush into apologizing." },
                  { value: '' },
                ],
              },
              {
                key: 10,
                showTimeRange: [135200, 142360],
                roleName: 'Student C',
                clue: 'i19',
                text: [
                  { value: '' },
                  {
                    isKey: true,
                    value:
                      "Start with screaming and yelling. Then, pretend as if you're cured and thank him for the treatment. That way, he will buy it.",
                  },
                  { value: '' },
                ],
              },
              {
                key: 11,
                showTimeRange: [142520, 144560],
                roleName: 'Student D',
                text: [{ value: 'Good tip. I will try.' }],
              },
              {
                key: 12,
                showTimeRange: [144840, 146360],
                roleName: 'Student C',
                text: [{ value: "Let's have something to eat first." }],
              },
            ],
  
            clickableTimeRange: [
              {
                startTimestamp: 110000,
                endTimestamp: 149720,
              },
            ],
            resource: {
              aid: 'day-1-noon-classroom.mp3',
            },
          },
          office: {
            caption: [
              {
                key: 0,
                showTimeRange: [2000, 3200],
                roleName: '杨校长',
                text: [{ value: '社长，您请坐。' }],
              },
              {
                key: 1,
                showTimeRange: [5400, 8520],
                roleName: '社长',
                text: [{ value: '校庆就要到了，现在应该很忙吧。' }],
              },
              {
                key: 2,
                showTimeRange: [9120, 18600],
                roleName: '杨校长',
                text: [{ value: '还好还好，校庆只是代表过去的成绩，我现在，更多的是，看向未来。' }],
              },
              {
                key: 3,
                showTimeRange: [19120, 22720],
                roleName: '社长',
                text: [{ value: '那看来上次咱们聊得已经有结果了？' }],
              },
              {
                key: 4,
                showTimeRange: [23200, 31920],
                roleName: '杨校长',
                text: [{ value: '我又挑了几个国家，都有开分校的潜力，而且这次，我觉得可以更广泛的招生。' }],
              },
              {
                key: 5,
                showTimeRange: [32440, 40000],
                roleName: '杨校长',
                text: [{ value: '这是我准备的资料，里面不光有材料还有学校的财务报表，方便您了解。' }],
              },
              {
                key: 6,
                showTimeRange: [41080, 46680],
                roleName: '杨校长',
                text: [{ value: '哦对了，我现在还在申请新的专利，电击绑带。' }],
              },
              {
                key: 7,
                showTimeRange: [47600, 49280],
                roleName: '社长',
                text: [{ value: '嗯....很好....' }],
              },
              {
                key: 8,
                showTimeRange: [50640, 56240],
                roleName: '社长',
                text: [{ value: '不过杨校长啊，听说你这里，最近不怎么太平。' }],
              },
              {
                key: 9,
                showTimeRange: [57200, 65600],
                roleName: '社长',
                text: [{ value: '之前有个什么女孩的事儿，最近还有记者要来。这要是有什么风波之类的。' }],
              },
              {
                key: 10,
                showTimeRange: [66360, 74080],
                roleName: '杨校长',
                text: [{ value: '您放心，都已经安排好了。采访的教室里面装了“耳朵”。' }],
              },
              {
                key: 11,
                showTimeRange: [75600, 76480],
                roleName: '杨校长',
                text: [{ value: '我有数。' }],
              },
              {
                key: 12,
                showTimeRange: [77480, 80240],
                roleName: '社长',
                text: [{ value: '记者都知道了，耳朵有什么用？' }],
              },
              {
                key: 13,
                showTimeRange: [80480, 82640],
                roleName: '杨校长',
                text: [{ value: '如果记者太不懂事儿。' }],
              },
              {
                key: 14,
                showTimeRange: [84040, 89600],
                roleName: '杨校长',
                text: [{ value: '这里毕竟是山区，道路艰险事故众多。' }],
              },
              {
                key: 15,
                showTimeRange: [91160, 92360],
                roleName: '杨校长',
                text: [{ value: '总有办法....' }],
              },
              {
                key: 16,
                showTimeRange: [93320, 94520],
                roleName: '社长',
                text: [{ value: '嗯......' }],
              },
              {
                key: 17,
                showTimeRange: [94760, 100680],
                roleName: '社长',
                text: [{ value: '你做好准备就好。校庆之后，我会根据你的计划给你答复的。' }],
              },
              {
                key: 18,
                showTimeRange: [101040, 102480],
                roleName: '杨校长',
                text: [{ value: '那就谢谢社长了。' }],
              },
              {
                key: 19,
                showTimeRange: [103520, 106600],
                roleName: '社长',
                text: [{ value: '聊的差不多了，带我去学校逛逛吧。' }],
              },
              {
                key: 20,
                showTimeRange: [107440, 108240],
                roleName: '杨校长',
                text: [{ value: '好的。' }],
              },
              { key: 21, showTimeRange: [108680, 109680], roleName: '杨校长', text: [{ value: '社长请。' }] },
            ],
            captionEn: [
              {
                key: 0,
                showTimeRange: [2000, 3200],
                roleName: 'Principal Yang',
                text: [{ value: 'Director, please take a seat.' }],
              },
              {
                key: 1,
                showTimeRange: [5400, 8520],
                roleName: 'Director',
                text: [{ value: 'You must have been busy with the school anniversary.' }],
              },
              {
                key: 2,
                showTimeRange: [9120, 18600],
                roleName: 'Principal Yang',
                text: [
                  {
                    value:
                      "I can handle it. The anniversary is about our past achievements. I'm more of a forward-looking person.",
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [19120, 22720],
                roleName: 'Director',
                text: [{ value: 'I guess that means our conversation last time has a result？' }],
              },
              {
                key: 4,
                showTimeRange: [23200, 31920],
                roleName: 'Principal Yang',
                text: [
                  {
                    value:
                      'I selected a few countries suitable for potential branches. This time, we can recruit on a larger scale.',
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [32440, 40000],
                roleName: 'Principal Yang',
                text: [
                  {
                    value:
                      " Here are some files you might be interested in, including information, and the school's financial records.",
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [41080, 46680],
                roleName: 'Principal Yang',
                text: [{ value: " Besides, I'm applying for a patent for my latest invention, electrotherapy strap." }],
              },
              { key: 7, showTimeRange: [47600, 49280], roleName: 'Director', text: [{ value: 'Good.' }] },
              {
                key: 8,
                showTimeRange: [50640, 56240],
                roleName: 'Director',
                text: [{ value: " But Principal Yang, I heard that you've been having some troubles recently. " }],
              },
              {
                key: 9,
                showTimeRange: [57200, 65600],
                roleName: 'Director',
                text: [
                  {
                    value:
                      "Some girl had an accident, and now journalists are coming. I'm worried about the negative news.",
                  },
                ],
              },
              {
                key: 10,
                showTimeRange: [66360, 74080],
                roleName: 'Principal Yang',
                text: [{ value: "Don't worry. It's all set. I bugged the interview classroom." }],
              },
              {
                key: 11,
                showTimeRange: [75600, 76480],
                roleName: 'Principal Yang',
                text: [{ value: "So I'll know what’s going on." }],
              },
              {
                key: 12,
                showTimeRange: [77480, 80240],
                roleName: 'Director',
                text: [{ value: "The journalists already know about it. I don't see the use of bugging？" }],
              },
              {
                key: 13,
                showTimeRange: [80480, 82640],
                roleName: 'Principal Yang',
                text: [{ value: "If the journalists aren't clever enough," }],
              },
              {
                key: 14,
                showTimeRange: [84040, 89600],
                roleName: 'Principal Yang',
                text: [
                  {
                    value:
                      ' I will find a way to deal with them. After all, car accidents tend to happen on mountainous roads.',
                  },
                ],
              },
              {
                key: 15,
                showTimeRange: [91160, 92360],
                roleName: 'Principal Yang',
                text: [{ value: "There's always a way...." }],
              },
              { key: 16, showTimeRange: [93320, 94520], roleName: 'Director', text: [{ value: 'Well......' }] },
              {
                key: 17,
                showTimeRange: [94760, 100680],
                roleName: 'Director',
                text: [
                  {
                    value:
                      "As long as you've made proper arrangements. After the anniversary, I will see your plans and give you an answer.",
                  },
                ],
              },
              {
                key: 18,
                showTimeRange: [101040, 102480],
                roleName: 'Principal Yang',
                text: [{ value: 'Thank you, director。' }],
              },
              {
                key: 19,
                showTimeRange: [103520, 106600],
                roleName: 'Director',
                text: [{ value: "Enough chatting. Why don't you show me around?" }],
              },
              { key: 20, showTimeRange: [107440, 108240], roleName: 'Principal Yang', text: [{ value: 'Of course. ' }] },
              { key: 21, showTimeRange: [108680, 109680], roleName: 'Principal Yang', text: [{ value: 'After you' }] },
            ],
  
            clickableTimeRange: [
              {
                startTimestamp: 0,
                endTimestamp: 116360,
              },
            ],
            resource: {
              aid: 'day-1-noon-office.mp3',
            },
          },
        },
      },
      afternoon: {
        scene: {
          kitchen: {},
          playground: {
            caption: [
              {
                key: 0,
                showTimeRange: [2560, 8000],
                roleName: '徐山娃',
                text: [{ value: '哎呦！吓我一跳，突然拍我一下，你在这干嘛呢？' }],
              },
              {
                key: 1,
                showTimeRange: [9000, 12640],
                roleName: '侯逸',
                text: [{ value: '找你半天了，刚刚，跟哪躲着呢？' }],
              },
              {
                key: 2,
                showTimeRange: [13440, 16000],
                roleName: '徐山娃',
                text: [{ value: '刚刚？我想想啊。' }],
              },
              {
                key: 3,
                showTimeRange: [16760, 20560],
                roleName: '侯逸',
                text: [{ value: '服了，别想了，我问你个事儿。' }],
              },
              {
                key: 4,
                showTimeRange: [20680, 21640],
                roleName: '徐山娃',
                text: [{ value: '你说。' }],
              },
              {
                key: 5,
                showTimeRange: [22600, 25240],
                roleName: '侯逸',
                text: [{ value: '你......说话还算数不？' }],
              },
              {
                key: 6,
                showTimeRange: [25420, 26640],
                roleName: '徐山娃',
                text: [{ value: '我说啥了？' }],
              },
              { key: 7, showTimeRange: [27480, 28480], roleName: '侯逸', text: [{ value: '加入。' }] },
              {
                key: 8,
                showTimeRange: [30400, 31360],
                roleName: '徐山娃',
                text: [{ value: '你同意了？' }],
              },
              {
                key: 9,
                showTimeRange: [32000, 39640],
                roleName: '侯逸',
                text: [{ value: '什么就我同意了，我是说，你说的，问我要不要加入的事儿，还算数不？' }],
              },
              { key: 10, showTimeRange: [40000, 42000], roleName: '徐山娃', text: [{ value: '哦，是我说的。' }] },
              {
                key: 11,
                showTimeRange: [43320, 44120],
                roleName: '侯逸',
                text: [{ value: '我……' }],
              },
              { key: 12, showTimeRange: [44680, 45600], roleName: '侯逸', text: [{ value: '我加入……' }] },
              {
                key: 13,
                showTimeRange: [47440, 49360],
                roleName: '侯逸',
                text: [{ value: '你有病啊，松开。' }],
              },
              {
                key: 14,
                showTimeRange: [50360, 52040],
                roleName: '徐山娃',
                text: [{ value: '嘿嘿......逗你玩的。' }],
              },
              { key: 15, showTimeRange: [52600, 54040], roleName: '侯逸', text: [{ value: '好啊你！' }] },
              {
                key: 16,
                showTimeRange: [54600, 56840],
                roleName: '侯逸',
                text: [{ value: '刚装疯卖傻耍我！' }],
              },
              { key: 17, showTimeRange: [57320, 58320], roleName: '徐山娃', text: [{ value: '嘿嘿。' }] },
              {
                key: 18,
                showTimeRange: [59280, 64360],
                roleName: '侯逸',
                text: [{ value: '你说......你之前是不是一直，跟我面前装傻？' }],
              },
              { key: 19, showTimeRange: [65520, 67040], roleName: '徐山娃', text: [{ value: '我不说。' }] },
              {
                key: 20,
                showTimeRange: [68000, 69880],
                roleName: '侯逸',
                text: [{ value: '你……你真行。' }],
              },
              {
                key: 21,
                showTimeRange: [72280, 77800],
                roleName: '徐山娃',
                text: [{ value: '我之前跟你说的时候，你发那么大的脾气，现在，想通了？' }],
              },
              {
                key: 22,
                showTimeRange: [79560, 82640],
                roleName: '侯逸',
                text: [{ value: '说实话，我一天都待不下去了。' }],
              },
              { key: 23, showTimeRange: [84000, 85200], roleName: '徐山娃', text: [{ value: '因为杨校长？' }] },
              {
                key: 24,
                showTimeRange: [85880, 86880],
                roleName: '侯逸',
                text: [{ value: '不是。' }],
              },
              {
                key: 25,
                showTimeRange: [87640, 91200],
                roleName: '侯逸',
                text: [{ value: '杨校长脾气我都摸清了，是新来的那个……' }],
              },
              { key: 26, showTimeRange: [91640, 92640], roleName: '徐山娃', text: [{ value: '李教官？' }] },
              {
                key: 27,
                showTimeRange: [93640, 99120],
                roleName: '侯逸',
                text: [{ value: '嗯......她不吃我那一套，嗯......就那一套。' }],
              },
              { key: 28, showTimeRange: [99720, 101640], roleName: '徐山娃', text: [{ value: '嗯，我明白。' }] },
              {
                key: 29,
                showTimeRange: [102800, 110420],
                roleName: '侯逸',
                text: [{ value: '所以，我不知道你要搞什么大事，但是，你们肯定跟姓李的不是一路的，我加入你们。' }],
              },
              {
                key: 30,
                showTimeRange: [111160, 115280],
                roleName: '徐山娃',
                text: [{ value: '虽然......可能跟你想的不一样，但是也差不多。' }],
              },
              {
                key: 31,
                showTimeRange: [115400, 118600],
                roleName: '侯逸',
                text: [{ value: '跟我说说，你们都有谁，准备怎么搞？' }],
              },
              {
                key: 32,
                showTimeRange: [119080, 124080],
                roleName: '徐山娃',
                text: [{ value: '现在不行，你也别打听，回头啊等我找你。我还有事啊。' }],
              },
              { key: 33, showTimeRange: [124880, 127120], roleName: '侯逸', text: [{ value: '唉？不是你......' }] },
            ],
            captionEn: [
              {
                key: 0,
                showTimeRange: [2560, 8000],
                roleName: 'XU Shanwa',
                text: [
                  {
                    value:
                      "Holy... You scared me. So horrible to pat someone's back in the middle of the night. What are you doing here?",
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [9000, 12640],
                roleName: 'HOU Yi',
                text: [{ value: "I've been looking for you. Where were you？" }],
              },
              {
                key: 2,
                showTimeRange: [13440, 16000],
                roleName: 'XU Shanwa',
                text: [{ value: 'Just now... Let me think.' }],
              },
              {
                key: 3,
                showTimeRange: [16760, 20560],
                roleName: 'HOU Yi',
                text: [{ value: 'Give me a break. I need to ask you something.' }],
              },
              { key: 4, showTimeRange: [20680, 21640], roleName: 'XU Shanwa', text: [{ value: 'Go ahead.' }] },
              {
                key: 5,
                showTimeRange: [22600, 25240],
                roleName: 'HOU Yi',
                text: [{ value: 'Does your offer still stand?' }],
              },
              { key: 6, showTimeRange: [25420, 26640], roleName: 'XU Shanwa', text: [{ value: 'What offer?' }] },
              { key: 7, showTimeRange: [27480, 28480], roleName: 'HOU Yi', text: [{ value: 'About me joining you.' }] },
              { key: 8, showTimeRange: [30400, 31360], roleName: 'XU Shanwa', text: [{ value: 'Do you agree？' }] },
              {
                key: 9,
                showTimeRange: [32000, 39640],
                roleName: 'HOU Yi',
                text: [{ value: "I didn't say that. I'm just asking if the offer is still valid?" }],
              },
              { key: 10, showTimeRange: [40000, 42000], roleName: 'XU Shanwa', text: [{ value: 'Yes, I did say that' }] },
              { key: 11, showTimeRange: [43320, 44120], roleName: 'HOU Yi', text: [{ value: 'I……' }] },
              { key: 12, showTimeRange: [44680, 45600], roleName: 'HOU Yi', text: [{ value: "I'm in……" }] },
              {
                key: 13,
                showTimeRange: [47440, 49360],
                roleName: 'HOU Yi',
                text: [{ value: "What's your problem? Let go of me!" }],
              },
              {
                key: 14,
                showTimeRange: [50360, 52040],
                roleName: 'XU Shanwa',
                text: [{ value: 'Ha-ha......It was supposed to be funny。' }],
              },
              { key: 15, showTimeRange: [52600, 54040], roleName: 'HOU Yi', text: [{ value: 'All right, you.' }] },
              {
                key: 16,
                showTimeRange: [54600, 56840],
                roleName: 'HOU Yi',
                text: [{ value: 'You were messing with me?' }],
              },
              { key: 17, showTimeRange: [57320, 58320], roleName: 'XU Shanwa', text: [{ value: 'Ha-ha.' }] },
              {
                key: 18,
                showTimeRange: [59280, 64360],
                roleName: 'HOU Yi',
                text: [{ value: "All this time, you've been playing fool in front of me. Am I right?" }],
              },
              { key: 19, showTimeRange: [65520, 67040], roleName: 'XU Shanwa', text: [{ value: 'I refuse to answer.' }] },
              {
                key: 20,
                showTimeRange: [68000, 69880],
                roleName: 'HOU Yi',
                text: [{ value: "You're so good, aren't you." }],
              },
              {
                key: 21,
                showTimeRange: [72280, 77800],
                roleName: 'XU Shanwa',
                text: [{ value: 'When I made that offer, you flew into a temper. Now you suddenly came around?' }],
              },
              {
                key: 22,
                showTimeRange: [79560, 82640],
                roleName: 'HOU Yi',
                text: [{ value: "To tell you the truth, I can't stand one more day here." }],
              },
              {
                key: 23,
                showTimeRange: [84000, 85200],
                roleName: 'XU Shanwa',
                text: [{ value: 'Is it because of Principal Yang?' }],
              },
              { key: 24, showTimeRange: [85880, 86880], roleName: 'HOU Yi', text: [{ value: 'No,' }] },
              {
                key: 25,
                showTimeRange: [87640, 91200],
                roleName: 'HOU Yi',
                text: [{ value: "He isn't a problem anymore. It's the new one." }],
              },
              { key: 26, showTimeRange: [91640, 92640], roleName: 'XU Shanwa', text: [{ value: 'Officer Li?' }] },
              {
                key: 27,
                showTimeRange: [93640, 99120],
                roleName: 'HOU Yi',
                text: [{ value: "Yes. It doesn't work on her, you know." }],
              },
              { key: 28, showTimeRange: [99720, 101640], roleName: 'XU Shanwa', text: [{ value: 'I know.' }] },
              {
                key: 29,
                showTimeRange: [102800, 110420],
                roleName: 'HOU Yi',
                text: [{ value: "I don't know what you're up to, but I do know you're not on her side, so I'm in." }],
              },
              {
                key: 30,
                showTimeRange: [111160, 115280],
                roleName: 'XU Shanwa',
                text: [{ value: "It's not exactly the same as you might imagine, but it’s close." }],
              },
              {
                key: 31,
                showTimeRange: [115400, 118600],
                roleName: 'HOU Yi',
                text: [{ value: 'Tell me who you have and your plan?' }],
              },
              {
                key: 32,
                showTimeRange: [119080, 124080],
                roleName: 'XU Shanwa',
                text: [{ value: "Not now. Don't ask around. I will contact you later. I have something to do now." }],
              },
              { key: 33, showTimeRange: [124880, 127120], roleName: 'HOU Yi', text: [{ value: 'Oh? Not you......' }] },
            ],
  
            clickableTimeRange: [
              {
                startTimestamp: 0,
                endTimestamp: 129000,
              },
            ],
            resource: {
              aid: 'day-1-afternoon-playground.mp3',
            },
          },
          clinic: {
            caption: [
              {
                key: 0,
                showTimeRange: [2440, 3240],
                roleName: '米医生',
                text: [
                  {
                    value: '进。',
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [4680, 7240],
                roleName: '学生',
                text: [
                  {
                    value: '米医生，你帮帮我。',
                  },
                ],
              },
              {
                key: 2,
                showTimeRange: [8600, 11120],
                roleName: '米医生',
                text: [
                  {
                    value: '哪受伤了？杨校长让你来的？',
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [11240, 14480],
                roleName: '学生',
                text: [
                  {
                    value: '不是，我自己来的。我好害怕。',
                  },
                ],
              },
              {
                key: 4,
                showTimeRange: [15360, 16400],
                roleName: '米医生',
                text: [
                  {
                    value: '坐下。',
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [17480, 21000],
                roleName: '环境音',
                text: [
                  {
                    value: '倒水声',
                  },
                ],
              },
              {
                key: 6,
                showTimeRange: [21680, 22760],
                roleName: '米医生',
                text: [
                  {
                    value: '来，喝水。',
                  },
                ],
              },
              {
                key: 7,
                showTimeRange: [23760, 29160],
                roleName: '学生',
                text: [
                  {
                    value: '米医生，我成年了，为什么谈恋爱还算早恋啊？',
                  },
                ],
              },
              {
                key: 8,
                showTimeRange: [30080, 31080],
                roleName: '米医生',
                text: [
                  {
                    value: '呃……',
                  },
                ],
              },
              {
                key: 9,
                showTimeRange: [31240, 38560],
                roleName: '学生',
                text: [
                  {
                    value: '而且，就算是早恋，也不是病对不对呀？那谁不谈恋爱啊？为什么说我是精神病啊？',
                  },
                ],
              },
              {
                key: 10,
                showTimeRange: [39280, 42520],
                roleName: '米医生',
                text: [
                  {
                    value: '精神病？你的资料没有说精神病的事情。',
                  },
                ],
              },
              {
                key: 11,
                showTimeRange: [43400, 49640],
                roleName: '学生',
                clue: 'i20',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '就电...感恩治疗我们的那个仪器，之前贴吧有说就是精神病院用的。',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 12,
                showTimeRange: [50280, 51440],
                roleName: '米医生',
                clue: 'i20',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '你能上网？',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 13,
                showTimeRange: [51800, 59800],
                roleName: '学生',
                clue: 'i20',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '不能，当然不能，我是来这里之前查过的，我当时不知道这这么变……过分。',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 14,
                showTimeRange: [60000, 61960],
                roleName: '米医生',
                clue: 'i20',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '网上很多都是瞎说。',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 15,
                showTimeRange: [62160, 65200],
                roleName: '学生',
                clue: 'i20',
                text: [
                  {
                    value: '',
                  },
                  {
                    isKey: true,
                    value: '您别骗我了，那就是精神病治疗用的。',
                  },
                  {
                    value: '',
                  },
                ],
              },
              {
                key: 16,
                showTimeRange: [65640, 66680],
                roleName: '米医生',
                text: [
                  {
                    value: '你别害怕。',
                  },
                ],
              },
              {
                key: 17,
                showTimeRange: [66960, 69360],
                roleName: '学生',
                text: [
                  {
                    value: '我是不是，再也出不去了呀？',
                  },
                ],
              },
              {
                key: 18,
                showTimeRange: [69760, 76440],
                roleName: '米医生',
                text: [
                  {
                    value: '不是不是，你治疗好就能出去了，咱们这里是学校，又不是精神病院。',
                  },
                ],
              },
              {
                key: 19,
                showTimeRange: [76880, 82440],
                roleName: '学生',
                text: [
                  {
                    value: '如果是精神病院你也会说不是的。我网上看说精神病院就这样。',
                  },
                ],
              },
              {
                key: 20,
                showTimeRange: [82680, 85480],
                roleName: '米医生',
                text: [
                  {
                    value: '如果是精神病院，那都有保安的。',
                  },
                ],
              },
              {
                key: 21,
                showTimeRange: [85680, 89360],
                roleName: '学生',
                text: [
                  {
                    value: '咱不是有教官啊，教官不就是保安换了名字对不对呀？',
                  },
                ],
              },
              {
                key: 22,
                showTimeRange: [90800, 96080],
                roleName: '米医生',
                text: [
                  {
                    value: '呃，如果是精神病院，那都得吃药的。所以......',
                  },
                ],
              },
              {
                key: 23,
                showTimeRange: [96320, 101880],
                roleName: '学生',
                text: [
                  {
                    value: '你给我们吃药，那药瓶上写着什么我们都看不懂，所以就是那种药对不对？',
                  },
                ],
              },
              {
                key: 24,
                showTimeRange: [102080, 105400],
                roleName: '米医生',
                text: [
                  {
                    value: '不是，精神病院都出不去。',
                  },
                ],
              },
              {
                key: 25,
                showTimeRange: [105360, 108050],
                roleName: '学生',
                text: [
                  {
                    value: '啊，我出不去啦。',
                  },
                ],
              },
              {
                key: 26,
                showTimeRange: [108480, 110120],
                roleName: '米医生',
                text: [
                  {
                    value: '别哭，别哭。',
                  },
                ],
              },
              {
                key: 27,
                showTimeRange: [111560, 116640],
                roleName: '米医生',
                text: [
                  {
                    value: '精神病院都能放风，做游戏，办活动，家人来探望。',
                  },
                ],
              },
              {
                key: 28,
                showTimeRange: [118360, 123400],
                roleName: '学生',
                text: [
                  {
                    value: '嗯，您说的有道理，这几个咱都没有。',
                  },
                ],
              },
              {
                key: 29,
                showTimeRange: [123800, 127560],
                roleName: '学生',
                text: [
                  {
                    value: '可是我看到那个机器上，真的写了。',
                  },
                ],
              },
              {
                key: 30,
                showTimeRange: [128360, 131960],
                roleName: '米医生',
                text: [
                  {
                    value: '好了好了，你别担心，先回去休息。',
                  },
                ],
              },
              {
                key: 31,
                showTimeRange: [132160, 137840],
                roleName: '学生',
                text: [
                  {
                    value: '嗯，可是米医生，我都是成年人了，为什么我谈恋爱还是早恋呢？  ',
                  },
                ],
              },
              {
                key: 32,
                showTimeRange: [138440, 142120],
                roleName: '米医生',
                text: [
                  {
                    value: '你出去以后，就不是了。争取早点毕业吧。',
                  },
                ],
              },
              {
                key: 33,
                showTimeRange: [142240, 145400],
                roleName: '学生',
                text: [
                  {
                    value: '好，谢谢米医生，米医生再见。',
                  },
                ],
              },
            ],
            captionEn: [
              { key: 0, showTimeRange: [2440, 3240], roleName: 'Dr. Mi', text: [{ value: 'Come in.' }] },
              { key: 1, showTimeRange: [4680, 7240], roleName: 'Students', text: [{ value: 'Dr. Mi, please help me.' }] },
              {
                key: 2,
                showTimeRange: [8600, 11120],
                roleName: 'Dr. Mi',
                text: [{ value: "What's wrong? Did Principal Yang asked you to come?" }],
              },
              {
                key: 3,
                showTimeRange: [11240, 14480],
                roleName: 'Students',
                text: [{ value: "No, I came here because I'm afraid" }],
              },
              { key: 4, showTimeRange: [15360, 16400], roleName: 'Dr. Mi', text: [{ value: 'Take a seat.' }] },
              { key: 5, showTimeRange: [17480, 21000], roleName: 'Ambient sound', text: [{ value: 'Sound of water' }] },
              { key: 6, showTimeRange: [21680, 22760], roleName: 'Dr. Mi', text: [{ value: ' Have some water.' }] },
              {
                key: 7,
                showTimeRange: [23760, 29160],
                roleName: 'Students',
                text: [{ value: "Dr. Mi, I'm over 18 now. I should be able to date someone？" }],
              },
              { key: 8, showTimeRange: [30080, 31080], roleName: 'Dr. Mi', text: [{ value: 'Well……' }] },
              {
                key: 9,
                showTimeRange: [31240, 38560],
                roleName: 'Students',
                text: [
                  {
                    value:
                      "Even if my parents have a problem with that, it doesn't mean I'm sick, right? I mean, dating isn't a disease. Why do they think I have mental health issues？",
                  },
                ],
              },
              {
                key: 10,
                showTimeRange: [39280, 42520],
                roleName: 'Dr. Mi',
                text: [{ value: "Mental health issues? I didn't see that in your file." }],
              },
              {
                key: 11,
                showTimeRange: [43400, 49640],
                roleName: 'Students',
                clue: 'i20',
                text: [
                  { value: '' },
                  {
                    isKey: true,
                    value:
                      'The electro… I mean, the gratitude treatment equipment. I saw a thread saying the equipment was made for mental institution.',
                  },
                  { value: '' },
                ],
              },
              {
                key: 12,
                showTimeRange: [50280, 51440],
                roleName: 'Dr. Mi',
                clue: 'i20',
                text: [{ value: '' }, { isKey: true, value: 'Do you have Internet access here？' }, { value: '' }],
              },
              {
                key: 13,
                showTimeRange: [51800, 59800],
                roleName: 'Students',
                clue: 'i20',
                text: [
                  { value: '' },
                  {
                    isKey: true,
                    value:
                      "Of course not. I looked it up before I came. I didn't expect things to be so craz… I mean, unexpected.",
                  },
                  { value: '' },
                ],
              },
              {
                key: 14,
                showTimeRange: [60000, 61960],
                roleName: 'Dr. Mi',
                clue: 'i20',
                text: [{ value: '' }, { isKey: true, value: 'People say crazy things on the Internet.' }, { value: '' }],
              },
              {
                key: 15,
                showTimeRange: [62160, 65200],
                roleName: 'Students',
                clue: 'i20',
                text: [
                  { value: '' },
                  { isKey: true, value: "Don't lie to me. I know it's for mental institution." },
                  { value: '' },
                ],
              },
              { key: 16, showTimeRange: [65640, 66680], roleName: 'Dr. Mi', text: [{ value: "Don't be afraid." }] },
              {
                key: 17,
                showTimeRange: [66960, 69360],
                roleName: 'Students',
                text: [{ value: "I'm never going to leave here, am I?" }],
              },
              {
                key: 18,
                showTimeRange: [69760, 76440],
                roleName: 'Dr. Mi',
                text: [
                  {
                    value:
                      "It's not like that. You can leave once you're cured. It’s a school, not a mental institution.",
                  },
                ],
              },
              {
                key: 19,
                showTimeRange: [76880, 82440],
                roleName: 'Students',
                text: [
                  {
                    value:
                      'Even it were a mental institution, you would deny anyway. According to the Internet, this is exactly what a mental institution is like.',
                  },
                ],
              },
              {
                key: 20,
                showTimeRange: [82680, 85480],
                roleName: 'Dr. Mi',
                text: [{ value: 'Mental institutions have security guards.' }],
              },
              {
                key: 21,
                showTimeRange: [85680, 89360],
                roleName: 'Students',
                text: [{ value: 'We do have officer. I believe they are like security guards' }],
              },
              {
                key: 22,
                showTimeRange: [90800, 96080],
                roleName: 'Dr. Mi',
                text: [{ value: 'Patients in mental institutions take drugs, so......' }],
              },
              {
                key: 23,
                showTimeRange: [96320, 101880],
                roleName: 'Students',
                text: [
                  {
                    value:
                      "You did give us drugs. We don't even understand the words on the medicine bottle. I bet it's drug for crazy people, right？",
                  },
                ],
              },
              {
                key: 24,
                showTimeRange: [102080, 105400],
                roleName: 'Dr. Mi',
                text: [{ value: 'Well, in mental institutions, patients aren’t allowed to go out.' }],
              },
              {
                key: 25,
                showTimeRange: [105360, 108050],
                roleName: 'Students',
                text: [{ value: "Oh no. I'll never be able to go out." }],
              },
              { key: 26, showTimeRange: [108480, 110120], roleName: 'Dr. Mi', text: [{ value: "Don't cry. " }] },
              {
                key: 27,
                showTimeRange: [111560, 116640],
                roleName: 'Dr. Mi',
                text: [
                  {
                    value: 'Patients in mental institutions have activity hours, games, events, and visits from family.',
                  },
                ],
              },
              {
                key: 28,
                showTimeRange: [118360, 123400],
                roleName: 'Students',
                text: [{ value: "You have a point. We don't have those." }],
              },
              {
                key: 29,
                showTimeRange: [123800, 127560],
                roleName: 'Students',
                text: [{ value: 'But I did see the words on the machine saying.' }],
              },
              {
                key: 30,
                showTimeRange: [128360, 131960],
                roleName: 'Dr. Mi',
                text: [{ value: "OK. Don't worry. Go back and have some rest." }],
              },
              {
                key: 31,
                showTimeRange: [132160, 137840],
                roleName: 'Students',
                text: [{ value: 'OK. But Dr. Mi, as an adult, why am I not allowed to date someone?  ' }],
              },
              {
                key: 32,
                showTimeRange: [138440, 142120],
                roleName: 'Dr. Mi',
                text: [{ value: "You will be able to do that once you're out. Try to graduate early." }],
              },
              {
                key: 33,
                showTimeRange: [142240, 145400],
                roleName: 'Students',
                text: [{ value: 'Thank you, Dr. Mi. See you.' }],
              },
            ],
  
            clickableTimeRange: [
              {
                startTimestamp: 0,
                endTimestamp: 148840,
              },
            ],
            resource: {
              aid: 'day-1-afternoon-clinic.mp3',
            },
          },
          classroom: {
            caption: [
              {
                key: 0,
                showTimeRange: [135720, 136640],
                roleName: '学生',
                text: [
                  {
                    value: '起立。',
                  },
                ],
              },
              {
                key: 1,
                showTimeRange: [137720, 139760],
                roleName: '学生',
                text: [
                  {
                    value: '老师好。',
                  },
                ],
              },
              {
                key: 2,
                showTimeRange: [140120, 141120],
                roleName: '老师',
                text: [
                  {
                    value: '同学们好。',
                  },
                ],
              },
              {
                key: 3,
                showTimeRange: [141400, 142120],
                roleName: '老师',
                text: [
                  {
                    value: '坐。',
                  },
                ],
              },
              {
                key: 4,
                showTimeRange: [143240, 148640],
                roleName: '老师',
                text: [
                  {
                    value: '上课前啊，我们先默写弟子规第十篇，十分钟之后交上来啊。',
                  },
                ],
              },
              {
                key: 5,
                showTimeRange: [148720, 149960],
                roleName: '老师',
                text: [
                  {
                    value: '好了，开始写吧  。',
                  },
                ],
              },
            ],
            captionEn: [
              { key: 0, showTimeRange: [135720, 136640], roleName: 'Students', text: [{ value: 'All rise.' }] },
              { key: 1, showTimeRange: [137720, 139760], roleName: 'Students', text: [{ value: 'Hi, mister.' }] },
              { key: 2, showTimeRange: [140120, 141120], roleName: 'Teacher', text: [{ value: 'Hi, class.' }] },
              { key: 3, showTimeRange: [141400, 142120], roleName: 'Teacher', text: [{ value: 'Sit down.' }] },
              {
                key: 4,
                showTimeRange: [143240, 148640],
                roleName: 'Teacher',
                text: [
                  {
                    value:
                      'For warming up, write down the tenth chapter of Standards for being a Good Pupil and Child. You have ten minutes.',
                  },
                ],
              },
              { key: 5, showTimeRange: [148720, 149960], roleName: 'Teacher', text: [{ value: ' Start.' }] },
            ],
  
            clickableTimeRange: [
              {
                startTimestamp: 135000,
                endTimestamp: 149920,
              },
            ],
            resource: {
              aid: 'day-1-afternoon-classroom.mp3',
            },
          },
          office: {
            caption: [
              {
                key: 0,
                showTimeRange: [760, 4880],
                roleName: '杨校长',
                text: [{ value: '咏～恩～情～' }],
              },
              {
                key: 1,
                showTimeRange: [5240, 13480],
                roleName: '杨校长',
                text: [{ value: ' 嗯..... 不太好，缺少感觉，叫咏恩颂吧。' }],
              },
              { key: 2, showTimeRange: [13920, 17840], roleName: '杨校长', text: [{ value: '咏～恩～颂～' }] },
              {
                key: 3,
                showTimeRange: [18280, 26680],
                roleName: '杨校长',
                text: [{ value: '我用伟大的创新疗法，让人清醒。' }],
              },
              {
                key: 4,
                showTimeRange: [27240, 32760],
                roleName: '杨校长',
                text: [{ value: '嗯....有点怪，称呼上再改改。' }],
              },
              {
                key: 5,
                showTimeRange: [34680, 42000],
                roleName: '杨校长',
                text: [{ value: '你用伟大的创新疗法，让人清醒。' }],
              },
              {
                key: 6,
                showTimeRange: [42800, 48320],
                roleName: '杨校长',
                text: [{ value: '真不错真不错。这时候得来点音乐。' }],
              },
              {
                key: 7,
                showTimeRange: [54840, 61680],
                roleName: '杨校长',
                text: [{ value: '咏恩颂～颂永恩。' }],
              },
              {
                key: 8,
                showTimeRange: [62680, 70680],
                roleName: '杨校长',
                text: [{ value: '你用伟大的创新疗法，让人清醒。' }],
              },
              {
                key: 9,
                showTimeRange: [71760, 77880],
                roleName: '杨校长',
                text: [{ value: '使无数的叛逆少年， 迷途知返。' }],
              },
              {
                key: 10,
                showTimeRange: [78600, 85760],
                roleName: '杨校长',
                text: [{ value: '你用勤劳的日夜治疗，传授感恩。' }],
              },
              {
                key: 11,
                showTimeRange: [86520, 94400],
                roleName: '杨校长',
                text: [{ value: '使无数的问题少年，重塑人生。' }],
              },
              { key: 12, showTimeRange: [95560, 107040], roleName: '杨校长', text: [{ value: '啊！校长。啊！咏恩。' }] },
            ],
            captionEn: [
              {
                key: 0,
                showTimeRange: [760, 4880],
                roleName: 'Principal Yang',
                text: [{ value: 'A letter of gratitude to Yongen.' }],
              },
              {
                key: 1,
                showTimeRange: [5240, 13480],
                roleName: 'Principal Yang',
                text: [{ value: " Umm, something's lacking. How about Ode to Yongen." }],
              },
              { key: 2, showTimeRange: [13920, 17840], roleName: 'Principal Yang', text: [{ value: 'Ode to Yongen!' }] },
              {
                key: 3,
                showTimeRange: [18280, 26680],
                roleName: 'Principal Yang',
                text: [{ value: 'I bring sanity to the stray with great innovative treatment.' }],
              },
              {
                key: 4,
                showTimeRange: [27240, 32760],
                roleName: 'Principal Yang',
                text: [{ value: "It's odd. Try changing the subject." }],
              },
              {
                key: 5,
                showTimeRange: [34680, 42000],
                roleName: 'Principal Yang',
                text: [{ value: 'You bring sanity to the stray with great innovative treatment.' }],
              },
              {
                key: 6,
                showTimeRange: [42800, 48320],
                roleName: 'Principal Yang',
                text: [{ value: 'Nice. The music fades in here.' }],
              },
              {
                key: 7,
                showTimeRange: [54840, 61680],
                roleName: 'Principal Yang',
                text: [{ value: "This Ode to Yongen is to laud Yongen's achievements." }],
              },
              {
                key: 8,
                showTimeRange: [62680, 70680],
                roleName: 'Principal Yang',
                text: [{ value: 'You bring sanity to the stray with great innovative treatment.' }],
              },
              {
                key: 9,
                showTimeRange: [71760, 77880],
                roleName: 'Principal Yang',
                text: [{ value: 'You lead numerous lost teenagers back on track.' }],
              },
              {
                key: 10,
                showTimeRange: [78600, 85760],
                roleName: 'Principal Yang',
                text: [{ value: 'You teach the meaning of gratitude with non-stop treatment.' }],
              },
              {
                key: 11,
                showTimeRange: [86520, 94400],
                roleName: 'Principal Yang',
                text: [{ value: 'You turn the lives of troubled children around.' }],
              },
              {
                key: 12,
                showTimeRange: [95560, 107040],
                roleName: 'Principal Yang',
                text: [{ value: 'O Principal! O Yongen!' }],
              },
            ],
            clickableTimeRange: [
              {
                startTimestamp: 0,
                endTimestamp: 110000,
              },
            ],
            resource: {
              aid: 'day-1-afternoon-office.mp3',
            },
          },
        },
      },
    },
  ]

  const roleNamesMap = new Map()

  data.forEach((day, dayNum)=>{
    Object.keys(day).forEach((timeStage)=>{
        const upTimeStage = timeStage.toLocaleUpperCase()
        const scene = day[timeStage].scene
        Object.keys(scene).forEach((sceneName)=>{
            const captions = scene[sceneName].caption
            const captionEns = scene[sceneName].captionEn
            captions?.forEach((caption, captionIndex)=>{
                const roleName = caption.roleName
                const roleNameEn = captionEns[captionIndex].roleName
                const roleNameEnUp = captionEns[captionIndex].roleName.toLocaleUpperCase().replaceAll('.','').replaceAll(' ','_')
                if(!roleNamesMap.has(roleName)){
                    const rosettaKey = `ROLE_NAME.${roleNameEnUp}`
                    roleNamesMap.set(roleName, rosettaKey)
                }
                // 修改data中数据为key
                data[dayNum][timeStage].scene[sceneName].caption[captionIndex].roleName = roleNamesMap.get(roleName)
                // 语言文件加key value
                if(!zh_cn.ROLE_NAME){
                    zh_cn.ROLE_NAME  = {}
                }
                if(!en.ROLE_NAME){
                    en.ROLE_NAME  = {}
                }
                zh_cn.ROLE_NAME[roleNameEnUp] = roleName
                en.ROLE_NAME[roleNameEnUp] = roleNameEn

                // 处理对话
                const texts = caption.text

                texts.forEach(({value}, textIndex)=>{
                    // const captionKey = `CAPTION_${dayNum}_${upTimeStage}_${sceneName}_${captionIndex}_${textIndex}_${crypto.createHash('md5').update(value).digest("hex")}`
                    const captionKey = `CAPTIONS.CAPTION_${crypto.createHash('md5').update(value).digest("hex")}`

                    data[dayNum][timeStage].scene[sceneName].caption[captionIndex].text[textIndex].value = captionKey
                
                    if(!zh_cn.CAPTIONS){
                        zh_cn.CAPTIONS  = {}
                    }
                    if(!en.CAPTIONS){
                        en.CAPTIONS  = {}
                    }
                    zh_cn.CAPTIONS[captionKey] = value
                    en.CAPTIONS[captionKey] = data[dayNum][timeStage].scene[sceneName].captionEn[captionIndex].text[textIndex].value
                })
            })
            Reflect.deleteProperty(data[dayNum][timeStage].scene[sceneName],'captionEn')

        })
    })
  })

  fs.writeFile(`./en.json`, JSON.stringify(en), (err) => {
    if (err) throw err;
  });
  fs.writeFile(`./zh_cn.json`, JSON.stringify(zh_cn), (err) => {
    if (err) throw err;
  });
  fs.writeFile(`./data.json`, JSON.stringify(data), (err) => {
    if (err) throw err;
  });
//   console.log(en)
//   console.log(zh_cn)
//   console.log(JSON.stringify(data))