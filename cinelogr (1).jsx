import React, { useState } from "react";

/* CineLogr — Letterboxd-style Movie/TV/Anime Tracker */

const T = "https://image.tmdb.org/t/p/w342";

const MOVIES = [
  { id: 1, t: "Inception", y: "2010", r: 8.4, tp: "movie", rt: "2h 28m", g: ["Sci-Fi","Action"], o: "A thief who steals secrets through dream-sharing technology must plant an idea into a C.E.O.'s mind.", p: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg" },
  { id: 2, t: "The Dark Knight", y: "2008", r: 8.5, tp: "movie", rt: "2h 32m", g: ["Action","Crime"], o: "When the Joker wreaks havoc on Gotham, Batman faces his greatest test.", p: "/qJ2tW6WMUDux911BTUgMe1F608y.jpg" },
  { id: 3, t: "Fight Club", y: "1999", r: 8.4, tp: "movie", rt: "2h 19m", g: ["Drama","Thriller"], o: "An insomniac and a soap maker form an underground fight club that evolves into much more.", p: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" },
  { id: 4, t: "Pulp Fiction", y: "1994", r: 8.5, tp: "movie", rt: "2h 34m", g: ["Crime","Thriller"], o: "The lives of hitmen, a boxer and a gangster intertwine in tales of violence and redemption.", p: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg" },
  { id: 5, t: "The Godfather", y: "1972", r: 8.7, tp: "movie", rt: "2h 55m", g: ["Drama","Crime"], o: "The aging patriarch of a crime dynasty transfers control to his reluctant youngest son.", p: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" },
  { id: 6, t: "Shawshank Redemption", y: "1994", r: 8.7, tp: "movie", rt: "2h 22m", g: ["Drama"], o: "Framed for murder, banker Andy Dufresne finds redemption at Shawshank prison.", p: "/9cjIGRPFUHOKGOh6IaG3fMgfFYZ.jpg" },
  { id: 7, t: "Interstellar", y: "2014", r: 8.4, tp: "movie", rt: "2h 49m", g: ["Sci-Fi","Drama"], o: "Explorers travel through a wormhole to ensure humanity's survival.", p: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
  { id: 8, t: "The Matrix", y: "1999", r: 8.2, tp: "movie", rt: "2h 16m", g: ["Action","Sci-Fi"], o: "A hacker discovers the true nature of reality and his role in war against its controllers.", p: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg" },
  { id: 9, t: "Whiplash", y: "2014", r: 8.4, tp: "movie", rt: "1h 47m", g: ["Drama","Music"], o: "Under a ruthless instructor, a young drummer pursues perfection at any cost.", p: "/7fn624j544nhbzv352mLRe8Ia5e.jpg" },
  { id: 10, t: "Spirited Away", y: "2001", r: 8.5, tp: "movie", rt: "2h 5m", g: ["Animation","Fantasy"], o: "A girl trapped in a spirit world must find courage to free her parents.", p: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg" },
  { id: 11, t: "Oppenheimer", y: "2023", r: 8.1, tp: "movie", rt: "3h 1m", g: ["Drama","History"], o: "The story of Oppenheimer's role in the development of the atomic bomb.", p: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" },
  { id: 12, t: "Dune", y: "2021", r: 7.8, tp: "movie", rt: "2h 35m", g: ["Sci-Fi","Adventure"], o: "Paul Atreides must travel to the most dangerous planet for his family's future.", p: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg" },
  { id: 13, t: "Gladiator", y: "2000", r: 8.2, tp: "movie", rt: "2h 35m", g: ["Action","Drama"], o: "A Roman general sets out to avenge the emperor who murdered his family.", p: "/ty8TGRuvJLPUmAR1H1nRIsgCsMu.jpg" },
  { id: 14, t: "Forrest Gump", y: "1994", r: 8.5, tp: "movie", rt: "2h 22m", g: ["Comedy","Drama"], o: "A man with a low IQ accomplishes great things and witnesses historic events.", p: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg" },
  { id: 15, t: "Your Name.", y: "2016", r: 8.5, tp: "movie", rt: "1h 46m", g: ["Animation","Romance"], o: "Two strangers find themselves linked across time and distance.", p: "/q719jXXEzOoYaps6aYsPfWnNtS0.jpg" },
  { id: 16, t: "Arrival", y: "2016", r: 7.6, tp: "movie", rt: "1h 56m", g: ["Sci-Fi","Drama"], o: "A linguist leads a team interpreting alien visitors' language.", p: "/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg" },
  { id: 17, t: "Spider-Verse", y: "2023", r: 8.4, tp: "movie", rt: "2h 20m", g: ["Animation","Action"], o: "Miles Morales catapults across the Multiverse to protect its existence.", p: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg" },
  { id: 18, t: "Howl's Moving Castle", y: "2004", r: 8.4, tp: "movie", rt: "1h 59m", g: ["Animation","Fantasy"], o: "Sophie is cursed by a witch and finds refuge in wizard Howl's walking fortress.", p: "/TkTPELv4kC3u1lkloush8skOjE.jpg" },
  { id: 19, t: "GoodFellas", y: "1990", r: 8.5, tp: "movie", rt: "2h 26m", g: ["Crime","Drama"], o: "The story of Henry Hill and his life in the mob from 1955 to 1980.", p: "/aKuFiU82s5ISJDx5cHTpPBOFSWg.jpg" },
  { id: 20, t: "Princess Mononoke", y: "1997", r: 8.3, tp: "movie", rt: "2h 14m", g: ["Animation","Fantasy"], o: "Ashitaka is caught in a war between forest gods and a mining colony.", p: "/jHWmNr7m544fJ8eItsfNk8fs2Ed.jpg" },
];

const SERIES = [
  { id: 101, t: "Breaking Bad", y: "2008", r: 8.9, tp: "tv", sn: 5, g: ["Drama","Crime"], o: "A chemistry teacher diagnosed with cancer turns to making methamphetamine.", p: "/ztkUQFLlC19CCMYHW73FxWVMbZ.jpg" },
  { id: 102, t: "Game of Thrones", y: "2011", r: 8.4, tp: "tv", sn: 8, g: ["Fantasy","Drama"], o: "Noble families fight for control of the mythical land of Westeros.", p: "/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg" },
  { id: 103, t: "Stranger Things", y: "2016", r: 8.6, tp: "tv", sn: 4, g: ["Sci-Fi","Drama"], o: "A boy vanishes and a small town uncovers supernatural forces.", p: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg" },
  { id: 104, t: "Arcane", y: "2021", r: 8.7, tp: "tv", sn: 2, g: ["Animation","Fantasy"], o: "Two sisters fight on rival sides of a war between magic and technology.", p: "/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg" },
  { id: 105, t: "The Last of Us", y: "2023", r: 8.6, tp: "tv", sn: 2, g: ["Drama","Sci-Fi"], o: "Joel and Ellie traverse post-apocalyptic America.", p: "/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg" },
  { id: 106, t: "The Boys", y: "2019", r: 8.5, tp: "tv", sn: 4, g: ["Action","Sci-Fi"], o: "Vigilantes set out to take down corrupt superheroes.", p: "/2zmTngn1tYC1AvfnrFLhxeD82zu.jpg" },
  { id: 107, t: "Chernobyl", y: "2019", r: 8.7, tp: "tv", sn: 1, g: ["Drama"], o: "The true story of the 1986 nuclear disaster in Ukraine.", p: "/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg" },
  { id: 108, t: "The Office", y: "2005", r: 8.6, tp: "tv", sn: 9, g: ["Comedy"], o: "The everyday lives of employees at Dunder Mifflin.", p: "/7DJKHzAi83BmQrWLrYYOqcoKfhR.jpg" },
  { id: 109, t: "Better Call Saul", y: "2015", r: 8.7, tp: "tv", sn: 6, g: ["Crime","Drama"], o: "Small-time attorney Jimmy McGill struggles to make it big.", p: "/fC2HDm5t0kHagwTKczVsxGFmGnk.jpg" },
  { id: 110, t: "The Sopranos", y: "1999", r: 8.6, tp: "tv", sn: 6, g: ["Drama","Crime"], o: "Mobster Tony Soprano balances family and crime.", p: "/6nYFv0Y3KdzbNLDBCh2LHdUkJOJ.jpg" },
  { id: 111, t: "Dark", y: "2017", r: 8.5, tp: "tv", sn: 3, g: ["Sci-Fi","Mystery"], o: "A missing child leads families to unravel a time travel conspiracy.", p: "/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg" },
  { id: 112, t: "Squid Game", y: "2021", r: 7.8, tp: "tv", sn: 2, g: ["Action","Drama"], o: "Players compete in deadly games for a huge cash prize.", p: "/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg" },
  { id: 113, t: "Rick and Morty", y: "2013", r: 8.7, tp: "tv", sn: 7, g: ["Animation","Comedy"], o: "A genius scientist drags his grandson on dangerous adventures.", p: "/cvhNj9eoRBe5SxjCbQTkh05UP5K.jpg" },
  { id: 114, t: "The Witcher", y: "2019", r: 8.0, tp: "tv", sn: 3, g: ["Fantasy","Action"], o: "A mutated monster-hunter journeys toward his destiny.", p: "/7vjaCdMw15FEbXyLQTVa04URsPm.jpg" },
  { id: 115, t: "Vikings", y: "2013", r: 8.0, tp: "tv", sn: 6, g: ["Action","Drama"], o: "The saga of Ragnar Lothbrok and his Viking warriors.", p: "/bQLrHIRNEVE21G3O1l3vHP9UGpY.jpg" },
];

const ANIME = [
  { id: 201, t: "Attack on Titan", y: "2013", r: 8.7, tp: "tv", sn: 4, g: ["Action","Drama"], o: "Humanity lives inside walls to protect from gigantic Titans.", an: true, p: "/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg" },
  { id: 202, t: "One Piece", y: "1999", r: 8.7, tp: "tv", sn: 21, g: ["Adventure","Action"], o: "Luffy sets out to become the greatest pirate.", an: true, p: "/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg" },
  { id: 203, t: "Naruto", y: "2002", r: 8.3, tp: "tv", sn: 5, g: ["Action","Adventure"], o: "An orphan ninja aspires to become leader of his village.", an: true, p: "/xppeysfvDKVx775MFuH8Z9BlpMk.jpg" },
  { id: 204, t: "Dragon Ball Z", y: "1989", r: 8.3, tp: "tv", sn: 9, g: ["Action","Animation"], o: "Goku defends Earth from powerful foes.", an: true, p: "/nFaHO7Iep7cfJYv5hXFUiAH36mr.jpg" },
  { id: 205, t: "Demon Slayer", y: "2019", r: 8.7, tp: "tv", sn: 5, g: ["Action","Fantasy"], o: "Tanjiro joins the Demon Slayer Corps to avenge his family.", an: true, p: "/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg" },
  { id: 206, t: "Death Note", y: "2006", r: 8.6, tp: "tv", sn: 1, g: ["Mystery","Thriller"], o: "A student finds a notebook that can kill anyone whose name is written in it.", an: true, p: "/iigTJJskR1PcjjUqGSaOkTiIOCz.jpg" },
  { id: 207, t: "Fullmetal Alchemist", y: "2009", r: 8.7, tp: "tv", sn: 1, g: ["Action","Fantasy"], o: "Two brothers pay a terrible price for attempting human transmutation.", an: true, p: "/5ZFUEOULaVml7pQuXxhpR2SmVUw.jpg" },
  { id: 208, t: "Jujutsu Kaisen", y: "2020", r: 8.6, tp: "tv", sn: 2, g: ["Action","Fantasy"], o: "Yuji joins Jujutsu Sorcerers to eliminate powerful Curses.", an: true, p: "/hFWP5HkbVEe40hrXgtCeQxoccHB.jpg" },
  { id: 209, t: "Hunter x Hunter", y: "2011", r: 8.7, tp: "tv", sn: 1, g: ["Action","Adventure"], o: "Gon aspires to become a Hunter to find his missing father.", an: true, p: "/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg" },
  { id: 210, t: "Chainsaw Man", y: "2022", r: 8.5, tp: "tv", sn: 1, g: ["Action","Horror"], o: "Denji merges with a Chainsaw Devil and joins government hunters.", an: true, p: "/npdB6eFzizki0WaZ1OvKcJV8pnU.jpg" },
  { id: 211, t: "One Punch Man", y: "2015", r: 8.4, tp: "tv", sn: 2, g: ["Action","Comedy"], o: "Saitama can defeat any enemy with one punch.", an: true, p: "/iE3s0lG5QVdEHOEZnoAxjsMJ0Gs.jpg" },
  { id: 212, t: "Spy x Family", y: "2022", r: 8.6, tp: "tv", sn: 2, g: ["Comedy","Action"], o: "A spy, assassin, and telepath form a family for secret reasons.", an: true, p: "/3r4LYFuXMTRRdahGy6XGf9oTwRE.jpg" },
  { id: 213, t: "My Hero Academia", y: "2016", r: 8.3, tp: "tv", sn: 7, g: ["Action"], o: "Izuku dreams of being a hero despite having no superpowers.", an: true, p: "/ivOLM47yJt90P19RH1NvJrAJz9F.jpg" },
  { id: 214, t: "Mob Psycho 100", y: "2016", r: 8.6, tp: "tv", sn: 3, g: ["Action","Comedy"], o: "A psychic boy tries to live normally while his powers grow.", an: true, p: "/vDfkzUpGMXChmfGxEFFeLGWqbTV.jpg" },
  { id: 215, t: "Evangelion", y: "1995", r: 8.5, tp: "tv", sn: 1, g: ["Sci-Fi","Drama"], o: "Teens pilot giant bio-machines to fight Angels threatening humanity.", an: true, p: "/eOiMljk3yzCMDqCEiJyRWy1ewxH.jpg" },
  { id: 216, t: "Bleach", y: "2004", r: 8.2, tp: "tv", sn: 16, g: ["Action","Adventure"], o: "Ichigo gains Soul Reaper powers to protect the living world.", an: true, p: "/2EewmxXe72ogr0hLDaFncoLKiTk.jpg" },
];

var ALL = MOVIES.concat(SERIES).concat(ANIME);

function hue(id) { return ((id * 137 + 43) % 360); }
function pbg(id) { return "linear-gradient(145deg, hsl(" + hue(id) + ",30%,12%), hsl(" + ((hue(id)+40)%360) + ",25%,6%))"; }
function acc(id) { return "hsl(" + hue(id) + ",60%,55%)"; }

function Card(props) {
  var item = props.item;
  var onClick = props.onClick;
  var onLog = props.onLog;
  var onWatch = props.onWatch;
  var showAct = props.showActions !== false;
  var imgErr = React.useState(false); var hasErr = imgErr[0]; var setErr = imgErr[1];
  var iniArr = item.t.split(/\s+/).filter(function(w){ return !/^(the|a|an|of)$/i.test(w); });
  var ini = iniArr.map(function(w){ return w[0]; }).join("").slice(0,2);
  var a = acc(item.id);
  var tpLabel = item.tp === "tv" ? "SERIES" : "FILM";
  var imgUrl = item.p ? T + item.p : null;

  return React.createElement("div", {
    onClick: function() { onClick && onClick(item); },
    onMouseEnter: function(e) { e.currentTarget.style.transform = "scale(1.04) translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,.5)"; e.currentTarget.querySelector(".hov-overlay").style.opacity = "1"; },
    onMouseLeave: function(e) { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.25)"; e.currentTarget.querySelector(".hov-overlay").style.opacity = "0"; },
    style: { position: "relative", borderRadius: 10, overflow: "hidden", cursor: "pointer", aspectRatio: "2/3", background: pbg(item.id), transition: "transform .3s, box-shadow .3s", boxShadow: "0 4px 16px rgba(0,0,0,.25)" }
  },
    // TMDB poster image
    imgUrl && !hasErr ? React.createElement("img", {
      src: imgUrl, alt: item.t,
      onError: function() { setErr(true); },
      style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }
    }) : null,
    // Fallback gradient poster art (shows when no image or image fails)
    !imgUrl || hasErr ? React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 16 } },
      React.createElement("div", null,
        item.an ? React.createElement("div", { style: { display: "inline-block", background: "linear-gradient(135deg,#ff6b6b,#ee5a24)", padding: "2px 8px", borderRadius: 4, fontSize: 9, fontWeight: 800, color: "#fff", letterSpacing: 1.5, marginBottom: 8 } }, "ANIME") : null,
        React.createElement("div", { style: { fontSize: 42, fontWeight: 700, color: a, opacity: 0.12, fontFamily: "Georgia,serif", letterSpacing: 4, lineHeight: 1 } }, ini)
      ),
      React.createElement("div", null,
        React.createElement("div", { style: { width: 30, height: 2.5, background: a, borderRadius: 2, opacity: 0.6, marginBottom: 10 } }),
        React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: "#fff", opacity: 0.9, fontFamily: "Georgia,serif", lineHeight: 1.3 } }, item.t),
        React.createElement("div", { style: { fontSize: 10, color: a, opacity: 0.6, marginTop: 4, letterSpacing: 2 } }, item.y + " \u00B7 " + tpLabel)
      )
    ) : null,
    // Anime badge on top of image
    imgUrl && !hasErr && item.an ? React.createElement("div", { style: { position: "absolute", top: 8, left: 8, background: "linear-gradient(135deg,#ff6b6b,#ee5a24)", padding: "2px 8px", borderRadius: 4, fontSize: 9, fontWeight: 800, color: "#fff", letterSpacing: 1.5, zIndex: 4 } }, "ANIME") : null,
    // Hover overlay
    React.createElement("div", { className: "hov-overlay", style: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.92), rgba(0,0,0,.4) 50%, transparent)", opacity: 0, transition: "opacity .25s", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 12, zIndex: 3 } },
      React.createElement("div", { style: { fontWeight: 600, fontSize: 13, color: "#fff" } }, item.t),
      React.createElement("div", { style: { fontSize: 11, color: "rgba(255,255,255,.5)", marginTop: 2 } }, item.y + " \u00B7 " + (item.tp === "tv" ? "Series" : "Film")),
      React.createElement("div", { style: { fontSize: 11, color: "#f5c518", fontWeight: 700, marginTop: 4 } }, "\u2605 " + item.r.toFixed(1)),
      showAct ? React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10 } },
        React.createElement("button", { onClick: function(e) { e.stopPropagation(); onLog && onLog(item); }, style: { flex: 1, padding: "6px 0", background: "#e8b600", border: "none", borderRadius: 6, color: "#000", fontSize: 11, fontWeight: 700, cursor: "pointer" } }, "LOG"),
        React.createElement("button", { onClick: function(e) { e.stopPropagation(); onWatch && onWatch(item); }, style: { padding: "6px 10px", background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 6, color: "#fff", fontSize: 13, cursor: "pointer" } }, "+")
      ) : null
    )
  );
}

function Stars(props) {
  var value = props.value || 0;
  var onChange = props.onChange;
  var size = props.size || 22;
  var ro = props.readOnly;
  var hov = React.useState(0);
  var hovVal = hov[0];
  var setHov = hov[1];
  var d = hovVal || value;
  var stars = [];
  for (var i = 1; i <= 5; i++) {
    (function(idx) {
      stars.push(React.createElement("span", {
        key: idx,
        onMouseEnter: function() { if(!ro) setHov(idx); },
        onMouseLeave: function() { if(!ro) setHov(0); },
        onClick: function(e) { e.stopPropagation(); if(!ro && onChange) onChange(value === idx ? 0 : idx); },
        style: { cursor: ro ? "default" : "pointer", fontSize: size, color: d >= idx ? "#f5c518" : "#333", transition: "color .15s", lineHeight: 1 }
      }, "\u2605"));
    })(i);
  }
  return React.createElement("div", { style: { display: "inline-flex", gap: 2, userSelect: "none" } }, stars);
}

function Grid(props) {
  return React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 20 } },
    props.items.map(function(m) { return React.createElement(Card, { key: m.id, item: m, onClick: props.onClick, onLog: props.onLog, onWatch: props.onWatch }); })
  );
}

