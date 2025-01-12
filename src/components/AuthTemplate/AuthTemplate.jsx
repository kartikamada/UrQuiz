import css from './AuthTemplate.module.css';

export default function AuthTemplate({ title, children }) {
  return (
    <main className={css.authTemplate}>
      <header>
        <h1>{title}</h1>
      </header>
      <section>{children}</section>
    </main>
  );
}
