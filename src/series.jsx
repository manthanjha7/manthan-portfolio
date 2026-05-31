import React, { useEffect, useRef, useState } from "react";
import { renderBlock } from "./caseStudies.jsx";
import manthanPhoto from "./manthan.jpg";
import centralizedDiagram from "./lesson-assets/git/centralized.png";
import distributedDiagram from "./lesson-assets/git/distributed.png";
import chainOfHashesDiagram from "./lesson-assets/git/chain-of-hashes.png";
import commitTreeBlobDiagram from "./lesson-assets/git/commit-tree-blob.png";

/* ============================================================
   STYLE TOKENS
============================================================ */

const sInk    = "var(--ink)";
const sInk2   = "var(--ink-2)";
const sInk3   = "var(--ink-3)";
const sInk4   = "var(--ink-4)";
const sHair   = "var(--hairline)";
const sCard   = "var(--card)";
const sPaper  = "var(--paper)";
const sAccent = "var(--accent)";

/* ============================================================
   DATA - SERIES
   ----------------------------------------------------------------
   Each series has lessons. A lesson uses the same block vocabulary
   as caseStudies.jsx + the added `code` and `table` blocks.

   Lessons 2-10 are placeholder shells - fill in `blocks` later.
============================================================ */

const SERIES = [
  {
    id: "git-for-pms",
    slug: "git-for-product-managers",
    title: "GitHub for Product Managers",
    dek: "The 10-lesson series I wish I had when I first opened a terminal as a PM.",
    category: "Engineering for PMs",
    date: "Jun 2026",
    lessonCount: 10,
    lessons: [
      {
        n: 1,
        title: "Why Git Exists",
        kicker: "Module 1 · Mental Model",
        readTime: "10 min read",
        blocks: [
          { type: "heading", text: "Preface" },
          {
            type: "body",
            texts: [
              "I wrote this course while I was learning Git myself. I pulled from a handful of sources - Linus Torvalds' 2007 Google Tech Talk, MIT's Missing Semester (Lecture 6), Pro Git, and Julia Evans' How Git Works - and stitched together the version I wished someone had handed me on day one.",
              "I'm writing it down so the next person at my stage doesn't have to assemble the same sources I did. Read it in the background; don't try to memorise it.",
              "Who this is for: product managers, product designers, and anyone moving toward product engineering with a light technical background - especially if you're already using AI (or want to start using AI) to push and write code. If that's you, you're in the right place.",
            ],
          },

          { type: "heading", text: "Why are we starting with Git and not GitHub?" },
          {
            type: "body",
            texts: [
              "Fair question. The course is called GitHub for Product Managers, but Lesson 1 is about Git. Here's why.",
              "GitHub is a service - owned by Microsoft since 2018 - that wraps Git with a web UI, hosting, pull requests, code review, Actions (CI), Issues, and a few dozen other features you'll meet later. It's the surface most PMs interact with day-to-day.",
              "Git is the actual version-control system underneath. It was created in 2005, runs locally on your laptop, and works without any internet connection or any account anywhere. GitHub is built on top of it.",
              "You can use Git without GitHub. You cannot meaningfully use GitHub without understanding Git. Every PR, every merge button, every \"resolve conflicts in the browser\" workflow is a thin UI over a Git operation that's already happening underneath. So to really learn GitHub, the most honest starting point is to first understand what problem Git was created to solve - and that's exactly what Lesson 1 covers.",
            ],
          },

          { type: "heading", text: "The story" },
          {
            type: "body",
            texts: [
              "Back in 2005, the Linux kernel ran on a proprietary version-control tool called BitKeeper. It was free to use for open-source projects. Then a licence dispute broke out, the free tier got pulled, and Linus Torvalds - the guy who created Linux - suddenly had no version control for the project.",
              "He'd already looked at the existing options. CVS, SVN, Perforce - he didn't like any of them. So over about 10 days in April 2005, he wrote Git himself. The constraints he set for it, in his own words from the Google talk:",
            ],
          },
          {
            type: "body",
            texts: [
              "1. Take CVS as an example of what NOT to do - \"if in doubt, make the exact opposite decision\"",
              "2. Distributed - every developer has the full repo",
              "3. Fast - slow tools make people avoid using them",
              "4. Strong integrity - you should be able to detect if anyone tampered with history",
              "5. Branching must be cheap and fast - so people actually use it",
            ],
          },
          {
            type: "quote",
            text: "I'm not a believer in nice tools. I want the tool to do what I want. - Linus Torvalds",
          },
          {
            type: "body",
            texts: [
              "That fourth constraint - strong integrity - is the one that does the real work. It's what makes Git different from anything that came before it.",
            ],
          },
          {
            type: "video",
            youtubeId: "8dhZ9BXQgc4",
            title: "Linus Torvalds · Google Tech Talk on Git, 2007",
            aspect: "16/9",
            caption: "If you want it from the source, the talk is Linus Torvalds - Google Tech Talk on Git (2007). It's an hour long, but the first 20 minutes carry most of what you'd want from it.",
          },

          { type: "heading", text: "The technical idea that makes it all work: content-addressable storage" },
          {
            type: "body",
            texts: [
              "On a normal file system, a file's identity is its name. You pick a name like hello.py, the system stores the content under that label, and finds it again later by looking the name up. Two files with identical content but different names get stored as two separate copies.",
              "Git flips that. Instead of you choosing the name, Git derives the name from the content itself. It runs the file's bytes through a function called SHA-1 - a hash function - which gives back a 40-character string like e69de29bb2d1d6434b8b29ae775ad8c2e48c5391. That string is how Git refers to the file from then on. It's both the name and the storage address at the same time.",
              "Three things follow from that:",
            ],
          },
          {
            type: "body",
            texts: [
              "1. Same content always produces the same hash. Identical files stored across ten repos all live at the same address. No duplication.",
              "2. Different content always produces a different hash. Change one character, you get a brand-new identity. Collisions are mathematically possible but astronomically rare.",
              "3. You can't quietly rewrite history. A commit's hash depends on its content and its parent's hash. Touch anything, and the hash changes - and so does every hash after it.",
            ],
          },
          {
            type: "body",
            texts: [
              "That's what \"strong integrity\" actually means. Git doesn't just store your code. It stores it in a way that makes tampering visible to anyone who looks.",
              "Once content-addressable storage is in place, the rest of Git - branches, merges, sharing repos across machines - is mostly bookkeeping on top.",
            ],
          },

          { type: "heading", text: "Centralized vs Distributed" },
          {
            type: "body",
            texts: [
              "Two diagrams. The first is what version control looked like before Git. The second is what Git changed it to.",
            ],
          },
          {
            type: "image",
            src: centralizedDiagram,
            label: "Centralized version control",
            aspect: "5/6",
            caption: "Centralized (SVN, CVS, Perforce) - one server holds the truth, every dev has a partial copy, every commit is a roundtrip.",
          },
          {
            type: "image",
            src: distributedDiagram,
            label: "Distributed version control",
            aspect: "5/6",
            caption: "Distributed (Git) - every dev has the full repo. \"origin\" (GitHub) is just one peer the team agreed to share.",
          },
          {
            type: "body",
            texts: [
              "Here's what that actually means in practice. When you clone a repo, Git copies the entire history onto your laptop - every commit, every branch, every tag - into a hidden folder called .git/ inside the project. That folder is a full, working Git repo. It's not a cache or a thin client; it's the real thing.",
              "Every Git command you run day-to-day - commit, branch, merge, log, diff, checkout - reads and writes that local .git/ folder. None of them touch the network. The only commands that need to talk to GitHub are push (send your new commits to origin) and pull/fetch (grab origin's new commits).",
              "So when GitHub goes down, push and pull fail. Everything else keeps working exactly as before, because nothing else was using GitHub in the first place. You can keep committing all day. When GitHub comes back, you push your queued-up commits and you're synced again - no work lost.",
            ],
          },

          { type: "heading", text: "Hands-on (5 minutes in your terminal)" },
          {
            type: "body",
            texts: [
              "Run these in any Git repo you already have on your machine. If you don't have one yet, that's fine - clone any public repo, or come back to this section after Lesson 2 when we cover git init. This will show you content-addressable storage with your own eyes.",
            ],
          },
          {
            type: "code",
            lang: "bash",
            code: `cd <any-git-repo-on-your-machine>
echo "hello git" | git hash-object --stdin`,
          },
          {
            type: "body",
            texts: ["That spits out a SHA-1 hash. Now run it again:"],
          },
          {
            type: "code",
            lang: "bash",
            code: `echo "hello git" | git hash-object --stdin`,
          },
          {
            type: "body",
            texts: ["Same hash. Every time. Now change one character:"],
          },
          {
            type: "code",
            lang: "bash",
            code: `echo "hello Git" | git hash-object --stdin`,
          },
          {
            type: "body",
            texts: ["Completely different hash. That's content-addressable storage in 10 seconds.", "Now show me the actual Git objects inside your repo:"],
          },
          {
            type: "code",
            lang: "bash",
            code: "ls .git/objects/ | head",
          },
          {
            type: "body",
            texts: [
              "You'll see folders named 00 through ff - the first 2 characters of each hash become the folder name, the remaining 38 become the filename. That's how Git stores millions of objects without one giant directory. Peek inside one:",
            ],
          },
          {
            type: "code",
            lang: "bash",
            code: "ls .git/objects/$(ls .git/objects/ | grep -v info | grep -v pack | head -1)",
          },
          {
            type: "body",
            texts: [
              "You'll see files named with 38-char hashes. Each one is a blob, tree, or commit - all addressed by their content.",
            ],
          },

          { type: "heading", text: "Check questions" },
          {
            type: "body",
            texts: [
              "Answer in your own words (no looking back):",
              "1. What is the one design constraint that makes Git fundamentally different from SVN - not \"distributed\" as a feature, but the technical idea that makes distributed possible?",
              "2. Why can't you secretly rewrite history on a Git server without anyone noticing?",
            ],
          },

          { type: "heading", text: "Key concepts" },
          {
            type: "table",
            headers: ["Concept", "One-line"],
            rows: [
              ["Content-addressable storage", "The hash of the content is the storage key. Same content → same hash → same storage slot."],
              ["Distributed VCS", "Every clone is a full repo with full history. No required central server."],
              ["Strong integrity / tamper detection", "A commit's hash depends on its parent's hash → chain of hashes → can't silently rewrite history without breaking the chain."],
              ["SHA-1 hash", "40 hex chars. Different content → different hash (collisions astronomically rare)."],
              ["Commit", "One snapshot with metadata + parent pointer."],
              ["Merge commit", "A commit with TWO parents (vs a normal commit's one). It's the meeting point of two branches' histories."],
              ["PR (pull request)", "A GitHub UI feature on top of Git: \"review my branch and merge it.\" Not a Git concept - a GitHub one."],
            ],
          },

          { type: "heading", text: "Q&A from this session" },
          {
            type: "body",
            texts: [
              "Q1: What design constraint makes Git fundamentally different from SVN?",
              "Content-addressable storage. The hash of a piece of content is its identity inside Git - its actual storage address, not a label tacked on next to it.",
              "Saying \"hashing\" alone misses the point. Plenty of systems hash things - passwords, checksums, signatures. What's specific to Git is that the hash literally IS the filename inside .git/objects/. The name and the content aren't two separate things. They're the same thing.",
              "One more nuance worth flagging: filenames as you know them aren't stored inside blobs. A blob just holds content. The actual filenames live one level up, inside tree objects. Lesson 2 covers that.",
            ],
          },
          {
            type: "body",
            texts: [
              "Q2: Why can't you secretly rewrite history?",
              "Because every commit's hash bakes in its parent's hash. History isn't a list of commits - it's a chain where each link depends on every link before it.",
              "Here's the mechanism:",
            ],
          },
          {
            type: "code",
            lang: "history",
            code: "A ← B ← C ← D    (each arrow = \"parent\")",
          },
          {
            type: "body",
            texts: [
              "· B's hash depends on A's hash",
              "· C's hash depends on B's hash",
              "· D's hash depends on C's hash",
              "If an attacker tampers with B:",
              "1. B's hash changes (hash = function of content).",
              "2. C's recorded parent is now wrong → C is broken.",
              "3. To \"fix\" C, attacker must rewrite C. That changes C's hash.",
              "4. So D's parent is wrong. Rewrite D. Cascade.",
              "Nothing physically stops you from doing this. Git will let you rewrite the chain. But the second the new chain hits a remote, every other copy out there - laptops, CI logs, GitHub backups - has the old one and can see the mismatch. git fetch will refuse with \"refusing to update - divergent history.\"",
              "This is the same idea blockchain uses. Git shipped it three years earlier.",
            ],
          },
          {
            type: "image",
            src: chainOfHashesDiagram,
            label: "Chain of hashes · tamper detection",
            caption: "Top row: the original chain everyone has a copy of. Bottom row: an attacker tampers with commit B, and every commit after it has to be rewritten - which means every hash changes, and anyone holding the original chain can spot it instantly.",
          },

          { type: "heading", text: "Two things to remember from this lesson" },
          {
            type: "body",
            texts: [
              "1. Content-addressable storage - the hash is the file's identity, not a label next to it.",
              "2. Chain of hashes - every commit depends on every earlier commit, so tampering shows up the moment anyone looks. Same idea blockchain used, three years later.",
            ],
          },

          { type: "heading", text: "Open questions" },
          {
            type: "body",
            texts: [
              "· How does Git's switch from SHA-1 to SHA-256 (in progress) affect any of this? (Defer)",
              "· Does the chain-of-hashes integrity story have any actual exploit history? (Future deep-dive)",
            ],
          },
        ],
      },
      {
        n: 2,
        title: "Inside a Commit",
        kicker: "Module 1 · Mental Model",
        readTime: "12 min read",
        blocks: [
          { type: "heading", text: "Preface" },
          {
            type: "body",
            texts: [
              "Lesson 1 ended with one idea: content-addressable storage. Every \"thing\" Git stores is identified by the hash of its own contents. That was the why.",
              "This lesson is about the actual things Git stores. When you make a commit, you're not just saving a file. You're creating a small graph of three different kinds of objects, all addressed by their hashes. Once you've seen the three layers, every confusing thing about Git makes sense - why renames look weird, why two repos with the same files don't double the storage, why git log is instant even on huge projects.",
              "We'll walk through it conceptually, then crack open a real commit with one Git command and watch the layers reveal themselves.",
            ],
          },

          { type: "heading", text: "A commit is three things, not one" },
          {
            type: "body",
            texts: [
              "\"Commit\" is one word, but inside it's three different kinds of object stacked together.",
            ],
          },
          {
            type: "table",
            headers: ["Object", "What it is", "What it stores"],
            rows: [
              ["blob", "A file's content", "The bytes. Nothing else. No filename. No permissions. Just the content."],
              ["tree", "A folder", "A list of (filename, permissions, hash) entries. The hash points to a blob or another tree."],
              ["commit", "A snapshot in time", "A pointer to ONE root tree + metadata (author, timestamp, message, parent commit)."],
            ],
          },
          {
            type: "body",
            texts: [
              "The part that trips most people up the first time: the filename lives in the tree, not in the blob. A blob is pure content - Git has no idea what the file was called. The name lives in the parent folder.",
              "This has a strange consequence - Git doesn't actually track file renames. If you rename auth.py to login.py, Git doesn't record \"rename.\" What Git records is: the old tree had an entry called auth.py pointing to blob X; the new tree has an entry called login.py pointing to the same blob X. When you ask for a diff, Git looks at the two trees, notices \"this name disappeared, that one appeared, both point to the same blob - probably a rename,\" and guesses. Same content, new name, no special metadata.",
            ],
          },
          {
            type: "quote",
            text: "In Git, moving a file is the same as deleting the old one and adding the new one. - Julia Evans, How Git Works",
          },

          { type: "heading", text: "The object graph in your head" },
          {
            type: "body",
            texts: [
              "When you make a commit, this is roughly what gets created:",
            ],
          },
          {
            type: "image",
            src: commitTreeBlobDiagram,
            label: "Commit · tree · blob graph",
            caption: "One commit points to one root tree. The root tree points to blobs (files) and to subtrees (folders). Each subtree points to its own blobs. Every box has a hash; every arrow is \"this hash points to that hash.\"",
          },
          {
            type: "body",
            texts: [
              "The whole graph is the snapshot. Now imagine you edit only index.js and commit again. Here's what Git actually does:",
            ],
          },
          {
            type: "body",
            texts: [
              "1. New blob for the new index.js (different content → different hash).",
              "2. New src/ tree - because its entry for index.js now points to the new blob hash.",
              "3. New root tree - because its entry for src/ now points to a new tree hash.",
              "4. New commit object - pointing to the new root tree, with the previous commit as parent.",
            ],
          },
          {
            type: "body",
            texts: [
              "Everything else - README.md, utils.js, docs/intro.md, the docs/ tree - is reused. Same content, same hash, same storage slot. The new tree objects just point to the existing blobs.",
              "This is why Git is so storage-efficient. When 99% of files don't change between commits, Git stores them exactly once. A repo with 10,000 commits doesn't take 10,000× the disk space of one commit - it takes a tiny bit more than one snapshot's worth, plus the commit metadata.",
            ],
          },

          { type: "heading", text: "\"Snapshots, not diffs\" - the second big idea" },
          {
            type: "body",
            texts: [
              "Most people picture commits as diffs: \"this commit added these 5 lines and removed those 3.\" That mental model is useful when you're reading a commit, but it's not how Git stores it.",
              "Every commit stores the whole project as a tree of trees and blobs. The diff isn't stored anywhere - it's calculated by comparing this commit's tree to its parent's tree, on demand, when you ask for it.",
              "A few consequences fall out of this:",
            ],
          },
          {
            type: "body",
            texts: [
              "· git checkout <any-commit> is fast even on huge repos. Git doesn't replay history - it resolves the tree directly.",
              "· Reordering or removing old commits doesn't require recomputing forward diffs.",
              "· Two commits that end up in the same state point to the same tree object, regardless of how you got there.",
              "· The diff you see in git show or in a PR is generated now, not stored back then. That's why you can switch diff algorithms (git diff --histogram) and get different-looking output for the same commit.",
            ],
          },
          {
            type: "quote",
            text: "Commits are snapshots, not diffs. Git calculates the diff on the fly by comparing two snapshots. - Pro Git, Ch. 10",
          },
          {
            type: "body",
            texts: [
              "If that sentence didn't make sense in Lesson 1, this is the moment it should click.",
            ],
          },

          { type: "heading", text: "Hands-on (5 minutes in your terminal)" },
          {
            type: "body",
            texts: [
              "Time to see all three layers in a real repo. Use any Git repo on your machine - your own, a clone of an open-source project, anything.",
            ],
          },
          {
            type: "code",
            lang: "bash",
            code: `cd <any-git-repo>
git log --oneline -5`,
          },
          {
            type: "body",
            texts: ["You'll get something like:"],
          },
          {
            type: "code",
            lang: "output",
            code: `bdd25e3 Initial commit
a1b2c3d Add README
...`,
          },
          {
            type: "body",
            texts: ["Copy any commit's short hash. Now look inside the commit object:"],
          },
          {
            type: "code",
            lang: "bash",
            code: "git cat-file -p bdd25e3",
          },
          {
            type: "body",
            texts: ["Output looks like:"],
          },
          {
            type: "code",
            lang: "output",
            code: `tree 22b920abc...
parent 56cfdc123...
author Manthan Jha <...> 1717200000 +0530
committer Manthan Jha <...> 1717200000 +0530

your commit message goes here`,
          },
          {
            type: "body",
            texts: [
              "That's the commit object. It points to a tree, points to a parent, names an author, carries a message. The actual files aren't here - the commit just holds a pointer to the tree.",
              "(If it's the first commit in the repo, there will be no parent line. The first commit has no parent - it's the root of the chain.)",
              "Now look at the tree it points to:",
            ],
          },
          {
            type: "code",
            lang: "bash",
            code: "git cat-file -p 22b920abc",
          },
          {
            type: "body",
            texts: ["Output:"],
          },
          {
            type: "code",
            lang: "output",
            code: `100644 blob 4fffb2...   .gitignore
100644 blob e351d9...   README.md
040000 tree 9de29f...   src
100644 blob fe442d...   index.html`,
          },
          {
            type: "body",
            texts: [
              "That's the root folder. Each line is (permissions, type, hash, filename). 100644 = regular file. 040000 = subdirectory. blob = file content. tree = subfolder.",
              "Now look at one of the blobs:",
            ],
          },
          {
            type: "code",
            lang: "bash",
            code: "git cat-file -p fe442d",
          },
          {
            type: "body",
            texts: [
              "That spits out the actual file contents. Just bytes. No metadata.",
              "You just walked the path: commit → tree → blob → bytes. That's everything Git is.",
            ],
          },
          {
            type: "quote",
            text: "I just use git cat-file for fun and learning, never to get things done. - Julia Evans, How Git Works",
          },
          {
            type: "body",
            texts: [
              "Same. You won't use this command in daily work. But running it once is what makes the rest of Git stop feeling like magic.",
            ],
          },

          { type: "heading", text: "How Git stores all this on disk" },
          {
            type: "body",
            texts: [
              "Quick aside, because it's worth seeing.",
              "Inside any repo, there's a hidden .git/objects/ folder. That's where all blobs, trees, and commits live. Look:",
            ],
          },
          {
            type: "code",
            lang: "bash",
            code: "ls .git/objects/ | head",
          },
          {
            type: "body",
            texts: [
              "You'll see folders named 00, 01, 02, ... ff. Those are the first 2 characters of each object's hash. The remaining 38 characters are the filename inside.",
              "So an object with hash e69de29bb2d1d6434b8b29ae775ad8c2e48c5391 lives at:",
            ],
          },
          {
            type: "code",
            lang: "path",
            code: ".git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391",
          },
          {
            type: "body",
            texts: [
              "That's it. The whole storage layer of Git is \"compute a hash, take the first 2 chars as the folder, store the content under the remaining 38 chars.\" A modern key-value store, designed in a weekend in 2005, that still scales to repos with millions of commits.",
            ],
          },

          { type: "heading", text: "Check questions" },
          {
            type: "body",
            texts: [
              "Answer in your own words before moving on:",
              "1. Why doesn't Git actually track file renames? What does it see when you rename a file?",
              "2. If you make 100 commits but only change 1 file in each commit, roughly how much disk space does Git use compared to a single commit's worth?",
              "3. What's the difference between a blob and a file? (Trick question - but the answer matters.)",
            ],
          },

          { type: "heading", text: "Key concepts" },
          {
            type: "table",
            headers: ["Concept", "One-line"],
            rows: [
              ["blob", "A file's content, addressed by its hash. No filename inside it."],
              ["tree", "A folder - a list of (name, permissions, hash) entries pointing to blobs or subtrees."],
              ["commit", "A pointer to ONE root tree + metadata (author, message, parent)."],
              ["Snapshots not diffs", "Git stores the whole project at each commit; diffs are computed on demand by comparing two trees."],
              ["De-duplication via hashing", "Identical content → identical hash → stored exactly once, no matter how many commits or repos reference it."],
              [".git/objects/", "The on-disk store. First 2 chars of hash = folder name; remaining 38 = filename."],
            ],
          },

          { type: "heading", text: "What's coming next" },
          {
            type: "body",
            texts: [
              "Lesson 3 - Branches, HEAD, and refs. A branch is one of the most overloaded words in Git. We'll un-overload it: turns out a branch is just a 40-character file that holds the hash of the latest commit. That's it. Once you see that, half of Git's \"branching\" mental model collapses into something obvious.",
            ],
          },
        ],
      },
      { n: 3,  title: "Branches, HEAD, Refs",               kicker: "Module 1 · Mental Model",                blocks: [] },
      { n: 4,  title: "Staging, Committing, Undoing",       kicker: "Module 2 · Daily Workflow",              blocks: [] },
      { n: 5,  title: "Merge vs Rebase vs Squash",          kicker: "Module 2 · Daily Workflow",              blocks: [] },
      { n: 6,  title: "Disasters & Reflog",                 kicker: "Module 3 · Recovery",                    blocks: [] },
      { n: 7,  title: "Remotes",                            kicker: "Module 4 · Collaboration",               blocks: [] },
      { n: 8,  title: "PR Craft & Commit Hygiene",          kicker: "Module 4 · Collaboration",               blocks: [] },
      { n: 9,  title: "GitHub Actions & CI",                kicker: "Module 5 · AI-Era Product Engineer",     blocks: [] },
      { n: 10, title: "Reviewing Agent PRs + AGENTS.md",    kicker: "Module 5 · AI-Era Product Engineer",     blocks: [] },
    ],
  },
];