function LogModal(props) {
  var item = props.item;
  var onClose = props.onClose;
  var onSave = props.onSave;
  var rs = React.useState(0); var rating = rs[0]; var setRating = rs[1];
  var rv = React.useState(""); var review = rv[0]; var setReview = rv[1];
  var lk = React.useState(false); var liked = lk[0]; var setLiked = lk[1];
  var rw = React.useState(false); var rewatch = rw[0]; var setRewatch = rw[1];
  var dt = React.useState(new Date().toISOString().slice(0,10)); var date = dt[0]; var setDate = dt[1];

  var inp = { width: "100%", padding: "10px 14px", background: "#1a1b1f", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, color: "#fff", fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" };
  var lab = { fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6, display: "block" };

  return React.createElement("div", { onClick: onClose, style: { position: "fixed", inset: 0, background: "rgba(0,0,0,.8)", backdropFilter: "blur(12px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 } },
    React.createElement("div", { onClick: function(e){e.stopPropagation();}, style: { background: "#151618", borderRadius: 16, width: "100%", maxWidth: 480, maxHeight: "90vh", overflow: "auto", border: "1px solid rgba(255,255,255,.08)" } },
      React.createElement("div", { style: { padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", justifyContent: "space-between", alignItems: "center" } },
        React.createElement("div", null,
          React.createElement("div", { style: { fontSize: 11, color: "#e8b600", fontWeight: 700, letterSpacing: 2 } }, "LOG ENTRY"),
          React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: "#fff", fontFamily: "Georgia,serif", marginTop: 4 } }, item.t),
          React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 2 } }, item.y + " \u00B7 " + (item.tp === "tv" ? "Series" : "Film"))
        ),
        React.createElement("button", { onClick: onClose, style: { background: "none", border: "none", color: "rgba(255,255,255,.4)", fontSize: 22, cursor: "pointer" } }, "\u2715")
      ),
      React.createElement("div", { style: { padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 } },
        React.createElement("div", null, React.createElement("label", { style: lab }, "Date Watched"), React.createElement("input", { type: "date", value: date, onChange: function(e){setDate(e.target.value);}, style: inp })),
        React.createElement("div", null, React.createElement("label", { style: lab }, "Rating"), React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, React.createElement(Stars, { value: rating, onChange: setRating, size: 30 }), React.createElement("span", { style: { fontSize: 14, color: "rgba(255,255,255,.3)" } }, rating ? rating + "/5" : "No rating"))),
        React.createElement("div", { style: { display: "flex", gap: 12 } },
          React.createElement("button", { onClick: function(){setLiked(!liked);}, style: { padding: "10px 16px", background: liked ? "rgba(239,68,68,.15)" : "rgba(255,255,255,.05)", border: "1px solid " + (liked ? "rgba(239,68,68,.3)" : "rgba(255,255,255,.1)"), borderRadius: 8, color: liked ? "#ef4444" : "rgba(255,255,255,.4)", fontSize: 13, cursor: "pointer", fontWeight: 600 } }, (liked ? "\u2665" : "\u2661") + " Like"),
          React.createElement("button", { onClick: function(){setRewatch(!rewatch);}, style: { padding: "10px 16px", background: rewatch ? "rgba(34,197,94,.1)" : "rgba(255,255,255,.05)", border: "1px solid " + (rewatch ? "rgba(34,197,94,.25)" : "rgba(255,255,255,.1)"), borderRadius: 8, color: rewatch ? "#22c55e" : "rgba(255,255,255,.4)", fontSize: 13, cursor: "pointer", fontWeight: 600 } }, "\u21BB Rewatch")
        ),
        React.createElement("div", null, React.createElement("label", { style: lab }, "Review"), React.createElement("textarea", { value: review, onChange: function(e){setReview(e.target.value);}, placeholder: "Share your thoughts...", style: Object.assign({}, inp, { minHeight: 80, resize: "vertical" }) })),
        React.createElement("button", { onClick: function(){ onSave({ itemId: item.id, rating: rating, review: review, liked: liked, rewatch: rewatch, date: date, title: item.t, type: item.tp }); onClose(); }, style: { width: "100%", padding: 14, background: "linear-gradient(135deg,#e8b600,#ff8c00)", border: "none", borderRadius: 10, color: "#000", fontSize: 15, fontWeight: 800, cursor: "pointer", textTransform: "uppercase" } }, "Save Log")
      )
    )
  );
}

