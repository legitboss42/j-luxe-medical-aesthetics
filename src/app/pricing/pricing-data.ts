export type PricingItem = {
  name: string;
  price: string;
  link: string;
};

export type PricingCategory = {
  title: string;
  items: PricingItem[];
};

export const pricingCategories: PricingCategory[] = [
  {
    title: "CONSULTATION",
    items: [
      {
        name: "Nurse Led Virtual Consultation (20 mins)",
        price: "£25",
        link: "https://www.vagaro.com/cl/jAgLbOPpfYJKofhyWTP~6PVDcSabb-S25MUNXM9gJu4=",
      },
      {
        name: "Nurse Led Face to Face Consultation (25 mins)",
        price: "£35",
        link: "https://www.vagaro.com/cl/PxQuKO0RVo9b9JHzr0~F0Gu682fPqGN3a28cnx8Yomo=",
      },
    ],
  },
  {
    title: "FACIAL",
    items: [
      {
        name: "Express Facial",
        price: "£40",
        link: "https://www.vagaro.com/cl/q9atMVizN5mH2vcBzGIy2hzlc~K4uaIqYLnWLEuZ0zg=",
      },
      {
        name: "Classic Facial",
        price: "£55",
        link: "https://www.vagaro.com/cl/suC8~rHuUo8hdI1X0CR7QR3rNtYPAeW-diyXMYKfrMU=",
      },
      {
        name: "Microdermabrasion Facial",
        price: "£60",
        link: "https://www.vagaro.com/cl/Az5de7~yDAq4Jf2kLNvsHSkLrRoj5pj21Dv1HHRL4lE=",
      },
      {
        name: "Dermaplaning Facial",
        price: "£65",
        link: "https://www.vagaro.com/cl/rE3tBZBmwyNKQntEKsWPv-zo1ImCurmNFqVagMLlvbA=",
      },
      {
        name: "Acne (Deep Extraction /High Frequency)",
        price: "£80",
        link: "https://www.vagaro.com/cl/UYTSgkXAjI5T111cURzext5qftpKS7CvYG8cbyTx8sw=",
      },
      {
        name: "Hydrafacial",
        price: "£95",
        link: "https://www.vagaro.com/cl/ktslki3HpM~WOpRU74SBVm8vkGzg8PWfVf73PqO1jQU=",
      },
      {
        name: "Glow Facial",
        price: "£120",
        link: "https://www.vagaro.com/cl/dAqEVN5PfrweBeEw~glS4Xu~0jqsIPTaCnGC8oZYCTo=",
      },
      {
        name: "Anti-ageing Facial",
        price: "£130",
        link: "https://www.vagaro.com/cl/Mqi3WRsIacxVI993DzmGylzMnHzL5CWHzt-geHPzZK0=",
      },
      {
        name: "Microcurrent/EMS (Face Sculpting)",
        price: "£99",
        link: "https://www.vagaro.com/cl/IyX0qzjqZSGsqeOJg7jsCxmtBtZxSskiyyfJkncN8yM=",
      },
      {
        name: "Vampire Facial",
        price: "£180",
        link: "https://jluxemedicalaesthetics.com/book-now/",
      },
      {
        name: "Customized Luxury Facial",
        price: "£150",
        link: "https://www.vagaro.com/cl/q9atMVizN5mH2vcBzGIy2hzlc~K4uaIqYLnWLEuZ0zg=",
      },
      {
        name: "Back Facial (Women)",
        price: "£75",
        link: "https://www.vagaro.com/cl/Gv89NolGt5uBRZVwuqmb-yTvmurgmWcxM9dfMTr7gZA=",
      },
      {
        name: "Back Facial (Men)",
        price: "£85",
        link: "https://www.vagaro.com/cl/h~ymypZfrx3GYTTd591IIxbwf2YPZkypg6i3WvLCOo0=",
      },
      {
        name: "Chemical Peel Facial",
        price: "£120",
        link: "https://www.vagaro.com/cl/cH1nKSH5OoUVdpV0Hz7asZCqgCgoGSgrGsWidHR7Tu0=",
      },
      {
        name: "LED Light Therapy (Add-On)",
        price: "£20",
        link: "https://www.vagaro.com/cl/8TVYRxoN7s~qm1zwBIguRpMZOkViWTfVHCnkbhKgB4A=",
      },
      {
        name: "Dermaplaning (Add-On)",
        price: "£20",
        link: "https://www.vagaro.com/cl/rE3tBZBmwyNKQntEKsWPv-zo1ImCurmNFqVagMLlvbA=",
      },
      {
        name: "Microdermabrasion (Add-On)",
        price: "£20",
        link: "https://www.vagaro.com/cl/Az5de7~yDAq4Jf2kLNvsHSkLrRoj5pj21Dv1HHRL4lE=",
      },
      {
        name: "High Frequency (Add-On)",
        price: "£20",
        link: "https://www.vagaro.com/cl/InOLcxKFVxGXSSirOeEKtauMbSgiILo1HDJ-rtJK5k0=",
      },
      {
        name: "Microcurrent (Add-On)",
        price: "£20",
        link: "https://www.vagaro.com/cl/ZLJIiw-YgYd2FIYvF3cFBiY4Rcf4x-tWzpw3oi0leww=",
      },
      {
        name: "EMS (Add-On)",
        price: "£20",
        link: "https://www.vagaro.com/cl/qajtgLkE2fZgDnZ6xrTQ09~CJjYgyFn-BYf2ekDCiTw=",
      },
    ],
  },
  {
    title: "ANTI WRINKLE TREATMENT",
    items: [
      {
        name: "Forehead",
        price: "£150",
        link: "https://www.vagaro.com/cl/EyNkHK2CN9Q3zcjZqixqW4AsS1vln8it6~1H1junyOw=",
      },
      {
        name: "Crow’s feet",
        price: "£150",
        link: "https://www.vagaro.com/cl/OmKVBMO0LHmWb0Vqub1-ZsLoMzJsgIi5IS8HWll4oiI=",
      },
      {
        name: "Frown lines",
        price: "£150",
        link: "https://www.vagaro.com/cl/6mCI3j5EIXKa6Mf7CrJTjukHywnp1hhcpdPduphqTUA=",
      },
      {
        name: "Bunny Lines",
        price: "£150",
        link: "https://www.vagaro.com/cl/CN9273JJqp3DfliiNIyOcRd8bkH2lMCRbkPCUtOVPpU=",
      },
      {
        name: "Gummy Smile",
        price: "£150",
        link: "https://www.vagaro.com/cl/vamOL0J2q3jf4pQoN-1sgytMaQPwnKLPK~oSlCBYMzQ=",
      },
      {
        name: "Lip Flip",
        price: "£150",
        link: "https://www.vagaro.com/cl/PBq8Yc4RiQcW9deTW-A9ZoCiWLXmKHYFNyvV8oI-3c0=",
      },
      {
        name: "2 areas treatment (Forehead and frown line)",
        price: "£180",
        link: "https://www.vagaro.com/cl/0HgRSg7YsSwFRH5LbsOQPu3KZyw7VygTUaY64GvuKmw=",
      },
      {
        name: "3 areas treatment (forehead, frown line and crow’s feet)",
        price: "£250",
        link: "https://www.vagaro.com/cl/pHqDxApZ-Y0slYkAAZqbswDQby39gltQYo5zJKyG7XM=",
      },
      {
        name: "Hyperhydrosis",
        price: "£350",
        link: "https://www.vagaro.com/cl/pgQ2s3aYwQMYOKADH7iyxPYq0LcLFl0DqM04xrSuGR4=",
      },
      {
        name: "Nefertiti Neck Lift",
        price: "£325",
        link: "https://www.vagaro.com/cl/QIXEhGeyRcgCZa2Gwd6NizCL7hEZv45LZTcsDNeQ704=",
      },
      {
        name: "Bruxism (Teeth Grinding)",
        price: "£320",
        link: "https://www.vagaro.com/cl/TgGZAkbOK3JeEUA0qOrGKXZK1mWmOrqqa47xRA4knzU=",
      },
      {
        name: "Masseter (Jaw slimming)",
        price: "£320",
        link: "https://www.vagaro.com/cl/7W8FixcFXb2PsTlJXg-yeWS0030ZU7MWroPU46qJAWM=",
      },
      {
        name: "Sweaty palm",
        price: "£350",
        link: "https://www.vagaro.com/cl/OeKL50~mkiEGAwp~lQOJk9QIKQcws4kh4ZVHdnqcuSo=",
      },
      {
        name: "High heel Tox/Sweaty feet",
        price: "£400",
        link: "https://www.vagaro.com/cl/kdTVZ1MkV3yUkr3g5LyygxcHNE-OVtbLgOLYKkcvcVQ=",
      },
    ],
  },
  {
    title: "DERMAL FILLERS",
    items: [
      {
        name: "Lips (0.5ml)",
        price: "£130",
        link: "https://www.vagaro.com/cl/JGXrnlb3QxlylL8zxxsmV59nBwLPb~wid5gGB6Q~pFY=",
      },
      {
        name: "Lips (1ml)",
        price: "£200",
        link: "https://www.vagaro.com/cl/OoG1Q3scz4PCPeCMPFtWoW-b65LD-9SpbvlR~X8hR0Q=",
      },
      {
        name: "Nasolabial Folds",
        price: "£250",
        link: "https://www.vagaro.com/cl/9OnvDlGSw7p-S7gVEY7RwsLfkRBzwPCGxPIO2FPGJNE=",
      },
      {
        name: "Marionette Lines",
        price: "£250",
        link: "https://www.vagaro.com/cl/Jh3w8uwJlXEO~PIm2G6VUebrZbZ45b70GP0dkxBQBqM=",
      },
      {
        name: "Cheeks",
        price: "£250",
        link: "https://www.vagaro.com/cl/dwnwBvT45jbT7BjjS7sw69ethClHODTtmeSp-h3OB~I=",
      },
      {
        name: "Chin",
        price: "£250",
        link: "https://www.vagaro.com/cl/23dE2k8v3NPfbYZlUqzyRRKsaQqOca3c~bAdho0LfUw=",
      },
      {
        name: "Jawline",
        price: "£250",
        link: "https://www.vagaro.com/cl/7Z5iNjAxLvlgsnpitDF8PYqbZKmbVq5ZSsdqSdFuODU=",
      },
      {
        name: "Tear Trough",
        price: "£320",
        link: "https://www.vagaro.com/cl/2AyYVuhPSn52BaLb5J~eDYNT3bjq3k2mNjha~JLTvww=",
      },
      {
        name: "Temples",
        price: "£250",
        link: "https://www.vagaro.com/cl/b1bn-gWVX2cdH~uWKTdARFNddA0MivRym~gmywWbAug=",
      },
      {
        name: "Non-Surgical Rhinoplasty",
        price: "£250",
        link: "https://www.vagaro.com/cl/sC~91ORwN8nAyIDcYcFSplw7tgbWw5XWw74PTRaFQuQ=",
      },
      {
        name: "Smoker’s Lines",
        price: "£250",
        link: "https://www.vagaro.com/cl/ScvVzx0-LXcbe77oyO1SMvN7JLOq8IoIxt9mR7mOZu4=",
      },
      {
        name: "Add on per 1ml",
        price: "£150",
        link: "https://www.vagaro.com/cl/~zSqdO3ZKwMW8iPzfa3Rlm9QnzeLwsbSMAujKM0ZcG8=",
      },
      {
        name: "Elective Filler dissolving (per area)",
        price: "£225",
        link: "https://www.vagaro.com/cl/tAO3-E5FOYt7JewnRkUysNlTA-7Oa-6QXsjHrJqSSao=",
      },
    ],
  },
  {
    title: "LIP BOOSTER",
    items: [
      {
        name: "Lumi Lips Pro Booster",
        price: "£130",
        link: "https://www.vagaro.com/cl/fTN3pCVAuAy9s6dJmAJ5Fl6WO7bRE5CzP9DRiqtaWVM=",
      },
    ],
  },
  {
    title: "SKIN BOOSTER (MESOTHERAPY AND EXOSOMES)",
    items: [
      {
        name: "Microneedling",
        price: "From £139",
        link: "https://www.vagaro.com/cl/Qu~40L6t633snvEkrnIp-M75S29fEsRLiUt-Az4oQ-w=",
      },
      {
        name: "Lumi Eye (1 Session)",
        price: "£100",
        link: "https://www.vagaro.com/cl/HaJij7mDP~5RRYWqQk-vlC3-t4zCdSEdMY88wPOdcMI=",
      },
      {
        name: "Lumi Eyes – (3 Sessions)",
        price: "£280",
        link: "https://www.vagaro.com/cl/2hxOqoFpM1-MFlZT8l5kacRYRFHvbxO-OS1de1s7ijI=",
      },
      {
        name: "Lumi Eye Pro (1 Session)",
        price: "£120",
        link: "https://www.vagaro.com/cl/9H-D8WRe1vHfMxiP4dn56VCZGjwhNc~54eJpa9oRiX8=",
      },
      {
        name: "Lumi Eye Pro (3 Sessions)",
        price: "£340",
        link: "https://www.vagaro.com/cl/7fu5jtdTUmk2ee~D0yync-~-93PEVVW4ndeqX5rJq5Q=",
      },
      {
        name: "Lumi Pro Skinbooster (1 Session)",
        price: "£130",
        link: "https://www.vagaro.com/cl/0mtItKjiuvwIaeOHZcVGX--QbKQeVflG-eO3GHWF6J0=",
      },
      {
        name: "Lumi Pro Skinbooster (3 Sessions)",
        price: "£370",
        link: "https://www.vagaro.com/cl/lqWWTDPiNnz-9RUcwK1INxA20rpf185u2iY0xpaYPtA=",
      },
      {
        name: "Iluma Luna",
        price: "£150",
        link: "https://www.vagaro.com/cl/hK9PeWNd6Kg8r7VPNG6RWsAXn7fybM3qf08weay~Pr0=",
      },
      {
        name: "Sunekos 200 (undereye)",
        price: "£200",
        link: "https://www.vagaro.com/cl/qYLx0S2UO~zu~5VlSEmCM4GjAP7B~mYfpEDMypdammU=",
      },
      {
        name: "Sunekos 1200",
        price: "£250",
        link: "https://www.vagaro.com/cl/S~-Sg9PeNlom-vvUpICir6g2ZgcE-ZiuJKttshEQoP4=",
      },
      {
        name: "Seventy Hyal (1 Session)",
        price: "£150",
        link: "https://www.vagaro.com/cl/S~-Sg9PeNlom-vvUpICir6g2ZgcE-ZiuJKttshEQoP4=",
      },
      {
        name: "Seventy Hyal (3 Sessions)",
        price: "£350",
        link: "https://www.vagaro.com/cl/0yL0rv23bSXOjxpHQ9uv9MCkFcmsz3lv4RS6aFvoxw0=",
      },
      {
        name: "Vitaran I",
        price: "From £200",
        link: "https://www.vagaro.com/cl/jdjC4T5T9beKa6RAXcWYVIfoIlvFjCwvLktebolwwk4=",
      },
      {
        name: "Vitaran II",
        price: "From £200",
        link: "https://www.vagaro.com/cl/x6EZKAlzB9Bx5DalP3QIyQ05kdpJPIYn8p9fuTU8Mdc=",
      },
      {
        name: "Profhilo (1 Session)",
        price: "£220",
        link: "https://www.vagaro.com/cl/UOJFPQ8RyyRZkVUto315Zzl0-GfiOtwTcXI1KZwbk34=",
      },
      {
        name: "Profhilo (2 Session)",
        price: "£380",
        link: "https://www.vagaro.com/cl/4s80S6CvAljYCjYRi8YJmtID9QbDrhK~ShQQTb6fs08=",
      },
      {
        name: "Filmed",
        price: "£200",
        link: "https://www.vagaro.com/cl/Yay1Lr2bhdoobtUPmaABop0meqrRziPbswaUHgNdFbQ=",
      },
      {
        name: "Jalupro: classic, HMW, Superhydro",
        price: "From £200",
        link: "https://www.vagaro.com/cl/FZ-RURjzzSn0LQ0Y1LKdgDmjDGZbIZCdzfCFNifsc44=",
      },
      {
        name: "Nucleofill \u0026 Polynucleotide (1 Treatment)",
        price: "From £250",
        link: "https://www.vagaro.com/cl/FKwMmBHBRdamm06f6RIzOfLGW5uHAiZ7uCILtH9RY~A=",
      },
      {
        name: "Polyneucleotide: Plinest, Plenhyage, Newest",
        price: "From £220",
        link: "https://www.vagaro.com/cl/Uotdks-JIszrhoYfMf7WBo8jgRvTonyVo9e~s66JSv4=",
      },
      {
        name: "PDRN: Rejuran HB, Rejuran Healer",
        price: "From £300",
        link: "https://www.vagaro.com/cl/deYCMIxylQKINv-rNSiavdoB4plMsCSBVVvIwSbXalI=",
      },
      {
        name: "Mesotherapy",
        price: "From £150",
        link: "https://www.vagaro.com/cl/sAYHAH6WfaPR3jD5aFqRhZU7TXkTrc7ERo8ldmvPKPw=",
      },
    ],
  },
  {
    title: "PRP HAIR",
    items: [
      {
        name: "Hair (1 session)",
        price: "£250",
        link: "https://www.vagaro.com/cl/JqbV5CFcslC9YzNUSO2sdnkwIH7Jli~oZM5FjIpV53c=",
      },
      {
        name: "Hair + Biotin (1 session)",
        price: "£300",
        link: "https://www.vagaro.com/cl/UfrCYT9M5Vp9wASwiOuiZzluj-H3JeP69S4ZvCNfl2c=",
      },
    ],
  },
  {
    title: "PRP FACE",
    items: [
      {
        name: "Eyes",
        price: "£175",
        link: "https://www.vagaro.com/cl/g~XdkEzFIMNPtISLzxDCwoJbKuvOeAQgrJX6RY3Mak0=",
      },
      {
        name: "Face",
        price: "£220",
        link: "https://www.vagaro.com/cl/Ur0Eqd~4atjyRCAOkEOp90LzMGJP74NaIwWgIZmxbuc=",
      },
      {
        name: "Neck",
        price: "£220",
        link: "https://www.vagaro.com/cl/Kxi8qfwRrlBMe1sHoKCZRe8vgo9S9ihYmNIBoP43xZw=",
      },
      {
        name: "Decollatage",
        price: "£220",
        link: "https://www.vagaro.com/cl/fogzqCy492iMAKPm14zn4LutxCv1EwQkyBMWFNB0ji4=",
      },
      {
        name: "Face and Neck",
        price: "£280",
        link: "https://www.vagaro.com/cl/lbA-RClwTqpcJzhz2d9HUovIgEpi0E6~vPoDJlq9vVI=",
      },
      {
        name: "Face, Neck and Decollatage",
        price: "£350",
        link: "https://www.vagaro.com/cl/Tg1miz~6NDM19vpMbfOqjHLhZAUOc~KHfofthmCt3v0=",
      },
    ],
  },
  {
    title: "EXOSOME",
    items: [
      {
        name: "Face",
        price: "From £300",
        link: "https://www.vagaro.com/cl/j1znaq1eJ54Ed8WIPVzOqqvWge7m8wuAZDgqT0t9aEA=",
      },
      {
        name: "Hair",
        price: "From £300",
        link: "https://www.vagaro.com/cl/Oes3hoa0ys6zzwJOsxDQsrVEoQx~jZjZIsgnKlRlZsA=",
      },
    ],
  },
  {
    title: "CHEMICAL PEEL",
    items: [
      {
        name: "Biorepeel Face",
        price: "£120",
        link: "https://www.vagaro.com/cl/ypyIaVStfQYoc2vYAno1vlPYSWI466dKxgnyCaGQCco=",
      },
      {
        name: "Biorepeel Neck",
        price: "£120",
        link: "https://www.vagaro.com/cl/WKeULfeKjHxppM90E~ofQ7WhIG5S5zmHcnJE-nFhpLo=",
      },
      {
        name: "Biorepeel Decoletage",
        price: "£300",
        link: "https://www.vagaro.com/cl/AM4DZTBDjpTQ1gvyXxKjY1pgfYY9cyc0cyVAk0-V1wM=",
      },
      {
        name: "Biorepeel Body",
        price: "£300",
        link: "https://www.vagaro.com/cl/-DD5YcOcNqBS9hUKV-v2~tUnbEHLJszFkCQK8UV3g3U=",
      },
      {
        name: "Biorepeel (3 Sessions)",
        price: "£330",
        link: "https://www.vagaro.com/cl/tCTXvsgWwCmcxto~2fIQIJpNJLRTg~B1Y4jsn0y292w=",
      },
      {
        name: "PRX – T33 (Single)",
        price: "£130",
        link: "https://www.vagaro.com/cl/OjgB3NTN91JQsMb8ns1H5psieUhjzfcfVnRg7i-ewQY=",
      },
      {
        name: "PRX – T33 (3 Sessions)",
        price: "£330",
        link: "https://www.vagaro.com/cl/WGNih8zLM54ammJwqGyPMP72yXOs7al7Glz42dhpfWQ=",
      },
    ],
  },
  {
    title: "BODY SERVICES",
    items: [
      {
        name: "Wood Therapy (45 mins)",
        price: "£65",
        link: "https://www.vagaro.com/cl/8X~Y6QwRMwLphrqmIk93J7KX7FXtDjgoLe33e1F0Dyw=",
      },
      {
        name: "Slimming and Cellulite Reduction (60 mins)",
        price: "£85",
        link: "https://www.vagaro.com/cl/A~DVPsmb0cilogg5swd3HzGxs5edf3y~GM4jX5djErg=",
      },
      {
        name: "Snatched and Contoured (45 mins)",
        price: "£85",
        link: "https://www.vagaro.com/cl/ueFW5RvJ~7wA35oi0wqLVRWHeVe80wNB-P1xXE-P-JE=",
      },
      {
        name: "Advanced Cavitation (60 mins)",
        price: "£105",
        link: "https://www.vagaro.com/cl/wXp-LSNuaI5DapvuIa4ZwqItmg5oSgm-pC0ZwQTY~~I=",
      },
      {
        name: "RF (60 mins)",
        price: "£105",
        link: "https://www.vagaro.com/cl/ugVIKJwrZz7E5oC6UWola1RHyfyHurKHAQgxZfIxO6c=",
      },
      {
        name: "Vacuum (60 mins)",
        price: "£105",
        link: "https://www.vagaro.com/cl/-DluQb5bBdpuHqHWFbrUH3T1VCx6d~BM4~DP~0~W3Kw=",
      },
      {
        name: "Laser Pad (60 mins)",
        price: "£105",
        link: "https://www.vagaro.com/cl/-xqjl8oECAXAENZ~74UKansmvYLhzGxRttheCrOXj2E=",
      },
      {
        name: "Body Sculpting Fusion (Wood Therapy, Advanced Cavitation, RF, Vacuum and Laser Pad) (90 mins)",
        price: "£130",
        link: "https://www.vagaro.com/cl/e5iuTaswvFQHcfzzhtfWdWkm7LMnsBycTOvrcpv5cW4=",
      },
      {
        name: "Post Op care \u0026 Manual (60 mins)",
        price: "£120",
        link: "https://www.vagaro.com/cl/U~-542w5MljwQ3TBlXQeGxvyRFyJZ~-PhiaHkugN4Xk=",
      },
      {
        name: "Skin tightening radio-frequency",
        price: "£80",
        link: "https://www.vagaro.com/cl/Qp6NFB0zmFpbqdFMVhVGxxLvK-ND52dd1rGiM5fTNZQ=",
      },
      {
        name: "Laser Lipo Pads",
        price: "£55",
        link: "https://www.vagaro.com/cl/Ix6kQ2GTq~w3a44sN~LhTbJmq6gcvaGV4ViD~8XIoHk=",
      },
      {
        name: "Lymphatic Drainage Massage (30 mins)",
        price: "£55",
        link: "https://www.vagaro.com/cl/yNLvD2oC141hO~MN9Ye4pvd78joCCQcDdEdMNJrUwsI=",
      },
      {
        name: "Lymphatic Drainage Massage (45 mins)",
        price: "£70",
        link: "https://www.vagaro.com/cl/ldXFwX6~5KLAp4ucurh3K76svTmP9lbibsyeB0isyaM=",
      },
      {
        name: "Lymphatic Drainage Massage (60 mins)",
        price: "£90",
        link: "https://www.vagaro.com/cl/mwlzvDjUbU66mzHbaT7NKDzVDpoweDme57Sr3WBUCkg=",
      },
      {
        name: "Lymphatic Drainage Massage (90 mins)",
        price: "£155",
        link: "https://www.vagaro.com/cl/hA~dV~yNjttDIehG02SZCH4Bg0A3A9gM4qS3nscIFzM=",
      },
    ],
  },
  {
    title: "FAT DISSOLVING INJECTIONS",
    items: [
      {
        name: "Lemon Bottle: Small Area (1 vial)",
        price: "£100",
        link: "https://www.vagaro.com/cl/8MFbBNEde9vcITy00UjqLHC3n5U-02d~-6IhzBeslAQ=",
      },
      {
        name: "Lemon Bottle: Medium Area (3 Vials)",
        price: "£150",
        link: "https://www.vagaro.com/cl/rYiQvB9BIaKVVfX2F4Kh-9b3KUA7s1loe9DgviNNjlE=",
      },
      {
        name: "Lemon Bottle: Large area (4 vials)",
        price: "£180",
        link: "https://www.vagaro.com/cl/7zSZaOzaX2YOfauHpDR~lBnV8jxVU6WFsLrMM8zxOlU=",
      },
      {
        name: "Aqualyx: Small Area (1 vial)",
        price: "£200",
        link: "https://www.vagaro.com/cl/ld7Nd2rOg0jJIGj6m-gnSEQWxvkoL0O6HqdY-gmtu90=",
      },
      {
        name: "Aqualyx: Medium Area (3 Vials)",
        price: "£280",
        link: "https://www.vagaro.com/cl/pK-frcPZHhWiBm6lqvbySIAYHrd~ct9E0qISNZujZ9I=",
      },
      {
        name: "Aqualyx: Large area (4 vials)",
        price: "£350",
        link: "https://www.vagaro.com/cl/hC2okyYunC7XmDhkyrkqCQgoASITQgEfTF~3c62YUPU=",
      },
    ],
  },
  {
    title: "IV VITAMIN DRIP",
    items: [
      {
        name: "Basic Hydration",
        price: "£100",
        link: "https://www.vagaro.com/cl/-nUZaF3vDevrzABvPqw3QBeXL8XcjupXSivPVxpBS3Y=",
      },
      {
        name: "Multivitamin",
        price: "£125",
        link: "https://www.vagaro.com/cl/qAzAd-1~d7uf6WgbVt~maEgm4YG8q7iD7ozR22nBM-w=",
      },
      {
        name: "Multi-Mineral",
        price: "£125",
        link: "https://www.vagaro.com/cl/RMBtacBZlQ4Ib7WkZ8so95ZjDBgZbNnZESCTo5wNZ4I=",
      },
      {
        name: "Energy",
        price: "£150",
        link: "https://www.vagaro.com/cl/FiiYNnI4-MxlasWFDDT~XmfrAirGQ7zZ0gY245ki374=",
      },
      {
        name: "Immunity",
        price: "£150",
        link: "https://www.vagaro.com/cl/WibHjbXHIhgedd2PbHToFmtyJ7ifoprQyY8d3tjH5dA=",
      },
      {
        name: "Detox drip",
        price: "£150",
        link: "https://www.vagaro.com/cl/RzQBk~JbiQdz1jkFuT58WBsSGUv7sOQXfYuw7N1pQNA=",
      },
      {
        name: "Detox drip (Double dose)",
        price: "£300",
        link: "https://www.vagaro.com/cl/gl0Qq6fFOpK8Q0kR6-r2qTMDbD9NvbF4Sr8OQoc-cmo=",
      },
      {
        name: "Anti-aging drip",
        price: "£200",
        link: "https://www.vagaro.com/cl/ryFVWkyu6MN09qQSCDCkucInMSMuOnT6ZdV5okPNrfc=",
      },
      {
        name: "High dose vitamin C (7.5mg)",
        price: "£125",
        link: "https://www.vagaro.com/cl/J8JWyozVVqDbOUnFNyodIjlQaao4N2V3ouEQT9N38EY=",
      },
      {
        name: "High dose Vitamin C (15mg)",
        price: "£150",
        link: "https://www.vagaro.com/cl/np2kqSyuU6MT6BlVzxOsA4XmEwvKwg9kVy4LmLb4tSo=",
      },
      {
        name: "High dose vitamin C (25mg)",
        price: "£200",
        link: "https://www.vagaro.com/cl/NXNgxkCBDQhWxRsgCT~hOsEOVIAfZYbyQydE6ZRl4G8=",
      },
      {
        name: "High dose vitamin C (50mg)",
        price: "£275",
        link: "https://www.vagaro.com/cl/G3mPChVxlRsniuGr8rBbOSyd3s2RXH90TiqezQKe4sM=",
      },
      {
        name: "Skin Brightening Drip (600mg)",
        price: "£125",
        link: "https://www.vagaro.com/cl/X9TLl9e09fH6qvTP6tvIIF7aR8rwIvhLycSCsshjXag=",
      },
      {
        name: "Skin Brightening drip (1200mg)",
        price: "£175",
        link: "https://www.vagaro.com/cl/ct3ktAhOi1VmMU2z1Iqw7E0YHq71tDrntfipRAO6On8=",
      },
      {
        name: "Skin Brightening drip (1800mg)",
        price: "£225",
        link: "https://www.vagaro.com/cl/HJit~~VfrBPSeNlcBrg5aq6Lle6pnDJ7fRefmg~zFZ8=",
      },
      {
        name: "Skin Brightening drip (2400mg)",
        price: "£275",
        link: "https://www.vagaro.com/cl/nZ-YrbC6gE1wjrzjLYmMFGrtK27EQJsExzPqtYRVZns=",
      },
      {
        name: "Skin Brightening drip (3000mg)",
        price: "£325",
        link: "https://www.vagaro.com/cl/~JsTIdNlL9uoI9Nh5NV2ctjAsE1JoEXa1vJsEK-MY-w=",
      },
      {
        name: "Weightloss drip",
        price: "£175",
        link: "https://www.vagaro.com/cl/SMYFBz3QPe6syo6~fgOGw83QGTDl8rC-AoFXebdf-pA=",
      },
      {
        name: "Fitness drip",
        price: "£225",
        link: "https://www.vagaro.com/cl/gwi~TMRG9BluCAShbw1WBd5rtR~9M~f7IUCC14JHVfE=",
      },
      {
        name: "Skin and hair drip",
        price: "£175",
        link: "https://www.vagaro.com/cl/uR7Rjs36IeqMIZuRuZnjNa0Jp8~PuM8Y-BC2NOgwwIY=",
      },
      {
        name: "NAD",
        price: "£325",
        link: "https://www.vagaro.com/cl/WKaHNTNsGBwCzCtNTApZXvQGeJOIbFQiQTECZ1RvEMg=",
      },
      {
        name: "Myers Cocktail",
        price: "£225",
        link: "https://www.vagaro.com/cl/qR8ir2DbVAP3iLVtM76PsHNLy3Gy1g8NCFwrB0KqcW8=",
      },
    ],
  },
  {
    title: "IM VITAMIN INJECTION",
    items: [
      {
        name: "Vitamin C",
        price: "£35",
        link: "https://www.vagaro.com/cl/R20MdLmJELAfRlAWHZLnswYUDtWzK7D4sJ5ohZPQQjc=",
      },
      {
        name: "Vitamin D",
        price: "£45",
        link: "https://www.vagaro.com/cl/94zVdbSFlMfjzVAnosSXNPn-Uz5FumLjAIL0KKPxQ24=",
      },
      {
        name: "Vitamin B12",
        price: "£45",
        link: "https://www.vagaro.com/cl/NUmjlDgRD68H1LniBIWjpRUZ~NAaQysHaI6vbsvSSF4=",
      },
      {
        name: "Vitamin B Complex",
        price: "£35",
        link: "https://www.vagaro.com/cl/QT5qfjOjordY~zKfUJraoQhUVCnJOTe4MaakIF8VMbI=",
      },
      {
        name: "Biotin",
        price: "£50",
        link: "https://www.vagaro.com/cl/8~w3cdP-tmnbBoSXo5ZvaAblREoPgQtUJyuMyJpoCyY=",
      },
      {
        name: "Glutathione",
        price: "From £90",
        link: "https://www.vagaro.com/cl/QuwBrwO3uFF7zwTtGPCBARDTr62uc9jKwgMsndZVzF4=",
      },
      {
        name: "Iron Booster",
        price: "Book Consultation",
        link: "https://jluxemedicalaesthetics.com/book-now/",
      },
    ],
  },
  {
    title: "EMS SCULPT",
    items: [
      {
        name: "1 Area (1 Session)",
        price: "£99",
        link: "https://www.vagaro.com/cl/Fs5BKHArwUGGKcBzJ6hcf8Kg8Sb3l0WHbQ1oKPft1Kk=",
      },
      {
        name: "1 Area (3 Sessions)",
        price: "£225",
        link: "https://www.vagaro.com/cl/6x7y9Y60FGrFAytpCdLybd3lXrkZmfTfvUVC49DeP1s=",
      },
      {
        name: "1 Areas (6 Session)",
        price: "£480",
        link: "https://www.vagaro.com/cl/Z1xrPon5fqPOz~G-~fFnWpYbbKs9Z9LM73ChZe8iLM0=",
      },
      {
        name: "2 Areas (1 Session)",
        price: "£150",
        link: "https://www.vagaro.com/cl/RbJr69ZxjCrSqAXyCUdKHSsyVb13wfMdRAmWEOoA8fc=",
      },
      {
        name: "2 Areas (3 Sessions)",
        price: "£350",
        link: "https://www.vagaro.com/cl/3tqf5nEkep~aL9SwjFG4hxAfW5Nb6gsKJsGi2X3NpYc=",
      },
      {
        name: "2 Areas (6 Sessions)",
        price: "£780",
        link: "https://www.vagaro.com/cl/BNnYENt9L-k~ULtuf05DwzZdPuNYQD7-x7O7-8KeXP4=",
      },
    ],
  },
  {
    title: "TEETH WHITENING",
    items: [
      {
        name: "Standard",
        price: "£99",
        link: "https://www.vagaro.com/cl/YRv4eymUHa~mmbD0~hTQGnirDbXDL2paRVRn--omFkM=",
      },
      {
        name: "Premium",
        price: "£120",
        link: "https://www.vagaro.com/cl/eJYYVAqmDUf-tG-RqfApf8-uB4HO1VMJCOtj30Q40qo=",
      },
      {
        name: "Ultra",
        price: "£150",
        link: "https://www.vagaro.com/cl/IXq77wNTtRgomoy4OCieJ41sCNOoS2Wh3JTrC8gIegQ=",
      },
      {
        name: "Top Up (30 Minutes Session)",
        price: "£50",
        link: "https://www.vagaro.com/cl/NZfXsDMqIbyR3dAY1wExXAixwwxtnmrZawPJo1L~OuI=",
      },
    ],
  },
  {
    title: "DISSOLVE FILLERS",
    items: [
      {
        name: "1 session to dissolve fillers",
        price: "From £200",
        link: "/pricing",
      },
    ],
  },
  {
    title: "FACIAL WAXING",
    items: [
      {
        name: "Eyebrow",
        price: "£5",
        link: "https://www.vagaro.com/cl/GHlBsr4wuP6jL6Rn-5LDMTMnI~c7zTePOeKALWmX4jA=",
      },
      {
        name: "Upper Lip",
        price: "£5",
        link: "https://www.vagaro.com/cl/TvFS3tsiEdusmaQ1EZhsFBDBC19fPZu4iJsY8JfZV3o=",
      },
      {
        name: "Lip And Chin",
        price: "£8",
        link: "https://www.vagaro.com/cl/sBbcb24lBAlv5vcedG-~NHi8NSJ268K-~RDwX4vaiVw=",
      },
      {
        name: "Full Face",
        price: "£30",
        link: "https://www.vagaro.com/cl/lhXe9IfVzxAi~fqI7mT-m2KzMUzV84F0gXASx~qq8qY=",
      },
      {
        name: "Chin",
        price: "£5",
        link: "https://www.vagaro.com/cl/pl9RgIvT3-xaTmrLPICf822OxKndjNe-Ndgcp1eNBhg=",
      },
      {
        name: "Lower Lip",
        price: "£5",
        link: "https://www.vagaro.com/cl/FnDv6aZj5HUR9XH-iifjdjv2GqRsT0mazopmYoNDPh4=",
      },
      {
        name: "Nostrils",
        price: "£5",
        link: "https://www.vagaro.com/cl/hOZjiRc3ZzGHVlSftSUW59xFpTjy~U5tE59aAehFnYM=",
      },
      {
        name: "Forehead",
        price: "£8",
        link: "https://www.vagaro.com/cl/e3TRP1aBM47JOl-9wPb5L7vor1yxTP1ZqFv7RUovJAY=",
      },
      {
        name: "Sides",
        price: "£8",
        link: "https://www.vagaro.com/cl/VRd-ujdOO1kobYNtivB~RLZY~pmfsHZjpySrDM~KXDE=",
      },
      {
        name: "Neck",
        price: "£10",
        link: "https://www.vagaro.com/cl/VXa1e7wlnchG9JVq1HLgXsGtETL6nip9d0675LVNvdU=",
      },
      {
        name: "Full Face And Neck",
        price: "£10",
        link: "https://www.vagaro.com/cl/tBfGiGhUuYVkRcqzeQYcpPRlaiR9eC4f4YysdaNCcFc=",
      },
    ],
  },
  {
    title: "UNDERARMS AND ARM WAXING",
    items: [
      {
        name: "Underarm",
        price: "£12",
        link: "https://www.vagaro.com/cl/rQrjt3opbKT4dNjUGpmNNLFjdt3GB3NPM-590CavvD4=",
      },
      {
        name: "Half Arm (Forearm)",
        price: "£18",
        link: "https://www.vagaro.com/cl/PfRZmZQ43WjsFBnPiCvroYkQxNamqSfvqFbILmMZ7eQ=",
      },
      {
        name: "Full Arm",
        price: "£25",
        link: "https://www.vagaro.com/cl/R8nu2L0-Bst8cmFbByeptBXd1uXysY-FVDp~YnrKR-c=",
      },
    ],
  },
  {
    title: "LEG WAXING",
    items: [
      {
        name: "Half Leg",
        price: "£20",
        link: "https://www.vagaro.com/cl/xWVL2IN5PRBW1YdcIXtFWXE6jA85kuvA8GNwB1yqMx8=",
      },
      {
        name: "3/4 Leg",
        price: "£25",
        link: "https://www.vagaro.com/cl/kO2pIq68llGHya2cAOqIpGszOfCTl3XrSIz58to2U6Y=",
      },
      {
        name: "Full Leg",
        price: "£30",
        link: "https://www.vagaro.com/cl/Z2~Sds95ZuOxGsL0y4F5KlgPGuP6zu63FzuDqXrNeS0=",
      },
    ],
  },
  {
    title: "UPPER BODY WAXING",
    items: [
      {
        name: "Chest",
        price: "£20",
        link: "https://www.vagaro.com/cl/ldnEHqGfI8-FptWdoWbwglZPzpTO-8Ri9hfNrNVBgd8=",
      },
      {
        name: "Full Back",
        price: "£25",
        link: "https://www.vagaro.com/cl/NDxQb-n78Via2lauuVRSMTYDrr9BqE77o0sE1ZHlwxE=",
      },
      {
        name: "Stomach",
        price: "£20",
        link: "https://www.vagaro.com/cl/DTWG-wW3H4bsimYH99buGE~7V-Jitq60Z~WWLDfofGE=",
      },
    ],
  },
  {
    title: "INTIMATE WAXING (FEMALE)",
    items: [
      {
        name: "Bikini Line",
        price: "£18",
        link: "https://www.vagaro.com/cl/E4dqqoTWXqcLZ100qso-GzpYwMGEW7NF3oVgDxF3kP4=",
      },
      {
        name: "High Bikini/ Extended Bikini",
        price: "£23",
        link: "https://www.vagaro.com/cl/e8bs21~Agb0ApFu-lYPhxf0P121W26YcXdGDxedV26c=",
      },
      {
        name: "Brazillian (Hot or Strip)",
        price: "£30",
        link: "https://www.vagaro.com/cl/kZZZ-GRPYZgBD7Syc4KJ1NnG4WjvKMvuKDzpJgTj7Xc=",
      },
      {
        name: "Hollywood",
        price: "£35",
        link: "https://www.vagaro.com/cl/0gJmkVGIT4mn88trnTLa14qMM-Vd~74ohqyDlTvj5p0=",
      },
    ],
  },
  {
    title: "MENS WAXING",
    items: [
      {
        name: "Chest Wax",
        price: "£30",
        link: "https://www.vagaro.com/cl/XA44ctCBNgn29jPBfsV0nyjU1Cb0qPZz57ZEV2ga2Xc=",
      },
      {
        name: "Back Wax",
        price: "£35",
        link: "https://www.vagaro.com/cl/uR~yEBOaVIzz~s2tVABL41WqZegwtLiGrOGJhEI29x0=",
      },
      {
        name: "Half Arms",
        price: "£20",
        link: "https://www.vagaro.com/cl/ffLe79V7bGA3WK8S44jEfNaT0hPaQNYvNvPTSUyCz9c=",
      },
      {
        name: "Shoulders",
        price: "£20",
        link: "https://www.vagaro.com/cl/B~zeNeifzSMdCJngCVHf9uWg8kwJzyx85wO8gIP6PXs=",
      },
      {
        name: "Underarms",
        price: "£20",
        link: "https://www.vagaro.com/cl/JcWBT1Rmxh2RCkIkXz55l3169-pkoV3dHx8Anxe-aqg=",
      },
      {
        name: "Full Arms",
        price: "£25",
        link: "https://www.vagaro.com/cl/Frt7d5QUBkrDwTFe3yrcy0hSNf~WmwFlO8u7xv9jDqs=",
      },
      {
        name: "Half Legs",
        price: "£30",
        link: "https://www.vagaro.com/cl/KLNSzi9q0aSWasFVvfIgLQBCF1D8OoT2PrxayWmuYxU=",
      },
      {
        name: "Full Legs",
        price: "£40",
        link: "https://www.vagaro.com/cl/oRADt1Aj3rlRMFKklidnpIX8FBOPx29X2zU0dI3kqew=",
      },
      {
        name: "Manzilian",
        price: "£45",
        link: "https://www.vagaro.com/cl/pCPppeRD9d5UrP1-2EXRlyqqTgomvNLSHgUOxNUoVBA=",
      },
      {
        name: "Back And Shoulders",
        price: "£50",
        link: "https://www.vagaro.com/cl/iA5jJx8wrlfTvrhVDd~ZJmV3m5vt~1-1Bc0SyhjVIiI=",
      },
      {
        name: "Abdomen",
        price: "£25",
        link: "https://www.vagaro.com/cl/P3LHm2J3npfh6qecgoX6Yt9nbDiMHSfSyicn0~W192Q=",
      },
    ],
  },
  {
    title: "FULL BODY COMBOS WAXING (FEMALE)",
    items: [
      {
        name: "Full Arms, Full Legs, Hollywood, Underarms",
        price: "£70",
        link: "https://www.vagaro.com/cl/FoVqPLxmE17DDS6y48E3NY8gi-7rj5nMOWNt2HXmQwo=",
      },
      {
        name: "Brazilian And Half Legs",
        price: "£45",
        link: "https://www.vagaro.com/cl/nwiFEAUonmK0yzLcH570MkFmka7yCKSOvrnEF8ed7n8=",
      },
      {
        name: "Hollywood And Half Leg",
        price: "£50",
        link: "https://www.vagaro.com/cl/pFz6-mh3T06zMZ6X1OjDfU1l471nXZV96v9v4Zn4A18=",
      },
      {
        name: "Brazilian And Full Legs",
        price: "£55",
        link: "https://www.vagaro.com/cl/aukHM3Z4JQ5qYgPt7kp6px7Z~kWsbbREejtcvlgtrOA=",
      },
      {
        name: "Full Arms, Full legs, Underarms",
        price: "£55",
        link: "https://www.vagaro.com/cl/egxM-jvSIYTixsRcDerdnHBJXuYEkraowimEd37yfzs=",
      },
      {
        name: "Hollywood And Full Legs",
        price: "£60",
        link: "https://www.vagaro.com/cl/lBccpeVJeTZtvrSrhIBru-99fDVh4Dw-DxNVfxfAAI0=",
      },
      {
        name: "Full Arms, Full Legs, Underams, Full Back, Stomach, Full Chest",
        price: "£95",
        link: "https://www.vagaro.com/cl/d63r1C8G4DzYiiTKc68w8H63X5rD47TP1ylMzCFtiks=",
      },
    ],
  },
];

