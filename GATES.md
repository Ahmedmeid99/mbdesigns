# Gates: MB Designs feedback round 2

OWNS: src/**, public/assets/images/**, scripts/verify-round2.mjs, GATES.md

Scope: implement every actionable requirement in MB DESIGNS Website Development Feedback Revision Round 02 using local assets and verify the integrated TanStack site.

- [x] G0: this ledger states outcomes that can fail honestly
  CHECK: node "C:\Users\USER\.codex\skills\unlazy\scripts\gate-lint.mjs" GATES.md
  EXPECT: LINT OK
  EVIDENCE: automatic-evidence=v1; definition-sha256=eb28f4d565306aa0abc3af41c96f5ea8385643f3cfa592ae8541ea1d084b5ae1; exit=0; EXPECT=matched; output-sha256=2c557a6113db4c377941a81dddd5af21c7a575967db82d8350da20817bb50659; output-bytes=151; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Websites\MB-Desigins; path=7e1da3557ad7/33 entries

- [x] G1: shared page titles use the three-line modern-plus-serif treatment with tighter supporting copy and consistent reduced side bleed
  CHECK: node scripts/verify-round2.mjs global
  EXPECT: round2 global verification passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=83f1d47f6b9b48699cfc85f6c4e81487b08bb6f157f635a3b07dcac717d8256c; exit=0; EXPECT=matched; output-sha256=41226760e8f45514aa0c02e964814e8754456816a942d208f4874a7a55ac2302; output-bytes=34; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Websites\MB-Desigins; path=7e1da3557ad7/33 entries

- [x] G2: Home routes Meet the Studio to Team, places an interactive MB Designs map for Cairo, Dubai, Riyadh, and Athens after the hero, reveals compact sector descriptions, and uses the corrected footer location spacing and spelling
  CHECK: node scripts/verify-round2.mjs home
  EXPECT: round2 home verification passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=edc720d501f98e1f7dd69fb9d9251b4a60a58c562632d820225a3339a4f643c7; exit=0; EXPECT=matched; output-sha256=cf5411091ac109c3bb104be3a6ebf005a3fdfbc4d2f8800b39b54807ff43f3b0; output-bytes=32; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Websites\MB-Desigins; path=7e1da3557ad7/33 entries

- [x] G3: Awards follows certificate-to-project hierarchy, uses consistent certificate framing, preserves badges, and includes four featured Best Luxury Studio projects with four local images and supplied copy each
  CHECK: node scripts/verify-round2.mjs awards
  EXPECT: round2 awards verification passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=91d4b2e02af9951de465a4058beb5f5b7fb041c195e7c249979cc828709a94ce; exit=0; EXPECT=matched; output-sha256=e0595cd16e53d2698cbbbf7f9dc7a18af46ddf95f0dd5bcf4c1f47a067ba1b31; output-bytes=34; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Websites\MB-Desigins; path=7e1da3557ad7/33 entries

- [x] G4: Projects main page shows six large square sectors in a three-by-two desktop grid with one-line titles, no project counts, and the revised subtitle
  CHECK: node scripts/verify-round2.mjs projects-index
  EXPECT: round2 projects index verification passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=4054131fb5f38bc3b1b70690c38148710aef999bbce8289f6d320b19e5a73e45; exit=0; EXPECT=matched; output-sha256=ba274eda1d60130a01d0a42b3b20a7b7690ac71f12893967e7aaa038317206c7; output-bytes=42; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Websites\MB-Desigins; path=7e1da3557ad7/33 entries

- [x] G5: sector pages and project galleries use reduced side margins, larger rectangular images, one-line smaller titles, no gallery zoom, and project detail information appropriate to each sector
  CHECK: node scripts/verify-round2.mjs project-details
  EXPECT: round2 project detail verification passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=259885c0ca7cf813cf6c0e5ee7905a0f29ced10a17a22a360d295b08ddbece6f; exit=0; EXPECT=matched; output-sha256=814728fcf57e0b7965a800133ae8deae1e81103e4aa172a79f6704a0443af006; output-bytes=42; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Websites\MB-Desigins; path=7e1da3557ad7/33 entries

- [x] G6: Corporate and Food and Beverage projects use the required corrected names and international-first order, and Hospitality uses a calm stay-focused title
  CHECK: node scripts/verify-round2.mjs project-content
  EXPECT: round2 project content verification passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=b63e7188417305406314a2b4a10146e17759eecde9677e1e6da1ddee4aa9ada0; exit=0; EXPECT=matched; output-sha256=fcafcd484a9de7cb99e56841df3260e866ca02c51b20037902c0b5f6fea1aa91; output-bytes=43; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Websites\MB-Desigins; path=7e1da3557ad7/33 entries

- [x] G7: Team portraits are reduced and the combined Site and Documents group contains Mohamed Sayed and Ahmed Metwally as Site Supervisor
  CHECK: node scripts/verify-round2.mjs team
  EXPECT: round2 team verification passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=cf59a00bb9d4d2c834455b705c8de1105eab77810ab8e18e5316ac9a5b6cd17b; exit=0; EXPECT=matched; output-sha256=982498be48289ae11f2469bce4669843f25e57f697a80b077388bc6360f91324; output-bytes=32; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Websites\MB-Desigins; path=7e1da3557ad7/33 entries

- [x] G8: Career, Supplier, and Internship applications expose required portfolio-link and CV-upload email workflow and the internship copy omits Journey
  CHECK: node scripts/verify-round2.mjs career
  EXPECT: round2 career verification passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=b45c19cec9c9c49f9e7fcbb86443e38db45347c03c0ec33119c5cb52a5e84028; exit=0; EXPECT=matched; output-sha256=5cc610961c1c4fd2dabed9989cb361fd22d0fde74ac52bce09ae48ae2add2607; output-bytes=34; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Websites\MB-Desigins; path=7e1da3557ad7/33 entries

- [x] G9: all newly used feedback imagery is stored locally and production source contains no Wix-hosted asset dependency
  CHECK: node scripts/verify-round2.mjs assets
  EXPECT: round2 asset verification passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=b038368dac24fb35476104d4eb732e542fa4ae612ea00817fe9cf22f016e48d6; exit=0; EXPECT=matched; output-sha256=7b84ab83480e93c099b9d8aec6508e759f931916450ce0915fdf83b66212f05d; output-bytes=33; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Websites\MB-Desigins; path=7e1da3557ad7/33 entries

- [x] G10: the production Vercel build and TypeScript checks complete successfully
  CHECK: node scripts/verify-round2.mjs build
  EXPECT: round2 build verification passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=69aa11c96eecff2d9f84a4ce727ce98dbcddd947be0ff393ddedc0bcc6b955b2; exit=0; EXPECT=matched; output-sha256=0e4dc858d390b2b21a68b69a7844eec97fbf2a74144ec15a48164f1aceeefb23; output-bytes=22915; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Websites\MB-Desigins; path=7e1da3557ad7/33 entries

- [x] G11: desktop and mobile browser review confirms balanced headings, usable interactions, intentional crops, no overflow, and consistent spacing on Home, Awards, Projects, a sector, a project detail, Team, and Career
  EVIDENCE: Manual browser review completed at desktop (1440x1000), compact/mobile (500x844), and the in-app responsive viewport. Home, Awards, Projects, Corporate, Property Finder detail, Team, and Career were inspected; market and sector tabs updated their live copy, project galleries remained static without zoom, headings stayed within the viewport, and no horizontal overflow or blocking z-index issue was observed. The team leadership tablet rule was corrected during review and rechecked in source.

- [x] G12: Nuwa by Mori and Grand Residence award project imagery preserves every award badge, logo, and ribbon without crop on desktop and mobile
  CHECK: node scripts/verify-round2.mjs awards-crops
  EXPECT: round2 awards crop verification passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=724f8a861b577f01005ef29a4b8d35454e51ac33f7e8d5a30276d79784489aa6; exit=0; EXPECT=matched; output-sha256=100cfb66e1ea4dc4a1a0b18f9bad1b1c320887f05a016c55f93a57816dc289e6; output-bytes=39; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Websites\MB-Desigins; path=e48c2ed17a45/33 entries

- [ ] G13: Architecture and Food and Beverage projects expose concise descriptions, while every other sector exposes Location, Space, and Scope of Work
  CHECK: node scripts/verify-round2.mjs project-metadata
  EXPECT: round2 project metadata verification passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=bf2b385642b8e4978ea61551095537133e08c22bd777edd80bfb76aa0ef9a2f7; exit=0; EXPECT=matched; output-sha256=3993193d29fa77abc253edc5456af42e51b37dc15854aaa1feca4e2bb02e6bb9; output-bytes=44; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Websites\MB-Desigins; path=e48c2ed17a45/33 entries

- [x] G14: Career Internship wording omits Journey and all page-hero subtitles use a smaller, tighter shared treatment beneath their titles
  CHECK: node scripts/verify-round2.mjs career-polish
  EXPECT: round2 career polish verification passed
  EVIDENCE: automatic-evidence=v1; definition-sha256=993faed3c1c2c3c436f4fdf813beacaad2f912babd10cdc575be957552df90b8; exit=0; EXPECT=matched; output-sha256=3f4e2087fa15cd37499e7c1614b43414ab2e4499ea7e0a9f7a543f7f1d220489; output-bytes=41; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Websites\MB-Desigins; path=e48c2ed17a45/33 entries

- [ ] G15: the integrated production build and TypeScript verification complete successfully after the crop, metadata, and typography changes
  CHECK: node scripts/verify-round2.mjs build
  EXPECT: round2 build verification passed
  EVIDENCE: pending

- [ ] G16: desktop and mobile review confirms award badges and ribbons are fully visible, project information is complete, and the Career subtitle hierarchy is compact
  EVIDENCE: Award collages and Career hero reviewed at desktop and 390px mobile; badges and ribbons are intact and subtitle spacing is compact. Project metadata is not complete: Space displays PROJECT SPECIFIC, and scope values are category defaults rather than verified project-specific records. Direct npm run build:vercel passed including TypeScript, although the gate runner timed out.