/* ============================================================
   SERIES CARD - used in Writing section + Index
============================================================ */

function SeriesCard({ series, onClick }) {
  return (
    <button
      onClick={() => onClick(series.id)}
      className="card-lift"
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        width: "100%",
        padding: "22px 22px 24px",
        border: "1px solid " + sHair,
        borderRadius: 12,
        background: sCard,
        color: sInk,
        position: "relative",
        minHeight: 168,
        cursor: "pointer",
        font: "inherit",
      }}
    >
      <div className="flex items-center justify-between" style={{
        height: 16, lineHeight: "16px", marginBottom: 14, flexShrink: 0,
      }}>
        <span className="mono" style={{ fontSize: 11, color: sInk3, letterSpacing: "0.02em" }}>
          SERIES · {series.lessonCount} LESSONS
        </span>
        <span className="mono" style={{
          fontSize: 10, color: sAccent,
          padding: "2px 7px",
          border: "1px solid color-mix(in oklab, " + sAccent + " 35%, " + sHair + ")",
          borderRadius: 999, letterSpacing: "0.04em", textTransform: "uppercase",
        }}>New</span>
      </div>
      <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.3, color: sInk }}>
        {series.title}
      </div>
      <div style={{ marginTop: 8, color: sInk2, fontSize: 13.5, lineHeight: 1.5 }}>
        {series.dek}
      </div>
      <div className="flex items-center" style={{
        gap: 6, position: "absolute", right: 22, bottom: 18, color: sInk3, fontSize: 12,
      }}>
        <span className="mono">start</span>
        <svg className="read-arrow" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </button>
  );
}

