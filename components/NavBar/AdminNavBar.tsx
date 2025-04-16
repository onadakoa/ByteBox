import css from "./AdminNavBar.module.css";

export default function AdminNavBar(props: { children?: React.ReactNode, IconsPanel?: React.ReactNode }) {
    return (
        <div className={css.container}>
            <div className={css.empty}></div>
            <div className={css.navBar}>T</div>
            <div className={css.icons}>L</div>
            <div className={css.content}>{props.children}</div>
        </div>
    );
}