// Color Theme 
const colors = {
    available: '#282828',
    used: '#008800',
    wrong: '#dd0000',
    candidate: '#0000dd',
};


export const PlayNumber = (props) => (
    <button className="btn btn-lg rounded-circle shadow-sm my-2"
        style={{ backgroundColor: colors[props.status], color: "white" }}
        onClick={() => props.onClick(props.num, props.status)}>
        <b>{props.num}</b>
    </button>
);