/* ============================================================
   OverlayBackBar - duplicated lightweight version
============================================================ */

function SeriesBackBar({ title, onClose }) {
  return (
    <div className="m-pad-x" style={{
      position: "sticky", top: 0, zIndex: 2,
      background: "color-mix(in oklab, " + sPaper + " 85%, transparent)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderBottom: "1px solid var(--hairline-soft)",
      padding: "14px 28px",
      display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
    }}>
      <button onClick={onClose} style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "8px 14px",
        background: "transparent", color: sInk2,
        border: "1px solid " + sHair, borderRadius: 999, fontSize: 13,
        cursor: "pointer",
      }}>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back
      </button>
      <span className="mono" style={{ fontSize: 11, color: sInk3, textAlign: "center", maxWidth: "60%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {title}
      </span>
      <span className="mono" style={{ fontSize: 11, color: sInk3 }}>esc</span>
    </div>
  );
}

/* ============================================================
   LESSON NAV - Prev / Next at bottom of each lesson
============================================================ */

function LessonNav({ series, idx, onGo }) {
  const total = series.lessons.length;
  const prevDisabled = idx <= 0;
  const nextDisabled = idx >= total - 1;
  const prev = !prevDisabled ? series.lessons[idx - 1] : null;
  const next = !nextDisabled ? series.lessons[idx + 1] : null;

  function NavButton({ disabled, side, lesson, onClick }) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={disabled ? "" : "card-lift"}
        aria-label={side === "prev" ? "Previous lesson" : "Next lesson"}
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: side === "prev" ? "flex-start" : "flex-end",
          textAlign: side === "prev" ? "left" : "right",
          gap: 6,
          padding: "16px 18px",
          border: "1px solid " + sHair,
          borderRadius: 12,
          background: disabled ? "transparent" : sCard,
          color: disabled ? sInk4 : sInk,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          font: "inherit",
        }}
      >
        <span className="mono" style={{
          fontSize: 11, color: disabled ? sInk4 : sInk3, letterSpacing: "0.04em", textTransform: "uppercase",
        }}>
          {side === "prev" ? "← Previous" : "Next →"}
        </span>
        <span style={{ fontSize: 14, fontWeight: 500, letterSpacing: "-0.005em", lineHeight: 1.3 }}>
          {lesson ? `Lesson ${lesson.n} · ${lesson.title}` : "End of series"}
        </span>
      </button>
    );
  }

  return (
    <div className="m-stack-1" style={{
      marginTop: 64, paddingTop: 28,
      borderTop: "1px solid " + sHair,
      display: "flex", gap: 14, alignItems: "stretch",
    }}>
      <NavButton
        side="prev"
        disabled={prevDisabled}
        lesson={prev}
        onClick={prevDisabled ? undefined : () => onGo(idx - 1)}
      />
      <NavButton
        side="next"
        disabled={nextDisabled}
        lesson={next}
        onClick={nextDisabled ? undefined : () => onGo(idx + 1)}
      />
    </div>
  );
}