function DetailModal(props) {
  var item = props.item;
  var myLogs = props.logs.filter(function(l){ return l.itemId === item.id; });
  return React.createElement("div", { onClick: props.onClose, style: { position: "fixed", inset: 0, background: "rgba(0,0,0,.85)", backdropFilter: "blur(16px)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 } },
    React.createElement("div", { onClick: function(e){e.stopPropagation();}, style: { background: "#131416", borderRadius: 16, width: "100%", maxWidth: 560, maxHeight: "90vh", overflow: "auto", border: "1px solid rgba(255,255,255,.06)" } },
      React.createElement("div", { style: { padding: 24, display: "flex", gap: 20 } },
        React.createElement("div", { style: { width: 120, height: 180, borderRadius: 10, flexShrink: 0, background: pbg(item.id), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,0,0,.4)", position: "relative", overflow: "hidden" } },
          item.p ? React.createElement("img", { src: T + item.p, alt: item.t, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }, onError: function(e) { e.target.style.display = "none"; } }) : null,
          React.createElement("span", { style: { fontSize: 28, fontWeight: 700, color: acc(item.id), opacity: 0.15, fontFamily: "Georgia,serif" } }, item.t.split(/\s+/).map(function(w){return w[0];}).join("").slice(0,2))
        ),
        React.createElement("div", { style: { flex: 1 } },
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
            React.createElement("div", null,
              item.an ? React.createElement("span", { style: { background: "linear-gradient(135deg,#ff6b6b,#ee5a24)", padding: "2px 8px", borderRadius: 4, fontSize: 9, fontWeight: 800, color: "#fff", letterSpacing: 1.5 } }, "ANIME") : null,
              React.createElement("h2", { style: { margin: "8px 0 0", fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: "Georgia,serif" } }, item.t),
              React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 6 } }, item.y + (item.rt ? " \u00B7 " + item.rt : "") + (item.sn ? " \u00B7 " + item.sn + "S" : "")),
              React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" } }, item.g.map(function(g,i){ return React.createElement("span", { key: i, style: { padding: "3px 10px", background: "rgba(255,255,255,.06)", borderRadius: 20, fontSize: 11, color: "rgba(255,255,255,.5)" } }, g); }))
            ),
            React.createElement("button", { onClick: props.onClose, style: { background: "none", border: "none", color: "rgba(255,255,255,.4)", fontSize: 22, cursor: "pointer", alignSelf: "flex-start" } }, "\u2715")
          ),
          React.createElement("div", { style: { display: "flex", gap: 20, marginTop: 16, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,.06)" } },
            React.createElement("div", null, React.createElement("div", { style: { fontSize: 10, color: "rgba(255,255,255,.35)", letterSpacing: 1.5 } }, "RATING"), React.createElement("div", { style: { fontSize: 20, fontWeight: 700, color: "#f5c518" } }, item.r)),
            React.createElement("div", null, React.createElement("div", { style: { fontSize: 10, color: "rgba(255,255,255,.35)", letterSpacing: 1.5 } }, "LOGS"), React.createElement("div", { style: { fontSize: 20, fontWeight: 700, color: "#fff" } }, myLogs.length))
          )
        )
      ),
      React.createElement("div", { style: { padding: "0 24px 24px" } },
        React.createElement("p", { style: { fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,.6)", margin: "0 0 20px" } }, item.o),
        React.createElement("div", { style: { display: "flex", gap: 10 } },
          React.createElement("button", { onClick: function(){ props.onLog(item); }, style: { flex: 1, padding: 14, background: "linear-gradient(135deg,#e8b600,#ff8c00)", border: "none", borderRadius: 10, color: "#000", fontSize: 14, fontWeight: 800, cursor: "pointer", textTransform: "uppercase" } }, "Log This"),
          React.createElement("button", { onClick: function(){ props.onWatch(item); }, style: { padding: "14px 20px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" } }, "+ Watchlist")
        ),
        myLogs.length > 0 ? React.createElement("div", { style: { marginTop: 20 } },
          React.createElement("div", { style: { fontSize: 11, color: "rgba(255,255,255,.35)", letterSpacing: 1.5, marginBottom: 10, fontWeight: 600 } }, "YOUR LOGS"),
          myLogs.map(function(l,i){ return React.createElement("div", { key: i, style: { padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.04)", display: "flex", justifyContent: "space-between" } },
            React.createElement("span", { style: { color: "rgba(255,255,255,.6)", fontSize: 13 } }, l.date + (l.rewatch ? " \u21BB" : "") + (l.liked ? " \u2665" : "")),
            l.rating > 0 ? React.createElement("span", { style: { color: "#f5c518", fontSize: 13 } }, "\u2605".repeat(l.rating)) : null
          ); })
        ) : null
      )
    )
  );
}

function AuthModal(props) {
  var us = React.useState(""); var u = us[0]; var setU = us[1];
  var ps = React.useState(""); var p = ps[0]; var setP = ps[1];
  var inp = { width: "100%", padding: "12px 14px", background: "#1a1b1f", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, color: "#fff", fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" };
  var go = function() { if(u && p) { props.onAuth({ username: u }); props.onClose(); } };
  return React.createElement("div", { onClick: props.onClose, style: { position: "fixed", inset: 0, background: "rgba(0,0,0,.85)", backdropFilter: "blur(16px)", zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 } },
    React.createElement("div", { onClick: function(e){e.stopPropagation();}, style: { background: "#151618", borderRadius: 16, width: "100%", maxWidth: 380, border: "1px solid rgba(255,255,255,.08)" } },
      React.createElement("div", { style: { padding: 28, textAlign: "center" } },
        React.createElement("div", { style: { fontSize: 28, fontWeight: 700, fontFamily: "Georgia,serif", color: "#fff" } }, "CineLogr"),
        React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,.35)", marginTop: 4, letterSpacing: 2 } }, "SIGN IN")
      ),
      React.createElement("div", { style: { padding: "0 28px 28px", display: "flex", flexDirection: "column", gap: 14 } },
        React.createElement("input", { placeholder: "Username", value: u, onChange: function(e){setU(e.target.value);}, style: inp }),
        React.createElement("input", { placeholder: "Password", type: "password", value: p, onChange: function(e){setP(e.target.value);}, style: inp, onKeyDown: function(e){ if(e.key==="Enter") go(); } }),
        React.createElement("button", { onClick: go, style: { width: "100%", padding: 14, background: "linear-gradient(135deg,#e8b600,#ff8c00)", border: "none", borderRadius: 10, color: "#000", fontSize: 15, fontWeight: 800, cursor: "pointer", textTransform: "uppercase", marginTop: 4 } }, "Sign In")
      )
    )
  );
}

function Section(props) {
  return React.createElement("section", { style: { marginBottom: 48 } },
    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 } },
      React.createElement("h2", { style: { fontSize: 20, fontWeight: 700, color: "#fff", margin: 0, fontFamily: "Georgia,serif" } }, props.title),
      React.createElement("span", { style: { fontSize: 12, color: "rgba(255,255,255,.3)", letterSpacing: 1.5 } }, props.count + " titles")
    ),
    React.createElement(Grid, { items: props.items, onClick: props.onClick, onLog: props.onLog, onWatch: props.onWatch })
  );
}

