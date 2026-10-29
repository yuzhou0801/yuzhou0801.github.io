// 个人资料、教育经历、News 和 Publications 都在这里维护。
// 照片可填 ./assets/profile.jpg；链接填完整 URL。日期支持 YYYY-MM 或 YYYY-MM-DD。
// News 按最新在前显示：论文接收月份据项目 README（2026-08），获奖月份据用户提供的 X 公告（2026-03）。
// 论文标题、作者顺序及会议信息已按 ACL Anthology 核对。
window.SITE_DATA = {
  "template": false,
  "updated": "October 2026",
  "profile": {
    "name": "Yu Zhou",
    "initials": "YZ",
    "position": "PhD Student in Computer Science",
    "institution": "Heriot-Watt University",
    "department": "Heriot-Watt University",
    "location": "Edinburgh, UK",
    "supervisor": {
      "name": "Oliver Lemon",
      "url": "https://sites.google.com/site/olemon/"
    },
    "photo": "./assets/profile.jpg",
    "photoAlt": "A ginger cat wearing headphones at a computer",
    "bio": [
      "I am a PhD student in Computer Science at Heriot-Watt University, supervised by Oliver Lemon. My research interests include natural language processing, robot safety, and multi-agent systems.",
      "I received my Msc in Environmental Data Science and Machine Learning from Imperial College London in 2026. Previously, I completed undergraduate degrees in Computer Science and Technology at Ocean University of China and Robotics at Heriot-Watt University in 2025."
    ],
    "interests": [
      "Natural Language Processing",
      "Robot Safety",
      "Multi-Agent Systems"
    ],
    "links": {
      "email": "yz2069@hw.ac.uk",
      "scholar": "https://scholar.google.com/citations?user=XffcrdQAAAAJ&hl=en",
      "linkedin": "https://www.linkedin.com/in/yu-zhou-596aa4339/",
      "github": "https://github.com/yuzhou0801"
    }
  },
  "education": [
    {
      "institution": "Heriot-Watt University",
      "degree": "PhD in Computer Science",
      "period": "2026 — Present",
      "detail": "Supervisor: Oliver Lemon"
    },
    {
      "institution": "Imperial College London",
      "degree": "Msc in Environmental Data Science and Machine Learning",
      "period": "2025 — 2026",
      "detail": ""
    },
    {
      "institution": "Ocean University of China",
      "degree": "Bachelor’s degree in Computer Science and Technology",
      "period": "2021 — 2025",
      "detail": ""
    },
    {
      "institution": "Heriot-Watt University",
      "degree": "Bachelor’s degree in Robotics",
      "period": "2021 — 2025",
      "detail": ""
    }
  ],
  "news": [
    {
      "date": "2026-08",
      "type": "paper",
      "text": "Our paper 0xClaw has been accepted to Findings of EMNLP 2026!",
      "url": "https://aclanthology.org/2026.findings-emnlp.415/"
    },
    {
      "date": "2026-03",
      "type": "award",
      "text": "Our project 0xClaw won 1st place in the Z.ai track at the UK AI Agent Hackathon × OpenClaw!",
      "url": "https://x.com/mingthemerxiles/status/2035732424408125800"
    }
  ],
  "publications": [
    {
      "id": "zhou-etal-2026-0xclaw",
      "year": 2026,
      "type": "conference",
      "venueShort": "EMNLP 2026",
      "title": "0xClaw: Autonomous Open-ended Agents with Phase-aware Budget Allocation and Temporal Pressure",
      "authors": [
        {
          "name": "Yu Zhou",
          "self": true
        },
        {
          "name": "Xinyuan Dou"
        },
        {
          "name": "Yudong Cao"
        },
        {
          "name": "Junhao Song"
        }
      ],
      "venue": "Findings of the Association for Computational Linguistics: EMNLP 2026, pp. 8753–8769.",
      "note": "",
      "url": "https://aclanthology.org/2026.findings-emnlp.415/",
      "pdf": "https://aclanthology.org/2026.findings-emnlp.415.pdf",
      "code": "https://github.com/0xclaw-ai/0xClaw",
      "abstract": null,
      "bibtex": "@inproceedings{zhou-etal-2026-0xclaw,\n  title = {0x{C}law: Autonomous Open-ended Agents with Phase-aware Budget Allocation and Temporal Pressure},\n  author = {Zhou, Yu and Dou, Xinyuan and Cao, Yudong and Song, Junhao},\n  editor = {Lee, Hung-Yi and Dev, Sunipa and Li, Jessy and Elliott, Desmond},\n  booktitle = {Findings of the Association for Computational Linguistics: {EMNLP} 2026},\n  month = oct,\n  year = {2026},\n  address = {Budapest, Hungary},\n  publisher = {Association for Computational Linguistics},\n  url = {https://aclanthology.org/2026.findings-emnlp.415/},\n  pages = {8753--8769},\n  isbn = {979-8-89176-462-0}\n}"
    }
  ]
};
