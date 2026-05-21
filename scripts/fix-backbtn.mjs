import fs from "fs";

const pages = [
  "movement/[id].tsx", "work/[slug].tsx", "path/[slug].tsx",
  "award/[slug].tsx", "author/[id].tsx",
  "start.tsx", "classics.tsx", "beginner.tsx",
  "favorites.tsx", "reading-list.tsx"
];

const GO_BACK_FN = `function GoBack({title}){return <Pressable onPress={()=>{try{if(typeof window!=="undefined"&&window.history)window.history.back()}catch{}}} style={{flexDirection:"row",alignItems:"center",gap:6,paddingRight:16}}><Text style={{fontSize:22,color:"#7b3f2d",fontWeight:"800",lineHeight:24}}>←</Text><Text style={{fontSize:17,color:"#231f18",fontWeight:"700",lineHeight:22}}>{title}</Text></Pressable>;}`;

pages.forEach(f => {
  let c = fs.readFileSync("apps/mobile/app/" + f, "utf-8");

  // Remove old BackBtn function
  c = c.replace(/function BackBtn\(\)[\s\S]*?\/Pressable>;\n\}/, "");
  c = c.replace(/function BackBtn\([\s\S]*?\/Pressable>;\n\}/, "");

  // Remove old headerLeft
  c = c.replace(/headerLeft: \(\) => <BackBtn \/>,\n\s+/, "");

  // Remove stale useNavigation import
  c = c.replace(/import \{ useNavigation \} from .*\n/, "");

  // Add GoBack helper before export default
  c = c.replace("export default function", GO_BACK_FN + "\n\nexport default function");

  // Replace Stack.Screen with custom header bar
  // Find the Stack.Screen options line and replace it
  c = c.replace(
    /<Stack\.Screen options={{ title: ([^}]+) }} \/>/,
    `<Stack.Screen options={{ headerShown: false }} />
      <View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:20,paddingVertical:12,backgroundColor:"#f7f0e5"}}><GoBack title={$1} /></View>`
  );

  // For files without Stack.Screen (like favorites, reading-list)
  // These are handled above already

  fs.writeFileSync("apps/mobile/app/" + f, c, "utf-8");
  console.log("✅", f);
});
