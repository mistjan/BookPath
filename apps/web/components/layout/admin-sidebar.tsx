const adminItems = ["作品管理", "流派管理", "阅读路径管理", "奖项管理", "榜单管理", "AI 草稿", "数据导入", "内容审核"];

export function AdminSidebar() {
  return (
    <aside className="admin-sidebar" aria-label="后台管理导航">
      {adminItems.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </aside>
  );
}
