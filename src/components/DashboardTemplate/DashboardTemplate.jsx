import css from './DashboardTemplate.module.css';

export default function DashboardTemplate({ title, user, logout, children }) {
  return (
    <div className={css.container}>
      <main className={css.dashboardTemplate}>
        <header>
          <button className={css.logoutButton} onClick={logout}>
            Logout
          </button>
          <div className={css.titleContainer}>
            <h1>{title}</h1>
            <h2>You are logged as {user.name}</h2>
          </div>
        </header>
        <section>{children}</section>
      </main>
      <aside className={css.aside}>
        <h2>Urquiz</h2>
        <h3>
          Discover a world of fun, interactive, and responsive quizzes designed
          to challenge your knowledge and keep you engaged.
        </h3>
        <h4>Start exploring now and make every question count!</h4>
      </aside>
    </div>
  );
}
