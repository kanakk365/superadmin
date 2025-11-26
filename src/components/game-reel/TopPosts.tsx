const posts = [
  { user: "@gamer123", title: "Epic win against boss!", likes: "1.2K", reach: "15K" },
  { user: "@speedrun_king", title: "New WR Any% - 12:45", likes: "3.5K", reach: "45K" },
  { user: "@pro_player_x", title: "Tournament Highlights", likes: "8.9K", reach: "120K" },
  { user: "@casual_steve", title: "My first victory royale", likes: "450", reach: "2.1K" },
  { user: "@streamer_girl", title: "Live now! Join in", likes: "2.1K", reach: "25K" },
];

export const TopPosts = () => {
  return (
    <div className="rounded-3xl bg-card py-6 px-3">
      <h3 className="px-6 text-lg font-semibold text-foreground">Top Performing Posts</h3>
      <div className="overflow-hidden">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead className="border-b border-border text-left text-sm font-thin text-muted-foreground">
            <tr>
              <th className="px-6 py-4 text-sm font-normal">User</th>
              <th className="px-6 py-4 text-sm font-normal">Title</th>
              <th className="px-6 py-4 text-sm font-normal">Likes</th>
              <th className="px-6 py-4 text-sm font-normal">Reach</th>
            </tr>
          </thead>
          <tbody className="text-sm text-foreground">
            {posts.map((post) => (
              <tr key={post.user + post.title} className="border-b border-border/60 last:border-0">
                <td className="px-6 py-3 text-sm font-normal text-foreground">{post.user}</td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">{post.title}</td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">{post.likes}</td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">{post.reach}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

