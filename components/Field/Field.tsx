import css from "./Field.module.css"

export function Field(ctx: { children?: React.ReactNode }) {
    return (
        <div className={css.container}>
            {ctx.children}
        </div>
    );
}