export default function CineLogr() {
  var pg = React.useState("home"); var page = pg[0]; var setPage = pg[1];
  var ur = React.useState(null); var user = ur[0]; var setUser = ur[1];
  var lg = React.useState([]); var logs = lg[0]; var setLogs = lg[1];
  var wl = React.useState([]); var watchlist = wl[0]; var setWatchlist = wl[1];
  var lm = React.useState(null); var logModal = lm[0]; var setLogModal = lm[1];
  var dm = React.useState(null); var detModal = dm[0]; var setDetModal = dm[1];
  var am = React.useState(false); var authModal = am[0]; var setAuthModal = am[1];
  var ss = React.useState(""); var search = ss[0]; var setSearch = ss[1];
  var sf = React.useState(false); var searchFocus = sf[0]; var setSearchFocus = sf[1];
  var sr = React.useState("rating"); var sort = sr[0]; var setSort = sr[1];

  var results = search.length > 1 ? ALL.filter(function(m){ return m.t.toLowerCase().indexOf(search.toLowerCase()) >= 0; }) : [];

  var doLog = function(item) { if(!user){ setAuthModal(true); return; } setDetModal(null); setLogModal(item); };
  var doSave = function(data) { setLogs(function(prev){ return [data].concat(prev); }); };
  var doWatch = function(item) { if(!user){ setAuthModal(true); return; } var exists = watchlist.some(function(w){ return w.id === item.id; }); if(!exists) setWatchlist(function(prev){ return [item].concat(prev); }); };

  var navItems = [["home","Home"],["films","Films"],["series","Series"],["anime","Anime"],["diary","Diary"],["profile","Profile"]];

  var feat = MOVIES[0];

  var sortData = function(data) {
    return data.slice().sort(function(a,b) {
      if(sort === "rating") return b.r - a.r;
      if(sort === "year") return b.y.localeCompare(a.y);
      return a.t.localeCompare(b.t);
    });
  };

  var renderPage = function() {
    if(page === "home") {
      return React.createElement("div", null,
        React.createElement("div", { style: { position: "relative", padding: 48, borderRadius: 20, background: pbg(feat.id), marginBottom: 48, overflow: "hidden" } },
          React.createElement("div", { style: { position: "absolute", top: 20, right: 30, fontSize: 80, fontWeight: 700, color: acc(feat.id), opacity: 0.05, fontFamily: "Georgia,serif" } }, "\u2605"),
          React.createElement("div", { style: { maxWidth: 440, position: "relative", zIndex: 1 } },
            React.createElement("div", { style: { fontSize: 11, color: "#e8b600", fontWeight: 700, letterSpacing: 3 } }, "FEATURED"),
            React.createElement("h1", { style: { fontSize: 32, fontWeight: 700, color: "#fff", margin: "8px 0 0", fontFamily: "Georgia,serif" } }, feat.t),
            React.createElement("p", { style: { fontSize: 14, color: "rgba(255,255,255,.5)", marginTop: 10, lineHeight: 1.7 } }, feat.o),
            React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 20 } },
              React.createElement("button", { onClick: function(){doLog(feat);}, style: { padding: "12px 28px", background: "#e8b600", border: "none", borderRadius: 8, color: "#000", fontWeight: 800, cursor: "pointer" } }, "LOG IT"),
              React.createElement("button", { onClick: function(){setDetModal(feat);}, style: { padding: "12px 28px", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, color: "#fff", fontWeight: 600, cursor: "pointer" } }, "Details")
            )
          )
        ),
        React.createElement(Section, { title: "Popular Films", count: MOVIES.length, items: MOVIES.slice(0,6), onClick: setDetModal, onLog: doLog, onWatch: doWatch }),
        React.createElement(Section, { title: "Trending Series", count: SERIES.length, items: SERIES.slice(0,6), onClick: setDetModal, onLog: doLog, onWatch: doWatch }),
        React.createElement(Section, { title: "Top Anime", count: ANIME.length, items: ANIME.slice(0,6), onClick: setDetModal, onLog: doLog, onWatch: doWatch })
      );
    }
    if(page === "films") {
      return React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 } },
          React.createElement("h1", { style: { fontSize: 28, fontWeight: 700, color: "#fff", margin: 0, fontFamily: "Georgia,serif" } }, "Films"),
          React.createElement("div", { style: { display: "flex", gap: 6 } }, [["rating","Rating"],["year","Year"],["alpha","A-Z"]].map(function(x){ return React.createElement("button", { key: x[0], onClick: function(){setSort(x[0]);}, style: { padding: "6px 14px", borderRadius: 6, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", background: sort===x[0] ? "rgba(232,182,0,.15)" : "rgba(255,255,255,.05)", color: sort===x[0] ? "#e8b600" : "rgba(255,255,255,.4)" } }, x[1]); }))
        ),
        React.createElement(Grid, { items: sortData(MOVIES), onClick: setDetModal, onLog: doLog, onWatch: doWatch })
      );
    }
    if(page === "series") {
      return React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 } },
          React.createElement("h1", { style: { fontSize: 28, fontWeight: 700, color: "#fff", margin: 0, fontFamily: "Georgia,serif" } }, "TV Series"),
          React.createElement("div", { style: { display: "flex", gap: 6 } }, [["rating","Rating"],["year","Year"],["alpha","A-Z"]].map(function(x){ return React.createElement("button", { key: x[0], onClick: function(){setSort(x[0]);}, style: { padding: "6px 14px", borderRadius: 6, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", background: sort===x[0] ? "rgba(232,182,0,.15)" : "rgba(255,255,255,.05)", color: sort===x[0] ? "#e8b600" : "rgba(255,255,255,.4)" } }, x[1]); }))
        ),
        React.createElement(Grid, { items: sortData(SERIES), onClick: setDetModal, onLog: doLog, onWatch: doWatch })
      );
    }
    if(page === "anime") {
      return React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 } },
          React.createElement("h1", { style: { fontSize: 28, fontWeight: 700, color: "#fff", margin: 0, fontFamily: "Georgia,serif" } }, "Anime"),
          React.createElement("div", { style: { display: "flex", gap: 6 } }, [["rating","Rating"],["year","Year"],["alpha","A-Z"]].map(function(x){ return React.createElement("button", { key: x[0], onClick: function(){setSort(x[0]);}, style: { padding: "6px 14px", borderRadius: 6, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", background: sort===x[0] ? "rgba(232,182,0,.15)" : "rgba(255,255,255,.05)", color: sort===x[0] ? "#e8b600" : "rgba(255,255,255,.4)" } }, x[1]); }))
        ),
        React.createElement(Grid, { items: sortData(ANIME), onClick: setDetModal, onLog: doLog, onWatch: doWatch })
      );
    }
    if(page === "diary") {
      if(!logs.length) return React.createElement("div", { style: { textAlign: "center", padding: "80px 20px" } },
        React.createElement("div", { style: { fontSize: 48 } }, "\uD83D\uDCD6"),
        React.createElement("h2", { style: { fontSize: 24, fontWeight: 700, color: "#fff", fontFamily: "Georgia,serif", margin: "16px 0 8px" } }, "Your Diary is Empty"),
        React.createElement("p", { style: { color: "rgba(255,255,255,.4)" } }, "Start logging to build your diary.")
      );
      return React.createElement("div", null,
        React.createElement("h1", { style: { fontSize: 28, fontWeight: 700, color: "#fff", margin: "0 0 28px", fontFamily: "Georgia,serif" } }, "Diary"),
        logs.map(function(l,i) {
          var item = ALL.find(function(m){ return m.id === l.itemId; });
          if(!item) return null;
          return React.createElement("div", { key: i, onClick: function(){setDetModal(item);}, style: { display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", borderRadius: 10, cursor: "pointer", background: "rgba(255,255,255,.02)", marginBottom: 2 },
            onMouseEnter: function(e){e.currentTarget.style.background="rgba(255,255,255,.05)";},
            onMouseLeave: function(e){e.currentTarget.style.background="rgba(255,255,255,.02)";} },
            React.createElement("span", { style: { fontSize: 13, color: "rgba(255,255,255,.3)", width: 80 } }, l.date),
            React.createElement("div", { style: { width: 36, height: 54, borderRadius: 5, background: pbg(item.id), flexShrink: 0 } }),
            React.createElement("div", { style: { flex: 1 } },
              React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: "#fff" } }, item.t),
              React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,.3)", marginTop: 2 } }, item.y + (item.an ? " \u00B7 Anime" : ""))
            ),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
              l.rewatch ? React.createElement("span", { style: { color: "#22c55e" } }, "\u21BB") : null,
              l.liked ? React.createElement("span", { style: { color: "#ef4444" } }, "\u2665") : null,
              l.rating > 0 ? React.createElement("span", { style: { color: "#f5c518", fontSize: 13 } }, "\u2605".repeat(l.rating)) : null
            )
          );
        })
      );
    }
    if(page === "profile") {
      var films = 0; var shows = 0; var seen = {};
      logs.forEach(function(l) { var item = ALL.find(function(m){return m.id===l.itemId;}); if(item && !seen[item.id]) { seen[item.id]=1; if(item.tp==="movie") films++; else shows++; } });
      return React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 24, marginBottom: 40, padding: 28, background: "rgba(255,255,255,.02)", borderRadius: 16, border: "1px solid rgba(255,255,255,.05)" } },
          React.createElement("div", { style: { width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#e8b600,#ff8c00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: "#000" } }, (user && user.username ? user.username[0] : "C").toUpperCase()),
          React.createElement("div", { style: { flex: 1 } },
            React.createElement("h1", { style: { fontSize: 24, fontWeight: 700, color: "#fff", margin: 0, fontFamily: "Georgia,serif" } }, user ? user.username : "User")
          ),
          React.createElement("button", { onClick: function(){ setUser(null); setLogs([]); setWatchlist([]); setPage("home"); }, style: { padding: "8px 20px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, color: "rgba(255,255,255,.5)", fontSize: 12, fontWeight: 600, cursor: "pointer" } }, "Sign Out")
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 40 } },
          [{ l: "Films", v: films, c: "#e8b600" },{ l: "Series", v: shows, c: "#3b82f6" },{ l: "Logs", v: logs.length, c: "#22c55e" }].map(function(s){ return React.createElement("div", { key: s.l, style: { padding: 18, background: "rgba(255,255,255,.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,.04)", textAlign: "center" } },
            React.createElement("div", { style: { fontSize: 26, fontWeight: 700, color: s.c } }, s.v),
            React.createElement("div", { style: { fontSize: 10, color: "rgba(255,255,255,.35)", marginTop: 4, letterSpacing: 1.5 } }, s.l)
          ); })
        ),
        logs.length > 0 ? React.createElement("div", null,
          React.createElement("h2", { style: { fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 16px", fontFamily: "Georgia,serif" } }, "Recent Activity"),
          logs.slice(0,8).map(function(l,i) {
            var item = ALL.find(function(m){return m.id===l.itemId;});
            if(!item) return null;
            return React.createElement("div", { key: i, onClick: function(){setDetModal(item);}, style: { display: "flex", alignItems: "center", gap: 14, padding: "10px 14px", borderRadius: 8, cursor: "pointer", background: "rgba(255,255,255,.02)", marginBottom: 2 } },
              React.createElement("div", { style: { width: 34, height: 51, borderRadius: 5, background: pbg(item.id), flexShrink: 0 } }),
              React.createElement("div", { style: { flex: 1 } }, React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: "#fff" } }, item.t), React.createElement("div", { style: { fontSize: 11, color: "rgba(255,255,255,.3)" } }, l.date)),
              l.rating > 0 ? React.createElement("span", { style: { color: "#f5c518", fontSize: 13 } }, "\u2605".repeat(l.rating)) : null
            );
          })
        ) : null
      );
    }
    return null;
  };

  return React.createElement("div", { style: { minHeight: "100vh", background: "#0a0b0e", color: "#fff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" } },
    // Nav
    React.createElement("nav", { style: { position: "sticky", top: 0, zIndex: 100, background: "rgba(10,11,14,.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.04)", padding: "0 24px" } },
      React.createElement("div", { style: { maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", height: 60, gap: 8 } },
        React.createElement("div", { onClick: function(){setPage("home");}, style: { cursor: "pointer", marginRight: 16, display: "flex", alignItems: "center", gap: 10 } },
          React.createElement("div", { style: { width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#e8b600,#ff8c00)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#000" } }, "C"),
          React.createElement("span", { style: { fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: "Georgia,serif" } }, "CineLogr")
        ),
        React.createElement("div", { style: { display: "flex", gap: 2, flex: 1 } },
          navItems.map(function(n) { return React.createElement("button", { key: n[0], onClick: function() { if((n[0]==="profile"||n[0]==="diary")&&!user){setAuthModal(true);return;} setPage(n[0]); }, style: { padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer", background: page===n[0] ? "rgba(255,255,255,.08)" : "transparent", color: page===n[0] ? "#fff" : "rgba(255,255,255,.4)", transition: "all .2s" } }, n[1]); })
        ),
        // Search
        React.createElement("div", { style: { position: "relative", width: 200 } },
          React.createElement("input", { value: search, onChange: function(e){setSearch(e.target.value);}, placeholder: "Search...", style: { width: "100%", padding: "8px 14px 8px 32px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 8, color: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }, onFocus: function(){setSearchFocus(true);}, onBlur: function(){setTimeout(function(){setSearchFocus(false);setSearch("");},200);} }),
          React.createElement("span", { style: { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,.25)", fontSize: 14, pointerEvents: "none" } }, "\u2315"),
          results.length > 0 && searchFocus ? React.createElement("div", { style: { position: "absolute", top: "calc(100% + 8px)", left: -60, right: 0, width: 300, background: "#1a1b1f", borderRadius: 10, border: "1px solid rgba(255,255,255,.08)", maxHeight: 320, overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,.6)" } },
            results.slice(0,8).map(function(item) { return React.createElement("div", { key: item.id, onMouseDown: function(e){e.preventDefault();}, onClick: function(){setDetModal(item);setSearch("");setSearchFocus(false);}, style: { display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", cursor: "pointer" }, onMouseEnter: function(e){e.currentTarget.style.background="rgba(255,255,255,.05)";}, onMouseLeave: function(e){e.currentTarget.style.background="transparent";} },
              React.createElement("div", { style: { width: 28, height: 42, borderRadius: 4, background: pbg(item.id), flexShrink: 0 } }),
              React.createElement("div", null,
                React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: "#fff" } }, item.t),
                React.createElement("div", { style: { fontSize: 11, color: "rgba(255,255,255,.3)" } }, item.y + " \u00B7 " + (item.tp==="tv" ? "Series" : "Film") + (item.an ? " \u00B7 Anime" : ""))
              )
            ); })
          ) : null
        ),
        user ? React.createElement("div", { onClick: function(){setPage("profile");}, style: { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#e8b600,#ff8c00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#000", cursor: "pointer", marginLeft: 8 } }, user.username[0].toUpperCase())
          : React.createElement("button", { onClick: function(){setAuthModal(true);}, style: { padding: "8px 18px", background: "linear-gradient(135deg,#e8b600,#ff8c00)", border: "none", borderRadius: 8, color: "#000", fontSize: 12, fontWeight: 800, cursor: "pointer", marginLeft: 8 } }, "SIGN IN")
      )
    ),
    // Main
    React.createElement("main", { style: { maxWidth: 1100, margin: "0 auto", padding: "32px 24px 80px" } }, renderPage()),
    // Footer
    React.createElement("footer", { style: { borderTop: "1px solid rgba(255,255,255,.04)", padding: 24, textAlign: "center" } },
      React.createElement("span", { style: { fontSize: 13, color: "rgba(255,255,255,.2)" } }, "CineLogr \u2014 Track films, series & anime")
    ),
    // Modals
    logModal ? React.createElement(LogModal, { item: logModal, onClose: function(){setLogModal(null);}, onSave: doSave }) : null,
    detModal ? React.createElement(DetailModal, { item: detModal, onClose: function(){setDetModal(null);}, onLog: doLog, onWatch: doWatch, logs: logs }) : null,
    authModal ? React.createElement(AuthModal, { onClose: function(){setAuthModal(false);}, onAuth: function(u){setUser(u);setAuthModal(false);} }) : null
  );
}
