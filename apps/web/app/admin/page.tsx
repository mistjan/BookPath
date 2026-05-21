import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default function AdminPage() {
  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">/admin</p>
          <h1>后台管理</h1>
          <p className="lede">第一版必须保留内容审核状态：AI_DRAFT / NEEDS_REVIEW / REVIEWED / VERIFIED。</p>
        </div>
      </section>
      <section className="admin-shell">
        <AdminSidebar />
        <div className="detail-section">
          <h2>内容审核状态</h2>
          <dl className="meta-list">
            <div><dt>作品管理</dt><dd>创建作品、编辑作品、修改作品难度。</dd></div>
            <div><dt>流派管理</dt><dd>创建流派、编辑流派、绑定作品和流派。</dd></div>
            <div><dt>阅读路径管理</dt><dd>创建阅读路径、调整阅读路径步骤顺序。</dd></div>
            <div><dt>奖项管理</dt><dd>创建奖项并维护获奖/入围记录。</dd></div>
            <div><dt>审核状态</dt><dd>status: DRAFT / PUBLISHED / ARCHIVED；reviewStatus: AI_DRAFT / NEEDS_REVIEW / REVIEWED / VERIFIED。</dd></div>
          </dl>
        </div>
      </section>
    </main>
  );
}
