import css from "./FilterBoxSubmit.module.css"

export default function FilterBoxSubmit(
    props: {
        children: string,
        onClick?: () => void,
    }
) {
    return (
        <div className={css.container}>
            <input type="button" value={props.children} onClick={props.onClick} />
        </div>
    )
}