/* ============================================================
   SERIES VIEW - fullscreen lesson reader
============================================================ */

function SeriesView({ series, onClose }) {
  const scrollRef = useRef(null);
  const [idx, setIdx] = useState(0);

  // Reset to lesson 1 every time a series opens
  useEffect(() => {
    if (series) setIdx(0);
  }, [series && series.id]);

  // Lock scroll + escape + scroll-to-top on lesson change
  useEffect(() => {
    if (!series) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && idx < series.lessons.length - 1) setIdx(i => i + 1);
      if (e.key === "ArrowLeft" && idx > 0) setIdx(i => i - 1);
    }
    window.addEventListener("keydown", onKey);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [series, onClose, idx]);

  if (!series) return null;

  const lesson = series.lessons[idx];
  const total = series.lessons.length;
  const hasContent = lesson.blocks && lesson.blocks.length > 0;

  function goTo(i) {
    setIdx(i);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={series.title + " · " + lesson.title}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: sPaper,
        animation: "fadeIn 180ms ease both",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}
    >
      <SeriesBackBar title={series.title + " · Lesson " + lesson.n + " of " + total} onClose={onClose} />

      <div ref={scrollRef} className="scroll-thin" style={{ overflowY: "auto", flex: 1 }}>
        <article className="m-pad-x" style={{ maxWidth: 760, margin: "0 auto", padding: "56px 28px 96px" }}>
          {/* Series eyebrow */}
          <div className="mono" style={{ fontSize: 12, color: sAccent, letterSpacing: "0.04em", marginBottom: 10, textTransform: "uppercase" }}>
            {series.title}
          </div>

          {/* Lesson number + module kicker */}
          <div className="flex items-baseline" style={{ gap: 14, flexWrap: "wrap", marginBottom: 16 }}>
            <span className="mono" style={{
              fontSize: 12, color: sInk3, letterSpacing: "0.04em",
              padding: "3px 9px", border: "1px solid " + sHair, borderRadius: 999,
            }}>
              LESSON {String(lesson.n).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            {lesson.kicker && (
              <span className="mono" style={{ fontSize: 11.5, color: sInk3 }}>{lesson.kicker}</span>
            )}
            {lesson.readTime && (
              <span className="mono" style={{ fontSize: 11.5, color: sInk3 }}>{lesson.readTime.toUpperCase()}</span>
            )}
          </div>

          {/* Title */}
          <h1 style={{
            margin: "0 0 24px 0",
            fontSize: "clamp(36px, 4.8vw, 56px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: sInk,
          }}>
            {lesson.title}
          </h1>

          {/* Byline */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            paddingTop: 20, paddingBottom: 28,
            borderTop: "1px solid " + sHair,
            borderBottom: "1px solid " + sHair,
            marginBottom: 48,
          }}>
            <img
              src={manthanPhoto}
              alt="Manthan Jha"
              style={{
                width: 36, height: 36, borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid " + sHair,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: sInk }}>Manthan Jha</span>
              <span className="mono" style={{ fontSize: 11, color: sInk3 }}>{series.category}</span>
            </div>
          </div>

          {/* Body */}
          {hasContent ? (
            <div style={{ display: "grid", gap: 28 }}>
              {lesson.blocks.map((b, i) => renderBlock(b, i))}
            </div>
          ) : (
            <div style={{
              padding: "32px 28px",
              border: "1px dashed " + sHair,
              borderRadius: 12,
              background: "color-mix(in oklab, var(--ink) 3%, transparent)",
              color: sInk3,
              fontSize: 14.5,
              lineHeight: 1.6,
              textAlign: "center",
            }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", color: sInk4, marginBottom: 10 }}>
                COMING SOON
              </div>
              This lesson is on the way. Use Next / Previous to keep moving through the series.
            </div>
          )}

          <LessonNav series={series} idx={idx} onGo={goTo} />
        </article>
      </div>
    </div>
  );
}

/* ============================================================
   EXPORTS
============================================================ */

export { SERIES, SeriesCard, SeriesView };
